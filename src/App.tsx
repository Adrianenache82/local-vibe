import { useState, useEffect } from 'react';
import './App.css';
import { HomeScreen } from './screens/HomeScreen';
import { VenueDetailsScreen } from './screens/VenueDetailsScreen';
import { Venue } from './models/venue';
import { DatabaseUpdateService } from './services/database-update-service';

function App() {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [databaseInitialized, setDatabaseInitialized] = useState(false);

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        await DatabaseUpdateService.initialize();
        setDatabaseInitialized(true);
        console.log('Database update service initialized successfully');
      } catch (error) {
        console.error('Error initializing database update service:', error);
        setDatabaseInitialized(true);
      }
    };

    initializeDatabase();
  }, []);

  const handleVenueSelect = (venue: Venue) => {
    setSelectedVenue(venue);
  };

  const handleBackToList = () => {
    setSelectedVenue(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {!databaseInitialized ? (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Initializing database...</p>
          </div>
        </div>
      ) : selectedVenue ? (
        <VenueDetailsScreen venue={selectedVenue} onBack={handleBackToList} />
      ) : (
        <HomeScreen onVenueSelect={handleVenueSelect} />
      )}
    </div>
  );
}

export default App;
