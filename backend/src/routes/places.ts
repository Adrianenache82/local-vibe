import express from 'express';
import axios from 'axios';
import { API_CONFIG } from '../config/api-config';

const router = express.Router();
const GOOGLE_PLACES_API_KEY = API_CONFIG.GOOGLE_PLACES_API_KEY;
const GOOGLE_PLACES_BASE_URL = 'https://maps.googleapis.com/maps/api/place';

const validateApiKey = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!GOOGLE_PLACES_API_KEY) {
    return res.status(500).json({ 
      error: 'API key not configured',
      message: 'Google Places API key is not configured on the server'
    });
  }
  next();
};

router.use(validateApiKey as express.RequestHandler);

router.get('/nearby', async (req, res) => {
  try {
    const { location, radius, type, keyword, pagetoken } = req.query;
    
    const params: any = {
      key: GOOGLE_PLACES_API_KEY,
      location: location || '33.3062,-111.8413', // Default to Chandler, AZ
      radius: radius || 20000
    };
    
    if (type) params.type = type;
    if (keyword) params.keyword = keyword;
    if (pagetoken) params.pagetoken = pagetoken;
    
    const response = await axios.get(`${GOOGLE_PLACES_BASE_URL}/nearbysearch/json`, { params });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching nearby places:', error);
    res.status(500).json({ 
      error: 'Failed to fetch nearby places',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

router.get('/details/:placeId', async (req, res) => {
  try {
    const { placeId } = req.params;
    const { fields } = req.query;
    
    const params: any = {
      key: GOOGLE_PLACES_API_KEY,
      place_id: placeId
    };
    
    if (fields) params.fields = fields;
    
    const response = await axios.get(`${GOOGLE_PLACES_BASE_URL}/details/json`, { params });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching place details:', error);
    res.status(500).json({ 
      error: 'Failed to fetch place details',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

router.get('/textsearch', async (req, res) => {
  try {
    const { query, location, radius, type } = req.query;
    
    const params: any = {
      key: GOOGLE_PLACES_API_KEY,
      query
    };
    
    if (location) params.location = location;
    if (radius) params.radius = radius;
    if (type) params.type = type;
    
    const response = await axios.get(`${GOOGLE_PLACES_BASE_URL}/textsearch/json`, { params });
    res.json(response.data);
  } catch (error) {
    console.error('Error performing text search:', error);
    res.status(500).json({ 
      error: 'Failed to perform text search',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

router.get('/photo/:reference', async (req, res) => {
  try {
    const { reference } = req.params;
    const { maxwidth, maxheight } = req.query;
    
    const params: any = {
      key: GOOGLE_PLACES_API_KEY,
      photoreference: reference,
      maxwidth: maxwidth || 400
    };
    
    if (maxheight) params.maxheight = maxheight;
    
    const photoUrl = `${GOOGLE_PLACES_BASE_URL}/photo?${new URLSearchParams(params).toString()}`;
    res.redirect(photoUrl);
  } catch (error) {
    console.error('Error fetching photo:', error);
    res.status(500).json({ 
      error: 'Failed to fetch photo',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export { router as placesRouter };
