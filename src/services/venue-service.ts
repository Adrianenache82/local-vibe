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

import { GooglePlacesService } from './google-places-service';
import { API_CONFIG } from '../config/api-config';

import { 
  generateBars,
  generateCoffeeShops,
  generateArtFestivals,
  generateComedyVenues,
  generateNatureWalks,
  generateMusicVenues,
  generateThriftStores,
  generateSocialClubs,
  generateSportsClubs,
  generateClubs
} from '../utils/venue-generators';

function calculateStringSimilarity(str1: string, str2: string): number {
  if (str1 === str2) return 1.0;
  if (str1.length === 0 || str2.length === 0) return 0.0;
  
  const lengthDiff = Math.abs(str1.length - str2.length) / Math.max(str1.length, str2.length);
  if (lengthDiff > 0.3) return 0.0; // If length difference is more than 30%, consider them different
  
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();
  
  const m = s1.length;
  const n = s2.length;
  const d: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 0; i <= m; i++) d[i][0] = i;
  for (let j = 0; j <= n; j++) d[0][j] = j;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1,      // deletion
        d[i][j - 1] + 1,      // insertion
        d[i - 1][j - 1] + cost // substitution
      );
    }
  }
  
  return 1 - d[m][n] / Math.max(m, n);
}

function isDuplicate(venue1: Venue, venue2: Venue): boolean {
  if (venue1.type !== venue2.type) return false;
  
  const nameSimilarity = calculateStringSimilarity(venue1.name, venue2.name);
  if (nameSimilarity > 0.9) return true;
  
  const addressSimilarity = calculateStringSimilarity(venue1.address, venue2.address);
  if (addressSimilarity > 0.9) return true;
  
  const latDiff = Math.abs(venue1.coordinates.latitude - venue2.coordinates.latitude);
  const lngDiff = Math.abs(venue1.coordinates.longitude - venue2.coordinates.longitude);
  if (latDiff < 0.0001 && lngDiff < 0.0001) return true;
  
  return false;
}

const googlePlacesService = new GooglePlacesService({
  apiKey: API_CONFIG.GOOGLE_PLACES_API_KEY,
  location: API_CONFIG.GOOGLE_PLACES_LOCATION,
  radius: API_CONFIG.GOOGLE_PLACES_RADIUS,
  language: API_CONFIG.GOOGLE_PLACES_LANGUAGE
});

export const VenueService = {
  /**
   * Get all venues from all categories
   */
  getAllVenues: async (): Promise<Venue[]> => {
    console.log('Fetching venues from Google Places API...');
    
    try {
      if (googlePlacesService.hasApiKey()) {
        const venues = await googlePlacesService.getAllVenues();
        console.log('Successfully fetched venues from Google Places API:', venues.length);
        
        const categoryCounters: Record<string, number> = {};
        venues.forEach(venue => {
          categoryCounters[venue.type] = (categoryCounters[venue.type] || 0) + 1;
        });
        
        console.log('Category counts from API:', categoryCounters);
        
        const needsSupplementation = Object.entries(categoryCounters).some(
          ([category, count]) => count < 50
        );
        
        if (!needsSupplementation) {
          return venues;
        }
        
        console.log('Supplementing API data with generated venues to ensure 50+ per category');
        return await supplementWithGeneratedVenues(venues, categoryCounters);
      }
    } catch (error) {
      console.error('Error fetching venues from Google Places API:', error);
      console.log('Falling back to generated venues');
    }
    
    return await getGeneratedVenues();
  },
  
  /**
   * Get venues by category
   */
  getVenuesByCategory: async (category: string): Promise<Venue[]> => {
    try {
      if (googlePlacesService.hasApiKey()) {
        const venues = await googlePlacesService.getVenuesByCategory(category);
        
        if (venues.length >= 50) {
          return venues;
        }
        
        console.log(`Only ${venues.length} ${category} venues from API, supplementing with generated data`);
        
        const generatedVenues = await getGeneratedVenuesByCategory(category, 50 - venues.length);
        return [...venues, ...generatedVenues];
      }
    } catch (error) {
      console.error(`Error fetching ${category} venues from Google Places API:`, error);
      console.log('Falling back to generated venues');
    }
    
    return await getGeneratedVenuesByCategory(category);
  },
  
  /**
   * Get venue by ID
   */
  getVenueById: async (id: string): Promise<Venue | undefined> => {
    try {
      if (googlePlacesService.hasApiKey()) {
        const venue = await googlePlacesService.getVenueById(id);
        if (venue) {
          return venue;
        }
      }
    } catch (error) {
      console.error('Error fetching venue by ID from Google Places API:', error);
    }
    
    const allVenues = await VenueService.getAllVenues();
    return allVenues.find(venue => venue.id === id);
  },
  
  /**
   * Get random venue
   */
  getRandomVenue: async (): Promise<Venue> => {
    try {
      if (googlePlacesService.hasApiKey()) {
        return await googlePlacesService.getRandomVenue();
      }
    } catch (error) {
      console.error('Error fetching random venue from Google Places API:', error);
    }
    
    const allVenues = await VenueService.getAllVenues();
    const randomIndex = Math.floor(Math.random() * allVenues.length);
    return allVenues[randomIndex];
  },
  
  /**
   * Search venues by name or description
   */
  searchVenues: async (query: string): Promise<Venue[]> => {
    try {
      if (googlePlacesService.hasApiKey()) {
        return await googlePlacesService.searchVenues(query);
      }
    } catch (error) {
      console.error('Error searching venues from Google Places API:', error);
    }
    
    const allVenues = await VenueService.getAllVenues();
    const lowerQuery = query.toLowerCase();
    
    return allVenues.filter(venue => 
      venue.name.toLowerCase().includes(lowerQuery) || 
      venue.description.toLowerCase().includes(lowerQuery)
    );
  }
};

/**
 * Get generated venues for all categories
 */
async function getGeneratedVenues(): Promise<Venue[]> {
  console.log('Generating venues...');
  
  const bars = await generateBars();
  const coffeeShops = await generateCoffeeShops();
  const artFestivals = await generateArtFestivals();
  const comedyVenues = await generateComedyVenues();
  const natureWalks = await generateNatureWalks();
  const musicVenues = await generateMusicVenues();
  const thriftStores = await generateThriftStores();
  const socialClubs = await generateSocialClubs();
  const sportsClubs = await generateSportsClubs();
  const clubs = await generateClubs();
  
  const allVenues = [
    ...bars,
    ...coffeeShops,
    ...artFestivals,
    ...comedyVenues,
    ...natureWalks,
    ...musicVenues,
    ...thriftStores,
    ...socialClubs,
    ...sportsClubs,
    ...clubs
  ];
  
  const uniqueVenues: Venue[] = [];
  const categoryCounters: Record<string, number> = {
    'bar': 0,
    'coffee-shop': 0,
    'art-festival': 0,
    'comedy-venue': 0,
    'nature-walk': 0,
    'music-venue': 0,
    'thrift-store': 0,
    'social-club': 0,
    'sports-club': 0,
    'club': 0
  };
  
  for (const venue of allVenues) {
    if (categoryCounters[venue.type] < 50) {
      uniqueVenues.push(venue);
      categoryCounters[venue.type]++;
      continue;
    }
    
    const isDup = uniqueVenues.some(existingVenue => isDuplicate(existingVenue, venue));
    if (!isDup) {
      uniqueVenues.push(venue);
      categoryCounters[venue.type]++;
    }
  }
  
  console.log('Generated unique venues:', uniqueVenues.length);
  console.log('Category counts:', categoryCounters);
  
  return uniqueVenues;
}

/**
 * Get generated venues for a specific category
 */
async function getGeneratedVenuesByCategory(category: string, count = 50): Promise<Venue[]> {
  let venues: Venue[] = [];
  
  switch (category) {
    case 'bar':
      venues = await generateBars();
      break;
    case 'coffee-shop':
      venues = await generateCoffeeShops();
      break;
    case 'art-festival':
      venues = await generateArtFestivals();
      break;
    case 'comedy-venue':
      venues = await generateComedyVenues();
      break;
    case 'nature-walk':
      venues = await generateNatureWalks();
      break;
    case 'music-venue':
      venues = await generateMusicVenues();
      break;
    case 'thrift-store':
      venues = await generateThriftStores();
      break;
    case 'social-club':
      venues = await generateSocialClubs();
      break;
    case 'sports-club':
      venues = await generateSportsClubs();
      break;
    case 'club':
      venues = await generateClubs();
      break;
    default:
      console.warn(`Unknown category: ${category}`);
      return [];
  }
  
  const uniqueVenues: Venue[] = [];
  
  for (const venue of venues) {
    if (uniqueVenues.length >= count) break;
    
    const isDup = uniqueVenues.some(existingVenue => isDuplicate(existingVenue, venue));
    if (!isDup) {
      uniqueVenues.push(venue);
    }
  }
  
  return uniqueVenues;
}

/**
 * Supplement API venues with generated venues to ensure 50+ per category
 */
async function supplementWithGeneratedVenues(
  apiVenues: Venue[],
  categoryCounts: Record<string, number>
): Promise<Venue[]> {
  const result = [...apiVenues];
  
  for (const [category, count] of Object.entries(categoryCounts)) {
    if (count < 50) {
      const neededCount = 50 - count;
      console.log(`Generating ${neededCount} additional ${category} venues`);
      
      const additionalVenues = await getGeneratedVenuesByCategory(category, neededCount);
      result.push(...additionalVenues);
    }
  }
  
  const allCategories = [
    'bar', 'coffee-shop', 'art-festival', 'comedy-venue', 'nature-walk',
    'music-venue', 'thrift-store', 'social-club', 'sports-club', 'club'
  ];
  
  for (const category of allCategories) {
    if (!categoryCounts[category]) {
      console.log(`Category ${category} not found in API results, generating 50 venues`);
      const venues = await getGeneratedVenuesByCategory(category, 50);
      result.push(...venues);
    }
  }
  
  return result;
}
