import { useSelector } from "react-redux";
import EventRecentActivity from "../components/EventsPage/EventRecentActivity";
import EventsCard from "../components/EventsPage/EventsCard";
import EventPieChart from "../components/EventsPage/PieChart";
import { Plus } from "lucide-react";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { setCreateEventState } from "@/redux/slices/createEventSlice";
import { Link } from "react-router-dom";

const EventsPage = () => {

  const { createEventState } = useSelector((state: RootState) => state.createEvent);
  const dispatch = useAppDispatch();

  const handleCreateEventState = () => {
    dispatch(setCreateEventState(!createEventState));
  }

  return (
    <>
      <div className="flex gap-8 mt-10 mr-5">
          {/* <div className={`absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm ${createEventState ? 'block' : 'hidden'}`} />  */}
        <div className=" flex-1 basis-3/4 ">
          <EventsCard />
          <EventsCard />
          <EventsCard />
          <EventsCard />
        </div>

        <div className="flex-2 basis-1/4">
        <Link to="/create-event" className="flex justify-center items-center gap-3 btn-primary mb-5" onClick={handleCreateEventState}>
          <p className="text-xl">Create Event</p>
          <Plus />
        </Link>
        <div className="floating-card justify-center p-4 rounded-xl hover:cursor-pointer border border-slate-300">
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
                BackStage <span className="text-black/50">Pass</span>
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
          <div className="mt-10 floating-card p-4 rounded-xl hover:cursor-pointer border border-slate-300">
            <h2 className="gray-header">Recent Activities</h2>
            <EventRecentActivity name="Arnold" ticket="3 standard" time="3" timetag="mins"/>
            <EventRecentActivity name="Arnold" ticket="3 standard" time="3" timetag="mins"/>
            <EventRecentActivity name="Arnold" ticket="3 standard" time="3" timetag="mins"/>
          </div>
        </div>

        {/* <div className={`absolute left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] z-30 w-[60%] ${createEventState ? 'block' : 'hidden'}`}>
        <AddEvent />
      </div> */}
        
      </div>
    </>
  );
};

export default EventsPage;
