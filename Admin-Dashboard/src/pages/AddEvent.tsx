import React, { useEffect, useState } from "react";
import InputComponent from "../components/InputComponent";
import {
  Calendar,
  CalendarIcon,
  FilePlus2,
  MapPin,
  PersonStanding,
  X,
} from "lucide-react";
import TimeSelector from "../components/EventsPage/TimeSelectore";
import LocationSelector from "@/components/EventsPage/LocationSelector";
import { File } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import BannerImageUpload from "../components/EventsPage/BannerImageUpload";
import defaultBanner from "../../assets/img/eventsBanner1.jpg";
import toast from "react-hot-toast";
import { updateprofile } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { setCreateEventState } from "@/redux/slices/createEventSlice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import TimeSelectorSection2 from "@/components/EventsPage/TimeSelectorSection2";
import ProfilePhotoUpload from "@/components/UserDetails/profilePhotoUpload";

const AddEvent = () => {
  const dispatch = useAppDispatch();
  const { createEventState } = useSelector(
    (state: RootState) => state.createEvent
  );
  const { user, isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const [formData, setFormData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    address: user.address,
    mobilenumber: user.mobilenumber,
    profilePhoto: "",
    occupation: user.occupation,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfilePhotoChange = (photoUrl: any) => {
    setFormData((prev) => ({
      ...prev,
      profilePhoto: photoUrl,
    }));
  };

  const handleCreateEventState = () => {
    dispatch(setCreateEventState(!createEventState));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add your update profile logic here
    await dispatch(updateprofile(formData));
    console.log("Updating profile with:", formData);
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("Updating profile...");
    }

    if (error) {
      toast.dismiss();
      toast.error("Error. Try again later");
    }

    if (!error) {
      toast.dismiss();
      toast.success("Profile Updated successfully");
    }
  }, [error, isLoading]);

  return (
    <div className="p-8">
      <div className="">
        <div className="flex justify-end hover:cursor-pointer">
          <p className="btn text-end" onClick={handleCreateEventState}>
            Cancel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex justify-between">
          {/* Left form */}
          <div className="flex flex-col">
            <div className="flex justify-center mb-4">
              <BannerImageUpload
                profilePhoto={formData.profilePhoto || user.profileImage}
                onPhotoChange={handleProfilePhotoChange}
              />
            </div>
            <div className="flex flex-col mb-4">
              <div className="border border-slate-300 p-4">
                <h1 className="text-3xl font-semibold text-black/50">
                  Basic Information
                </h1>
                <div className="flex flex-col">
                  <label htmlFor="title" className="gray-header mb-0">
                    Title
                  </label>
                  <InputComponent
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter Event Title"
                    classwidth=""
                    Icon={PersonStanding}
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="description" className="gray-header mb-0">
                    Description
                  </label>
                  {/* Description box */}
                  <textarea
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none"
                    placeholder="Add a small description (200 words)"
                  />

                  <div className="flex justify-between gap-5 mt-5">
                    <select className="h-10 w-full border border-slate-300 rounded-md hover:cursor-pointer outline-none">
                      <option value="" disabled selected>
                        Type of Event
                      </option>
                      <option>Concert</option>
                      <option>Conference</option>
                      <option>Workshow</option>
                      <option>Sports</option>
                      <option>Exhibition</option>
                      <option>Other</option>
                    </select>

                    <select className="h-10 w-full border border-slate-300 rounded-md hover:cursor-pointer outline-none">
                      <option value="" disabled selected>
                        Event Status
                      </option>
                      <option>Draft</option>
                      <option>Published</option>
                      <option>Cancelled</option>
                      <option>Postponed</option>
                      <option>Completed</option>
                    </select>
                  </div>
                  <div className="flex gap-3 mt-5">
                    <div className="bg-black/10 p-2 rounded-xl flex gap-2 items-center hover:bg-customBlue/50">
                      <p>newtag</p>
                      <X size={17} />
                    </div>
                    <div className="bg-black/10 p-2 rounded-xl flex gap-2 items-center hover:bg-customBlue/50">
                      <p>newtag</p>
                      <X size={17} />
                    </div>
                    <input
                      type="text"
                      className="border border-slate-300 rounded-lg px-2 outline-none w-full"
                      placeholder="Add Tags (4)"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Adding files section */}
            <div className="border border-slate-300 p-4">
              <h1 className="text-3xl font-semibold text-black/50">
                Add Files
              </h1>
              <p className="text-start text-lg text-black/50">
                Add files and attachments relevant to your event.
              </p>
              <div className="flex flex-row justify-between mt-5 items-center">
                <div>
                  <p className="text-lg text-customBlue">Added_file.pddf</p>
                </div>
                <div className="flex items-center gap-3 btn">
                  <FilePlus2 size={20} />
                  <p>Upload Files</p>
                </div>
              </div>
            </div>
            {/* Managing Date Times */}.
            <div className="border border-slate-300 p-4">
              <div>
                <h1 className="text-3xl font-semibold text-black/50">
                  Date and Time
                </h1>
              </div>
              <div className="mt-5">
                <TimeSelector />
              </div>
              <div className="mt-5">
                <TimeSelectorSection2 />
              </div>
            </div>
            {/* Location Selector */}
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
            {/* Capacity and Restrictions */}
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

            <div className="border border-slate-300 mt-5 p-4">
            <h1 className="text-3xl font-semibold text-black/50">
              Scheduele and Program
            </h1>
            <div className="flex justify-center mb-4 mt-3">
              <ProfilePhotoUpload
                profilePhoto={formData.profilePhoto || user.profileImage}
                onPhotoChange={handleProfilePhotoChange}
              />
            </div>
            <div className="flex justify-between">
              <InputComponent type="text" placeholder="Time" Icon={MapPin} />
              <InputComponent type="text" placeholder="Title" Icon={MapPin} />
            </div>
            <div className="flex mt-3">
              <textarea
                className="w-full h-20 p-3 border border-gray-300 rounded-lg focus:outline-none"
                placeholder="Add a small description (50 words)"
              />
            </div>
            <h1 className="gray-header mb-0 mt-3">Speaker</h1>
            <div>
              <div className="flex justify-between">
                <InputComponent type="text" placeholder="Name" Icon={MapPin} />
                <InputComponent type="text" placeholder="Bio" Icon={MapPin} />
              </div>
              <div className="flex">
                <InputComponent type="email" placeholder="Email" Icon={MapPin} />
              </div>
            </div>
            </div>

            {/* Ticket pricing Tier */}
            <div className="mt-5 border border-slate-300 p-4">
            <h1 className="text-3xl font-semibold text-black/50">
              Ticket Pricing Tiers
            </h1>
            <div>
              <div>
              <InputComponent type="text" placeholder="Name" Icon={MapPin} />
              <InputComponent type="number" placeholder="Quantity" Icon={MapPin} />
              </div>
              <div>
              <InputComponent type="text" placeholder="Descrition" Icon={MapPin} />
              <InputComponent type="text" placeholder="Early Bird Date" Icon={MapPin} />
              </div>
              <div>
              <InputComponent type="float" placeholder="Early Bird Price" Icon={MapPin} />
              </div>
            </div>
            </div>
          </div>

          {/* Right form */}

          <div></div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
