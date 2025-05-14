import { Venue } from './venue';

export interface SportsClub extends Venue {
  type: 'sports-club';
  sports: string[];
  facilities: string[];
  membershipFee?: number;
  leagues?: string[];
  openToPublic: boolean;
  equipmentRental?: boolean;
}
