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
import { generateAdditionalVenues } from '../utils/venue-data-generator.new';

export type Venue = Bar | CoffeeShop | ArtFestival | ComedyVenue | NatureWalk | MusicVenue | ThriftStore | SocialClub | SportsClub | Club;

const baseVenues: Venue[] = [
  {
    id: '21',
    type: 'comedy-venue',
    name: 'Tempe Improv',
    address: '930 E University Dr, Tempe, AZ 85281',
    description: 'Premier comedy club featuring national headliners in an intimate setting with full food and drink service.',
    imageUrl: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.7,
    coordinates: {
      latitude: 33.4221,
      longitude: -111.9282
    },
    performanceDays: ['Thursday', 'Friday', 'Saturday', 'Sunday'],
    comedians: ['National Headliners', 'Regional Comics', 'Local Talent'],
    ticketPrice: 25,
    ageRestriction: '21+'
  },
  {
    id: '22',
    type: 'comedy-venue',
    name: 'Stand Up Live Phoenix',
    address: '50 W Jefferson St, Phoenix, AZ 85003',
    description: 'Upscale comedy theater in downtown Phoenix featuring top-tier comedians and a full restaurant and bar.',
    imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.6,
    coordinates: {
      latitude: 33.4484,
      longitude: -112.0740
    },
    performanceDays: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    comedians: ['Celebrity Comics', 'TV Personalities', 'Touring Professionals'],
    ticketPrice: 30,
    ageRestriction: '21+'
  },
  {
    id: '23',
    type: 'comedy-venue',
    name: 'House of Comedy Arizona',
    address: '5350 E High St, Phoenix, AZ 85054',
    description: 'Modern comedy club at High Street featuring national touring comedians in a spacious venue with full bar service.',
    imageUrl: 'https://images.unsplash.com/photo-1603190287605-e6ade32fa852?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.5,
    coordinates: {
      latitude: 33.6652,
      longitude: -111.9748
    },
    performanceDays: ['Thursday', 'Friday', 'Saturday'],
    comedians: ['Touring Headliners', 'Comedy Central Features', 'Rising Stars'],
    ticketPrice: 22,
    ageRestriction: '18+'
  },
  {
    id: '24',
    type: 'comedy-venue',
    name: 'The Comedy Spot',
    address: '7117 E 3rd Ave, Scottsdale, AZ 85251',
    description: 'Intimate comedy venue in Old Town Scottsdale offering stand-up shows, improv performances, and comedy workshops.',
    imageUrl: 'https://images.unsplash.com/photo-1485095329183-d0797cdc5676?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.4,
    coordinates: {
      latitude: 33.4900,
      longitude: -111.9261
    },
    performanceDays: ['Tuesday', 'Friday', 'Saturday'],
    comedians: ['Local Favorites', 'Improv Groups', 'Open Mic Performers'],
    ticketPrice: 15,
    ageRestriction: '18+'
  },
  
  {
    id: '25',
    type: 'nature-walk',
    name: 'Veterans Oasis Park',
    address: '4050 E Chandler Heights Rd, Chandler, AZ 85249',
    description: 'A 113-acre park featuring a 5-acre lake, wetlands, and desert habitats with 4.5 miles of trails for hiking and biking.',
    imageUrl: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.8,
    coordinates: {
      latitude: 33.2367,
      longitude: -111.7868
    },
    difficulty: 'Easy',
    length: 4.5,
    features: ['Lake', 'Wetlands', 'Desert Habitat', 'Bird Watching', 'Environmental Education Center'],
    bestSeason: 'Fall through Spring'
  },
  {
    id: '26',
    type: 'nature-walk',
    name: 'Paseo Vista Recreation Area',
    address: '3850 S McQueen Rd, Chandler, AZ 85286',
    description: 'Former landfill transformed into a 64-acre recreation area with hiking trails, disc golf course, and panoramic views of the East Valley.',
    imageUrl: 'https://images.unsplash.com/photo-1552083375-1447ce886485?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.6,
    coordinates: {
      latitude: 33.2720,
      longitude: -111.8411
    },
    difficulty: 'Easy to Moderate',
    length: 2.5,
    features: ['Panoramic Views', 'Disc Golf', 'Archery Range', 'Dog Park'],
    bestSeason: 'Winter'
  },
  {
    id: '27',
    type: 'nature-walk',
    name: 'Riparian Preserve at Water Ranch',
    address: '2757 E Guadalupe Rd, Gilbert, AZ 85234',
    description: 'A 110-acre water conservation area with 4.5 miles of trails, fishing lakes, and over 200 species of birds in various habitats.',
    imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.9,
    coordinates: {
      latitude: 33.3614,
      longitude: -111.7618
    },
    difficulty: 'Easy',
    length: 4.5,
    features: ['Bird Watching', 'Fishing', 'Observatory', 'Multiple Habitats', 'Photography'],
    bestSeason: 'Year-round'
  },
  {
    id: '28',
    type: 'nature-walk',
    name: 'South Mountain Park and Preserve',
    address: '10919 S Central Ave, Phoenix, AZ 85042',
    description: 'One of the largest municipal parks in the U.S. with over 50 miles of trails for hiking, mountain biking, and horseback riding.',
    imageUrl: 'https://images.unsplash.com/photo-1469827160215-9d29e96e72f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.8,
    coordinates: {
      latitude: 33.3450,
      longitude: -112.0511
    },
    difficulty: 'Easy to Difficult',
    length: 50.0,
    features: ['Desert Landscapes', 'Mountain Views', 'Petroglyphs', 'Wildlife', 'City Skyline Views'],
    bestSeason: 'Fall through Spring'
  },
  {
    id: '29',
    type: 'nature-walk',
    name: 'Usery Mountain Regional Park',
    address: '3939 N Usery Pass Rd, Mesa, AZ 85207',
    description: 'A 3,648-acre park at the western end of the Goldfield Mountains with over 29 miles of trails through the Sonoran Desert.',
    imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.7,
    coordinates: {
      latitude: 33.4795,
      longitude: -111.6295
    },
    difficulty: 'Moderate',
    length: 29.0,
    features: ['Wind Cave', 'Saguaro Cacti', 'Desert Wildlife', 'Mountain Biking', 'Archery Range'],
    bestSeason: 'Winter'
  },
  {
    id: '1',
    type: 'bar',
    name: 'The Perch Brewery',
    address: '232 S Wall St, Chandler, AZ 85225',
    description: 'Rooftop brewery with craft beers, cocktails, and a unique atmosphere with rescued tropical birds.',
    imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.7,
    coordinates: {
      latitude: 33.3008,
      longitude: -111.8412
    },
    happyHour: {
      start: '15:00',
      end: '18:00'
    },
    specialties: ['Craft Beer', 'Rooftop Dining', 'Live Music']
  },
  {
    id: '2',
    type: 'bar',
    name: 'SanTan Brewing Company',
    address: '8 S San Marcos Pl, Chandler, AZ 85225',
    description: 'Popular local brewery with handcrafted beers and southwestern pub fare in a lively atmosphere.',
    imageUrl: 'https://images.unsplash.com/photo-1559526642-c3f001ea68ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.5,
    coordinates: {
      latitude: 33.3025,
      longitude: -111.8417
    },
    happyHour: {
      start: '15:00',
      end: '19:00'
    },
    specialties: ['Craft Beer', 'Brewery Tours', 'Pub Food']
  },
  {
    id: '3',
    type: 'coffee-shop',
    name: 'Peixoto Coffee Roasters',
    address: '11 W Boston St, Chandler, AZ 85225',
    description: 'Family-owned coffee shop serving single-origin beans from their own farm in Brazil.',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.8,
    coordinates: {
      latitude: 33.3031,
      longitude: -111.8421
    },
    specialties: ['Single-Origin Coffee', 'Pour Over', 'Cold Brew'],
    hasWifi: true
  },
  {
    id: '4',
    type: 'coffee-shop',
    name: 'Sip Coffee & Beer House',
    address: '3617 E Chandler Blvd, Phoenix, AZ 85048',
    description: 'Trendy spot offering craft coffee by day and local beers by night with a relaxed atmosphere.',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.6,
    coordinates: {
      latitude: 33.3046,
      longitude: -111.9908
    },
    specialties: ['Specialty Coffee', 'Craft Beer', 'Pastries'],
    hasWifi: true
  },
  {
    id: '5',
    type: 'art-festival',
    name: 'Chandler Art Walk',
    address: 'Downtown Chandler, AZ 85225',
    description: 'Monthly art walk featuring local artists, live music, and food vendors in historic downtown Chandler.',
    imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.7,
    coordinates: {
      latitude: 33.3022,
      longitude: -111.8419
    },
    startDate: '2025-06-17',
    endDate: '2025-06-17',
    artists: ['Local Chandler Artists', 'East Valley Art Community', 'Arizona Artisans'],
    ticketPrice: 0
  },
  {
    id: '6',
    type: 'art-festival',
    name: 'Chandler Craft Spirits Festival',
    address: 'Dr. AJ Chandler Park, 178 E Commonwealth Ave, Chandler, AZ 85225',
    description: 'Annual festival celebrating craft spirits, cocktails, and local food with live entertainment.',
    imageUrl: 'https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.6,
    coordinates: {
      latitude: 33.3035,
      longitude: -111.8401
    },
    startDate: '2025-08-22',
    endDate: '2025-08-23',
    artists: ['Local Mixologists', 'Arizona Distilleries', 'Craft Cocktail Specialists'],
    ticketPrice: 35
  },
  {
    id: '7',
    type: 'bar',
    name: 'The Ostrich',
    address: '10 N San Marcos Pl, Chandler, AZ 85225',
    description: 'Underground speakeasy-style bar with craft cocktails and a vintage atmosphere in historic downtown.',
    imageUrl: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.9,
    coordinates: {
      latitude: 33.3027,
      longitude: -111.8417
    },
    happyHour: {
      start: '16:00',
      end: '19:00'
    },
    specialties: ['Craft Cocktails', 'Speakeasy', 'Historic Venue']
  },
  {
    id: '8',
    type: 'coffee-shop',
    name: 'Press Coffee Roasters',
    address: '2577 W Queen Creek Rd, Chandler, AZ 85248',
    description: 'Modern coffee shop known for their award-winning roasts and educational coffee tastings.',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.7,
    coordinates: {
      latitude: 33.2561,
      longitude: -111.8932
    },
    specialties: ['Coffee Tastings', 'House Roasts', 'Espresso'],
    hasWifi: true
  },
  {
    id: '9',
    type: 'bar',
    name: 'Bourbon Jacks',
    address: '11 W Boston St #1, Chandler, AZ 85225',
    description: 'Western-themed bar and grill with live country music, line dancing, and a wide selection of whiskeys.',
    imageUrl: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.3,
    coordinates: {
      latitude: 33.3031,
      longitude: -111.8423
    },
    happyHour: {
      start: '15:00',
      end: '18:00'
    },
    specialties: ['Whiskey Selection', 'Live Country Music', 'Line Dancing']
  },
  {
    id: '10',
    type: 'bar',
    name: 'Murphy\'s Law Irish Pub',
    address: '58 S San Marcos Pl, Chandler, AZ 85225',
    description: 'Traditional Irish pub with authentic food, a large beer selection, and regular live music performances.',
    imageUrl: 'https://images.unsplash.com/photo-1546854810-9a7c4607f175?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.4,
    coordinates: {
      latitude: 33.3017,
      longitude: -111.8417
    },
    happyHour: {
      start: '15:00',
      end: '18:00'
    },
    specialties: ['Irish Pub Food', 'Guinness on Tap', 'Live Music']
  },
  {
    id: '11',
    type: 'coffee-shop',
    name: 'Mythical Coffee',
    address: '1090 S Gilbert Rd, Gilbert, AZ 85296',
    description: 'Specialty coffee shop with meticulously crafted drinks and a rotating selection of single-origin beans.',
    imageUrl: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.9,
    coordinates: {
      latitude: 33.3336,
      longitude: -111.7890
    },
    specialties: ['Specialty Coffee', 'Pour Over', 'Latte Art'],
    hasWifi: true
  },
  {
    id: '12',
    type: 'coffee-shop',
    name: 'Bergie\'s Coffee Roast House',
    address: '309 N Gilbert Rd, Gilbert, AZ 85234',
    description: 'Charming coffee shop in a historic home with a garden patio and house-roasted coffee beans.',
    imageUrl: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.8,
    coordinates: {
      latitude: 33.3553,
      longitude: -111.7891
    },
    specialties: ['House-Roasted Coffee', 'Garden Patio', 'Pastries'],
    hasWifi: true
  },
  {
    id: '13',
    type: 'art-festival',
    name: 'Gilbert Art Walk',
    address: 'Heritage District, Gilbert, AZ 85296',
    description: 'Bi-weekly art walk showcasing local artists, handmade crafts, and live performances in downtown Gilbert.',
    imageUrl: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.5,
    coordinates: {
      latitude: 33.3528,
      longitude: -111.7892
    },
    startDate: '2025-07-05',
    endDate: '2025-07-05',
    artists: ['Gilbert Artists Collective', 'East Valley Artisans', 'Local Craftspeople'],
    ticketPrice: 0
  },
  {
    id: '14',
    type: 'art-festival',
    name: 'Tempe Festival of the Arts',
    address: 'Mill Avenue, Tempe, AZ 85281',
    description: 'One of the largest arts festivals in Arizona featuring hundreds of artists, street performers, and food vendors.',
    imageUrl: 'https://images.unsplash.com/photo-1576085898323-218337e3e43c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.8,
    coordinates: {
      latitude: 33.4255,
      longitude: -111.9400
    },
    startDate: '2025-11-29',
    endDate: '2025-12-01',
    artists: ['National Artists', 'Arizona Fine Artists', 'Juried Art Exhibitors'],
    ticketPrice: 0
  },
  {
    id: '15',
    type: 'bar',
    name: 'OHSO Brewery',
    address: '10810 E Vistancia Blvd, Peoria, AZ 85383',
    description: 'Dog-friendly brewery with craft beers, a large patio, and gastropub fare in a relaxed setting.',
    imageUrl: 'https://images.unsplash.com/photo-1555658636-6e4a36218be7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.6,
    coordinates: {
      latitude: 33.3178,
      longitude: -111.9253
    },
    happyHour: {
      start: '15:00',
      end: '18:00'
    },
    specialties: ['Craft Beer', 'Dog-Friendly Patio', 'Gastropub Food']
  },
  {
    id: '16',
    type: 'coffee-shop',
    name: 'Cartel Coffee Lab',
    address: '225 W University Dr, Tempe, AZ 85281',
    description: 'Hip, industrial-style coffee shop known for its carefully sourced beans and precise brewing methods.',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.7,
    coordinates: {
      latitude: 33.4219,
      longitude: -111.9419
    },
    specialties: ['Single-Origin Coffee', 'Pour Over', 'Coffee Education'],
    hasWifi: true
  },
  {
    id: '17',
    type: 'art-festival',
    name: 'Chandler Jazz Festival',
    address: 'Downtown Chandler, AZ 85225',
    description: 'Annual jazz festival featuring local and national jazz artists performing in downtown Chandler.',
    imageUrl: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.6,
    coordinates: {
      latitude: 33.3022,
      longitude: -111.8419
    },
    startDate: '2025-04-03',
    endDate: '2025-04-04',
    artists: ['Jazz Ensembles', 'Local Musicians', 'National Jazz Artists'],
    ticketPrice: 10
  },
  {
    id: '18',
    type: 'bar',
    name: 'Chandler Craft Brewery',
    address: '7084 W Chandler Blvd, Chandler, AZ 85226',
    description: 'Local microbrewery with rotating taps, beer flights, and a casual atmosphere for beer enthusiasts.',
    imageUrl: 'https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.4,
    coordinates: {
      latitude: 33.3063,
      longitude: -111.9495
    },
    happyHour: {
      start: '16:00',
      end: '19:00'
    },
    specialties: ['Microbrews', 'Beer Flights', 'Brewery Tours']
  },
  {
    id: '19',
    type: 'coffee-shop',
    name: 'Dutch Bros Coffee',
    address: '3765 S Arizona Ave, Chandler, AZ 85248',
    description: 'Popular drive-through coffee chain known for its energetic staff and creative coffee drinks.',
    imageUrl: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.5,
    coordinates: {
      latitude: 33.2724,
      longitude: -111.8409
    },
    specialties: ['Blended Coffee Drinks', 'Energy Drinks', 'Quick Service'],
    hasWifi: false
  },
  {
    id: '20',
    type: 'art-festival',
    name: 'Chandler Multicultural Festival',
    address: 'Dr. AJ Chandler Park, Chandler, AZ 85225',
    description: 'Annual celebration of cultural diversity featuring international food, music, dance, and art.',
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.7,
    coordinates: {
      latitude: 33.3035,
      longitude: -111.8401
    },
    startDate: '2025-01-18',
    endDate: '2025-01-18',
    artists: ['Cultural Performance Groups', 'International Artists', 'Local Ethnic Communities'],
    ticketPrice: 0
  },
  {
    id: '30',
    type: 'music-venue',
    name: 'The Marquee Theatre',
    address: '730 N Mill Ave, Tempe, AZ 85281',
    description: 'Popular mid-sized concert venue hosting national touring acts across all genres in an intimate setting.',
    imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.6,
    coordinates: {
      latitude: 33.4356,
      longitude: -111.9431
    },
    genres: ['Rock', 'Hip-Hop', 'Electronic', 'Metal', 'Indie'],
    capacity: 1500,
    upcomingShows: ['The Strokes - June 15', 'Glass Animals - July 3', 'Tame Impala - August 12'],
    ticketPrice: 35
  },
  {
    id: '31',
    type: 'music-venue',
    name: 'Chandler Center for the Arts',
    address: '250 N Arizona Ave, Chandler, AZ 85225',
    description: 'Premier performing arts venue featuring concerts, theater productions, and cultural performances in downtown Chandler.',
    imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.8,
    coordinates: {
      latitude: 33.3052,
      longitude: -111.8413
    },
    genres: ['Classical', 'Jazz', 'World Music', 'Broadway', 'Folk'],
    capacity: 1500,
    upcomingShows: ['Chandler Symphony Orchestra - May 22', 'Jazz at the Center - June 10', 'World Music Series - July 15'],
    ticketPrice: 45
  },
  {
    id: '32',
    type: 'music-venue',
    name: 'The Rebel Lounge',
    address: '2303 E Indian School Rd, Phoenix, AZ 85016',
    description: 'Intimate rock club featuring emerging indie bands, local talent, and underground artists in a gritty, authentic setting.',
    imageUrl: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.5,
    coordinates: {
      latitude: 33.4947,
      longitude: -112.0339
    },
    genres: ['Indie Rock', 'Punk', 'Alternative', 'Local Music'],
    capacity: 300,
    upcomingShows: ['Local Showcase - May 20', 'Indie Night - June 5', 'Punk Rock Revival - June 18'],
    ticketPrice: 15
  },
  {
    id: '33',
    type: 'music-venue',
    name: 'Rawhide Event Center',
    address: '5700 W North Loop Rd, Chandler, AZ 85226',
    description: 'Large outdoor venue hosting major music festivals, concerts, and events with a Western theme.',
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.4,
    coordinates: {
      latitude: 33.2626,
      longitude: -111.9456
    },
    genres: ['Country', 'EDM', 'Pop', 'Festival'],
    capacity: 10000,
    upcomingShows: ['Country Thunder - September 10-12', 'Decadence AZ - December 30-31', 'Chandler Music Festival - October 15'],
    ticketPrice: 65
  },
  {
    id: '34',
    type: 'thrift-store',
    name: 'Goodwill Chandler',
    address: '2075 W Chandler Blvd, Chandler, AZ 85224',
    description: 'Large thrift store offering a wide selection of clothing, furniture, books, and household items at affordable prices.',
    imageUrl: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.2,
    coordinates: {
      latitude: 33.3063,
      longitude: -111.8742
    },
    specialties: ['Clothing', 'Furniture', 'Books', 'Household Items'],
    priceRange: 'Low',
    donationDropOff: true,
    openingHours: {
      open: '9:00 AM',
      close: '9:00 PM'
    }
  },
  {
    id: '35',
    type: 'thrift-store',
    name: 'Buffalo Exchange Tempe',
    address: '227 W University Dr, Tempe, AZ 85281',
    description: 'Trendy resale shop specializing in vintage and contemporary fashion with a curated selection of clothing and accessories.',
    imageUrl: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.6,
    coordinates: {
      latitude: 33.4219,
      longitude: -111.9419
    },
    specialties: ['Vintage Clothing', 'Designer Items', 'Accessories', 'Trendy Fashion'],
    priceRange: 'Medium',
    donationDropOff: false,
    openingHours: {
      open: '10:00 AM',
      close: '8:00 PM'
    }
  },
  {
    id: '36',
    type: 'thrift-store',
    name: 'Merchant Square Antiques & Marketplace',
    address: '1509 N Arizona Ave, Chandler, AZ 85225',
    description: 'Sprawling indoor marketplace featuring antiques, vintage items, collectibles, and unique finds from multiple vendors.',
    imageUrl: 'https://images.unsplash.com/photo-1563377176922-e88113ff3a23?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.7,
    coordinates: {
      latitude: 33.3197,
      longitude: -111.8413
    },
    specialties: ['Antiques', 'Vintage Items', 'Collectibles', 'Home Decor'],
    priceRange: 'Medium to High',
    donationDropOff: false,
    openingHours: {
      open: '10:00 AM',
      close: '6:00 PM'
    }
  },
  {
    id: '37',
    type: 'social-club',
    name: 'Chandler Toastmasters Club',
    address: '125 E Commonwealth Ave, Chandler, AZ 85225',
    description: 'Public speaking and leadership development club that meets weekly to help members improve communication skills in a supportive environment.',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.8,
    coordinates: {
      latitude: 33.3033,
      longitude: -111.8398
    },
    activities: ['Public Speaking', 'Leadership Development', 'Networking', 'Communication Skills'],
    membershipFee: 90,
    ageGroup: 'Adults',
    meetingSchedule: 'Thursdays at 7:00 PM',
    membershipRequired: true
  },
  {
    id: '38',
    type: 'social-club',
    name: 'East Valley Book Club',
    address: '775 N Greenfield Rd, Gilbert, AZ 85234',
    description: 'Community book club that meets monthly to discuss selected books across various genres in a friendly, inclusive atmosphere.',
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.7,
    coordinates: {
      latitude: 33.3683,
      longitude: -111.7389
    },
    activities: ['Book Discussions', 'Author Events', 'Literary Outings', 'Social Gatherings'],
    membershipFee: 0,
    ageGroup: 'All Ages',
    meetingSchedule: 'First Tuesday of each month at 6:30 PM',
    membershipRequired: false
  },
  {
    id: '39',
    type: 'social-club',
    name: 'Chandler Young Professionals',
    address: '25 S Arizona Pl, Chandler, AZ 85225',
    description: 'Networking group for young professionals in the Chandler area featuring social events, professional development, and community service.',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.6,
    coordinates: {
      latitude: 33.3025,
      longitude: -111.8408
    },
    activities: ['Networking Events', 'Professional Development', 'Community Service', 'Social Mixers'],
    membershipFee: 75,
    ageGroup: '21-40',
    meetingSchedule: 'Monthly events with varying dates',
    membershipRequired: true
  },
  {
    id: '40',
    type: 'sports-club',
    name: 'Chandler Tennis Club',
    address: '2250 S McQueen Rd, Chandler, AZ 85286',
    description: 'Premier tennis facility with multiple courts, professional instruction, leagues, and tournaments for all skill levels.',
    imageUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.7,
    coordinates: {
      latitude: 33.2784,
      longitude: -111.8411
    },
    sports: ['Tennis'],
    facilities: ['Clay Courts', 'Hard Courts', 'Pro Shop', 'Locker Rooms', 'Clubhouse'],
    membershipFee: 150,
    leagues: ['Junior League', 'Adult Recreational', 'Competitive League', 'Senior League'],
    openToPublic: false,
    equipmentRental: true
  },
  {
    id: '41',
    type: 'sports-club',
    name: 'Ocotillo Golf Club',
    address: '3751 S Clubhouse Dr, Chandler, AZ 85248',
    description: 'Upscale 27-hole golf course with lush landscaping, water features, and a full-service clubhouse in south Chandler.',
    imageUrl: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.8,
    coordinates: {
      latitude: 33.2484,
      longitude: -111.8311
    },
    sports: ['Golf'],
    facilities: ['27-Hole Course', 'Driving Range', 'Pro Shop', 'Restaurant', 'Banquet Facilities'],
    membershipFee: 500,
    leagues: ['Men\'s League', 'Women\'s League', 'Senior League', 'Junior Program'],
    openToPublic: true,
    equipmentRental: true
  },
  {
    id: '42',
    type: 'sports-club',
    name: 'East Valley Volleyball Club',
    address: '7415 E Southern Ave, Mesa, AZ 85209',
    description: 'Competitive volleyball club offering training, leagues, and tournaments for youth and adults with experienced coaches.',
    imageUrl: 'https://images.unsplash.com/photo-1592656094267-764a45160876?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.6,
    coordinates: {
      latitude: 33.3917,
      longitude: -111.6789
    },
    sports: ['Volleyball'],
    facilities: ['Indoor Courts', 'Training Area', 'Fitness Room', 'Lounge'],
    membershipFee: 120,
    leagues: ['Youth Competitive', 'Adult Recreational', 'Co-Ed League', 'Beach Volleyball'],
    openToPublic: false,
    equipmentRental: true
  },
  {
    id: '43',
    type: 'club',
    name: 'Chandler Photography Club',
    address: '125 E Commonwealth Ave, Chandler, AZ 85225',
    description: 'Community of photography enthusiasts who meet to share techniques, critique work, and organize photo walks and exhibitions.',
    imageUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.7,
    coordinates: {
      latitude: 33.3033,
      longitude: -111.8398
    },
    category: 'Arts & Hobbies',
    activities: ['Photo Walks', 'Technique Workshops', 'Equipment Sharing', 'Photo Exhibitions'],
    membershipFee: 50,
    schedule: 'Second Saturday of each month at 10:00 AM',
    requirements: 'Own camera equipment',
    amenities: ['Meeting Space', 'Exhibition Area', 'Online Gallery', 'Equipment Loans']
  },
  {
    id: '44',
    type: 'club',
    name: 'Desert Botanical Garden Club',
    address: '1201 N Galvin Pkwy, Phoenix, AZ 85008',
    description: 'Group dedicated to desert plant conservation, education, and appreciation with regular meetings, workshops, and garden tours.',
    imageUrl: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.9,
    coordinates: {
      latitude: 33.4628,
      longitude: -111.9439
    },
    category: 'Gardening',
    activities: ['Plant Workshops', 'Garden Tours', 'Conservation Projects', 'Seed Exchanges'],
    membershipFee: 65,
    schedule: 'Monthly meetings on the third Thursday at 6:30 PM',
    requirements: 'Interest in desert plants and conservation',
    amenities: ['Garden Access', 'Plant Library', 'Tool Lending', 'Greenhouse Space']
  },
  {
    id: '45',
    type: 'club',
    name: 'Chandler Maker Space',
    address: '250 E Chicago St, Chandler, AZ 85225',
    description: 'Community workshop providing access to tools, equipment, and classes for DIY projects, crafting, and innovation.',
    imageUrl: 'https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.8,
    coordinates: {
      latitude: 33.3005,
      longitude: -111.8398
    },
    category: 'DIY & Technology',
    activities: ['Woodworking', '3D Printing', 'Electronics', 'Crafting', 'Metalworking'],
    membershipFee: 85,
    schedule: 'Open daily from 10:00 AM to 9:00 PM',
    requirements: 'Safety training for equipment use',
    amenities: ['Workshop Space', 'Tool Library', 'Material Store', 'Project Storage', 'Classes']
  }
];

const deduplicateVenues = (venues: Venue[]): Venue[] => {
  const uniqueVenues: Venue[] = [];
  const nameSet = new Set<string>();
  const addressSet = new Set<string>();
  const coordinatesSet = new Set<string>();
  
  const sortedVenues = [...venues].sort((a, b) => {
    const idA = parseInt(a.id);
    const idB = parseInt(b.id);
    return idA - idB;
  });

  const categoryCounters: Record<string, number> = {
    'bar': 0,
    'coffee-shop': 0,
    'art-festival': 0,
    'comedy-venue': 0,
    'nature-walk': 0,
    'music-venue': 0,
    'thrift-store': 0,
    'social-club': 0,
    'sports-club': 0,
    'club': 0
  };

  sortedVenues.forEach(venue => {
    const nameKey = venue.name.toLowerCase().trim();
    const addressKey = venue.address.toLowerCase().trim();
    const coordinatesKey = `${venue.coordinates.latitude.toFixed(3)},${venue.coordinates.longitude.toFixed(3)}`;
    
    let similarNameFound = false;
    if (categoryCounters[venue.type] >= 50) {
      for (const existingName of nameSet) {
        const nameSimilarity = calculateStringSimilarity(nameKey, existingName);
        if (nameSimilarity > 0.9) { // Increased threshold to allow more venues
          similarNameFound = true;
          break;
        }
      }
    }
    
    if (
      (!nameSet.has(nameKey) && 
       !addressSet.has(addressKey) && 
       !coordinatesSet.has(coordinatesKey) &&
       !similarNameFound) ||
      categoryCounters[venue.type] < 50 // Always add if we need more of this category
    ) {
      uniqueVenues.push(venue);
      nameSet.add(nameKey);
      addressSet.add(addressKey);
      coordinatesSet.add(coordinatesKey);
      categoryCounters[venue.type]++;
    }
  });

  console.log('Category counts after deduplication:', categoryCounters);
  return uniqueVenues;
};

const calculateStringSimilarity = (str1: string, str2: string): number => {
  if (str1 === str2) return 1;
  
  if (str1.length === 0 || str2.length === 0) return 0;
  
  const lengthDiff = Math.abs(str1.length - str2.length);
  const maxLength = Math.max(str1.length, str2.length);
  if (lengthDiff / maxLength > 0.3) {
    return 0.5; // Return lower similarity for strings with very different lengths
  }
  
  const matrix: number[][] = [];
  
  for (let i = 0; i <= str1.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str2.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }
  
  const distance = matrix[str1.length][str2.length];
  
  return Math.max(0, 1 - (distance / maxLength) * 1.2);
};

const additionalVenues = generateAdditionalVenues();
console.log('Base venues count:', baseVenues.length);
console.log('Additional venues count:', additionalVenues.length);

const allVenues = [...baseVenues, ...additionalVenues];
const mockVenues: Venue[] = deduplicateVenues(allVenues);

console.log('Total venues before deduplication:', allVenues.length);
console.log('Total venues after deduplication:', mockVenues.length);

export const VenueService = {
  getAllVenues: (): Promise<Venue[]> => {
    return Promise.resolve(mockVenues);
  },

  getVenuesByType: (type: 'bar' | 'coffee-shop' | 'art-festival' | 'comedy-venue' | 'nature-walk' | 'music-venue' | 'thrift-store' | 'social-club' | 'sports-club' | 'club'): Promise<Venue[]> => {
    return Promise.resolve(mockVenues.filter((venue: Venue) => venue.type === type));
  },

  getVenueById: (id: string): Promise<Venue | undefined> => {
    return Promise.resolve(mockVenues.find((venue: Venue) => venue.id === id));
  },
  
  getRandomVenue: (): Promise<Venue> => {
    const randomIndex = Math.floor(Math.random() * mockVenues.length);
    return Promise.resolve(mockVenues[randomIndex]);
  }
};
