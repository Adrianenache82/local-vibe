/**
 * API Configuration Example
 * 
 * This is a template file for api-config.ts
 * Copy this file to api-config.ts and add your API key
 */

const getApiKey = (): string => {
  if (typeof process !== 'undefined' && process.env && process.env.GOOGLE_PLACES_API_KEY) {
    return process.env.GOOGLE_PLACES_API_KEY;
  }
  
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedKey = window.localStorage.getItem('GOOGLE_PLACES_API_KEY');
    if (storedKey) return storedKey;
  }
  
  return ''; // Fallback to empty string
};

export const API_CONFIG = {
  GOOGLE_PLACES_API_KEY: getApiKey(),
  GOOGLE_PLACES_LOCATION: {
    lat: 33.3062, // Chandler, AZ coordinates
    lng: -111.8413
  },
  GOOGLE_PLACES_RADIUS: 20000, // 20km radius to include surrounding areas
  GOOGLE_PLACES_LANGUAGE: 'en'
};
