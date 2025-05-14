import { useEffect, useState } from "react";
import { VenueCard } from "../components/VenueCard";
import { VenueService } from "../services/venue-service";
import { DatabaseUpdateService } from "../services/database-update-service";
import { Venue } from "../models/venue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Search, MapPin, List } from "lucide-react";
import { MapComponent } from "../components/MapComponent";
import { Button } from "../components/ui/button";
import { RandomVenueModal } from "../components/RandomVenueModal";

export function HomeScreen({ onVenueSelect }: { onVenueSelect: (venue: Venue) => void }) {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const allVenues = await DatabaseUpdateService.getAllVenues();
        setVenues(allVenues);
        setFilteredVenues(allVenues);
      } catch (error) {
        console.error('Error fetching venues from DatabaseUpdateService:', error);
        const fallbackVenues = await VenueService.getAllVenues();
        setVenues(fallbackVenues);
        setFilteredVenues(fallbackVenues);
      }
    };

    fetchVenues();

    const handleDatabaseUpdate = async () => {
      fetchVenues();
    };

    window.addEventListener('database-updated', handleDatabaseUpdate);

    return () => {
      window.removeEventListener('database-updated', handleDatabaseUpdate);
    };
  }, []);

  useEffect(() => {
    let result = venues;

    if (activeTab !== "all") {
      result = venues.filter(venue => venue.type === activeTab);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(venue => 
        venue.name.toLowerCase().includes(query) || 
        venue.description.toLowerCase().includes(query)
      );
    }

    setFilteredVenues(result);
  }, [venues, activeTab, searchQuery]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="container mx-auto py-4 px-3 sm:py-6 sm:px-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-6">Local Vibe</h1>
      <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-8">
        Discover the best local bars, coffee shops, and art festivals near you.
      </p>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
        <div className="relative w-full sm:flex-1 sm:mr-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search venues..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between w-full sm:w-auto sm:justify-start gap-2 sm:gap-3">
          <RandomVenueModal onVenueSelect={onVenueSelect} />
          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              className="rounded-none px-2 sm:px-3 py-1 h-9 sm:h-10"
              onClick={() => setViewMode("list")}
              aria-label="List View"
            >
              <List className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">List</span>
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "ghost"}
              className="rounded-none px-2 sm:px-3 py-1 h-9 sm:h-10"
              onClick={() => setViewMode("map")}
              aria-label="Map View"
            >
              <MapPin className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Map</span>
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={handleTabChange}>
        <div className="mb-4 sm:mb-6">
          <TabsList className="flex flex-wrap justify-center gap-1.5 w-full bg-gradient-to-r from-blue-50 to-indigo-50 p-1.5 rounded-lg shadow-sm overflow-visible">
            <TabsTrigger 
              value="all" 
              className="text-[11px] sm:text-xs font-medium h-9 sm:h-9 px-3 py-0 bg-white shadow-sm hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-white flex items-center justify-center rounded-md border border-gray-200 m-0 min-w-[70px]"
            >
              All ({venues.length})
            </TabsTrigger>
            <TabsTrigger 
              value="bar" 
              className="text-[11px] sm:text-xs font-medium h-9 sm:h-9 px-3 py-0 bg-white shadow-sm hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-white flex items-center justify-center rounded-md border border-gray-200 m-0 min-w-[70px]"
            >
              Bars ({venues.filter(v => v.type === 'bar').length})
            </TabsTrigger>
            <TabsTrigger 
              value="coffee-shop" 
              className="text-[11px] sm:text-xs font-medium h-9 sm:h-9 px-3 py-0 bg-white shadow-sm hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-white flex items-center justify-center rounded-md border border-gray-200 m-0 min-w-[70px]"
            >
              Coffee ({venues.filter(v => v.type === 'coffee-shop').length})
            </TabsTrigger>
            <TabsTrigger 
              value="art-festival" 
              className="text-[11px] sm:text-xs font-medium h-9 sm:h-9 px-3 py-0 bg-white shadow-sm hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-white flex items-center justify-center rounded-md border border-gray-200 m-0 min-w-[70px]"
            >
              Art ({venues.filter(v => v.type === 'art-festival').length})
            </TabsTrigger>
            <TabsTrigger 
              value="comedy-venue" 
              className="text-[11px] sm:text-xs font-medium h-9 sm:h-9 px-3 py-0 bg-white shadow-sm hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-white flex items-center justify-center rounded-md border border-gray-200 m-0 min-w-[70px]"
            >
              Comedy ({venues.filter(v => v.type === 'comedy-venue').length})
            </TabsTrigger>
            <TabsTrigger 
              value="nature-walk" 
              className="text-[11px] sm:text-xs font-medium h-9 sm:h-9 px-3 py-0 bg-white shadow-sm hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-white flex items-center justify-center rounded-md border border-gray-200 m-0 min-w-[70px]"
            >
              Nature ({venues.filter(v => v.type === 'nature-walk').length})
            </TabsTrigger>
            <TabsTrigger 
              value="music-venue" 
              className="text-[11px] sm:text-xs font-medium h-9 sm:h-9 px-3 py-0 bg-white shadow-sm hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-white flex items-center justify-center rounded-md border border-gray-200 m-0 min-w-[70px]"
            >
              Music ({venues.filter(v => v.type === 'music-venue').length})
            </TabsTrigger>
            <TabsTrigger 
              value="thrift-store" 
              className="text-[11px] sm:text-xs font-medium h-9 sm:h-9 px-3 py-0 bg-white shadow-sm hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-white flex items-center justify-center rounded-md border border-gray-200 m-0 min-w-[70px]"
            >
              Thrift ({venues.filter(v => v.type === 'thrift-store').length})
            </TabsTrigger>
            <TabsTrigger 
              value="social-club" 
              className="text-[11px] sm:text-xs font-medium h-9 sm:h-9 px-3 py-0 bg-white shadow-sm hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-white flex items-center justify-center rounded-md border border-gray-200 m-0 min-w-[70px]"
            >
              Social ({venues.filter(v => v.type === 'social-club').length})
            </TabsTrigger>
            <TabsTrigger 
              value="sports-club" 
              className="text-[11px] sm:text-xs font-medium h-9 sm:h-9 px-3 py-0 bg-white shadow-sm hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-white flex items-center justify-center rounded-md border border-gray-200 m-0 min-w-[70px]"
            >
              Sports ({venues.filter(v => v.type === 'sports-club').length})
            </TabsTrigger>
            <TabsTrigger 
              value="club" 
              className="text-[11px] sm:text-xs font-medium h-9 sm:h-9 px-3 py-0 bg-white shadow-sm hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-white flex items-center justify-center rounded-md border border-gray-200 m-0 min-w-[70px]"
            >
              Other ({venues.filter(v => v.type === 'club').length})
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          {viewMode === "list" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues.map((venue) => (
                <VenueCard 
                  key={venue.id} 
                  venue={venue} 
                  onClick={() => onVenueSelect(venue)} 
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg overflow-hidden">
              <MapComponent 
                center={{ 
                  lat: filteredVenues.length > 0 ? filteredVenues[0].coordinates.latitude : 40.7128, 
                  lng: filteredVenues.length > 0 ? filteredVenues[0].coordinates.longitude : -74.0060 
                }}
                zoom={13}
                markers={filteredVenues.map(venue => ({
                  id: venue.id,
                  position: {
                    lat: venue.coordinates.latitude,
                    lng: venue.coordinates.longitude
                  },
                  title: venue.name
                }))}
                onClick={(marker) => {
                  const venue = filteredVenues.find(v => v.id === marker.id);
                  if (venue) onVenueSelect(venue);
                }}
              />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="bar" className="mt-0">
          {viewMode === "list" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues.map((venue) => (
                <VenueCard 
                  key={venue.id} 
                  venue={venue} 
                  onClick={() => onVenueSelect(venue)} 
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg overflow-hidden">
              <MapComponent 
                center={{ 
                  lat: filteredVenues.length > 0 ? filteredVenues[0].coordinates.latitude : 40.7128, 
                  lng: filteredVenues.length > 0 ? filteredVenues[0].coordinates.longitude : -74.0060 
                }}
                zoom={13}
                markers={filteredVenues.map(venue => ({
                  id: venue.id,
                  position: {
                    lat: venue.coordinates.latitude,
                    lng: venue.coordinates.longitude
                  },
                  title: venue.name
                }))}
                onClick={(marker) => {
                  const venue = filteredVenues.find(v => v.id === marker.id);
                  if (venue) onVenueSelect(venue);
                }}
              />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="coffee-shop" className="mt-0">
          {viewMode === "list" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues.map((venue) => (
                <VenueCard 
                  key={venue.id} 
                  venue={venue} 
                  onClick={() => onVenueSelect(venue)} 
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg overflow-hidden">
              <MapComponent 
                center={{ 
                  lat: filteredVenues.length > 0 ? filteredVenues[0].coordinates.latitude : 40.7128, 
                  lng: filteredVenues.length > 0 ? filteredVenues[0].coordinates.longitude : -74.0060 
                }}
                zoom={13}
                markers={filteredVenues.map(venue => ({
                  id: venue.id,
                  position: {
                    lat: venue.coordinates.latitude,
                    lng: venue.coordinates.longitude
                  },
                  title: venue.name
                }))}
                onClick={(marker) => {
                  const venue = filteredVenues.find(v => v.id === marker.id);
                  if (venue) onVenueSelect(venue);
                }}
              />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="art-festival" className="mt-0">
          {viewMode === "list" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues.map((venue) => (
                <VenueCard 
                  key={venue.id} 
                  venue={venue} 
                  onClick={() => onVenueSelect(venue)} 
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg overflow-hidden">
              <MapComponent 
                center={{ 
                  lat: filteredVenues.length > 0 ? filteredVenues[0].coordinates.latitude : 40.7128, 
                  lng: filteredVenues.length > 0 ? filteredVenues[0].coordinates.longitude : -74.0060 
                }}
                zoom={13}
                markers={filteredVenues.map(venue => ({
                  id: venue.id,
                  position: {
                    lat: venue.coordinates.latitude,
                    lng: venue.coordinates.longitude
                  },
                  title: venue.name
                }))}
                onClick={(marker) => {
                  const venue = filteredVenues.find(v => v.id === marker.id);
                  if (venue) onVenueSelect(venue);
                }}
              />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="comedy-venue" className="mt-0">
          {viewMode === "list" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues.map((venue) => (
                <VenueCard 
                  key={venue.id} 
                  venue={venue} 
                  onClick={() => onVenueSelect(venue)} 
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg overflow-hidden">
              <MapComponent 
                center={{ 
                  lat: filteredVenues.length > 0 ? filteredVenues[0].coordinates.latitude : 40.7128, 
                  lng: filteredVenues.length > 0 ? filteredVenues[0].coordinates.longitude : -74.0060 
                }}
                zoom={13}
                markers={filteredVenues.map(venue => ({
                  id: venue.id,
                  position: {
                    lat: venue.coordinates.latitude,
                    lng: venue.coordinates.longitude
                  },
                  title: venue.name
                }))}
                onClick={(marker) => {
                  const venue = filteredVenues.find(v => v.id === marker.id);
                  if (venue) onVenueSelect(venue);
                }}
              />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="nature-walk" className="mt-0">
          {viewMode === "list" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues.map((venue) => (
                <VenueCard 
                  key={venue.id} 
                  venue={venue} 
                  onClick={() => onVenueSelect(venue)} 
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg overflow-hidden">
              <MapComponent 
                center={{ 
                  lat: filteredVenues.length > 0 ? filteredVenues[0].coordinates.latitude : 40.7128, 
                  lng: filteredVenues.length > 0 ? filteredVenues[0].coordinates.longitude : -74.0060 
                }}
                zoom={13}
                markers={filteredVenues.map(venue => ({
                  id: venue.id,
                  position: {
                    lat: venue.coordinates.latitude,
                    lng: venue.coordinates.longitude
                  },
                  title: venue.name
                }))}
                onClick={(marker) => {
                  const venue = filteredVenues.find(v => v.id === marker.id);
                  if (venue) onVenueSelect(venue);
                }}
              />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="music-venue" className="mt-0">
          {viewMode === "list" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues.map((venue) => (
                <VenueCard 
                  key={venue.id} 
                  venue={venue} 
                  onClick={() => onVenueSelect(venue)} 
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg overflow-hidden">
              <MapComponent 
                center={{ 
                  lat: filteredVenues.length > 0 ? filteredVenues[0].coordinates.latitude : 40.7128, 
                  lng: filteredVenues.length > 0 ? filteredVenues[0].coordinates.longitude : -74.0060 
                }}
                zoom={13}
                markers={filteredVenues.map(venue => ({
                  id: venue.id,
                  position: {
                    lat: venue.coordinates.latitude,
                    lng: venue.coordinates.longitude
                  },
                  title: venue.name
                }))}
                onClick={(marker) => {
                  const venue = filteredVenues.find(v => v.id === marker.id);
                  if (venue) onVenueSelect(venue);
                }}
              />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="thrift-store" className="mt-0">
          {viewMode === "list" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues.map((venue) => (
                <VenueCard 
                  key={venue.id} 
                  venue={venue} 
                  onClick={() => onVenueSelect(venue)} 
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg overflow-hidden">
              <MapComponent 
                center={{ 
                  lat: filteredVenues.length > 0 ? filteredVenues[0].coordinates.latitude : 40.7128, 
                  lng: filteredVenues.length > 0 ? filteredVenues[0].coordinates.longitude : -74.0060 
                }}
                zoom={13}
                markers={filteredVenues.map(venue => ({
                  id: venue.id,
                  position: {
                    lat: venue.coordinates.latitude,
                    lng: venue.coordinates.longitude
                  },
                  title: venue.name
                }))}
                onClick={(marker) => {
                  const venue = filteredVenues.find(v => v.id === marker.id);
                  if (venue) onVenueSelect(venue);
                }}
              />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="social-club" className="mt-0">
          {viewMode === "list" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues.map((venue) => (
                <VenueCard 
                  key={venue.id} 
                  venue={venue} 
                  onClick={() => onVenueSelect(venue)} 
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg overflow-hidden">
              <MapComponent 
                center={{ 
                  lat: filteredVenues.length > 0 ? filteredVenues[0].coordinates.latitude : 40.7128, 
                  lng: filteredVenues.length > 0 ? filteredVenues[0].coordinates.longitude : -74.0060 
                }}
                zoom={13}
                markers={filteredVenues.map(venue => ({
                  id: venue.id,
                  position: {
                    lat: venue.coordinates.latitude,
                    lng: venue.coordinates.longitude
                  },
                  title: venue.name
                }))}
                onClick={(marker) => {
                  const venue = filteredVenues.find(v => v.id === marker.id);
                  if (venue) onVenueSelect(venue);
                }}
              />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="sports-club" className="mt-0">
          {viewMode === "list" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues.map((venue) => (
                <VenueCard 
                  key={venue.id} 
                  venue={venue} 
                  onClick={() => onVenueSelect(venue)} 
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg overflow-hidden">
              <MapComponent 
                center={{ 
                  lat: filteredVenues.length > 0 ? filteredVenues[0].coordinates.latitude : 40.7128, 
                  lng: filteredVenues.length > 0 ? filteredVenues[0].coordinates.longitude : -74.0060 
                }}
                zoom={13}
                markers={filteredVenues.map(venue => ({
                  id: venue.id,
                  position: {
                    lat: venue.coordinates.latitude,
                    lng: venue.coordinates.longitude
                  },
                  title: venue.name
                }))}
                onClick={(marker) => {
                  const venue = filteredVenues.find(v => v.id === marker.id);
                  if (venue) onVenueSelect(venue);
                }}
              />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="club" className="mt-0">
          {viewMode === "list" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues.map((venue) => (
                <VenueCard 
                  key={venue.id} 
                  venue={venue} 
                  onClick={() => onVenueSelect(venue)} 
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg overflow-hidden">
              <MapComponent 
                center={{ 
                  lat: filteredVenues.length > 0 ? filteredVenues[0].coordinates.latitude : 40.7128, 
                  lng: filteredVenues.length > 0 ? filteredVenues[0].coordinates.longitude : -74.0060 
                }}
                zoom={13}
                markers={filteredVenues.map(venue => ({
                  id: venue.id,
                  position: {
                    lat: venue.coordinates.latitude,
                    lng: venue.coordinates.longitude
                  },
                  title: venue.name
                }))}
                onClick={(marker) => {
                  const venue = filteredVenues.find(v => v.id === marker.id);
                  if (venue) onVenueSelect(venue);
                }}
              />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
