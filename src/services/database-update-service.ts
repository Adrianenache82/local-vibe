import { Venue } from '../models/venue';
import { GooglePlacesService } from './google-places-service';
import { API_CONFIG } from '../config/api-config';

interface DatabaseUpdateStatus {
  lastUpdated: string; // ISO date string
  nextUpdateDue: string; // ISO date string
  updateInProgress: boolean;
  lastUpdateStatus: 'success' | 'failed' | 'never';
}

const DEFAULT_UPDATE_STATUS: DatabaseUpdateStatus = {
  lastUpdated: 'never',
  nextUpdateDue: new Date().toISOString(),
  updateInProgress: false,
  lastUpdateStatus: 'never'
};

const UPDATE_STATUS_KEY = 'local_vibe_db_update_status';
const CACHE_EXPIRY_DAYS = 7; // Cache expires after 7 days

let cachedVenues: Venue[] | null = null;
let lastUpdateTimestamp: string | null = null;

const googlePlacesService = new GooglePlacesService({
  apiKey: API_CONFIG.GOOGLE_PLACES_API_KEY,
  location: API_CONFIG.GOOGLE_PLACES_LOCATION,
  radius: API_CONFIG.GOOGLE_PLACES_RADIUS,
  language: API_CONFIG.GOOGLE_PLACES_LANGUAGE
});

/**
 * Database Update Service
 * Handles automatic weekly updates of venue data from Google Places API
 */
export const DatabaseUpdateService = {
  /**
   * Initialize the database update service
   * This should be called when the app starts
   */
  initialize: async (): Promise<void> => {
    console.log('Initializing database update service with Google Places API...');
    
    const updateStatus = DatabaseUpdateService.getUpdateStatus();
    const now = new Date();
    const nextUpdateDue = new Date(updateStatus.nextUpdateDue);
    
    if (now >= nextUpdateDue && !updateStatus.updateInProgress) {
      console.log('Database update is due, starting update process...');
      await DatabaseUpdateService.updateDatabase();
    } else {
      console.log('Database is up to date. Next update due:', nextUpdateDue.toLocaleString());
    }
    
    setInterval(() => {
      const currentStatus = DatabaseUpdateService.getUpdateStatus();
      const currentTime = new Date();
      const nextUpdate = new Date(currentStatus.nextUpdateDue);
      
      if (currentTime >= nextUpdate && !currentStatus.updateInProgress) {
        DatabaseUpdateService.updateDatabase();
      }
    }, 3600000); // Check every hour
  },
  
  /**
   * Get the current update status from local storage
   */
  getUpdateStatus: (): DatabaseUpdateStatus => {
    const storedStatus = localStorage.getItem(UPDATE_STATUS_KEY);
    if (!storedStatus) {
      return DEFAULT_UPDATE_STATUS;
    }
    
    try {
      return JSON.parse(storedStatus) as DatabaseUpdateStatus;
    } catch (error) {
      console.error('Error parsing update status:', error);
      return DEFAULT_UPDATE_STATUS;
    }
  },
  
  /**
   * Save the update status to local storage
   */
  saveUpdateStatus: (status: DatabaseUpdateStatus): void => {
    localStorage.setItem(UPDATE_STATUS_KEY, JSON.stringify(status));
  },
  
  /**
   * Update the venue database
   * Fetches new data from Google Places API and updates in-memory cache
   */
  updateDatabase: async (): Promise<boolean> => {
    console.log('Starting database update process using Google Places API...');
    
    const currentStatus = DatabaseUpdateService.getUpdateStatus();
    const updatingStatus: DatabaseUpdateStatus = {
      ...currentStatus,
      updateInProgress: true
    };
    DatabaseUpdateService.saveUpdateStatus(updatingStatus);
    
    try {
      const { venues, timestamp } = await DatabaseUpdateService.fetchVenueData();
      cachedVenues = venues;
      lastUpdateTimestamp = timestamp;
      
      const now = new Date();
      const nextUpdateDue = new Date(now);
      nextUpdateDue.setDate(nextUpdateDue.getDate() + CACHE_EXPIRY_DAYS);
      
      const updatedStatus: DatabaseUpdateStatus = {
        lastUpdated: now.toISOString(),
        nextUpdateDue: nextUpdateDue.toISOString(),
        updateInProgress: false,
        lastUpdateStatus: 'success'
      };
      DatabaseUpdateService.saveUpdateStatus(updatedStatus);
      
      window.dispatchEvent(new CustomEvent('database-updated'));
      
      console.log('Database update completed successfully. Next update due:', nextUpdateDue.toLocaleString());
      console.log('Updated venue count:', venues.length);
      return true;
    } catch (error) {
      console.error('Error updating database:', error);
      
      const failedStatus: DatabaseUpdateStatus = {
        ...currentStatus,
        updateInProgress: false,
        lastUpdateStatus: 'failed'
      };
      DatabaseUpdateService.saveUpdateStatus(failedStatus);
      
      return false;
    }
  },
  
  /**
   * Fetch venue data from Google Places API
   */
  fetchVenueData: async (): Promise<{ venues: Venue[], timestamp: string }> => {
    console.log('Fetching venue data from Google Places API...');
    
    try {
      if (googlePlacesService.hasApiKey()) {
        const venues = await googlePlacesService.getAllVenues();
        console.log('Successfully fetched venues from Google Places API:', venues.length);
        
        return {
          venues,
          timestamp: new Date().toISOString()
        };
      } else {
        throw new Error('Google Places API key not configured');
      }
    } catch (error) {
      console.error('Error fetching from Google Places API, falling back to venue-service:', error);
      
      const { VenueService } = await import('./venue-service');
      const venues = await VenueService.getAllVenues();
      
      return {
        venues,
        timestamp: new Date().toISOString()
      };
    }
  },
  
  /**
   * Get all venues from the database
   * This will use the in-memory cache if available, otherwise fetch from Google Places API
   */
  getAllVenues: async (): Promise<Venue[]> => {
    if (cachedVenues) {
      console.log('Returning venues from in-memory cache, count:', cachedVenues.length);
      return cachedVenues;
    }
    
    try {
      if (googlePlacesService.hasApiKey()) {
        const venues = await googlePlacesService.getAllVenues();
        cachedVenues = venues;
        console.log('Fetched venues from Google Places API, count:', venues.length);
        return venues;
      }
    } catch (error) {
      console.error('Error fetching from Google Places API, falling back to venue-service:', error);
    }
    
    const { VenueService } = await import('./venue-service');
    const venues = await VenueService.getAllVenues();
    
    cachedVenues = venues;
    console.log('Fetched venues from VenueService fallback, count:', venues.length);
    
    return venues;
  },
  
  /**
   * Force an immediate database update
   * This can be used for manual updates
   */
  forceUpdate: async (): Promise<boolean> => {
    return DatabaseUpdateService.updateDatabase();
  },
  
  /**
   * Get the last update timestamp
   */
  getLastUpdateTime: (): string => {
    if (lastUpdateTimestamp) {
      return lastUpdateTimestamp;
    }
    const status = DatabaseUpdateService.getUpdateStatus();
    return status.lastUpdated;
  },
  
  /**
   * Clear the venue cache
   * This can be used to force a fresh fetch from the API
   */
  clearCache: (): void => {
    cachedVenues = null;
    lastUpdateTimestamp = null;
    console.log('Venue cache cleared');
  }
};
