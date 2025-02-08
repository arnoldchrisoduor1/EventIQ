import InputComponent from '../InputComponent'
import { MapPin } from 'lucide-react'

const Capacity_Restrictions = () => {
  return (
    <>
        <div className="mt-5 border border-slate-300 p-4">
              <div className="">
                <h1 className="text-3xl font-semibold text-black/50">
                  Capacity and Restrictions
                </h1>
              </div>

              <div className="flex mt-5">
                <div className="flex flex-col">
                  <label htmlFor="age-restriction" className="gray-header mb-0">
                    Capacity
                  </label>
                  <InputComponent
                    type="number"
                    placeholder="Capacity"
                    Icon={MapPin}
                    id="age-restriction"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="age-restriction" className="gray-header mb-0">
                    Age Restrictions
                  </label>
                  <InputComponent
                    type="number"
                    placeholder="Min Age"
                    Icon={MapPin}
                    id="age-restriction"
                  />
                </div>
              </div>

              <div className="flex flex-col mt-3">
                <h1 className="gray-header mb-0">Organizer Information</h1>
                <div className="flex">
                  <InputComponent
                    type="text"
                    placeholder="Name"
                    Icon={MapPin}
                    id="age-restriction"
                  />
                  <InputComponent
                    type="text"
                    placeholder="Contact Email"
                    Icon={MapPin}
                    id="age-restriction"
                  />
                </div>
                <div className="flex">
                  <InputComponent
                    type="text"
                    placeholder="Contact Phone"
                    Icon={MapPin}
                    id="age-restriction"
                  />
                  <InputComponent
                    type="text"
                    placeholder="Website"
                    Icon={MapPin}
                    id="age-restriction"
                  />
                </div>
                <div className="flex">
                  <InputComponent
                    type="text"
                    placeholder="Instagram"
                    Icon={MapPin}
                    id="age-restriction"
                  />
                  <InputComponent
                    type="text"
                    placeholder="Twitter"
                    Icon={MapPin}
                    id="age-restriction"
                  />
                </div>
              </div>
            </div>
    </>
  )
}

export default Capacity_Restrictions