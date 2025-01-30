import EventRecentActivity from "../components/EventsPage/EventRecentActivity";
import EventsCard from "../components/EventsPage/EventsCard";
import EventPieChart from "../components/EventsPage/PieChart";
import { Plus } from "lucide-react";

const EventsPage = () => {
  return (
    <>
      <div className="flex gap-8 mt-10 mr-5">
        <div className=" flex-1 basis-3/4 ">
          <EventsCard />
          <EventsCard />
          <EventsCard />
          <EventsCard />
        </div>

        <div className="flex-2 basis-1/4">
        <div className="floating-card justify-center p-4 rounded-xl hover:cursor-pointer border border-slate-300">
            <h2 className="text-start gray-header">Tickets Sold</h2>
          <div className="flex flex-row flex-wrap gap-8">
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
      </div>
    </>
  );
};

export default EventsPage;
