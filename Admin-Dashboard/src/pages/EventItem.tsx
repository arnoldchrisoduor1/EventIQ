import EventRecentActivity from "@/components/EventsPage/EventRecentActivity";
import { RootState } from "@/redux/store";
import { Facebook, Twitter, Youtube } from "lucide-react";
import { useSelector } from "react-redux";
import EventScheduele from "@/components/EventItem/EventScheduele";
import { useLocation } from "react-router";
import EventTicketBanner from "@/components/EventItem/EventTicketBanner";
import EventsPieChart from "@/components/EventsPage/PieChart";

const EventItem = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const location = useLocation();
  const event = location.state?.event;

  if(!event) {
    return <p className="text-red-500">No Event Selected</p>
  }

  console.log(event.schedule);
  return (
    <>
      <div className="flex mt-10 gap-8">
        <div className=" w-full flex-1 basis-3/4 p-4 overflow-y-auto scrollbar-thin  scrollbar-thumb-slate-200 scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full h-screen">
          <div className="">
            <div className="flex flex-row gap-3 justify-self-center">
              {/* Left Section */}
              <div>
                <p className="text-xs">APR</p>
                <p className="text-3xl">21</p>
              </div>

              <div className="bg-black/50 w-1" />

              {/* Right Section */}
              <div>
                <p className="text-5xl">{event.basicInfo.title}</p>
              </div>
            </div>

            <div>
              <EventTicketBanner banner={event.media.banner} description={event.basicInfo.description} />
            </div>

            <div className="flex flex-col gap-3">
              <div className="border-b border-gray-300 pb-5">
                <p className="gray-header">Times</p>
                <div className="grid grid-cols-4">
                  <div className="text-start">
                    <p className="text-lg">D-day</p>
                    <p className="text-black/50">{event.datetime.date}</p>
                  </div>
                  <div className="text-start">
                    <p className="text-lg">Commencement</p>
                    <p className="text-black/50">{event.datetime.time}</p>
                  </div>
                  <div className="text-start">
                    <p className="text-lg">Duration</p>
                    <p className="text-black/50">{event.datetime.duration}</p>
                  </div>
                  <div className="text-start">
                    <p className="text-lg">Teardown Time</p>
                    <p className="text-black/50">{event.datetime.teardownTime}</p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-300 pb-5">
                <p className="gray-header">Locale</p>
                <div className="grid grid-cols-4">
                  <div className="text-start">
                    <p className="text-lg">Name</p>
                    <p className="text-black/50">{event.location.address}</p>
                  </div>
                  <div className="text-start">
                    <p className="text-lg">Country</p>
                    <p className="text-black/50">{event.location.country}</p>
                  </div>
                  <div className="text-start">
                    <p className="text-lg">City</p>
                    <p className="text-black/50">{event.location.city}</p>
                  </div>
                  <div className="text-start">
                    <p className="text-lg">Address</p>
                    <p className="text-black/50">{event.location.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SCHEDUELE */}
            <div className="mt-5">
                <h1 className="text-2xl text-black/50">Scheduele</h1>
                {
                  event.schedule?.map((item, idx) => (
                    <div key={idx}>
                      <EventScheduele name={item.speaker.name} time={item.time} title={item.title} description={item.description} image={item.speaker.photo} />
                    </div>
                  ))
                }
            </div>

            <div className="flex flex-col gap-3 mt-5">
              <div className="border-b border-gray-300 pb-5">
                <p className="gray-header">Additional Information</p>
                <div className="grid grid-cols-4">
                  <div className="text-start">
                    <p className="text-lg">Dress Requirements</p>
                    <p className="text-black/50">{event.additionalInfo.entryRequirements.dressCode}</p>
                  </div>
                  <div className="text-start">
                    <p className="text-lg">Parking</p>
                    <p className="text-black/50">$ { event.additionalInfo.parking.available ? event.additionalInfo.parking.fee : "N/A"}</p>
                  </div>
                  <div className="text-start">
                    <p className="text-lg">Wheel Chair</p>
                    <p className="text-black/50">{event.additionalInfo.accessibility.wheelchairAccessibile ? "Yes" : "No"}</p>
                  </div>
                  <div className="text-start">
                    <p className="text-lg">Assistance</p>
                    <p className="text-black/50">{event.additionalInfo.accessibility.assistanceAvailable ? event.additionalInfo.accessibility.additionalInfo : "No"}</p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-300 pb-5">
                <p className="gray-header">Policies</p>
                <div className="grid grid-cols-4">
                  <div className="text-start">
                    <p className="text-lg">Refund</p>
                    <p className="text-black/50">{event.policies.refund}</p>
                  </div>
                  <div className="text-start">
                    <p className="text-lg">Cancellation</p>
                    <p className="text-black/50">{event.policies.cancellation}</p>
                  </div>
                  <div className="text-start">
                    <p className="text-lg">Photography</p>
                    <p className="text-black/50">{event.policies.photography}</p>
                  </div>
                  <div className="text-start">
                    <p className="text-lg">Weather</p>
                    <p className="text-black/50">{event.policies.weather}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" w-full h-full flex-2 basis-1/4 mr-5 pl-4">
          <div className="flex flex-col justify-center items-center py-4 rounde border-b">
            <h1 className="gray-header">Event Organizer</h1>
            <div className="p-1 bg-customBlue/50 rounded-full w-16 h-16">
              <img
                src={user.profileImage}
                alt="Profile Picture"
                className="h-full w-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col gap-3 mt-6">
              <div>
                <p className="font-semibold text-2xl">
                  {user.firstname} {user.lastname}
                </p>
              </div>
              <div>
                <p className="text-black/50">
                  Occupation{" "}
                  <span className="text-black">{user.occupation}</span>
                </p>
              </div>
              <div className="text-black/50">
                Member since <span className="text-black">13/04/2024</span>
              </div>
            </div>
            <div className="my-5">
              <button className="btn-primary">Send Email</button>
            </div>
            <div className="flex gap-3 text-black/50">
              <div>
                <Facebook className="hover:text-customBlue/50 cursor-pointer transition duration-custom" />
              </div>
              <div>
                <Twitter className="hover:text-customBlue/50 cursor-pointer transition duration-custom" />
              </div>
              <div>
                <Youtube className="hover:text-customBlue/50 cursor-pointer transition duration-custom" />
              </div>
            </div>
          </div>

          <div className="flex flex-row flex-wrap gap-8 justify-center">
              <div className="flex flex-col items-center">
                <EventsPieChart total={200} sold={161} />
                <p className="mt-2">
                  VIP <span className="text-black/50">seat</span>
                </p>
              </div>

              <div className="flex flex-col items-center">
                <EventsPieChart total={200} sold={93} progressColor="#ff7556" />
                <p className="mt-2">
                  Standard <span className="text-black/50">seat</span>
                </p>
              </div>

              <div className="flex flex-col items-center">
                <EventsPieChart total={200} sold={102} progressColor="#feb558" />
                <p className="mt-2">
                  Backstage <span className="text-black/50">Pass</span>
                </p>
              </div>

              
            </div>
        </div>
      </div>
    </>
  );
};

export default EventItem;
