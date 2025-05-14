import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface MapComponentProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  markers?: Array<{
    id: string;
    position: {
      lat: number;
      lng: number;
    };
    title?: string;
  }>;
  onClick?: (marker: { id: string }) => void;
}

export function MapComponent({ center, zoom = 14, markers = [], onClick }: MapComponentProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapMode, setMapMode] = useState<'google' | 'osm' | 'markers'>('google');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    setMapMode('google');
    
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [center, zoom]);

  const handleGoogleMapError = () => {
    setMapMode('osm');
    setIsLoading(true);
  };

  const handleOsmError = () => {
    setMapMode('markers');
    setIsLoading(false);
  };

  const createGoogleMapsUrl = (marker?: typeof markers[0]) => {
    if (marker) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(marker.title || "Location")}&center=${marker.position.lat},${marker.position.lng}`;
    }
    if (markers.length > 0) {
      const firstMarker = markers[0];
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(firstMarker.title || "Location")}&center=${firstMarker.position.lat},${firstMarker.position.lng}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lng}`;
  };


  const createOpenStreetMapUrl = () => {
    return `https://www.openstreetmap.org/export/embed.html?bbox=${center.lng - 0.01},${center.lat - 0.01},${center.lng + 0.01},${center.lat + 0.01}&layer=mapnik&marker=${center.lat},${center.lng}`;
  };

  const handleMarkerClick = (markerId: string) => {
    if (onClick) {
      onClick({ id: markerId });
    }
  };

  return (
    <div ref={mapContainerRef} className="relative h-[300px] sm:h-[400px] w-full bg-gray-100 rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-20">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-primary"></div>
        </div>
      )}
      
      {/* Google Maps as primary map */}
      {mapMode === 'google' && (
        <iframe 
          src={`https://maps.google.com/maps?q=${encodeURIComponent(markers.length > 0 ? markers[0].title || '' : '')}@${markers.length > 0 ? markers[0].position.lat + ',' + markers[0].position.lng : center.lat + ',' + center.lng}&z=${zoom}&output=embed`}
          width="100%" 
          height="100%" 
          frameBorder="0" 
          style={{ border: 0 }}
          allowFullScreen
          aria-hidden="false"
          tabIndex={0}
          title="Google Map"
          className="w-full h-full absolute inset-0"
          onLoad={() => setIsLoading(false)}
          onError={handleGoogleMapError}
          referrerPolicy="no-referrer-when-downgrade"
        />
      )}
      
      {/* OpenStreetMap as fallback */}
      {mapMode === 'osm' && (
        <iframe 
          src={createOpenStreetMapUrl()}
          width="100%" 
          height="100%" 
          frameBorder="0" 
          style={{ border: 0 }}
          allowFullScreen
          aria-hidden="false"
          tabIndex={0}
          title="OpenStreetMap"
          className="w-full h-full absolute inset-0"
          onLoad={() => setIsLoading(false)}
          onError={handleOsmError}
        />
      )}
      
      {/* Markers-only fallback */}
      {mapMode === 'markers' && (
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-blue-100">
          {markers.map((marker) => (
            <div 
              key={marker.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ 
                left: `${50 + (marker.position.lng - center.lng) * 10}%`, 
                top: `${50 + (center.lat - marker.position.lat) * 10}%` 
              }}
              onClick={() => handleMarkerClick(marker.id)}
            >
              <div className="relative group">
                <MapPin className="h-6 w-6 text-primary fill-primary/20" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white px-2 py-1 rounded shadow-md text-xs whitespace-nowrap">
                    {marker.title || "Location"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Location info */}
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-white p-2 sm:p-3 rounded-lg shadow-md z-10 max-w-[80%]">
        <div className="flex items-center gap-1 sm:gap-2">
          <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
          <span className="font-medium text-xs sm:text-sm truncate">{markers[0]?.title || "Location"}</span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          <a 
            href={createGoogleMapsUrl(markers[0])}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary hover:underline"
          >
            View on Google Maps
          </a>
        </div>
      </div>
      
      {/* Multiple markers info (for map view) */}
      {markers.length > 1 && (
        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-white p-2 sm:p-3 rounded-lg shadow-md z-10">
          <div className="text-xs font-medium">
            {markers.length} locations in this area
          </div>
        </div>
      )}
    </div>
  );
}
