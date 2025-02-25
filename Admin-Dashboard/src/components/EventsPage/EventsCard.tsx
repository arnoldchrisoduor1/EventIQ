import { FilePenLine } from "lucide-react";
import bgImage from "../../assets/img/eventsBanner1.jpg";

const EventsCard = ({title, banner}) => {
  return (
    <div className="relative p-10 bg-customBlue/10 overflow-hidden mb-5 floating-card hover:cursor-pointer">
      {/* Background Image */}
      {/* <div
        className="absolute inset-0 bg-cover bg-center blur-md opacity-50"
        style={{ backgroundImage: `url(${banner})` }}
      /> */}

      {/* Blue Tint Overlay */}
      <div className="absolute inset-0 hover:bg-customBlue/40 transition duration-custom opacity-60 mix-blend-multiply z-10" />

      {/* Content */}
      <div className="relative flex flex-row justify-between">
        {/* Left Section */}
        <div className="flex flex-col justify-between gap-5">
          {/* Upper Section */}
          <div className="flex flex-row gap-3">
            {/* Left Section */}
            <div>
              <p className="text-xs">APR</p>
              <p className="text-3xl">21</p>
            </div>

            <div className="bg-black/50 w-1" />

            {/* Right Section */}
            <div>
              <p className="text-4xl">{title}</p>
            </div>
          </div>

          {/* Lower Section */}
          <div className="flex w-full justify-between text-start text-black/50">
            {/* Selling Starts */}
            <div>
              <p>Selling Starts</p>
              <p className="text-customGreen">Started</p>
            </div>
            {/* Selling Ends */}
            <div>
              <p>Selling Ends</p>
              <p className="text-black">In 5 days</p>
            </div>

            {/* Tickets Sold */}
            <div>
              <p>Capacity</p>
              <p className="text-black">2,500</p>
            </div>

            {/* Tickets Left */}
            <div>
              <p>Tickets Left</p>
              <p className="text-black">112</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-5">
          {/* Top Section */}
          <div className="flex flex-row gap-4 text-start">
            {/* Featured */}
            <div>
              <div>
                <p className="text-sm text-black/50">Featured</p>
              </div>
              <div className="flex flex-row gap-3">
                <p>AI Tec Guru</p>
                <p>AI Tec Guru</p>
              </div>
            </div>
            {/* Price */}
            <div>
              <p className="text-sm text-black/50">Entry Fee</p>
              <p className="text-xl">$ 34</p>
            </div>
          </div>

          {/* Lower Section */}
          <div className="text-right hover:cursor-pointer z-20">
            <div className="inline-block border-2 border-customBlue hover:bg-customOrange/50 p-2 w-fit rounded-full transition duration-custom">
              <div className="flex gap-2 items-center">
                <FilePenLine size={17} />
                <p>Edit Event</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsCard;
