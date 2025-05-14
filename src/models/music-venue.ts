import { Venue } from './venue';

export interface MusicVenue extends Venue {
  type: 'music-venue';
  genres: string[];
  capacity: number;
  upcomingShows?: string[];
  ticketPrice?: number;
}
