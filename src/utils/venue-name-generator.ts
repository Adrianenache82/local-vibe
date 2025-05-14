
const barPrefixes = [
  'The', 'Old', 'Royal', 'Golden', 'Silver', 'Copper', 'Iron', 'Rusty', 'Vintage', 'Modern',
  'Urban', 'Desert', 'Cactus', 'Oasis', 'Canyon', 'Mountain', 'Valley', 'River', 'Lake', 'Spring'
];

const barNouns = [
  'Tap', 'Brew', 'Barrel', 'Mug', 'Pint', 'Glass', 'Stein', 'Tavern', 'Pub', 'Saloon',
  'Lounge', 'Bar', 'Grill', 'Alehouse', 'Brewery', 'Distillery', 'Spirits', 'Cocktail', 'Whiskey', 'Beer'
];

const barSuffixes = [
  'House', 'Room', 'Hall', 'Spot', 'Place', 'Corner', 'Junction', 'Station', 'Stop', 'Hideaway',
  'Retreat', 'Haven', 'Oasis', 'Garden', 'Patio', 'Terrace', 'Loft', 'Cellar', 'Vault', 'Parlor'
];

const coffeeShopPrefixes = [
  'Morning', 'Daily', 'Urban', 'City', 'Downtown', 'Uptown', 'Local', 'Artisan', 'Craft', 'Organic',
  'Desert', 'Sunrise', 'Sunset', 'Cactus', 'Mountain', 'Valley', 'Canyon', 'River', 'Spring', 'Oasis'
];

const coffeeShopNouns = [
  'Bean', 'Brew', 'Cup', 'Mug', 'Grind', 'Roast', 'Espresso', 'Coffee', 'Café', 'Java',
  'Latte', 'Mocha', 'Cappuccino', 'Press', 'Pour', 'Drip', 'Sip', 'Taste', 'Aroma', 'Flavor'
];

const coffeeShopSuffixes = [
  'House', 'Shop', 'Bar', 'Spot', 'Place', 'Corner', 'Junction', 'Station', 'Stop', 'Hideaway',
  'Retreat', 'Haven', 'Oasis', 'Garden', 'Patio', 'Terrace', 'Loft', 'Roastery', 'Lab', 'Studio'
];

const artFestivalPrefixes = [
  'Annual', 'Seasonal', 'Spring', 'Summer', 'Fall', 'Winter', 'Desert', 'Southwest', 'Arizona', 'Valley',
  'Chandler', 'Gilbert', 'Tempe', 'Phoenix', 'Mesa', 'Scottsdale', 'East Valley', 'West Valley', 'Downtown', 'Uptown'
];

const artFestivalNouns = [
  'Art', 'Craft', 'Fine Art', 'Visual Art', 'Contemporary Art', 'Modern Art', 'Traditional Art', 'Folk Art', 'Cultural', 'Heritage',
  'Creative', 'Artistic', 'Handmade', 'Artisan', 'Maker', 'Creator', 'Designer', 'Sculptor', 'Painter', 'Photographer'
];

const artFestivalSuffixes = [
  'Festival', 'Fair', 'Exhibition', 'Show', 'Showcase', 'Celebration', 'Gathering', 'Market', 'Expo', 'Gala',
  'Walk', 'Tour', 'Crawl', 'Experience', 'Event', 'Happening', 'Affair', 'Extravaganza', 'Spectacle', 'Jubilee'
];

const comedyVenuePrefixes = [
  'The', 'Big', 'Funny', 'Laugh', 'Chuckle', 'Giggle', 'Comedy', 'Humor', 'Joke', 'Stand-Up',
  'Desert', 'Arizona', 'Phoenix', 'Chandler', 'Tempe', 'Gilbert', 'Scottsdale', 'Mesa', 'Valley', 'Downtown'
];

const comedyVenueNouns = [
  'Laugh', 'Joke', 'Punchline', 'Gag', 'Humor', 'Comedy', 'Stand-Up', 'Improv', 'Sketch', 'Wit',
  'Funny', 'Hilarious', 'Comical', 'Amusing', 'Entertaining', 'Jovial', 'Merry', 'Jocular', 'Mirthful', 'Whimsical'
];

const comedyVenueSuffixes = [
  'Factory', 'Club', 'House', 'Room', 'Spot', 'Place', 'Corner', 'Junction', 'Station', 'Stop',
  'Theater', 'Stage', 'Venue', 'Hall', 'Arena', 'Auditorium', 'Showroom', 'Lounge', 'Bar', 'Cellar'
];

const natureWalkPrefixes = [
  'Hidden', 'Secret', 'Scenic', 'Peaceful', 'Tranquil', 'Serene', 'Quiet', 'Wild', 'Natural', 'Untamed',
  'Desert', 'Mountain', 'Valley', 'Canyon', 'River', 'Lake', 'Spring', 'Oasis', 'Cactus', 'Sonoran'
];

const natureWalkNouns = [
  'Trail', 'Path', 'Route', 'Way', 'Track', 'Hike', 'Trek', 'Journey', 'Expedition', 'Adventure',
  'Nature', 'Wilderness', 'Wildlife', 'Flora', 'Fauna', 'Ecosystem', 'Habitat', 'Environment', 'Landscape', 'Terrain'
];

const natureWalkSuffixes = [
  'Loop', 'Point', 'Overlook', 'Vista', 'View', 'Lookout', 'Preserve', 'Conservation', 'Park', 'Reserve',
  'Sanctuary', 'Haven', 'Refuge', 'Retreat', 'Escape', 'Getaway', 'Oasis', 'Paradise', 'Wonderland', 'Eden'
];

const musicVenuePrefixes = [
  'The', 'Grand', 'Royal', 'Majestic', 'Elegant', 'Classic', 'Modern', 'Urban', 'Downtown', 'Uptown',
  'Desert', 'Arizona', 'Phoenix', 'Chandler', 'Tempe', 'Gilbert', 'Scottsdale', 'Mesa', 'Valley', 'Sonoran'
];

const musicVenueNouns = [
  'Sound', 'Music', 'Melody', 'Harmony', 'Rhythm', 'Beat', 'Tune', 'Song', 'Concert', 'Performance',
  'Band', 'Orchestra', 'Symphony', 'Jazz', 'Rock', 'Blues', 'Country', 'Folk', 'Pop', 'Electronic'
];

const musicVenueSuffixes = [
  'Hall', 'Stage', 'Theater', 'Auditorium', 'Arena', 'Stadium', 'Pavilion', 'Amphitheater', 'Center', 'Venue',
  'Room', 'Lounge', 'Bar', 'Club', 'House', 'Spot', 'Place', 'Junction', 'Station', 'Loft'
];

const thriftStorePrefixes = [
  'Second', 'New', 'Old', 'Vintage', 'Retro', 'Classic', 'Antique', 'Used', 'Pre-Loved', 'Recycled',
  'Desert', 'Arizona', 'Phoenix', 'Chandler', 'Tempe', 'Gilbert', 'Scottsdale', 'Mesa', 'Valley', 'Sonoran'
];

const thriftStoreNouns = [
  'Thrift', 'Vintage', 'Retro', 'Antique', 'Consignment', 'Resale', 'Second-Hand', 'Used', 'Pre-Loved', 'Recycled',
  'Treasure', 'Gem', 'Find', 'Discovery', 'Collection', 'Selection', 'Assortment', 'Variety', 'Array', 'Ensemble'
];

const thriftStoreSuffixes = [
  'Shop', 'Store', 'Market', 'Bazaar', 'Emporium', 'Exchange', 'Outlet', 'Boutique', 'Depot', 'Warehouse',
  'Haven', 'Spot', 'Place', 'Corner', 'Junction', 'Station', 'Stop', 'Center', 'Hub', 'Headquarters'
];

const socialClubPrefixes = [
  'The', 'Royal', 'Elite', 'Premier', 'Exclusive', 'Select', 'Distinguished', 'Prestigious', 'Esteemed', 'Honored',
  'Desert', 'Arizona', 'Phoenix', 'Chandler', 'Tempe', 'Gilbert', 'Scottsdale', 'Mesa', 'Valley', 'Sonoran'
];

const socialClubNouns = [
  'Social', 'Community', 'Society', 'Association', 'Organization', 'Group', 'Circle', 'Network', 'Fellowship', 'Brotherhood',
  'Sisterhood', 'Friendship', 'Camaraderie', 'Companionship', 'Alliance', 'Coalition', 'Union', 'League', 'Guild', 'Order'
];

const socialClubSuffixes = [
  'Club', 'Society', 'Association', 'Organization', 'Group', 'Circle', 'Network', 'Fellowship', 'Brotherhood', 'Sisterhood',
  'Alliance', 'Coalition', 'Union', 'League', 'Guild', 'Order', 'Lodge', 'Chapter', 'Branch', 'Division'
];

const sportsClubPrefixes = [
  'The', 'Elite', 'Premier', 'Pro', 'Champion', 'Victory', 'Triumph', 'Winning', 'Athletic', 'Sporting',
  'Desert', 'Arizona', 'Phoenix', 'Chandler', 'Tempe', 'Gilbert', 'Scottsdale', 'Mesa', 'Valley', 'Sonoran'
];

const sportsClubNouns = [
  'Sports', 'Athletic', 'Fitness', 'Training', 'Exercise', 'Workout', 'Gym', 'Health', 'Wellness', 'Strength',
  'Endurance', 'Power', 'Energy', 'Vigor', 'Vitality', 'Stamina', 'Agility', 'Speed', 'Skill', 'Technique'
];

const sportsClubSuffixes = [
  'Club', 'Center', 'Gym', 'Facility', 'Complex', 'Arena', 'Stadium', 'Field', 'Court', 'Track',
  'House', 'Academy', 'School', 'Institute', 'University', 'College', 'Camp', 'Retreat', 'Resort', 'Spa'
];

const clubPrefixes = [
  'The', 'Royal', 'Elite', 'Premier', 'Exclusive', 'Select', 'Distinguished', 'Prestigious', 'Esteemed', 'Honored',
  'Desert', 'Arizona', 'Phoenix', 'Chandler', 'Tempe', 'Gilbert', 'Scottsdale', 'Mesa', 'Valley', 'Sonoran'
];

const clubNouns = [
  'Hobby', 'Interest', 'Passion', 'Enthusiasm', 'Avocation', 'Pursuit', 'Pastime', 'Recreation', 'Leisure', 'Entertainment',
  'Activity', 'Craft', 'Art', 'Skill', 'Talent', 'Ability', 'Expertise', 'Proficiency', 'Mastery', 'Virtuosity'
];

const clubSuffixes = [
  'Club', 'Society', 'Association', 'Organization', 'Group', 'Circle', 'Network', 'Fellowship', 'Brotherhood', 'Sisterhood',
  'Alliance', 'Coalition', 'Union', 'League', 'Guild', 'Order', 'Lodge', 'Chapter', 'Branch', 'Division'
];


const streetNames = [
  'Arizona', 'Chandler', 'Gilbert', 'Tempe', 'Mesa', 'Scottsdale', 'Phoenix', 'Glendale', 'Peoria', 'Surprise',
  'McQueen', 'Dobson', 'Alma School', 'Arizona Ave', 'Gilbert', 'Cooper', 'Elliot', 'Warner', 'Ray', 'Chandler Heights',
  'Riggs', 'Queen Creek', 'Ocotillo', 'Germann', 'Pecos', 'Williams Field', 'Baseline', 'Guadalupe', 'Southern', 'Broadway',
  'University', 'Rio Salado', 'McKellips', 'Brown', 'Main', 'Apache', 'Camelback', 'Indian School', 'Thomas', 'McDowell',
  'Palm', 'Cactus', 'Desert', 'Mountain', 'Valley', 'Canyon', 'River', 'Lake', 'Spring', 'Oasis'
];

const streetSuffixes = [
  'St', 'Ave', 'Blvd', 'Rd', 'Dr', 'Ln', 'Way', 'Pl', 'Ct', 'Ter',
  'Pkwy', 'Cir', 'Loop', 'Pass', 'Trail', 'Path', 'Walk', 'Run', 'Point', 'View'
];

const cities = [
  'Chandler', 'Gilbert', 'Tempe', 'Mesa', 'Scottsdale', 'Phoenix', 'Glendale', 'Peoria', 'Surprise', 'Goodyear',
  'Avondale', 'Buckeye', 'Tolleson', 'Litchfield Park', 'El Mirage', 'Sun City', 'Sun City West', 'Fountain Hills', 'Paradise Valley', 'Cave Creek',
  'Carefree', 'Queen Creek', 'San Tan Valley', 'Apache Junction', 'Gold Canyon', 'Florence', 'Coolidge', 'Casa Grande', 'Maricopa', 'Eloy'
];

const zipCodes = [
  '85224', '85225', '85226', '85248', '85249', '85286', '85295', '85296', '85297', '85298',
  '85142', '85143', '85201', '85202', '85203', '85204', '85205', '85206', '85207', '85208',
  '85209', '85210', '85212', '85213', '85215', '85233', '85234', '85281', '85282', '85283',
  '85284', '85285', '85287', '85301', '85302', '85303', '85304', '85305', '85306', '85307',
  '85308', '85309', '85310', '85323', '85326', '85331', '85339', '85340', '85345', '85351'
];

export const generateVenueName = (venueType: string, id: number): string => {
  if (id < 5) {
    return getRealVenueName(venueType, id);
  }

  switch (venueType) {
    case 'bar':
      return generateRandomName(barPrefixes, barNouns, barSuffixes, id);
    case 'coffee-shop':
      return generateRandomName(coffeeShopPrefixes, coffeeShopNouns, coffeeShopSuffixes, id);
    case 'art-festival':
      return generateRandomName(artFestivalPrefixes, artFestivalNouns, artFestivalSuffixes, id);
    case 'comedy-venue':
      return generateRandomName(comedyVenuePrefixes, comedyVenueNouns, comedyVenueSuffixes, id);
    case 'nature-walk':
      return generateRandomName(natureWalkPrefixes, natureWalkNouns, natureWalkSuffixes, id);
    case 'music-venue':
      return generateRandomName(musicVenuePrefixes, musicVenueNouns, musicVenueSuffixes, id);
    case 'thrift-store':
      return generateRandomName(thriftStorePrefixes, thriftStoreNouns, thriftStoreSuffixes, id);
    case 'social-club':
      return generateRandomName(socialClubPrefixes, socialClubNouns, socialClubSuffixes, id);
    case 'sports-club':
      return generateRandomName(sportsClubPrefixes, sportsClubNouns, sportsClubSuffixes, id);
    case 'club':
      return generateRandomName(clubPrefixes, clubNouns, clubSuffixes, id);
    default:
      return `Venue ${id}`;
  }
};

export const generateAddress = (id: number): string => {
  const hash = (id * 17) % 997;
  const secondaryHash = (id * 29) % 773;
  const tertiaryHash = (id * 41) % 631;
  
  const streetNumber = 100 + ((hash * id) % 9900);
  
  const streetDirection = ['N', 'S', 'E', 'W', 'NE', 'NW', 'SE', 'SW'][secondaryHash % 8];
  
  const streetName = streetNames[tertiaryHash % streetNames.length];
  
  const streetSuffix = streetSuffixes[(hash * 7) % streetSuffixes.length];
  
  const city = cities[(secondaryHash * 3) % cities.length];
  
  const zipCode = zipCodes[(tertiaryHash * 5) % zipCodes.length];
  
  const hasUnit = (id % 3 === 0);
  const unitPrefix = ['Ste', 'Unit', 'Apt', '#'][id % 4];
  const unitNumber = 100 + (id % 900);
  const unitSuffix = hasUnit ? ` ${unitPrefix} ${unitNumber}` : '';
  
  return `${streetNumber} ${streetDirection} ${streetName} ${streetSuffix}${unitSuffix}, ${city}, AZ ${zipCode}`;
};

const generateRandomName = (prefixes: string[], nouns: string[], suffixes: string[], id: number): string => {
  const hash = (id * 23) % 997;
  const secondaryHash = (id * 17) % 773;
  
  const prefix = prefixes[hash % prefixes.length];
  const noun = nouns[(secondaryHash * 3) % nouns.length];
  const suffix = suffixes[(hash * 7) % suffixes.length];
  
  const uniqueIdentifier = String.fromCharCode(65 + (id % 26)) + (id % 10);
  
  if (hash % 3 === 0) {
    return `${prefix} ${noun} ${suffix}`;
  } else if (hash % 3 === 1) {
    return `${prefix} ${noun} ${suffix} ${uniqueIdentifier}`;
  } else {
    return `${noun} ${suffix} ${uniqueIdentifier}`;
  }
};

const getRealVenueName = (venueType: string, id: number): string => {
  switch (venueType) {
    case 'bar':
      const barNames = ["The Perch Brewery", "SanTan Brewing Company", "The Ostrich", "Bourbon Jacks", "Murphy's Law Irish Pub"];
      return barNames[id] || `${barNames[id % barNames.length]} ${id}`;
    case 'coffee-shop':
      const coffeeShopNames = ["Peixoto Coffee Roasters", "Sip Coffee & Beer House", "Press Coffee Roasters", "Mythical Coffee", "Bergie's Coffee Roast House"];
      return coffeeShopNames[id] || `${coffeeShopNames[id % coffeeShopNames.length]} ${id}`;
    case 'art-festival':
      const artFestivalNames = ["Chandler Art Walk", "Chandler Craft Spirits Festival", "Gilbert Art Walk", "Tempe Festival of the Arts", "Chandler Jazz Festival"];
      return artFestivalNames[id] || `${artFestivalNames[id % artFestivalNames.length]} ${id}`;
    case 'comedy-venue':
      const comedyVenueNames = ["Tempe Improv", "Stand Up Live Phoenix", "House of Comedy Arizona", "The Comedy Spot", "Laugh Factory Phoenix"];
      return comedyVenueNames[id] || `${comedyVenueNames[id % comedyVenueNames.length]} ${id}`;
    case 'nature-walk':
      const natureWalkNames = ["Veterans Oasis Park", "Paseo Vista Recreation Area", "Desert Breeze Park", "Riparian Preserve at Water Ranch", "South Mountain Park"];
      return natureWalkNames[id] || `${natureWalkNames[id % natureWalkNames.length]} ${id}`;
    case 'music-venue':
      const musicVenueNames = ["Chandler Center for the Arts", "The Marquee Theatre", "Rawhide Event Center", "Crescent Ballroom", "The Van Buren"];
      return musicVenueNames[id] || `${musicVenueNames[id % musicVenueNames.length]} ${id}`;
    case 'thrift-store':
      const thriftStoreNames = ["Goodwill Chandler", "Savers Chandler", "Uptown Cheapskate", "Plato's Closet", "Buffalo Exchange"];
      return thriftStoreNames[id] || `${thriftStoreNames[id % thriftStoreNames.length]} ${id}`;
    case 'social-club':
      const socialClubNames = ["Chandler Chamber of Commerce", "Chandler Rotary Club", "Chandler Elks Lodge", "Chandler Toastmasters", "Chandler Women's Club"];
      return socialClubNames[id] || `${socialClubNames[id % socialClubNames.length]} ${id}`;
    case 'sports-club':
      const sportsClubNames = ["Chandler Tennis Center", "Tumbleweed Recreation Center", "Chandler YMCA", "EoS Fitness Chandler", "Life Time Athletic Chandler"];
      return sportsClubNames[id] || `${sportsClubNames[id % sportsClubNames.length]} ${id}`;
    case 'club':
      const clubNames = ["Chandler Chess Club", "Chandler Photography Club", "Chandler Maker Space", "Chandler Book Club", "Chandler Garden Club"];
      return clubNames[id] || `${clubNames[id % clubNames.length]} ${id}`;
    default:
      return `Venue ${id}`;
  }
};

export const getRealAddress = (venueType: string, id: number): string => {
  switch (venueType) {
    case 'bar':
      const barAddresses = [
        "232 S Wall St, Chandler, AZ 85225",
        "8 S San Marcos Pl, Chandler, AZ 85225",
        "10 N San Marcos Pl, Chandler, AZ 85225",
        "11 W Boston St, Chandler, AZ 85225",
        "58 S San Marcos Pl, Chandler, AZ 85225"
      ];
      return barAddresses[id] || generateAddress(id);
    case 'coffee-shop':
      const coffeeShopAddresses = [
        "11 W Boston St, Chandler, AZ 85225",
        "3617 E Monarch Way, Gilbert, AZ 85296",
        "2577 S Val Vista Dr, Gilbert, AZ 85295",
        "114 W Main St, Mesa, AZ 85201",
        "309 N Gilbert Rd, Gilbert, AZ 85234"
      ];
      return coffeeShopAddresses[id] || generateAddress(id);
    case 'art-festival':
      const artFestivalAddresses = [
        "3 S Arizona Ave, Chandler, AZ 85225",
        "125 E Commonwealth Ave, Chandler, AZ 85225",
        "207 N Gilbert Rd, Gilbert, AZ 85234",
        "310 S Mill Ave, Tempe, AZ 85281",
        "250 S Arizona Ave, Chandler, AZ 85225"
      ];
      return artFestivalAddresses[id] || generateAddress(id);
    case 'comedy-venue':
      const comedyVenueAddresses = [
        "930 E University Dr, Tempe, AZ 85281",
        "50 W Jefferson St, Phoenix, AZ 85003",
        "5350 E High St, Phoenix, AZ 85054",
        "7117 E 3rd Ave, Scottsdale, AZ 85251",
        "50 E Jefferson St, Phoenix, AZ 85004"
      ];
      return comedyVenueAddresses[id] || generateAddress(id);
    case 'nature-walk':
      const natureWalkAddresses = [
        "4050 E Chandler Heights Rd, Chandler, AZ 85249",
        "3850 S McQueen Rd, Chandler, AZ 85286",
        "660 N Desert Breeze Blvd, Chandler, AZ 85226",
        "2757 E Guadalupe Rd, Gilbert, AZ 85234",
        "10919 S Central Ave, Phoenix, AZ 85042"
      ];
      return natureWalkAddresses[id] || generateAddress(id);
    case 'music-venue':
      const musicVenueAddresses = [
        "250 N Arizona Ave, Chandler, AZ 85225",
        "730 N Mill Ave, Tempe, AZ 85281",
        "5700 W North Loop Rd, Chandler, AZ 85226",
        "308 N 2nd Ave, Phoenix, AZ 85003",
        "401 W Van Buren St, Phoenix, AZ 85003"
      ];
      return musicVenueAddresses[id] || generateAddress(id);
    case 'thrift-store':
      const thriftStoreAddresses = [
        "2075 N Dobson Rd, Chandler, AZ 85224",
        "1800 S Alma School Rd, Chandler, AZ 85286",
        "1909 E Ray Rd, Chandler, AZ 85225",
        "2880 E Germann Rd, Chandler, AZ 85286",
        "227 W University Dr, Tempe, AZ 85281"
      ];
      return thriftStoreAddresses[id] || generateAddress(id);
    case 'social-club':
      const socialClubAddresses = [
        "25 S Arizona Pl, Chandler, AZ 85225",
        "1 S San Marcos Pl, Chandler, AZ 85225",
        "1775 W Chandler Blvd, Chandler, AZ 85224",
        "125 E Commonwealth Ave, Chandler, AZ 85225",
        "1200 S Arizona Ave, Chandler, AZ 85286"
      ];
      return socialClubAddresses[id] || generateAddress(id);
    case 'sports-club':
      const sportsClubAddresses = [
        "2250 S McQueen Rd, Chandler, AZ 85286",
        "745 E Germann Rd, Chandler, AZ 85286",
        "1655 W Frye Rd, Chandler, AZ 85224",
        "2100 S Gilbert Rd, Chandler, AZ 85286",
        "875 W Frye Rd, Chandler, AZ 85225"
      ];
      return sportsClubAddresses[id] || generateAddress(id);
    case 'club':
      const clubAddresses = [
        "222 E Commonwealth Ave, Chandler, AZ 85225",
        "125 E Commonwealth Ave, Chandler, AZ 85225",
        "249 E Chicago St, Chandler, AZ 85225",
        "22 S Delaware St, Chandler, AZ 85225",
        "300 S Chandler Village Dr, Chandler, AZ 85226"
      ];
      return clubAddresses[id] || generateAddress(id);
    default:
      return generateAddress(id);
  }
};

export const generateCoordinates = (id: number): { latitude: number; longitude: number } => {
  const baseLat = 33.3000;
  const baseLng = -111.8400;
  
  const hash = (id * 31) % 997;
  const secondaryHash = (id * 17) % 773;
  
  const latOffset = ((hash % 1000) - 500) / 1000;
  const lngOffset = ((secondaryHash % 1000) - 500) / 1000;
  
  const uniqueLatVariation = (id % 100) / 10000;
  const uniqueLngVariation = ((id * 3) % 100) / 10000;
  
  return {
    latitude: baseLat + latOffset + uniqueLatVariation,
    longitude: baseLng + lngOffset + uniqueLngVariation
  };
};
