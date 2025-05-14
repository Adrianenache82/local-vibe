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
import { generateVenueName, generateAddress, getRealAddress, generateCoordinates } from './venue-name-generator';

export const generateAdditionalVenues = () => {
  const additionalVenues: (Bar | CoffeeShop | ArtFestival | ComedyVenue | NatureWalk | MusicVenue | ThriftStore | SocialClub | SportsClub | Club)[] = [];
  
  for (let i = 0; i < 50; i++) {
    additionalVenues.push(generateBar(i + 100));
  }
  
  for (let i = 0; i < 50; i++) {
    additionalVenues.push(generateCoffeeShop(i + 200));
  }
  
  for (let i = 0; i < 50; i++) {
    additionalVenues.push(generateArtFestival(i + 300));
  }
  
  for (let i = 0; i < 50; i++) {
    additionalVenues.push(generateComedyVenue(i + 400));
  }
  
  for (let i = 0; i < 50; i++) {
    additionalVenues.push(generateNatureWalk(i + 500));
  }
  
  for (let i = 0; i < 50; i++) {
    additionalVenues.push(generateMusicVenue(i + 600));
  }
  
  for (let i = 0; i < 50; i++) {
    additionalVenues.push(generateThriftStore(i + 700));
  }
  
  for (let i = 0; i < 50; i++) {
    additionalVenues.push(generateSocialClub(i + 800));
  }
  
  for (let i = 0; i < 50; i++) {
    additionalVenues.push(generateSportsClub(i + 900));
  }
  
  for (let i = 0; i < 50; i++) {
    additionalVenues.push(generateClub(i + 1000));
  }
  
  return additionalVenues;
};

const generateBar = (id: number): Bar => {
  const coordinates = generateCoordinates(id);
  
  const realBarImages = [
    "https://images.unsplash.com/photo-1600628421066-f6bda6a7b976?q=80&w=2000&auto=format&fit=crop", // The Perch Brewery - Authentic style image
    "https://images.unsplash.com/photo-1559526642-c3f001ea68ee?q=80&w=2000&auto=format&fit=crop", // SanTan Brewing - Authentic style image
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2000&auto=format&fit=crop", // The Ostrich - Authentic style image
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2000&auto=format&fit=crop", // Bourbon Jacks - Authentic style image
    "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=2000&auto=format&fit=crop", // Murphy's Law Irish Pub - Authentic style image
    "https://images.unsplash.com/photo-1546622891-02c72c1537b6?q=80&w=2000&auto=format&fit=crop"  // OHSO Brewery - Authentic style image
  ];
  
  return {
    id: id.toString(),
    type: 'bar',
    name: generateVenueName('bar', id),
    address: id < 5 ? getRealAddress('bar', id) : generateAddress(id),
    description: 'Local brewery with craft beers, cocktails, and a relaxed atmosphere.',
    imageUrl: realBarImages[id % realBarImages.length],
    rating: 4.0 + Math.random(),
    coordinates,
    happyHour: {
      start: '15:00',
      end: '18:00'
    },
    specialties: ['Craft Beer', 'Cocktails', 'Bar Food']
  };
};

const generateCoffeeShop = (id: number): CoffeeShop => {
  const coordinates = generateCoordinates(id);
  
  const realCoffeeShopImages = [
    "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2000&auto=format&fit=crop", // Peixoto Coffee Roasters - Authentic style image
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop", // Sip Coffee & Beer House - Authentic style image
    "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=2000&auto=format&fit=crop", // Press Coffee Roasters - Authentic style image
    "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=2000&auto=format&fit=crop", // Mythical Coffee - Authentic style image
    "https://images.unsplash.com/photo-1600714480856-dc99b28892eb?q=80&w=2000&auto=format&fit=crop"  // Bergie's Coffee Roast House - Authentic style image
  ];
  
  return {
    id: id.toString(),
    type: 'coffee-shop',
    name: generateVenueName('coffee-shop', id),
    address: id < 5 ? getRealAddress('coffee-shop', id) : generateAddress(id),
    description: 'Cozy coffee shop with specialty drinks and fresh pastries.',
    imageUrl: realCoffeeShopImages[id % realCoffeeShopImages.length],
    rating: 4.0 + Math.random(),
    coordinates,
    specialties: ['Specialty Coffee', 'Pastries', 'Breakfast'],
    hasWifi: true
  };
};

const generateArtFestival = (id: number): ArtFestival => {
  const startDate = new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 3) + 1);
  
  const coordinates = generateCoordinates(id);
  
  const realArtFestivalImages = [
    "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=2000&auto=format&fit=crop", // Chandler Art Walk - Authentic style image
    "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?q=80&w=2000&auto=format&fit=crop", // Chandler Craft Spirits Festival - Authentic style image
    "https://images.unsplash.com/photo-1578950435899-d1c1bf932b1d?q=80&w=2000&auto=format&fit=crop", // Gilbert Art Walk - Authentic style image
    "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2000&auto=format&fit=crop"  // Tempe Festival of the Arts - Authentic style image
  ];
  
  return {
    id: id.toString(),
    type: 'art-festival',
    name: generateVenueName('art-festival', id),
    address: id < 5 ? getRealAddress('art-festival', id) : generateAddress(id),
    description: 'Annual arts festival featuring local artists, live music, and food vendors.',
    imageUrl: realArtFestivalImages[id % realArtFestivalImages.length],
    rating: 4.0 + Math.random(),
    coordinates,
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    artists: ['Local Artists', 'Regional Artisans', 'Student Showcase'],
    ticketPrice: Math.random() > 0.5 ? Math.floor(Math.random() * 20) + 5 : 0
  };
};

const generateComedyVenue = (id: number): ComedyVenue => {
  const coordinates = generateCoordinates(id);
  
  const realComedyVenueImages = [
    "https://images.unsplash.com/photo-1527224857830-43a7acc85260?q=80&w=2000&auto=format&fit=crop", // Tempe Improv - Authentic style image
    "https://images.unsplash.com/photo-1603190287605-e6ade32fa852?q=80&w=2000&auto=format&fit=crop", // Stand Up Live Phoenix - Authentic style image
    "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=80&w=2000&auto=format&fit=crop", // House of Comedy Arizona - Authentic style image
    "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2000&auto=format&fit=crop"  // The Comedy Spot - Authentic style image
  ];
  
  return {
    id: id.toString(),
    type: 'comedy-venue',
    name: generateVenueName('comedy-venue', id),
    address: id < 5 ? getRealAddress('comedy-venue', id) : generateAddress(id),
    description: 'Comedy club featuring local and touring comedians with full bar service.',
    imageUrl: realComedyVenueImages[id % realComedyVenueImages.length],
    rating: 4.0 + Math.random(),
    coordinates,
    performanceDays: ['Friday', 'Saturday'],
    comedians: ['Local Talent', 'Regional Comics', 'National Headliners'],
    ticketPrice: Math.floor(Math.random() * 30) + 15,
    ageRestriction: Math.random() > 0.5 ? '21+' : '18+'
  };
};

const generateNatureWalk = (id: number): NatureWalk => {
  const coordinates = generateCoordinates(id);
  
  const realNatureWalkImages = [
    "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2000&auto=format&fit=crop", // Veterans Oasis Park - Authentic style image
    "https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=2000&auto=format&fit=crop", // Paseo Vista Recreation Area - Authentic style image
    "https://images.unsplash.com/photo-1588392382834-a891154bca4d?q=80&w=2000&auto=format&fit=crop", // Desert Breeze Park - Authentic style image
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000&auto=format&fit=crop"  // Riparian Preserve at Water Ranch - Authentic style image
  ];
  
  return {
    id: id.toString(),
    type: 'nature-walk',
    name: generateVenueName('nature-walk', id),
    address: id < 5 ? getRealAddress('nature-walk', id) : generateAddress(id),
    description: 'Scenic desert trail with native plants and wildlife viewing opportunities.',
    imageUrl: realNatureWalkImages[id % realNatureWalkImages.length],
    rating: 4.0 + Math.random(),
    coordinates,
    difficulty: ['Easy', 'Moderate', 'Difficult'][Math.floor(Math.random() * 3)],
    length: Math.floor(Math.random() * 10) + 1,
    features: ['Desert Landscape', 'Wildlife Viewing', 'Scenic Views'],
    bestSeason: ['Spring', 'Fall', 'Winter', 'Year-round'][Math.floor(Math.random() * 4)]
  };
};

const generateMusicVenue = (id: number): MusicVenue => {
  const coordinates = generateCoordinates(id);
  
  const realMusicVenueImages = [
    "https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=2000&auto=format&fit=crop", // Chandler Center for the Arts - Authentic style image
    "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2000&auto=format&fit=crop", // The Marquee Theatre - Authentic style image
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2000&auto=format&fit=crop", // Rawhide Event Center - Authentic style image
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2000&auto=format&fit=crop"  // Crescent Ballroom - Authentic style image
  ];
  
  return {
    id: id.toString(),
    type: 'music-venue',
    name: generateVenueName('music-venue', id),
    address: id < 5 ? getRealAddress('music-venue', id) : generateAddress(id),
    description: 'Live music venue featuring local and touring bands across various genres.',
    imageUrl: realMusicVenueImages[id % realMusicVenueImages.length],
    rating: 4.0 + Math.random(),
    coordinates,
    genres: ['Rock', 'Jazz', 'Hip-Hop', 'Country', 'Electronic'],
    capacity: Math.floor(Math.random() * 1000) + 200,
    upcomingShows: ['Local Band Night - June 15', 'Jazz Ensemble - July 3', 'Tribute Band - August 12'],
    ticketPrice: Math.floor(Math.random() * 40) + 10
  };
};

const generateThriftStore = (id: number): ThriftStore => {
  const coordinates = generateCoordinates(id);
  
  const realThriftStoreImages = [
    "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2000&auto=format&fit=crop", // Goodwill Chandler - Authentic style image
    "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=2000&auto=format&fit=crop", // Savers Chandler - Authentic style image
    "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=2000&auto=format&fit=crop", // Uptown Cheapskate - Authentic style image
    "https://images.unsplash.com/photo-1551232864-3f0890e580d9?q=80&w=2000&auto=format&fit=crop"  // Plato's Closet - Authentic style image
  ];
  
  return {
    id: id.toString(),
    type: 'thrift-store',
    name: generateVenueName('thrift-store', id),
    address: id < 5 ? getRealAddress('thrift-store', id) : generateAddress(id),
    description: 'Thrift store offering clothing, furniture, and household items at affordable prices.',
    imageUrl: realThriftStoreImages[id % realThriftStoreImages.length],
    rating: 4.0 + Math.random(),
    coordinates,
    specialties: ['Clothing', 'Furniture', 'Home Decor', 'Books'],
    priceRange: ['Low', 'Medium', 'Low to Medium'][Math.floor(Math.random() * 3)],
    donationDropOff: Math.random() > 0.3,
    openingHours: {
      open: '9:00 AM',
      close: '6:00 PM'
    }
  };
};

const generateSocialClub = (id: number): SocialClub => {
  const coordinates = generateCoordinates(id);
  
  const realSocialClubImages = [
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2000&auto=format&fit=crop", // Chandler Chamber of Commerce - Authentic style image
    "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2000&auto=format&fit=crop", // Chandler Rotary Club - Authentic style image
    "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=2000&auto=format&fit=crop", // Chandler Elks Lodge - Authentic style image
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2000&auto=format&fit=crop"  // Chandler Toastmasters - Authentic style image
  ];
  
  return {
    id: id.toString(),
    type: 'social-club',
    name: generateVenueName('social-club', id),
    address: id < 5 ? getRealAddress('social-club', id) : generateAddress(id),
    description: 'Social club for networking, events, and community building.',
    imageUrl: realSocialClubImages[id % realSocialClubImages.length],
    rating: 4.0 + Math.random(),
    coordinates,
    activities: ['Networking Events', 'Social Gatherings', 'Community Service', 'Workshops'],
    membershipFee: Math.random() > 0.3 ? Math.floor(Math.random() * 100) + 50 : 0,
    ageGroup: ['All Ages', 'Adults', '21+', 'Seniors', 'Youth'][Math.floor(Math.random() * 5)],
    meetingSchedule: 'Monthly on the first Tuesday',
    membershipRequired: Math.random() > 0.5
  };
};

const generateSportsClub = (id: number): SportsClub => {
  const coordinates = generateCoordinates(id);
  
  const realSportsClubImages = [
    "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=2000&auto=format&fit=crop", // Chandler Tennis Center - Authentic style image
    "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2000&auto=format&fit=crop", // Tumbleweed Recreation Center - Authentic style image
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop", // Chandler YMCA - Authentic style image
    "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2000&auto=format&fit=crop"  // EoS Fitness Chandler - Authentic style image
  ];
  
  return {
    id: id.toString(),
    type: 'sports-club',
    name: generateVenueName('sports-club', id),
    address: id < 5 ? getRealAddress('sports-club', id) : generateAddress(id),
    description: 'Sports club offering facilities and leagues for various sports and activities.',
    imageUrl: realSportsClubImages[id % realSportsClubImages.length],
    rating: 4.0 + Math.random(),
    coordinates,
    sports: ['Tennis', 'Basketball', 'Swimming', 'Volleyball', 'Fitness'],
    facilities: ['Courts', 'Pool', 'Gym', 'Locker Rooms', 'Pro Shop'],
    membershipFee: Math.floor(Math.random() * 150) + 50,
    leagues: ['Adult Recreational', 'Youth League', 'Senior League', 'Competitive League'],
    openToPublic: Math.random() > 0.7,
    equipmentRental: Math.random() > 0.3
  };
};

const generateClub = (id: number): Club => {
  const coordinates = generateCoordinates(id);
  
  const realClubImages = [
    "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?q=80&w=2000&auto=format&fit=crop", // Chandler Chess Club - Authentic style image
    "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=2000&auto=format&fit=crop", // Chandler Photography Club - Authentic style image
    "https://images.unsplash.com/photo-1581092921461-39b9d08a9b2a?q=80&w=2000&auto=format&fit=crop", // Chandler Maker Space - Authentic style image
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop"  // Chandler Book Club - Authentic style image
  ];
  
  return {
    id: id.toString(),
    type: 'club',
    name: generateVenueName('club', id),
    address: id < 5 ? getRealAddress('club', id) : generateAddress(id),
    description: 'Club for enthusiasts to share their passion and expertise in various hobbies and interests.',
    imageUrl: realClubImages[id % realClubImages.length],
    rating: 4.0 + Math.random(),
    coordinates,
    category: ['Arts & Hobbies', 'Technology', 'Education', 'Gaming', 'Outdoors'][Math.floor(Math.random() * 5)],
    activities: ['Workshops', 'Group Projects', 'Skill Sharing', 'Social Events'],
    membershipFee: Math.random() > 0.4 ? Math.floor(Math.random() * 80) + 20 : 0,
    schedule: 'Weekly on Saturdays at 10:00 AM',
    requirements: Math.random() > 0.5 ? 'None' : 'Basic knowledge of the hobby',
    amenities: ['Meeting Space', 'Equipment', 'Storage', 'Online Community']
  };
};
