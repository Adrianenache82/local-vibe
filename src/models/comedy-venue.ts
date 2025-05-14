import { Venue } from './venue';

export interface ComedyVenue extends Venue {
  type: 'comedy-venue';
  performanceDays: string[];
  featuredComedians: string[];
  ticketPrice?: string;
  ageRestriction?: string;
}
