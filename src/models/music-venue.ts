import { Venue } from './venue';

export interface MusicVenue extends Venue {
  type: 'music-venue';
  genres: string[];
  upcomingShows: string[];
  capacity?: number;
  alcoholServed: boolean;
}
