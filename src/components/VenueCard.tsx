import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Star } from "lucide-react";
import { Venue } from "../models/venue";

interface VenueCardProps {
  venue: Venue;
  onClick: () => void;
}

export function VenueCard({ venue, onClick }: VenueCardProps) {
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
        return 'Venue';
    }
  };

  return (
    <Card className="w-full cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <div className="relative h-32 sm:h-48 w-full overflow-hidden">
        <img 
          src={venue.imageUrl} 
          alt={venue.name} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <Badge className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-primary text-[9px] sm:text-xs">
          {getVenueTypeLabel(venue.type)}
        </Badge>
      </div>
      <CardHeader className="pb-0.5 sm:pb-2 px-1.5 sm:px-6 pt-1.5 sm:pt-4">
        <CardTitle className="text-sm sm:text-xl line-clamp-1">{venue.name}</CardTitle>
        <CardDescription className="flex items-center gap-0.5 sm:gap-1 text-[9px] sm:text-sm">
          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
          <a 
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.name + ' ' + venue.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="hover:text-primary hover:underline truncate text-blue-600"
          >
            {venue.address}
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0.5 sm:pb-2 px-1.5 sm:px-6">
        <p className="text-[9px] sm:text-sm line-clamp-2">{venue.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-0 px-1.5 sm:px-6 pb-1.5 sm:pb-4">
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-[10px] sm:text-sm font-medium">{venue.rating.toFixed(1)}</span>
        </div>
        {venue.distance && (
          <span className="text-[10px] sm:text-sm text-muted-foreground">{venue.distance} km away</span>
        )}
      </CardFooter>
    </Card>
  );
}
