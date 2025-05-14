import { Venue } from './venue';

export interface Club extends Venue {
  type: 'club';
  musicGenres: string[];
  coverCharge?: string;
  dressCode?: string;
  specialEvents: string[];
  ageRestriction: string;
}
