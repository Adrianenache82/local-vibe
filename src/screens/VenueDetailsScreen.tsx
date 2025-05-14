import { Venue } from "../models/venue";
import { Bar } from "../models/bar";
import { CoffeeShop } from "../models/coffee-shop";
import { ArtFestival } from "../models/art-festival";
import { ComedyVenue } from "../models/comedy-venue";
import { NatureWalk } from "../models/nature-walk";
import { MusicVenue } from "../models/music-venue";
import { ThriftStore } from "../models/thrift-store";
import { SocialClub } from "../models/social-club";
import { SportsClub } from "../models/sports-club";
import { Club } from "../models/club";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { ArrowLeft, MapPin, Star, Calendar, Wifi, Beer, Coffee, Palette, Mic, Mountain, Music, ShoppingBag, Users, Trophy, Bookmark } from "lucide-react";
import { MapComponent } from "../components/MapComponent";
import { RandomVenueModal } from "../components/RandomVenueModal";

interface VenueDetailsScreenProps {
  venue: Venue;
  onBack: () => void;
}

export function VenueDetailsScreen({ venue, onBack }: VenueDetailsScreenProps) {
  const getVenueTypeIcon = (type: string) => {
    switch (type) {
      case 'bar':
        return <Beer className="h-5 w-5" />;
      case 'coffee-shop':
        return <Coffee className="h-5 w-5" />;
      case 'art-festival':
        return <Palette className="h-5 w-5" />;
      case 'comedy-venue':
        return <Mic className="h-5 w-5" />;
      case 'nature-walk':
        return <Mountain className="h-5 w-5" />;
      case 'music-venue':
        return <Music className="h-5 w-5" />;
      case 'thrift-store':
        return <ShoppingBag className="h-5 w-5" />;
      case 'social-club':
        return <Users className="h-5 w-5" />;
      case 'sports-club':
        return <Trophy className="h-5 w-5" />;
      case 'club':
        return <Bookmark className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const renderVenueSpecificDetails = () => {
    switch (venue.type) {
      case 'bar':
        const bar = venue as Bar;
        return (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Specialties</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {bar.specialties.map((specialty, index) => (
                <Badge key={index} variant="outline">{specialty}</Badge>
              ))}
            </div>
            {bar.happyHour && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Happy Hour</h3>
                <p className="text-muted-foreground">
                  {bar.happyHour.start} - {bar.happyHour.end}
                </p>
              </div>
            )}
          </div>
        );
      case 'coffee-shop':
        const coffeeShop = venue as CoffeeShop;
        return (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Specialties</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {coffeeShop.specialties.map((specialty, index) => (
                <Badge key={index} variant="outline">{specialty}</Badge>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Wifi className="h-5 w-5" />
              <span>{coffeeShop.hasWifi ? 'Free Wi-Fi Available' : 'No Wi-Fi'}</span>
            </div>
          </div>
        );
      case 'art-festival':
        const artFestival = venue as ArtFestival;
        return (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Festival Dates</h3>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5" />
              <span>{new Date(artFestival.startDate).toLocaleDateString()} - {new Date(artFestival.endDate).toLocaleDateString()}</span>
            </div>
            
            <h3 className="text-lg font-semibold mb-2 mt-4">Featured Artists</h3>
            <ul className="list-disc pl-5">
              {artFestival.artists.map((artist, index) => (
                <li key={index}>{artist}</li>
              ))}
            </ul>
            
            {artFestival.ticketPrice && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Ticket Price</h3>
                <p className="text-muted-foreground">${artFestival.ticketPrice.toFixed(2)}</p>
              </div>
            )}
          </div>
        );
      case 'comedy-venue':
        const comedyVenue = venue as ComedyVenue;
        return (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Performance Days</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {comedyVenue.performanceDays.map((day, index) => (
                <Badge key={index} variant="outline">{day}</Badge>
              ))}
            </div>
            
            <h3 className="text-lg font-semibold mb-2 mt-4">Featured Comedians</h3>
            <ul className="list-disc pl-5">
              {comedyVenue.comedians.map((comedian, index) => (
                <li key={index}>{comedian}</li>
              ))}
            </ul>
            
            {comedyVenue.ticketPrice && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Ticket Price</h3>
                <p className="text-muted-foreground">${comedyVenue.ticketPrice.toFixed(2)}</p>
              </div>
            )}
            
            {comedyVenue.ageRestriction && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Age Restriction</h3>
                <p className="text-muted-foreground">{comedyVenue.ageRestriction}</p>
              </div>
            )}
          </div>
        );
      case 'nature-walk':
        const natureWalk = venue as NatureWalk;
        return (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Trail Information</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-medium">Difficulty</p>
                <p className="text-muted-foreground">{natureWalk.difficulty}</p>
              </div>
              <div>
                <p className="font-medium">Length</p>
                <p className="text-muted-foreground">{natureWalk.length} miles</p>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold mb-2 mt-4">Features</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {natureWalk.features.map((feature, index) => (
                <Badge key={index} variant="outline">{feature}</Badge>
              ))}
            </div>
            
            {natureWalk.bestSeason && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Best Season to Visit</h3>
                <p className="text-muted-foreground">{natureWalk.bestSeason}</p>
              </div>
            )}
          </div>
        );
      case 'music-venue':
        const musicVenue = venue as MusicVenue;
        return (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Music Genres</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {musicVenue.genres.map((genre, index) => (
                <Badge key={index} variant="outline">{genre}</Badge>
              ))}
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Venue Capacity</h3>
              <p className="text-muted-foreground">{musicVenue.capacity} people</p>
            </div>
            
            {musicVenue.upcomingShows && musicVenue.upcomingShows.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Upcoming Shows</h3>
                <ul className="list-disc pl-5">
                  {musicVenue.upcomingShows.map((show, index) => (
                    <li key={index}>{show}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {musicVenue.ticketPrice && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Average Ticket Price</h3>
                <p className="text-muted-foreground">${musicVenue.ticketPrice.toFixed(2)}</p>
              </div>
            )}
          </div>
        );
      case 'thrift-store':
        const thriftStore = venue as ThriftStore;
        return (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Specialties</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {thriftStore.specialties.map((specialty, index) => (
                <Badge key={index} variant="outline">{specialty}</Badge>
              ))}
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Price Range</h3>
              <p className="text-muted-foreground">{thriftStore.priceRange}</p>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Donation Drop-off</h3>
              <p className="text-muted-foreground">{thriftStore.donationDropOff ? 'Available' : 'Not Available'}</p>
            </div>
            
            {thriftStore.openingHours && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Opening Hours</h3>
                <p className="text-muted-foreground">{thriftStore.openingHours.open} - {thriftStore.openingHours.close}</p>
              </div>
            )}
          </div>
        );
      case 'social-club':
        const socialClub = venue as SocialClub;
        return (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Activities</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {socialClub.activities.map((activity, index) => (
                <Badge key={index} variant="outline">{activity}</Badge>
              ))}
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Membership Required</h3>
              <p className="text-muted-foreground">{socialClub.membershipRequired ? 'Yes' : 'No'}</p>
            </div>
            
            {socialClub.membershipFee !== undefined && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Membership Fee</h3>
                <p className="text-muted-foreground">${socialClub.membershipFee.toFixed(2)}</p>
              </div>
            )}
            
            {socialClub.ageGroup && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Age Group</h3>
                <p className="text-muted-foreground">{socialClub.ageGroup}</p>
              </div>
            )}
            
            {socialClub.meetingSchedule && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Meeting Schedule</h3>
                <p className="text-muted-foreground">{socialClub.meetingSchedule}</p>
              </div>
            )}
          </div>
        );
      case 'sports-club':
        const sportsClub = venue as SportsClub;
        return (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Sports</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {sportsClub.sports.map((sport, index) => (
                <Badge key={index} variant="outline">{sport}</Badge>
              ))}
            </div>
            
            <h3 className="text-lg font-semibold mb-2 mt-4">Facilities</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {sportsClub.facilities.map((facility, index) => (
                <Badge key={index} variant="outline">{facility}</Badge>
              ))}
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Open to Public</h3>
              <p className="text-muted-foreground">{sportsClub.openToPublic ? 'Yes' : 'No'}</p>
            </div>
            
            {sportsClub.membershipFee !== undefined && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Membership Fee</h3>
                <p className="text-muted-foreground">${sportsClub.membershipFee.toFixed(2)}</p>
              </div>
            )}
            
            {sportsClub.leagues && sportsClub.leagues.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Leagues</h3>
                <ul className="list-disc pl-5">
                  {sportsClub.leagues.map((league, index) => (
                    <li key={index}>{league}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {sportsClub.equipmentRental !== undefined && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Equipment Rental</h3>
                <p className="text-muted-foreground">{sportsClub.equipmentRental ? 'Available' : 'Not Available'}</p>
              </div>
            )}
          </div>
        );
      case 'club':
        const club = venue as Club;
        return (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Category</h3>
            <p className="text-muted-foreground mb-4">{club.category}</p>
            
            <h3 className="text-lg font-semibold mb-2">Activities</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {club.activities.map((activity, index) => (
                <Badge key={index} variant="outline">{activity}</Badge>
              ))}
            </div>
            
            <h3 className="text-lg font-semibold mb-2 mt-4">Amenities</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {club.amenities.map((amenity, index) => (
                <Badge key={index} variant="outline">{amenity}</Badge>
              ))}
            </div>
            
            {club.membershipFee !== undefined && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Membership Fee</h3>
                <p className="text-muted-foreground">${club.membershipFee.toFixed(2)}</p>
              </div>
            )}
            
            {club.schedule && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Schedule</h3>
                <p className="text-muted-foreground">{club.schedule}</p>
              </div>
            )}
            
            {club.requirements && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                <p className="text-muted-foreground">{club.requirements}</p>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-4">
        <Button 
          variant="ghost" 
          className="flex items-center gap-2" 
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to venues
        </Button>
        
        <RandomVenueModal onVenueSelect={(newVenue) => {
          onBack();
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('select-venue', { detail: newVenue }));
          }, 100);
        }} />
      </div>
      
      <div className="relative h-64 w-full mb-6 rounded-lg overflow-hidden">
        <img 
          src={venue.imageUrl} 
          alt={venue.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex items-center gap-2 mb-2">
        <Badge className="flex items-center gap-1">
          {getVenueTypeIcon(venue.type)}
          {venue.type === 'bar' ? 'Bar' : 
           venue.type === 'coffee-shop' ? 'Coffee Shop' : 
           venue.type === 'art-festival' ? 'Art Festival' : 
           venue.type === 'comedy-venue' ? 'Comedy Venue' : 
           venue.type === 'nature-walk' ? 'Nature Walk' :
           venue.type === 'music-venue' ? 'Music Venue' :
           venue.type === 'thrift-store' ? 'Thrift Store' :
           venue.type === 'social-club' ? 'Social Club' :
           venue.type === 'sports-club' ? 'Sports Club' :
           'Club'}
        </Badge>
        <div className="flex items-center gap-1 ml-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{venue.rating.toFixed(1)}</span>
        </div>
      </div>
      
      <h1 className="text-3xl font-bold mb-2">{venue.name}</h1>
      
      <div className="flex items-center gap-1 text-muted-foreground mb-4">
        <MapPin className="h-4 w-4" />
        <a 
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary hover:underline"
        >
          {venue.address}
        </a>
      </div>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <p className="text-muted-foreground">{venue.description}</p>
          
          {renderVenueSpecificDetails()}
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Location</h2>
          <div className="rounded-lg overflow-hidden">
            <MapComponent 
              center={{ 
                lat: venue.coordinates.latitude, 
                lng: venue.coordinates.longitude 
              }}
              zoom={15}
              markers={[{
                id: venue.id,
                position: {
                  lat: venue.coordinates.latitude,
                  lng: venue.coordinates.longitude
                },
                title: venue.name
              }]}
            />
            <div className="mt-2 text-sm">
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${venue.coordinates.latitude},${venue.coordinates.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center gap-1"
              >
                <MapPin className="h-4 w-4" />
                View on Google Maps
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
