import { Venue } from './venue';

export interface Club extends Venue {
  type: 'club';
  category: string;
  activities: string[];
  membershipFee?: number;
  schedule?: string;
  requirements?: string;
  amenities: string[];
}
