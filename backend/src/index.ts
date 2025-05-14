import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { placesRouter } from './routes/places';
import { API_CONFIG } from './config/api-config';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/places', placesRouter);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`API Key configured: ${API_CONFIG.GOOGLE_PLACES_API_KEY ? 'Yes' : 'No'}`);
});
