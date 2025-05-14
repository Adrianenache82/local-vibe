/**
 * API Configuration
 * Contains API keys and configuration for external services
 */

import dotenv from 'dotenv';

dotenv.config();

export const API_CONFIG = {
  GOOGLE_PLACES_API_KEY: process.env.GOOGLE_PLACES_API_KEY || '',
  GOOGLE_PLACES_LOCATION: {
    lat: 33.3062, // Chandler, AZ coordinates
    lng: -111.8413
  },
  GOOGLE_PLACES_RADIUS: 20000, // 20km radius to include surrounding areas
  GOOGLE_PLACES_LANGUAGE: 'en'
};
