import { useSelector } from "react-redux";
import EventRecentActivity from "../components/EventsPage/EventRecentActivity";
import EventsCard from "../components/EventsPage/EventsCard";
import EventPieChart from "../components/EventsPage/PieChart";
import { Plus } from "lucide-react";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { setCreateEventState } from "@/redux/slices/createEventSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAllEvents } from "@/redux/slices/addEventSlice";

// Skeleton loader component for events card
const EventCardSkeleton = () => (
  <div className="animate-pulse mb-4">
    <div className="h-32 bg-gray-200 rounded-lg w-full"></div>
  </div>
);

const EventsPage = () => {
  const { createEventState } = useSelector((state: RootState) => state.createEvent);
  const { eventsList } = useSelector((state: RootState) => state.addEvent);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleEventClick = (event: any) => {
    navigate("/eventItem", { state: { event } });
  }

  const handleCreateEventState = () => {
    dispatch(setCreateEventState(!createEventState));
  };

  const gettingAllEventsData = async () => {
    try {
      const events = await dispatch(getAllEvents());
      console.log("All events retrieved: ", events.payload);
    } catch (error) {
      console.error("Error fetching events: ", error);
    }
  };

  useEffect(() => {
    gettingAllEventsData();
  }, [dispatch]);

  return (
    <>
      <div className="flex gap-8 mt-10 mr-5">
        <div className="flex-1 basis-3/4">
          {eventsList.loading ? (
            // Show skeletons while loading
            [...Array(3)].map((_, index) => (
              <EventCardSkeleton key={index} />
            ))
          ) : eventsList.error ? (
            // Show error state
            <div className="p-4 text-red-500 border border-red-300 rounded">
              Error loading events: {eventsList.error}
            </div>
          ) : eventsList?.items?.events?.length ? (
            // Show events if they exist
            eventsList.items.events.map((event, idx) => (
              <div key={idx} onClick={() => handleEventClick(event)} className="cursor-pointer">
                <EventsCard 
                  title={event.basicInfo.title} 
                  banner={event.media.banner}
                />
            </div>
            ))
          ) : (
            // Show empty state
            <div className="p-4 text-gray-500 border border-gray-300 rounded">
              No events found
            </div>
          )}
        </div>

        <div className="flex-2 basis-1/4">
          <Link 
            to="/create-event" 
            className="flex justify-center items-center gap-3 btn-primary mb-5" 
            onClick={handleCreateEventState}
          >
            <p className="text-xl">Create Event</p>
            <Plus />
          </Link>
          
          {/* Tickets statistics section */}
          <div className="floating-card justify-center p-4 hover:cursor-pointer">
            <h2 className="text-start gray-header">Tickets Sold</h2>
            <div className="flex flex-row flex-wrap gap-8 justify-center">
              <div className="flex flex-col items-center">
                <EventPieChart total={200} sold={161} />
                <p className="mt-2">
                  VIP <span className="text-black/50">seat</span>
                </p>
              </div>

              <div className="flex flex-col items-center">
                <EventPieChart total={200} sold={93} progressColor="#ff7556" />
                <p className="mt-2">
                  Standard <span className="text-black/50">seat</span>
                </p>
              </div>

              <div className="flex flex-col items-center">
                <EventPieChart total={200} sold={102} progressColor="#feb558" />
                <p className="mt-2">
                  Backstage <span className="text-black/50">Pass</span>
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="border-2 border-slate-400 p-10 rounded-full hover:border-slate-600 cursor-pointer">
                  <Plus />
                </div>
                <p className="mt-2">Create New</p>
              </div>
            </div>
          </div>

          {/* Recent Events Section */}
          <div className="mt-10 floating-card p-4  hover:cursor-pointer">
            <h2 className="gray-header">Recent Activities</h2>
            <EventRecentActivity name="Arnold" ticket="3 standard" time="3" timetag="mins"/>
            <EventRecentActivity name="Arnold" ticket="3 standard" time="3" timetag="mins"/>
            <EventRecentActivity name="Arnold" ticket="3 standard" time="3" timetag="mins"/>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsPage;