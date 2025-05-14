import { MapPin } from "lucide-react";

interface StaticMapComponentProps {
  center: {
    lat: number;
    lng: number;
  };
  markers?: Array<{
    id: string;
    position: {
      lat: number;
      lng: number;
    };
    title?: string;
  }>;
  onClick?: (marker: { id: string }) => void;
  zoom?: number;
}

export function StaticMapComponent({ center, markers = [], onClick, zoom = 14 }: StaticMapComponentProps) {
  const createGoogleStaticMapUrl = () => {
    const apiKey = ''; // No API key needed for this implementation
    const markerParams = markers.map(marker => 
      `markers=color:red%7Clabel:${marker.title?.charAt(0) || 'L'}%7C${marker.position.lat},${marker.position.lng}`
    ).join('&');
    
    return `https://maps.googleapis.com/maps/api/staticmap?center=${center.lat},${center.lng}&zoom=${zoom}&size=600x400&maptype=roadmap&${markerParams}&key=${apiKey}`;
  };

  const createGoogleMapsUrl = () => {
    if (markers.length > 0) {
      const marker = markers[0];
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(marker.title || "Location")}&center=${marker.position.lat},${marker.position.lng}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lng}`;
  };
  
  return (
    <div className="relative h-[400px] w-full bg-gray-100 rounded-lg overflow-hidden">
      {/* Primary Map - Using Google Maps iframe */}
      <div className="absolute inset-0">
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
          className="w-full h-full"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            document.querySelector('.static-map-fallback')?.setAttribute('style', 'display: block');
          }}
        />
      </div>
      
      {/* Static Map Fallback */}
      <div className="absolute inset-0 static-map-fallback" style={{ display: 'none' }}>
        <img 
          src={createGoogleStaticMapUrl()} 
          alt="Map" 
          className="w-full h-full object-cover"
          onError={() => {
            document.querySelector('.markers-only')?.setAttribute('style', 'display: block');
          }}
        />
      </div>
      
      {/* Markers-only fallback */}
      <div className="absolute inset-0 markers-only bg-gradient-to-b from-blue-50 to-blue-100" style={{ display: 'none' }}>
        {markers.map((marker) => (
          <div 
            key={marker.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ 
              left: `${50 + (marker.position.lng - center.lng) * 10}%`, 
              top: `${50 + (center.lat - marker.position.lat) * 10}%` 
            }}
            onClick={() => onClick && onClick(marker)}
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
      
      {/* Center marker with info */}
      <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-md z-10 max-w-[80%]">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
          <span className="font-medium text-sm truncate">{markers[0]?.title || "Location"}</span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          <a 
            href={createGoogleMapsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            View on Google Maps
          </a>
        </div>
      </div>
      
      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex flex-col bg-white rounded-lg shadow-md">
        <button className="p-2 hover:bg-gray-100 rounded-t-lg border-b">+</button>
        <button className="p-2 hover:bg-gray-100 rounded-b-lg">−</button>
      </div>
    </div>
  );
}
