import { useState } from "react";
import { Venue } from "../models/venue";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { MapPin, Star, Beer, Coffee, Palette, Mic, Mountain, Music, ShoppingBag, Users, Trophy, Bookmark } from "lucide-react";
import { MapComponent } from "./MapComponent";

interface RandomVenueModalProps {
  onVenueSelect: (venue: Venue) => void;
}

export function RandomVenueModal({ onVenueSelect }: RandomVenueModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [venue, setVenue] = useState<Venue | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const getVenueTypeLabel = (type: string) => {
    switch (type) {
      case 'bar':
        return 'Bar';
      case 'coffee-shop':
        return 'Coffee Shop';
      case 'art-festival':
        return 'Art Festival';
      case 'comedy-venue':
        return 'Comedy Venue';
      case 'nature-walk':
        return 'Nature Walk';
      case 'music-venue':
        return 'Music Venue';
      case 'thrift-store':
        return 'Thrift Store';
      case 'social-club':
        return 'Social Club';
      case 'sports-club':
        return 'Sports Club';
      case 'club':
        return 'Club';
      default:
        return type;
    }
  };

  const fetchRandomVenue = async () => {
    setIsLoading(true);
    
    try {
      const { VenueService } = await import('../services/venue-service');
      const randomVenue = await VenueService.getRandomVenue();
      setVenue(randomVenue);
    } catch (error) {
      console.error('Error fetching random venue:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = async () => {
    setIsOpen(true);
    fetchRandomVenue();
  };

  const handleViewDetails = () => {
    if (venue) {
      onVenueSelect(venue);
      setIsOpen(false);
    }
  };

  return (
    <>
      <Button 
        onClick={handleOpenModal} 
        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium"
      >
        Things to do randomizer
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Random Suggestion</DialogTitle>
            <DialogDescription>
              Here's something you might enjoy in the area!
            </DialogDescription>
          </DialogHeader>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : venue ? (
            <div className="py-4">
              <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
                <img 
                  src={venue.imageUrl} 
                  alt={venue.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <Badge className="flex items-center gap-1">
                  {getVenueTypeIcon(venue.type)}
                  {getVenueTypeLabel(venue.type)}
                </Badge>
                <div className="flex items-center gap-1 ml-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{venue.rating.toFixed(1)}</span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2">{venue.name}</h3>
              
              <div className="flex items-center gap-1 text-muted-foreground mb-4">
                <MapPin className="h-4 w-4" />
                <span>{venue.address}</span>
              </div>
              
              <p className="text-muted-foreground mb-4">{venue.description}</p>
              
              <div className="h-[150px] rounded-lg overflow-hidden mb-4">
                <MapComponent 
                  center={{ 
                    lat: venue.coordinates.latitude, 
                    lng: venue.coordinates.longitude 
                  }}
                  markers={[{
                    id: venue.id,
                    position: {
                      lat: venue.coordinates.latitude,
                      lng: venue.coordinates.longitude
                    },
                    title: venue.name
                  }]}
                  zoom={14}
                />
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              No venue information available
            </div>
          )}

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <div className="flex flex-1 justify-start">
              {!isLoading && venue && (
                <Button 
                  variant="secondary" 
                  onClick={fetchRandomVenue}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                >
                  Things to do randomizer
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
              {venue && (
                <Button onClick={handleViewDetails}>View Details</Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
