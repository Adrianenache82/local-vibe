import { Venue } from './venue';

export interface NatureWalk extends Venue {
  type: 'nature-walk';
  difficulty: string;
  length: number; // in miles
  features: string[];
  bestSeason?: string;
}
