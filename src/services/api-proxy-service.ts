/**
 * API Proxy Service
 * Handles communication with the backend proxy for Google Places API
 */

import { API_CONFIG } from '../config/api-config';
import { Venue } from '../models/venue';
import { VenueService } from './venue-service';

const PROXY_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://local-vibe-api.fly.dev/api/places' // Production URL (to be updated)
  : 'http://localhost:3000/api/places'; // Development URL

interface PlacesApiResponse {
  status: string;
  results: any[];
  next_page_token?: string;
}

/**
 * API Proxy Service
 * Provides methods to interact with the backend proxy for Google Places API
 */
export class ApiProxyService {
  /**
   * Check if the backend proxy is available
   */
  static async isProxyAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${PROXY_BASE_URL.replace('/api/places', '')}/health`);
      const data = await response.json();
      return data.status === 'ok';
    } catch (error) {
      console.error('Backend proxy not available:', error);
      return false;
    }
  }

  /**
   * Search for nearby places
   */
  static async searchNearbyPlaces(
    type: string,
    keyword?: string,
    location?: string,
    radius?: number
  ): Promise<any[]> {
    try {
      const params = new URLSearchParams();
      
      if (location) {
        params.append('location', location);
      } else {
        params.append('location', `${API_CONFIG.GOOGLE_PLACES_LOCATION.lat},${API_CONFIG.GOOGLE_PLACES_LOCATION.lng}`);
      }
      
      params.append('radius', radius?.toString() || API_CONFIG.GOOGLE_PLACES_RADIUS.toString());
      params.append('type', type);
      
      if (keyword) {
        params.append('keyword', keyword);
      }
      
      const response = await fetch(`${PROXY_BASE_URL}/nearby?${params.toString()}`);
      const data: PlacesApiResponse = await response.json();
      
      if (data.status === 'OK') {
        return data.results;
      } else {
        console.error('Error searching nearby places:', data.status);
        return [];
      }
    } catch (error) {
      console.error('Error searching nearby places:', error);
      return [];
    }
  }

  /**
   * Get place details
   */
  static async getPlaceDetails(placeId: string): Promise<any> {
    try {
      const response = await fetch(`${PROXY_BASE_URL}/details/${placeId}`);
      const data = await response.json();
      
      if (data.status === 'OK') {
        return data.result;
      } else {
        console.error('Error getting place details:', data.status);
        return null;
      }
    } catch (error) {
      console.error('Error getting place details:', error);
      return null;
    }
  }

  /**
   * Text search for places
   */
  static async textSearchPlaces(
    query: string,
    type?: string,
    location?: string,
    radius?: number
  ): Promise<any[]> {
    try {
      const params = new URLSearchParams();
      params.append('query', query);
      
      if (type) {
        params.append('type', type);
      }
      
      if (location) {
        params.append('location', location);
      } else {
        params.append('location', `${API_CONFIG.GOOGLE_PLACES_LOCATION.lat},${API_CONFIG.GOOGLE_PLACES_LOCATION.lng}`);
      }
      
      if (radius) {
        params.append('radius', radius.toString());
      }
      
      const response = await fetch(`${PROXY_BASE_URL}/textsearch?${params.toString()}`);
      const data: PlacesApiResponse = await response.json();
      
      if (data.status === 'OK') {
        return data.results;
      } else {
        console.error('Error text searching places:', data.status);
        return [];
      }
    } catch (error) {
      console.error('Error text searching places:', error);
      return [];
    }
  }

  /**
   * Get photo URL
   */
  static getPhotoUrl(photoReference: string, maxWidth: number = 400): string {
    return `${PROXY_BASE_URL}/photo/${photoReference}?maxwidth=${maxWidth}`;
  }

  /**
   * Convert Google Places API result to Venue
   */
  static convertToVenue(place: any): Venue {
    const venue: Venue = {
      id: place.place_id || `place-${Math.random().toString(36).substring(2, 10)}`,
      name: place.name || 'Unknown Venue',
      address: place.vicinity || place.formatted_address || 'No address available',
      description: place.editorial_summary?.overview || 'No description available',
      imageUrl: place.photos && place.photos.length > 0
        ? ApiProxyService.getPhotoUrl(place.photos[0].photo_reference)
        : 'https://via.placeholder.com/400x300?text=No+Image',
      rating: place.rating || 0,
      type: ApiProxyService.mapPlaceTypeToVenueType(place.types),
      coordinates: {
        latitude: place.geometry?.location?.lat || 0,
        longitude: place.geometry?.location?.lng || 0
      }
    };
    
    return venue;
  }

  /**
   * Map Google Places API types to venue types
   */
  static mapPlaceTypeToVenueType(types: string[] = []): string {
    if (!types || types.length === 0) return 'other';
    
    if (types.includes('bar') || types.includes('night_club')) return 'bar';
    if (types.includes('cafe')) return 'coffee-shop';
    if (types.includes('art_gallery') || types.includes('museum')) return 'art-festival';
    if (types.includes('park') || types.includes('natural_feature')) return 'nature-walk';
    if (types.includes('movie_theater') || types.includes('performing_arts_theater')) return 'comedy-venue';
    if (types.includes('clothing_store') || types.includes('store')) return 'thrift-store';
    if (types.includes('stadium') || types.includes('gym')) return 'sports-club';
    if (types.includes('restaurant') || types.includes('food')) return 'restaurant';
    
    return 'other';
  }

  /**
   * Get all venues from the proxy
   * Falls back to VenueService if proxy is not available
   */
  static async getAllVenues(): Promise<Venue[]> {
    try {
      const isAvailable = await ApiProxyService.isProxyAvailable();
      
      if (!isAvailable) {
        console.log('Proxy not available, falling back to VenueService');
        return VenueService.getAllVenues();
      }
      
      const barPromise = ApiProxyService.searchNearbyPlaces('bar');
      const cafePromise = ApiProxyService.searchNearbyPlaces('cafe');
      const artPromise = ApiProxyService.searchNearbyPlaces('art_gallery');
      const parkPromise = ApiProxyService.searchNearbyPlaces('park');
      const theaterPromise = ApiProxyService.searchNearbyPlaces('movie_theater');
      const storePromise = ApiProxyService.searchNearbyPlaces('clothing_store');
      const gymPromise = ApiProxyService.searchNearbyPlaces('gym');
      
      const [bars, cafes, arts, parks, theaters, stores, gyms] = await Promise.all([
        barPromise, cafePromise, artPromise, parkPromise, theaterPromise, storePromise, gymPromise
      ]);
      
      const venues: Venue[] = [
        ...bars.map(place => ApiProxyService.convertToVenue(place)),
        ...cafes.map(place => ApiProxyService.convertToVenue(place)),
        ...arts.map(place => ApiProxyService.convertToVenue(place)),
        ...parks.map(place => ApiProxyService.convertToVenue(place)),
        ...theaters.map(place => ApiProxyService.convertToVenue(place)),
        ...stores.map(place => ApiProxyService.convertToVenue(place)),
        ...gyms.map(place => ApiProxyService.convertToVenue(place))
      ];
      
      const uniqueVenues = venues.filter((venue, index, self) => 
        index === self.findIndex(v => v.id === venue.id)
      );
      
      if (uniqueVenues.length < 50) {
        console.log('Not enough venues from proxy, supplementing with VenueService');
        const generatedVenues = await VenueService.getAllVenues();
        
        const combinedVenues = [...uniqueVenues, ...generatedVenues];
        return combinedVenues.filter((venue, index, self) => 
          index === self.findIndex(v => v.id === venue.id)
        );
      }
      
      return uniqueVenues;
    } catch (error) {
      console.error('Error getting all venues from proxy:', error);
      return VenueService.getAllVenues();
    }
  }

  /**
   * Get venues by type from the proxy
   * Falls back to VenueService if proxy is not available
   */
  static async getVenuesByType(type: string): Promise<Venue[]> {
    try {
      const isAvailable = await ApiProxyService.isProxyAvailable();
      
      if (!isAvailable) {
        console.log('Proxy not available, falling back to VenueService');
        return VenueService.getVenuesByCategory(type);
      }
      
      let googlePlacesType = '';
      let keyword = '';
      
      switch (type) {
        case 'bar':
          googlePlacesType = 'bar';
          break;
        case 'coffee-shop':
          googlePlacesType = 'cafe';
          break;
        case 'art-festival':
          googlePlacesType = 'art_gallery';
          keyword = 'art';
          break;
        case 'nature-walk':
          googlePlacesType = 'park';
          keyword = 'trail';
          break;
        case 'comedy-venue':
          googlePlacesType = 'movie_theater';
          keyword = 'comedy';
          break;
        case 'thrift-store':
          googlePlacesType = 'clothing_store';
          keyword = 'thrift';
          break;
        case 'sports-club':
          googlePlacesType = 'gym';
          break;
        case 'music-venue':
          googlePlacesType = 'night_club';
          keyword = 'music';
          break;
        case 'social-club':
          googlePlacesType = 'point_of_interest';
          keyword = 'social club';
          break;
        case 'club':
          googlePlacesType = 'night_club';
          break;
        default:
          googlePlacesType = 'point_of_interest';
      }
      
      const places = await ApiProxyService.searchNearbyPlaces(googlePlacesType, keyword);
      
      const venues = places.map(place => ApiProxyService.convertToVenue(place));
      
      if (venues.length < 50) {
        console.log(`Not enough ${type} venues from proxy, supplementing with VenueService`);
        const generatedVenues = await VenueService.getVenuesByCategory(type);
        
        const combinedVenues = [...venues, ...generatedVenues];
        return combinedVenues.filter((venue, index, self) => 
          index === self.findIndex(v => v.id === venue.id)
        ).slice(0, 100); // Limit to 100 venues
      }
      
      return venues;
    } catch (error) {
      console.error(`Error getting ${type} venues from proxy:`, error);
      return VenueService.getVenuesByCategory(type);
    }
  }

  /**
   * Search venues by query
   */
  static async searchVenues(query: string): Promise<Venue[]> {
    try {
      const isAvailable = await ApiProxyService.isProxyAvailable();
      
      if (!isAvailable) {
        console.log('Proxy not available, falling back to VenueService');
        return VenueService.searchVenues(query);
      }
      
      const places = await ApiProxyService.textSearchPlaces(query);
      
      const venues = places.map(place => ApiProxyService.convertToVenue(place));
      
      return venues;
    } catch (error) {
      console.error('Error searching venues from proxy:', error);
      return VenueService.searchVenues(query);
    }
  }

  /**
   * Get a random venue
   */
  static async getRandomVenue(): Promise<Venue | null> {
    try {
      const venues = await ApiProxyService.getAllVenues();
      
      if (venues.length === 0) {
        return null;
      }
      
      const randomIndex = Math.floor(Math.random() * venues.length);
      return venues[randomIndex];
    } catch (error) {
      console.error('Error getting random venue from proxy:', error);
      return VenueService.getRandomVenue();
    }
  }
}
