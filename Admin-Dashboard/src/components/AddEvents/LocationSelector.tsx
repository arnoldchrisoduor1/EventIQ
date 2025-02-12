import React, { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/hooks/hooks';
import { RootState } from '@/redux/store';
import InputComponent from '../InputComponent';
import { 
  Building2, 
  MapPin, 
  Home, 
  TowerControl,
  Globe2,
  MapPinned,
  Mail,
  GalleryVerticalEnd
} from 'lucide-react';
import { updateLocation } from '@/redux/slices/addEventSlice';

const LocationSelector = () => {
  const { location } = useSelector((state: RootState) => state.addEvent);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    name: location?.name || '',
    address: location?.address || '',
    city: location?.city || '',
    state: location?.state || '',
    country: location?.country || '',
    zipcode: location?.zipcode || '',
    latitude: location?.coordinates.latitude || '',
    longitude: location?.coordinates.longitude || ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateLocation(formData));
    console.log('Updating location info with...', formData);
    console.log('Location state updated with...', location);
  };

  return (
    <form onSubmit={handleSubmit} className="border border-slate-300 mt-5 p-4">
      <h1 className="text-3xl font-semibold text-black/50">Location</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <InputComponent
            type="text"
            name="name"
            placeholder="Venue Name"
            Icon={Building2}
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <InputComponent
            type="text"
            name="address"
            placeholder="Street Address"
            Icon={Home}
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <InputComponent
            type="text"
            name="city"
            placeholder="City"
            Icon={TowerControl}
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <InputComponent
            type="text"
            name="state"
            placeholder="State/Province"
            Icon={MapPin}
            value={formData.state}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <InputComponent
            type="text"
            name="country"
            placeholder="Country"
            Icon={Globe2}
            value={formData.country}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <InputComponent
            type="text"
            name="zipcode"
            placeholder="Postal/Zip Code"
            Icon={Mail}
            value={formData.zipcode}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <h2 className="text-xl font-semibold text-black/50 mt-6 mb-4">Coordinates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <InputComponent
            type="number"
            name="latitude"
            placeholder="Latitude"
            Icon={MapPinned}
            value={formData.latitude}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <InputComponent
            type="number"
            name="longitude"
            placeholder="Longitude"
            Icon={GalleryVerticalEnd}
            value={formData.longitude}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <button type="submit" className="btn-primary mt-6 w-[150px]">
        Save Location
      </button>
    </form>
  );
};

export default LocationSelector;