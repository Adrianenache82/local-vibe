import { Venue } from './venue';

export interface ArtFestival extends Venue {
  type: 'art-festival';
  startDate: string;
  endDate: string;
  artists: string[];
  admission?: string;
  familyFriendly: boolean;
}
