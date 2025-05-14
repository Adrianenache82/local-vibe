import { Venue } from './venue';

export interface NatureWalk extends Venue {
  type: 'nature-walk';
  trailLength: string;
  difficulty: 'easy' | 'moderate' | 'difficult';
  features: string[];
  bestSeason?: string;
}
