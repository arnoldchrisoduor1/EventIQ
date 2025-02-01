import React, { useEffect, useState } from "react";
import InputComponent from "../InputComponent";
import { PersonStanding } from "lucide-react";
import TimeSelector from "./TimeSelectore";
import LocationSelector from "./LocationSelector";
import { File } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import BannerImageUpload from "./BannerImageUpload";
import defaultBanner from "../../assets/img/eventsBanner1.jpg";
import toast from "react-hot-toast";
import { updateprofile } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { setCreateEventState } from "@/redux/slices/createEventSlice";

const AddEvent = () => {

    const dispatch = useAppDispatch();
    const { createEventState } = useSelector((state: RootState) => state.createEvent);
    const { user, isLoading, error } = useSelector((state: RootState) => state.auth);

    const [formData, setFormData] = useState({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        address: user.address,
        mobilenumber: user.mobilenumber,
        profilePhoto: '',
        occupation: user.occupation
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProfilePhotoChange = (photoUrl: any) => {
        setFormData(prev => ({
            ...prev,
            profilePhoto: photoUrl
        }));
    };

    const handleCreateEventState = () => {
        dispatch(setCreateEventState(!createEventState));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Add your update profile logic here
        await dispatch(updateprofile(formData));
        console.log('Updating profile with:', formData);
    };

    useEffect(() => {
        if(isLoading) {
            toast.loading("Updating profile...");
        }

        if(error) {
            toast.dismiss();
            toast.error("Error. Try again later");
        }

        if(!error) {
            toast.dismiss();
            toast.success("Profile Updated successfully");
        }
    }, [error, isLoading])
    
  return (
    <div className="bg-white rounded-2xl">
      <div className="p-8">
        <div className="flex justify-end hover:cursor-pointer">
          <p className="btn text-end" onClick={handleCreateEventState}>Cancel</p>
        </div>

        <form onSubmit={handleSubmit} className="flex justify-around">
          {/* Left form */}
          <div className="flex flex-col">
          <div className="flex justify-center mb-4">
                <BannerImageUpload
                    profilePhoto={formData.profilePhoto || user.profileImage}
                    onPhotoChange={handleProfilePhotoChange}
                />
            </div>
            <div className="flex flex-col mb-4">
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
              <InputComponent
                type="text"
                id="description"
                placeholder="Give a simple Description"
                classwidth=""
                Icon={PersonStanding}
              />
            </div>

            <div className="my-4">
              <TimeSelector />
            </div>

            <div>
              {/* Choose location */}
              <div className="flex flex-col">
                <label htmlFor="location" className="gray-header mb-0">
                  Location
                </label>
                <InputComponent
                  type="text"
                  id="location"
                  placeholder="Select a Location"
                  classwidth=""
                  Icon={PersonStanding}
                />
              </div>
            </div>

            <div className="my-4">
              <p className="gray-header mb-0">Upload attachments</p>
              <div className="flex justify-between">
                <div className="flex flex-row items-center gap-4">
                  <File />
                  <p className="text-customBlue">File Name</p>
                </div>
                <div className="btn-primary">Add file</div>
              </div>
            </div>
          </div>

          {/* Right form */}

          <div>
          <div className="flex flex-col mb-5">
                <label htmlFor="location" className="gray-header mb-0">
                  Add Guests
                </label>
                <InputComponent
                  type="text"
                  id="location"
                  placeholder="Add Guests"
                  classwidth=""
                  Icon={PersonStanding}
                />
              </div>

              <div className="mb-5">
                <p className="gray-header mb-0">Notify people on:</p>
                <div className="flex flex-row gap-5">
                <div className="flex flex-row gap-3">
                <label htmlFor="location" className="gray-header mb-0 text-black">
                  Slack
                </label>
                <input type="checkbox" placeholder="" />
              </div> 
                <div className="flex flex-row gap-3">
                <label htmlFor="location" className="gray-header mb-0 text-black">
                  HpChat
                </label>
                <input type="checkbox" placeholder="" />
              </div> 
              </div>
              </div>

              <div>
                <p className="gray-header mb-0">Set Reminders</p>
              </div>

              <div className="btn-primary">
                Create Event
              </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
