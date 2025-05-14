export interface Venue {
  id: string;
  name: string;
  address: string;
  description: string;
  imageUrl: string;
  rating: number;
  type: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  distance?: number; // Optional distance from user's location
}
