import { Venue } from './venue';

export interface ThriftStore extends Venue {
  type: 'thrift-store';
  specialties: string[];
  priceRange: string;
  charitySupported?: string;
  hasVintageItems: boolean;
}
