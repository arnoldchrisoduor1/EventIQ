import React from 'react'
import InputComponent from '../InputComponent'
import { MapPin } from 'lucide-react'

const LocationSelector = () => {
  return (
    <>
        <div className="border border-slate-300 mt-5 p-4">
              <h1 className="text-3xl font-semibold text-black/50">Location</h1>
              <div>
                <InputComponent type="text" placeholder="Name" Icon={MapPin} />
                <InputComponent
                  type="text"
                  placeholder="Address"
                  Icon={MapPin}
                />
              </div>
              <div>
                <InputComponent type="text" placeholder="City" Icon={MapPin} />
                <InputComponent type="text" placeholder="State" Icon={MapPin} />
              </div>
              <div>
                <InputComponent
                  type="text"
                  placeholder="Country"
                  Icon={MapPin}
                />
                <InputComponent
                  type="text"
                  placeholder="Zipcode"
                  Icon={MapPin}
                />
              </div>
              <h1>Co-orinates</h1>
              <div>
                <InputComponent
                  type="number"
                  placeholder="Latitudes"
                  Icon={MapPin}
                />
                <InputComponent
                  type="number"
                  placeholder="Longitudes"
                  Icon={MapPin}
                />
              </div>
            </div>
    </>
  )
}

export default LocationSelector