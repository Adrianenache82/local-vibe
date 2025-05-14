import { Venue } from '../models/venue';
import { Bar } from '../models/bar';
import { CoffeeShop } from '../models/coffee-shop';
import { ArtFestival } from '../models/art-festival';
import { ComedyVenue } from '../models/comedy-venue';
import { NatureWalk } from '../models/nature-walk';
import { MusicVenue } from '../models/music-venue';
import { ThriftStore } from '../models/thrift-store';
import { SocialClub } from '../models/social-club';
import { SportsClub } from '../models/sports-club';
import { Club } from '../models/club';
import { v4 as uuidv4 } from 'uuid';
import { API_CONFIG } from '../config/api-config';

interface PlacesApiResponse {
  results: PlaceResult[];
  next_page_token?: string;
  status: string;
}

interface PlaceResult {
  place_id: string;
  name: string;
  vicinity: string;
  formatted_address?: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  rating?: number;
  user_ratings_total?: number;
  photos?: {
    photo_reference: string;
    height: number;
    width: number;
  }[];
  types: string[];
  business_status?: string;
  opening_hours?: {
    open_now?: boolean;
    periods?: {
      open: { day: number; time: string };
      close: { day: number; time: string };
    }[];
    weekday_text?: string[];
  };
  price_level?: number;
}

interface PlaceDetailsResponse {
  result: PlaceDetailsResult;
  status: string;
}

interface PlaceDetailsResult extends PlaceResult {
  reviews?: {
    author_name: string;
    rating: number;
    text: string;
    time: number;
  }[];
  website?: string;
  formatted_phone_number?: string;
  international_phone_number?: string;
  url?: string;
  editorial_summary?: {
    overview: string;
  };
}

interface GooglePlacesConfig {
  apiKey: string;
  location: {
    lat: number;
    lng: number;
  };
  radius: number;
  language: string;
}

const DEFAULT_CONFIG: GooglePlacesConfig = {
  apiKey: '', // API key should be provided via environment variable
  location: {
    lat: 33.3062,
    lng: -111.8413
  },
  radius: 20000, // 20km radius to include surrounding areas
  language: 'en'
};

const CATEGORY_MAPPING = {
  'bar': ['bar', 'night_club', 'pub'],
  'coffee-shop': ['cafe', 'coffee_shop', 'bakery'],
  'art-festival': ['art_gallery', 'museum', 'tourist_attraction', 'point_of_interest'],
  'comedy-venue': ['comedy_club', 'theater', 'entertainment'],
  'nature-walk': ['park', 'natural_feature', 'trail', 'campground'],
  'music-venue': ['music_venue', 'concert_hall', 'performing_arts_theater'],
  'thrift-store': ['thrift_store', 'second_hand_store', 'store', 'shopping'],
  'social-club': ['social_club', 'community_center', 'club'],
  'sports-club': ['gym', 'sports_club', 'stadium', 'fitness_center'],
  'club': ['night_club', 'dance_club', 'entertainment']
};

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

class ApiCache {
  private cache: Record<string, CacheEntry<any>> = {};
  private readonly DEFAULT_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    const now = Date.now();
    this.cache[key] = {
      data,
      timestamp: now,
      expiresAt: now + ttl
    };
  }

  get<T>(key: string): T | null {
    const entry = this.cache[key];
    if (!entry) return null;
    
    const now = Date.now();
    if (now > entry.expiresAt) {
      delete this.cache[key];
      return null;
    }
    
    return entry.data as T;
  }

  has(key: string): boolean {
    const entry = this.cache[key];
    if (!entry) return false;
    
    const now = Date.now();
    if (now > entry.expiresAt) {
      delete this.cache[key];
      return false;
    }
    
    return true;
  }

  clear(): void {
    this.cache = {};
  }
}

export class GooglePlacesService {
  private config: GooglePlacesConfig;
  private cache: ApiCache;
  private apiKeyEnvVar = 'GOOGLE_PLACES_API_KEY';

  constructor(config: Partial<GooglePlacesConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.cache = new ApiCache();
    
    if (config.apiKey) {
      this.config.apiKey = config.apiKey;
    }
  }

  /**
   * Set the API key for Google Places API
   */
  setApiKey(apiKey: string): void {
    this.config.apiKey = apiKey;
  }

  /**
   * Check if the API key is set
   */
  hasApiKey(): boolean {
    return !!this.config.apiKey;
  }

  /**
   * Get venues by category
   */
  async getVenuesByCategory(category: string, count: number = 50): Promise<Venue[]> {
    if (!this.hasApiKey()) {
      console.warn('Google Places API key is not set. Using fallback data.');
      const { VenueService } = await import('./venue-service');
      return VenueService.getVenuesByCategory(category);
    }

    const cacheKey = `venues_${category}_${count}`;
    const cachedData = this.cache.get<Venue[]>(cacheKey);
    if (cachedData) {
      console.log(`Using cached data for ${category} venues`);
      return cachedData;
    }

    try {
      const placeTypes = CATEGORY_MAPPING[category as keyof typeof CATEGORY_MAPPING] || [];
      if (!placeTypes.length) {
        throw new Error(`Unknown category: ${category}`);
      }

      const results: PlaceResult[] = [];
      let nextPageToken: string | undefined;

      for (const type of placeTypes) {
        if (results.length >= count) break;

        let typeResults: PlaceResult[] = [];
        nextPageToken = undefined;

        do {
          const response = await this.fetchPlaces(type, nextPageToken);
          if (response.status !== 'OK') {
            console.error(`API Error: ${response.status}`);
            break;
          }

          typeResults = [...typeResults, ...response.results];
          nextPageToken = response.next_page_token;

          if (nextPageToken) {
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        } while (nextPageToken && typeResults.length < count);

        for (const result of typeResults) {
          if (!results.find(r => r.place_id === result.place_id)) {
            results.push(result);
          }
          if (results.length >= count) break;
        }
      }

      const venues = await Promise.all(
        results.map(place => this.convertPlaceToVenue(place, category))
      );

      this.cache.set(cacheKey, venues);

      return venues;
    } catch (error) {
      console.error('Error fetching venues from Google Places API:', error);
      
      console.log('Using fallback data from venue-data-generator');
      const { VenueService } = await import('./venue-service');
      return VenueService.getVenuesByCategory(category);
    }
  }

  /**
   * Get all venues from all categories
   */
  async getAllVenues(countPerCategory: number = 50): Promise<Venue[]> {
    if (!this.hasApiKey()) {
      console.warn('Google Places API key is not set. Using fallback data.');
      const { VenueService } = await import('./venue-service');
      return VenueService.getAllVenues();
    }

    const cacheKey = `all_venues_${countPerCategory}`;
    const cachedData = this.cache.get<Venue[]>(cacheKey);
    if (cachedData) {
      console.log('Using cached data for all venues');
      return cachedData;
    }

    try {
      const categories = Object.keys(CATEGORY_MAPPING);
      const venuePromises = categories.map(category => 
        this.getVenuesByCategory(category, countPerCategory)
      );
      
      const venuesByCategory = await Promise.all(venuePromises);
      const allVenues = venuesByCategory.flat();
      
      this.cache.set(cacheKey, allVenues);
      
      return allVenues;
    } catch (error) {
      console.error('Error fetching all venues from Google Places API:', error);
      
      console.log('Using fallback data from venue-data-generator');
      const { VenueService } = await import('./venue-service');
      return VenueService.getAllVenues();
    }
  }

  /**
   * Get venue details by ID
   */
  async getVenueById(id: string): Promise<Venue | undefined> {
    if (!this.hasApiKey()) {
      console.warn('Google Places API key is not set. Using fallback data.');
      const { VenueService } = await import('./venue-service');
      return VenueService.getVenueById(id);
    }

    const cacheKey = `venue_${id}`;
    const cachedData = this.cache.get<Venue>(cacheKey);
    if (cachedData) {
      console.log(`Using cached data for venue ${id}`);
      return cachedData;
    }

    try {
      if (id.startsWith('place_')) {
        const placeId = id.replace('place_', '');
        const details = await this.fetchPlaceDetails(placeId);
        
        if (details.status !== 'OK' || !details.result) {
          throw new Error(`Failed to fetch place details: ${details.status}`);
        }
        
        const category = this.determineCategoryFromTypes(details.result.types);
        const venue = await this.convertPlaceToVenue(details.result, category);
        
        this.cache.set(cacheKey, venue);
        
        return venue;
      } else {
        const allVenues = await this.getAllVenues();
        return allVenues.find(venue => venue.id === id);
      }
    } catch (error) {
      console.error('Error fetching venue details from Google Places API:', error);
      
      console.log('Using fallback data from venue-data-generator');
      const { VenueService } = await import('./venue-service');
      return VenueService.getVenueById(id);
    }
  }

  /**
   * Get a random venue
   */
  async getRandomVenue(): Promise<Venue> {
    const allVenues = await this.getAllVenues();
    const randomIndex = Math.floor(Math.random() * allVenues.length);
    return allVenues[randomIndex];
  }

  /**
   * Search venues by name or description
   */
  async searchVenues(query: string): Promise<Venue[]> {
    if (!this.hasApiKey()) {
      console.warn('Google Places API key is not set. Using fallback data.');
      const { VenueService } = await import('./venue-service');
      return VenueService.searchVenues(query);
    }

    const cacheKey = `search_${query}`;
    const cachedData = this.cache.get<Venue[]>(cacheKey);
    if (cachedData) {
      console.log(`Using cached data for search: ${query}`);
      return cachedData;
    }

    try {
      const response = await this.fetchTextSearch(query);
      
      if (response.status !== 'OK') {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const venues = await Promise.all(
        response.results.map(place => {
          const category = this.determineCategoryFromTypes(place.types);
          return this.convertPlaceToVenue(place, category);
        })
      );
      
      this.cache.set(cacheKey, venues);
      
      return venues;
    } catch (error) {
      console.error('Error searching venues from Google Places API:', error);
      
      console.log('Using fallback data from venue-data-generator');
      const { VenueService } = await import('./venue-service');
      return VenueService.searchVenues(query);
    }
  }

  /**
   * Fetch places from Google Places API via proxy
   */
  private async fetchPlaces(type: string, pageToken?: string): Promise<PlacesApiResponse> {
    const params = new URLSearchParams({
      location: `${this.config.location.lat},${this.config.location.lng}`,
      radius: this.config.radius.toString(),
      type,
      language: this.config.language
    });

    if (pageToken) {
      params.append('pagetoken', pageToken);
    }

    const response = await fetch(
      `${API_CONFIG.API_PROXY_BASE_URL}/nearby?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Fetch place details from Google Places API via proxy
   */
  private async fetchPlaceDetails(placeId: string): Promise<PlaceDetailsResponse> {
    const params = new URLSearchParams({
      place_id: placeId,
      language: this.config.language,
      fields: 'name,formatted_address,geometry,rating,photos,types,business_status,opening_hours,price_level,reviews,website,formatted_phone_number,url,editorial_summary'
    });

    const response = await fetch(
      `${API_CONFIG.API_PROXY_BASE_URL}/details/${placeId}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Fetch places using text search from Google Places API via proxy
   */
  private async fetchTextSearch(query: string): Promise<PlacesApiResponse> {
    const params = new URLSearchParams({
      query,
      location: `${this.config.location.lat},${this.config.location.lng}`,
      radius: this.config.radius.toString(),
      language: this.config.language
    });

    const response = await fetch(
      `${API_CONFIG.API_PROXY_BASE_URL}/textsearch?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Determine venue category from Google Places types
   */
  private determineCategoryFromTypes(types: string[]): string {
    for (const [category, placeTypes] of Object.entries(CATEGORY_MAPPING)) {
      for (const type of types) {
        if (placeTypes.includes(type)) {
          return category;
        }
      }
    }
    
    if (types.includes('restaurant') || types.includes('food')) {
      return 'bar';
    } else if (types.includes('store') || types.includes('shopping_mall')) {
      return 'thrift-store';
    } else if (types.includes('park') || types.includes('natural_feature')) {
      return 'nature-walk';
    } else if (types.includes('museum') || types.includes('art_gallery')) {
      return 'art-festival';
    } else {
      return 'bar'; // Default fallback
    }
  }

  /**
   * Convert Google Place to our Venue model
   */
  private async convertPlaceToVenue(place: PlaceResult | PlaceDetailsResult, category: string): Promise<Venue> {
    const id = `place_${place.place_id}`;
    
    const photoUrl = place.photos && place.photos.length > 0
      ? this.getPhotoUrl(place.photos[0].photo_reference)
      : this.getDefaultPhotoForCategory(category);
    
    const description = 'editorial_summary' in place && place.editorial_summary
      ? place.editorial_summary.overview
      : this.generateDescriptionForPlace(place, category);
    
    const baseVenue: Venue = {
      id,
      name: place.name,
      address: place.formatted_address || place.vicinity || '',
      description,
      imageUrl: photoUrl,
      rating: place.rating || 4.0,
      type: category,
      coordinates: {
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng
      }
    };
    
    switch (category) {
      case 'bar':
        return this.createBar(baseVenue, place);
      case 'coffee-shop':
        return this.createCoffeeShop(baseVenue, place);
      case 'art-festival':
        return this.createArtFestival(baseVenue, place);
      case 'comedy-venue':
        return this.createComedyVenue(baseVenue, place);
      case 'nature-walk':
        return this.createNatureWalk(baseVenue, place);
      case 'music-venue':
        return this.createMusicVenue(baseVenue, place);
      case 'thrift-store':
        return this.createThriftStore(baseVenue, place);
      case 'social-club':
        return this.createSocialClub(baseVenue, place);
      case 'sports-club':
        return this.createSportsClub(baseVenue, place);
      case 'club':
        return this.createClub(baseVenue, place);
      default:
        return baseVenue;
    }
  }

  /**
   * Get photo URL from Google Places API via proxy
   */
  private getPhotoUrl(photoReference: string): string {
    return `${API_CONFIG.API_PROXY_BASE_URL}/photo/${photoReference}?maxwidth=400`;
  }

  /**
   * Get default photo URL for a category
   */
  private getDefaultPhotoForCategory(category: string): string {
    const defaultPhotos: Record<string, string> = {
      'bar': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80',
      'coffee-shop': 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1178&q=80',
      'art-festival': 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
      'comedy-venue': 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?ixlib=rb-1.2.1&auto=format&fit=crop&w=1171&q=80',
      'nature-walk': 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-1.2.1&auto=format&fit=crop&w=1203&q=80',
      'music-venue': 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
      'thrift-store': 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
      'social-club': 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80',
      'sports-club': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
      'club': 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80'
    };
    
    return defaultPhotos[category] || defaultPhotos['bar'];
  }

  /**
   * Generate description for a place
   */
  private generateDescriptionForPlace(place: PlaceResult | PlaceDetailsResult, category: string): string {
    const descriptions: Record<string, string[]> = {
      'bar': [
        'A trendy bar offering craft cocktails and local beers.',
        'Popular spot for drinks with a relaxed atmosphere.',
        'Local favorite serving creative cocktails and bar food.',
        'Cozy bar with a great selection of spirits and beers.'
      ],
      'coffee-shop': [
        'Charming coffee shop known for quality espresso and pastries.',
        'Cozy cafe serving specialty coffee and light bites.',
        'Popular spot for coffee lovers with a relaxed atmosphere.',
        'Local coffee shop offering artisanal brews and comfortable seating.'
      ],
      'art-festival': [
        'Vibrant venue showcasing local and international art.',
        'Cultural center featuring rotating art exhibitions and events.',
        'Art space celebrating creativity with diverse exhibitions.',
        'Gallery space hosting art shows and community events.'
      ],
      'comedy-venue': [
        'Popular venue featuring stand-up comedy and improv shows.',
        'Comedy club showcasing local talent and touring comedians.',
        'Intimate venue known for hilarious comedy performances.',
        'Entertainment spot offering laughs with regular comedy nights.'
      ],
      'nature-walk': [
        'Beautiful natural area with scenic walking trails.',
        'Peaceful park offering trails through desert landscape.',
        'Nature preserve with wildlife viewing opportunities.',
        'Outdoor recreation area with hiking paths and natural beauty.'
      ],
      'music-venue': [
        'Live music venue hosting local and touring artists.',
        'Popular spot for concerts across various music genres.',
        'Intimate music venue known for great acoustics and performances.',
        'Entertainment venue featuring regular live music shows.'
      ],
      'thrift-store': [
        'Treasure trove of secondhand items at affordable prices.',
        'Popular thrift store with a diverse selection of pre-loved goods.',
        'Vintage and secondhand shop with unique finds.',
        'Community thrift store offering quality used merchandise.'
      ],
      'social-club': [
        'Community gathering space for social events and activities.',
        'Membership club offering social networking and events.',
        'Welcoming venue for making connections and enjoying social activities.',
        'Social space hosting regular community events and gatherings.'
      ],
      'sports-club': [
        'Athletic facility offering various sports and fitness activities.',
        'Sports center with courts, equipment, and training options.',
        'Fitness club with sports facilities and recreational programs.',
        'Community sports venue for athletes of all levels.'
      ],
      'club': [
        'Popular nightclub featuring DJ sets and dancing.',
        'Vibrant venue for nightlife with music and entertainment.',
        'Trendy club known for its energetic atmosphere and events.',
        'Nightlife destination with regular themed parties and events.'
      ]
    };
    
    const options = descriptions[category] || descriptions['bar'];
    return options[Math.floor(Math.random() * options.length)];
  }

  /**
   * Create a Bar venue from a place
   */
  private createBar(baseVenue: Venue, place: PlaceResult | PlaceDetailsResult): Bar {
    return {
      ...baseVenue,
      type: 'bar',
      specialties: this.generateBarSpecialties(),
      happyHour: this.generateHappyHour(),
      liveMusic: Math.random() > 0.5,
      cocktailMenu: Math.random() > 0.3
    };
  }

  /**
   * Create a CoffeeShop venue from a place
   */
  private createCoffeeShop(baseVenue: Venue, place: PlaceResult | PlaceDetailsResult): CoffeeShop {
    return {
      ...baseVenue,
      type: 'coffee-shop',
      specialties: this.generateCoffeeSpecialties(),
      roaster: Math.random() > 0.5 ? this.generateRoaster() : undefined,
      hasWifi: Math.random() > 0.2,
      foodMenu: Math.random() > 0.5
    };
  }

  /**
   * Create an ArtFestival venue from a place
   */
  private createArtFestival(baseVenue: Venue, place: PlaceResult | PlaceDetailsResult): ArtFestival {
    const currentYear = new Date().getFullYear();
    const startMonth = Math.floor(Math.random() * 12) + 1;
    const startDay = Math.floor(Math.random() * 28) + 1;
    const durationDays = Math.floor(Math.random() * 7) + 1;
    
    const startDate = new Date(currentYear, startMonth - 1, startDay);
    const endDate = new Date(currentYear, startMonth - 1, startDay + durationDays);
    
    return {
      ...baseVenue,
      type: 'art-festival',
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      artists: this.generateArtists(),
      admission: Math.random() > 0.5 ? `$${Math.floor(Math.random() * 20) + 5}` : 'Free',
      familyFriendly: Math.random() > 0.2
    };
  }

  /**
   * Create a ComedyVenue venue from a place
   */
  private createComedyVenue(baseVenue: Venue, place: PlaceResult | PlaceDetailsResult): ComedyVenue {
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const performanceDays: string[] = [];
    
    const numDays = Math.floor(Math.random() * 3) + 2;
    for (let i = 0; i < numDays; i++) {
      const day = weekdays[Math.floor(Math.random() * weekdays.length)];
      if (!performanceDays.includes(day)) {
        performanceDays.push(day);
      }
    }
    
    return {
      ...baseVenue,
      type: 'comedy-venue',
      performanceDays,
      featuredComedians: this.generateComedians(),
      ticketPrice: Math.random() > 0.2 ? `$${Math.floor(Math.random() * 40) + 10}` : undefined,
      ageRestriction: Math.random() > 0.5 ? '21+' : '18+'
    };
  }

  /**
   * Create a NatureWalk venue from a place
   */
  private createNatureWalk(baseVenue: Venue, place: PlaceResult | PlaceDetailsResult): NatureWalk {
    const difficulties = ['easy', 'moderate', 'difficult'] as const;
    const seasons = ['Spring', 'Summer', 'Fall', 'Winter', 'Year-round'];
    
    return {
      ...baseVenue,
      type: 'nature-walk',
      trailLength: `${(Math.random() * 9.5 + 0.5).toFixed(1)} miles`,
      difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
      features: this.generateNatureFeatures(),
      bestSeason: Math.random() > 0.3 ? seasons[Math.floor(Math.random() * seasons.length)] : undefined
    };
  }

  /**
   * Create a MusicVenue venue from a place
   */
  private createMusicVenue(baseVenue: Venue, place: PlaceResult | PlaceDetailsResult): MusicVenue {
    return {
      ...baseVenue,
      type: 'music-venue',
      genres: this.generateMusicGenres(),
      upcomingShows: this.generateUpcomingShows(),
      capacity: Math.random() > 0.3 ? Math.floor(Math.random() * 4950) + 50 : undefined,
      alcoholServed: Math.random() > 0.3
    };
  }

  /**
   * Create a ThriftStore venue from a place
   */
  private createThriftStore(baseVenue: Venue, place: PlaceResult | PlaceDetailsResult): ThriftStore {
    const priceRanges = ['Budget', 'Moderate', 'Upscale', 'Mixed'];
    
    return {
      ...baseVenue,
      type: 'thrift-store',
      specialties: this.generateThriftSpecialties(),
      priceRange: priceRanges[Math.floor(Math.random() * priceRanges.length)],
      charitySupported: Math.random() > 0.5 ? this.generateCharity() : undefined,
      hasVintageItems: Math.random() > 0.3
    };
  }

  /**
   * Create a SocialClub venue from a place
   */
  private createSocialClub(baseVenue: Venue, place: PlaceResult | PlaceDetailsResult): SocialClub {
    const ageGroups = ['All Ages', '18+', '21+', '30+', '40+', '50+', 'Seniors', 'Young Professionals'];
    const schedules = ['Weekly', 'Bi-weekly', 'Monthly', 'Varies by Event'];
    
    return {
      ...baseVenue,
      type: 'social-club',
      activities: this.generateSocialActivities(),
      membershipFee: Math.random() > 0.5 ? Math.floor(Math.random() * 200) : undefined,
      ageGroup: Math.random() > 0.3 ? ageGroups[Math.floor(Math.random() * ageGroups.length)] : undefined,
      meetingSchedule: Math.random() > 0.3 ? schedules[Math.floor(Math.random() * schedules.length)] : undefined,
      membershipRequired: Math.random() > 0.5
    };
  }

  /**
   * Create a SportsClub venue from a place
   */
  private createSportsClub(baseVenue: Venue, place: PlaceResult | PlaceDetailsResult): SportsClub {
    return {
      ...baseVenue,
      type: 'sports-club',
      sports: this.generateSports(),
      facilities: this.generateSportsFacilities(),
      membershipFee: Math.random() > 0.3 ? Math.floor(Math.random() * 480) + 20 : undefined,
      leagues: Math.random() > 0.5 ? this.generateLeagues() : undefined,
      // openToPublic property doesn't exist in SportsClub interface
      equipmentRental: Math.random() > 0.5
    };
  }

  /**
   * Create a Club venue from a place
   */
  private createClub(baseVenue: Venue, place: PlaceResult | PlaceDetailsResult): Club {
    const coverCharges = ['Free', '$5', '$10', '$15', '$20', 'Varies by night', 'Free before 10PM'];
    const dressCodes = ['Casual', 'Smart Casual', 'Upscale', 'Dressy', 'No athletic wear', 'No shorts or sandals'];
    const ageRestrictions = ['18+', '21+', '25+'];
    
    return {
      ...baseVenue,
      type: 'club',
      musicGenres: this.generateClubMusicGenres(),
      coverCharge: Math.random() > 0.3 ? coverCharges[Math.floor(Math.random() * coverCharges.length)] : undefined,
      dressCode: Math.random() > 0.5 ? dressCodes[Math.floor(Math.random() * dressCodes.length)] : undefined,
      specialEvents: this.generateClubEvents(),
      ageRestriction: ageRestrictions[Math.floor(Math.random() * ageRestrictions.length)]
    };
  }

  private generateBarSpecialties(): string[] {
    const options = [
      'Craft Beer', 'Cocktails', 'Whiskey', 'Wine', 'Tequila', 'Rum', 'Vodka', 'Gin',
      'Local Brews', 'Import Selection', 'Craft Cocktails', 'Signature Drinks', 'Happy Hour Specials',
      'Bar Food', 'Tapas', 'Appetizers', 'Burgers', 'Wings', 'Tacos', 'Pizza'
    ];
    
    return this.getRandomElements(options, 3);
  }

  private generateHappyHour(): string | undefined {
    if (Math.random() > 0.2) {
      const startHour = Math.floor(Math.random() * 5) + 2; // 2PM to 6PM
      const endHour = startHour + Math.floor(Math.random() * 3) + 1; // 1-3 hours later
      return `${startHour}PM-${endHour}PM`;
    }
    return undefined;
  }

  private generateCoffeeSpecialties(): string[] {
    const options = [
      'Espresso', 'Pour Over', 'Cold Brew', 'Nitro Coffee', 'French Press', 'Drip Coffee',
      'Lattes', 'Cappuccinos', 'Americanos', 'Macchiatos', 'Flat Whites', 'Mochas',
      'Pastries', 'Breakfast Sandwiches', 'Avocado Toast', 'Bagels', 'Muffins', 'Scones'
    ];
    
    return this.getRandomElements(options, 3);
  }

  private generateRoaster(): string {
    const options = ['In-house', 'Local', 'Specialty', 'Organic', 'Fair Trade'];
    return options[Math.floor(Math.random() * options.length)];
  }

  private generateArtists(): string[] {
    const options = [
      'Local Painters', 'Sculptors', 'Photographers', 'Mixed Media Artists', 'Digital Artists',
      'Jewelry Makers', 'Ceramic Artists', 'Glass Blowers', 'Woodworkers', 'Textile Artists',
      'Street Artists', 'Performance Artists', 'Installation Artists', 'Printmakers', 'Illustrators'
    ];
    
    return this.getRandomElements(options, 3);
  }

  private generateComedians(): string[] {
    const options = [
      'Local Talent', 'Regional Comedians', 'National Headliners', 'Comedy Troupes', 'Improv Groups',
      'Up-and-Coming Comics', 'Veteran Performers', 'Comedy Contest Winners', 'Special Guests', 'Celebrity Appearances'
    ];
    
    return this.getRandomElements(options, 2);
  }

  private generateNatureFeatures(): string[] {
    const options = [
      'Desert Landscape', 'Mountain Views', 'Wildlife Viewing', 'Bird Watching', 'Wildflowers',
      'Lake Views', 'River Access', 'Waterfall', 'Rock Formations', 'Cactus Gardens',
      'Interpretive Signs', 'Picnic Areas', 'Shade Structures', 'Benches', 'Restrooms'
    ];
    
    return this.getRandomElements(options, 4);
  }

  private generateMusicGenres(): string[] {
    const options = [
      'Rock', 'Pop', 'Jazz', 'Blues', 'Country', 'Classical', 'Electronic', 'Hip Hop', 'R&B',
      'Folk', 'Indie', 'Alternative', 'Metal', 'Punk', 'Reggae', 'Latin', 'World Music'
    ];
    
    return this.getRandomElements(options, 3);
  }

  private generateUpcomingShows(): string[] {
    const artistNames = [
      'The Desert Drifters', 'Sonoran Sound', 'Cactus Bloom', 'Valley Vibes', 'Arizona Rhythm',
      'Phoenix Rising', 'Tempe Beat', 'Chandler Collective', 'Gilbert Groove', 'Mesa Melodies'
    ];
    
    const shows: string[] = [];
    const numShows = Math.floor(Math.random() * 3) + 2; // 2-4 shows
    
    for (let i = 0; i < numShows; i++) {
      const month = Math.floor(Math.random() * 12) + 1;
      const day = Math.floor(Math.random() * 28) + 1;
      const artist = artistNames[Math.floor(Math.random() * artistNames.length)];
      shows.push(`${artist} - ${month}/${day}`);
    }
    
    return shows;
  }

  private generateThriftSpecialties(): string[] {
    const options = [
      'Vintage Clothing', 'Designer Brands', 'Furniture', 'Home Decor', 'Books',
      'Records & Music', 'Electronics', 'Jewelry', 'Collectibles', 'Antiques',
      'Children\'s Items', 'Sporting Goods', 'Art & Crafts', 'Kitchen Items', 'Tools'
    ];
    
    return this.getRandomElements(options, 3);
  }

  private generateCharity(): string {
    const options = [
      'Local Animal Shelter', 'Homeless Services', 'Youth Programs', 'Veterans Support',
      'Education Initiatives', 'Medical Research', 'Environmental Causes', 'Community Development',
      'Disaster Relief', 'Food Banks', 'Women\'s Shelters', 'Children\'s Hospital'
    ];
    
    return options[Math.floor(Math.random() * options.length)];
  }

  private generateSocialActivities(): string[] {
    const options = [
      'Book Discussions', 'Game Nights', 'Dinner Outings', 'Movie Screenings', 'Hiking Trips',
      'Wine Tastings', 'Cooking Classes', 'Art Workshops', 'Volunteer Events', 'Fitness Activities',
      'Travel Groups', 'Language Exchange', 'Professional Networking', 'Public Speaking', 'Photography Walks'
    ];
    
    return this.getRandomElements(options, 4);
  }

  private generateSports(): string[] {
    const options = [
      'Tennis', 'Soccer', 'Basketball', 'Running', 'Golf', 'Volleyball', 'Hiking', 'Cycling',
      'Swimming', 'Pickleball', 'Softball', 'Baseball', 'Football', 'Yoga', 'Fitness Training'
    ];
    
    return this.getRandomElements(options, 3);
  }

  private generateSportsFacilities(): string[] {
    const options = [
      'Indoor Courts', 'Outdoor Fields', 'Swimming Pool', 'Fitness Center', 'Running Track',
      'Tennis Courts', 'Basketball Courts', 'Golf Course', 'Climbing Wall', 'Yoga Studio',
      'Weight Room', 'Locker Rooms', 'Showers', 'Pro Shop', 'Cafe/Restaurant'
    ];
    
    return this.getRandomElements(options, 4);
  }

  private generateLeagues(): string[] {
    const options = [
      'Recreational League', 'Competitive League', 'Youth League', 'Adult League', 'Senior League',
      'Co-ed League', 'Men\'s League', 'Women\'s League', 'Corporate League', 'Tournament Play'
    ];
    
    return this.getRandomElements(options, 2);
  }

  private generateClubMusicGenres(): string[] {
    const options = [
      'EDM', 'Hip Hop', 'Top 40', 'Latin', 'House', 'Techno', 'R&B', 'Reggaeton',
      'Pop', 'Rock', 'Country', '80s/90s', 'Throwbacks', 'Live Music', 'Jazz'
    ];
    
    return this.getRandomElements(options, 3);
  }

  private generateClubEvents(): string[] {
    const options = [
      'Ladies Night', 'Industry Night', 'College Night', 'Theme Parties', 'Celebrity DJs',
      'Live Performances', 'Karaoke Night', 'Salsa Night', 'Glow Party', 'Foam Party',
      'VIP Bottle Service', 'Birthday Specials', 'Holiday Events', 'Release Parties', 'Rooftop Events'
    ];
    
    return this.getRandomElements(options, 3);
  }

  private getRandomElements<T>(array: T[], count: number): T[] {
    const result: T[] = [];
    const arrayCopy = [...array];
    
    for (let i = 0; i < count && arrayCopy.length > 0; i++) {
      const index = Math.floor(Math.random() * arrayCopy.length);
      result.push(arrayCopy[index]);
      arrayCopy.splice(index, 1);
    }
    
    return result;
  }
}

export const googlePlacesService = new GooglePlacesService();
