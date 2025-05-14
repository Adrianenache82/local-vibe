import { Venue } from './venue';

export interface SportsClub extends Venue {
  type: 'sports-club';
  sports: string[];
  membershipFee?: number;
  facilities: string[];
  leagues?: string[];
  equipmentRental: boolean;
}
