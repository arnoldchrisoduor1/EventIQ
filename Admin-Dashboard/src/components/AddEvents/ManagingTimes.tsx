import TimeSelector from "../EventsPage/TimeSelectore";
import TimeSelectorSection2 from "../EventsPage/TimeSelectorSection2";

const ManagingTimes = () => {
  return (
    <>
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
    </>
  );
};

export default ManagingTimes;
