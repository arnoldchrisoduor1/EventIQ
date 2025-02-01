import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import InputComponent from '../InputComponent';
import { Locate } from 'lucide-react';

const LocationSelector = () => {
  const [location, setLocation] = useState({
    address: '',
    coordinates: { lat: null, lng: null }
  });
  const [showMap, setShowMap] = useState(false);

  const handleSearch = () => {
    // This is where you'll integrate the Google Maps/Mapbox search
    setShowMap(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="location" className="text-sm font-medium">
        Location
      </label>
      
      <div className="relative">
        <InputComponent
          type="text"
          Icon={Locate}
          id="location"
          placeholder="Search for a location"
          value={location.address}
          onChange={(e) => setLocation({ ...location, address: e.target.value })}
        />
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
          onClick={handleSearch}
        />
      </div>

      {showMap && (
        <Card className="w-full h-64 bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">Map will be displayed here</p>
        </Card>
      )}

      {location.address && (
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-2">Selected Location</h3>
          <p className="text-gray-600">{location.address}</p>
          {location.coordinates.lat && (
            <p className="text-gray-400 text-sm">
              Lat: {location.coordinates.lat}, Lng: {location.coordinates.lng}
            </p>
          )}
        </Card>
      )}
    </div>
  );
};

export default LocationSelector;