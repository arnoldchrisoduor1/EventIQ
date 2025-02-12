import React, { useState } from "react";
import BannerImageUpload from "@/components/EventsPage/BannerImageUpload";
import defaultBanner from "../assets/img/eventsBanner1.jpg";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import BasicInformation from "@/components/AddEvents/BasicInformation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import AddFiles from "@/components/AddEvents/AddFiles";
import ManagingTimes from "@/components/AddEvents/ManagingTimes";
import LocationSelector from "@/components/AddEvents/LocationSelector";
import Scheduele_Program from "@/components/AddEvents/Scheduele_Program";
import Ticket_Tiers from "@/components/AddEvents/Ticket_Tiers";
import AdditionalInfo from "@/components/AddEvents/AdditionalInfo";
import PoliciesForm from "@/components/AddEvents/PoliciesForm";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { updateMedia } from "@/redux/slices/addEventSlice";

const AddEvent = () => {
  const { media } = useSelector((state: RootState) => state.addEvent);
  const [currentStep, setCurrentStep] = useState(6);
  const dispatch = useAppDispatch();

  // Array of components to render
  const steps = [
    { component: <BasicInformation />, title: "Basic Information" },
    { component: <AddFiles />, title: "Add Files" },
    { component: <ManagingTimes />, title: "Manage Times" },
    { component: <LocationSelector />, title: "Location Selection" },
    { component: <Scheduele_Program />, title: "Sheduele and Program" },
    { component: <Ticket_Tiers />, title: "Ticket Tiers" },
    { component: <AdditionalInfo />, title: "Additional Information" },
    { component: <PoliciesForm />, title: "Event Policies" },
  ];

  const handleProfilePhotoChange = async (photoUrl: any) => {
    await dispatch(updateMedia({
      banner: photoUrl
    }));
};

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      <div className="px-4">
        {/* Top Banner */}
        <div className="flex justify-center mb-4 mt-5">
          <BannerImageUpload
            profilePhoto={defaultBanner || media.banner}
            onPhotoChange={handleProfilePhotoChange}
          />
        </div>

        <div className="flex flex-col items-center">

          <div className="w-[55%] mx-auto mt-5">
            {/* Render current step component */}
            {steps[currentStep].component}
          </div>

          <div className="flex gap-36 mt-5">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex gap-3 items-center btn w-[150px] justify-center ${
              currentStep === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <ArrowLeft size={20} />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className={`flex gap-3 items-center btn-primary w-[150px] justify-center ${
              currentStep === steps.length - 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Next
            <ArrowRight size={20} />
          </button>
          </div>
        </div>

        {/* Optional: Add step indicator */}
        <div className="flex justify-center mt-4 gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentStep ? "bg-primary" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AddEvent;