/**
 * Venue Generators
 * 
 * This file provides venue generation functions for different venue types.
 * Used as a fallback when Google Places API is unavailable or rate-limited.
 */

import { v4 as uuidv4 } from 'uuid';
import { Bar } from '../models/bar';
import { CoffeeShop } from '../models/coffee-shop';
import { ArtFestival } from '../models/art-festival';
import { ComedyVenue } from '../models/comedy-venue';
import { NatureWalk } from '../models/nature-walk';
import { MusicVenue } from '../models/music-venue';
import { ThriftStore } from '../models/thrift-store';
import { SocialClub } from '../models/social-club';
import { SportsClub } from '../models/sports-club';
import { Club } from '../models/club';

const CHANDLER_COORDINATES = {
  latitude: 33.3062,
  longitude: -111.8413
};

function generateRandomCoordinate() {
  const latVariance = (Math.random() - 0.5) * 0.2; // ~10km
  const lngVariance = (Math.random() - 0.5) * 0.2; // ~10km
  
  return {
    latitude: CHANDLER_COORDINATES.latitude + latVariance,
    longitude: CHANDLER_COORDINATES.longitude + lngVariance
  };
}

function generateRandomAddress() {
  const streetNumbers = ['123', '456', '789', '1001', '2500', '3750', '4200', '5100'];
  const streetNames = ['Arizona Ave', 'Chandler Blvd', 'Ray Rd', 'Alma School Rd', 'Dobson Rd', 'McQueen Rd', 'Gilbert Rd', 'Cooper Rd'];
  const streetTypes = ['St', 'Ave', 'Blvd', 'Dr', 'Ln', 'Way', 'Pl', 'Ct'];
  
  const number = streetNumbers[Math.floor(Math.random() * streetNumbers.length)];
  const name = streetNames[Math.floor(Math.random() * streetNames.length)];
  const type = streetTypes[Math.floor(Math.random() * streetTypes.length)];
  
  return `${number} ${name}, Chandler, AZ 85225`;
}

function generateRandomRating() {
  return Math.round((3 + Math.random() * 2) * 10) / 10;
}

export async function generateBars(): Promise<Bar[]> {
  const bars: Bar[] = [];
  
  for (let i = 0; i < 60; i++) {
    const id = uuidv4();
    const name = `Chandler Bar ${i + 1}`;
    const address = generateRandomAddress();
    const coordinates = generateRandomCoordinate();
    const rating = generateRandomRating();
    
    bars.push({
      id,
      name,
      address,
      coordinates,
      description: `A popular bar in Chandler offering craft beers and cocktails.`,
      imageUrl: `https://source.unsplash.com/random/300x200/?bar`,
      rating,
      type: 'bar',
      specialties: ['Craft Beer', 'Cocktails', 'Wine'],
      happyHour: '4PM - 7PM',
      liveMusic: Math.random() > 0.5,
      cocktailMenu: Math.random() > 0.3
    });
  }
  
  return bars;
}

export async function generateCoffeeShops(): Promise<CoffeeShop[]> {
  const coffeeShops: CoffeeShop[] = [];
  
  for (let i = 0; i < 60; i++) {
    const id = uuidv4();
    const name = `Chandler Coffee ${i + 1}`;
    const address = generateRandomAddress();
    const coordinates = generateRandomCoordinate();
    const rating = generateRandomRating();
    
    coffeeShops.push({
      id,
      name,
      address,
      coordinates,
      description: `A cozy coffee shop in Chandler serving specialty coffee.`,
      imageUrl: `https://source.unsplash.com/random/300x200/?coffee`,
      rating,
      type: 'coffee-shop',
      specialties: ['Espresso', 'Pour Over', 'Cold Brew'],
      roaster: Math.random() > 0.5 ? 'Local Roaster' : undefined,
      hasWifi: Math.random() > 0.2,
      foodMenu: Math.random() > 0.4
    });
  }
  
  return coffeeShops;
}

export async function generateArtFestivals(): Promise<ArtFestival[]> {
  const artFestivals: ArtFestival[] = [];
  
  for (let i = 0; i < 60; i++) {
    const id = uuidv4();
    const name = `Chandler Art Festival ${i + 1}`;
    const address = generateRandomAddress();
    const coordinates = generateRandomCoordinate();
    const rating = generateRandomRating();
    
    const currentDate = new Date();
    const startMonth = Math.floor(Math.random() * 12) + 1;
    const startDay = Math.floor(Math.random() * 28) + 1;
    const endDay = startDay + Math.floor(Math.random() * 3) + 1;
    
    artFestivals.push({
      id,
      name,
      address,
      coordinates,
      description: `An art festival in Chandler showcasing local artists.`,
      imageUrl: `https://source.unsplash.com/random/300x200/?art-festival`,
      rating,
      type: 'art-festival',
      startDate: `${startMonth}/${startDay}/2025`,
      endDate: `${startMonth}/${endDay}/2025`,
      artists: ['Local Artist 1', 'Local Artist 2', 'Local Artist 3'],
      admission: Math.random() > 0.5 ? '$5' : 'Free',
      familyFriendly: Math.random() > 0.2
    });
  }
  
  return artFestivals;
}

export async function generateComedyVenues(): Promise<ComedyVenue[]> {
  const comedyVenues: ComedyVenue[] = [];
  
  for (let i = 0; i < 60; i++) {
    const id = uuidv4();
    const name = `Chandler Comedy Club ${i + 1}`;
    const address = generateRandomAddress();
    const coordinates = generateRandomCoordinate();
    const rating = generateRandomRating();
    
    comedyVenues.push({
      id,
      name,
      address,
      coordinates,
      description: `A comedy club in Chandler featuring local and touring comedians.`,
      imageUrl: `https://source.unsplash.com/random/300x200/?comedy`,
      rating,
      type: 'comedy-venue',
      performanceDays: ['Friday', 'Saturday'],
      featuredComedians: ['Comedian 1', 'Comedian 2', 'Comedian 3'],
      ticketPrice: `$${Math.floor(Math.random() * 20) + 10}`,
      ageRestriction: Math.random() > 0.5 ? '21+' : '18+'
    });
  }
  
  return comedyVenues;
}

export async function generateNatureWalks(): Promise<NatureWalk[]> {
  const natureWalks: NatureWalk[] = [];
  
  for (let i = 0; i < 60; i++) {
    const id = uuidv4();
    const name = `Chandler Nature Trail ${i + 1}`;
    const address = generateRandomAddress();
    const coordinates = generateRandomCoordinate();
    const rating = generateRandomRating();
    
    const difficulties = ['easy', 'moderate', 'difficult'] as const;
    const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    
    natureWalks.push({
      id,
      name,
      address,
      coordinates,
      description: `A scenic nature trail in Chandler with beautiful desert views.`,
      imageUrl: `https://source.unsplash.com/random/300x200/?nature-trail`,
      rating,
      type: 'nature-walk',
      trailLength: `${(Math.random() * 5 + 0.5).toFixed(1)} miles`,
      difficulty,
      features: ['Desert Plants', 'Wildlife Viewing', 'Scenic Views'],
      bestSeason: Math.random() > 0.5 ? 'Spring' : 'Fall'
    });
  }
  
  return natureWalks;
}

export async function generateMusicVenues(): Promise<MusicVenue[]> {
  const musicVenues: MusicVenue[] = [];
  
  for (let i = 0; i < 60; i++) {
    const id = uuidv4();
    const name = `Chandler Music Venue ${i + 1}`;
    const address = generateRandomAddress();
    const coordinates = generateRandomCoordinate();
    const rating = generateRandomRating();
    
    musicVenues.push({
      id,
      name,
      address,
      coordinates,
      description: `A music venue in Chandler hosting live performances.`,
      imageUrl: `https://source.unsplash.com/random/300x200/?music-venue`,
      rating,
      type: 'music-venue',
      genres: ['Rock', 'Jazz', 'Blues'],
      upcomingShows: ['Band 1 - 5/15', 'Band 2 - 5/22', 'Band 3 - 5/29'],
      capacity: Math.floor(Math.random() * 500) + 100,
      alcoholServed: Math.random() > 0.3
    });
  }
  
  return musicVenues;
}

export async function generateThriftStores(): Promise<ThriftStore[]> {
  const thriftStores: ThriftStore[] = [];
  
  for (let i = 0; i < 60; i++) {
    const id = uuidv4();
    const name = `Chandler Thrift Store ${i + 1}`;
    const address = generateRandomAddress();
    const coordinates = generateRandomCoordinate();
    const rating = generateRandomRating();
    
    thriftStores.push({
      id,
      name,
      address,
      coordinates,
      description: `A thrift store in Chandler offering unique second-hand items.`,
      imageUrl: `https://source.unsplash.com/random/300x200/?thrift-store`,
      rating,
      type: 'thrift-store',
      specialties: ['Clothing', 'Furniture', 'Books'],
      priceRange: '$-$$',
      charitySupported: Math.random() > 0.5 ? 'Local Charity' : undefined,
      hasVintageItems: Math.random() > 0.4
    });
  }
  
  return thriftStores;
}

export async function generateSocialClubs(): Promise<SocialClub[]> {
  const socialClubs: SocialClub[] = [];
  
  for (let i = 0; i < 60; i++) {
    const id = uuidv4();
    const name = `Chandler Social Club ${i + 1}`;
    const address = generateRandomAddress();
    const coordinates = generateRandomCoordinate();
    const rating = generateRandomRating();
    
    socialClubs.push({
      id,
      name,
      address,
      coordinates,
      description: `A social club in Chandler for meeting new people and making friends.`,
      imageUrl: `https://source.unsplash.com/random/300x200/?social-club`,
      rating,
      type: 'social-club',
      activities: ['Game Nights', 'Book Club', 'Social Mixers'],
      membershipFee: Math.random() > 0.5 ? Math.floor(Math.random() * 100) + 50 : undefined,
      ageGroup: Math.random() > 0.5 ? '21+' : 'All Ages',
      meetingSchedule: 'Weekly',
      membershipRequired: Math.random() > 0.5
    });
  }
  
  return socialClubs;
}

export async function generateSportsClubs(): Promise<SportsClub[]> {
  const sportsClubs: SportsClub[] = [];
  
  for (let i = 0; i < 60; i++) {
    const id = uuidv4();
    const name = `Chandler Sports Club ${i + 1}`;
    const address = generateRandomAddress();
    const coordinates = generateRandomCoordinate();
    const rating = generateRandomRating();
    
    sportsClubs.push({
      id,
      name,
      address,
      coordinates,
      description: `A sports club in Chandler offering various athletic activities.`,
      imageUrl: `https://source.unsplash.com/random/300x200/?sports-club`,
      rating,
      type: 'sports-club',
      sports: ['Basketball', 'Tennis', 'Swimming'],
      membershipFee: Math.floor(Math.random() * 200) + 50,
      facilities: ['Courts', 'Pool', 'Gym'],
      leagues: Math.random() > 0.5 ? ['Adult League', 'Youth League'] : undefined,
      equipmentRental: Math.random() > 0.5
    });
  }
  
  return sportsClubs;
}

export async function generateClubs(): Promise<Club[]> {
  const clubs: Club[] = [];
  
  for (let i = 0; i < 60; i++) {
    const id = uuidv4();
    const name = `Chandler Nightclub ${i + 1}`;
    const address = generateRandomAddress();
    const coordinates = generateRandomCoordinate();
    const rating = generateRandomRating();
    
    clubs.push({
      id,
      name,
      address,
      coordinates,
      description: `A nightclub in Chandler with great music and atmosphere.`,
      imageUrl: `https://source.unsplash.com/random/300x200/?nightclub`,
      rating,
      type: 'club',
      musicGenres: ['EDM', 'Hip Hop', 'Top 40'],
      coverCharge: `$${Math.floor(Math.random() * 20) + 5}`,
      dressCode: Math.random() > 0.5 ? 'Casual' : 'Upscale',
      specialEvents: ['Ladies Night', 'DJ Nights', 'Theme Parties'],
      ageRestriction: '21+'
    });
  }
  
  return clubs;
}
