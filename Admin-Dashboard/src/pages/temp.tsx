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
  

  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
            
           


            {/* Adding files section */}
            
            {/* Managing Date Times */}.
            
            {/* Location Selector */}
            
            {/* Capacity and Restrictions */}
            

            

            {/* Ticket pricing Tier */}
            
          </div>

          {/* Right form */}

          <div></div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
