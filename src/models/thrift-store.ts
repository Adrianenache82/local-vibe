import { Venue } from './venue';

export interface ThriftStore extends Venue {
  type: 'thrift-store';
  specialties: string[];
  priceRange: string;
  donationDropOff: boolean;
  openingHours?: {
    open: string;
    close: string;
  };
}
