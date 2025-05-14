import { Venue } from './venue';

export interface CoffeeShop extends Venue {
  type: 'coffee-shop';
  specialties: string[];
  roaster?: string;
  hasWifi: boolean;
  foodMenu?: boolean;
}
