import { Venue } from './venue';

export interface Bar extends Venue {
  type: 'bar';
  happyHour?: {
    start: string;
    end: string;
  };
  specialties: string[];
}
