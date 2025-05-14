import { Venue } from './venue';

export interface ComedyVenue extends Venue {
  type: 'comedy-venue';
  performanceDays: string[];
  comedians: string[];
  ticketPrice?: number;
  ageRestriction?: string;
}
