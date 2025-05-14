import { Venue } from './venue';

export interface Bar extends Venue {
  type: 'bar';
  specialties: string[];
  happyHour?: string;
  liveMusic?: boolean;
  cocktailMenu?: boolean;
}
