import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDateTime } from "@/redux/slices/addEventSlice";
import { RootState } from "@/redux/store";

const UnifiedTimeSelector = () => {
  const dispatch = useDispatch();
  const {datetime} = useSelector((state: RootState) => state.addEvent); // Adjust according to your state structure

  const handleChange = async(field, value) => {
    await dispatch(updateDateTime({ [field]: value }));
  };

  useEffect(() => {
    console.log("Date time state has been updated with: ", datetime);
  }, [datetime])

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          value={datetime.date}
          onChange={(e) => handleChange("date", e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Time</label>
        <input
          type="time"
          value={datetime.time}
          onChange={(e) => handleChange("time", e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
        <input
          type="number"
          value={datetime.duration}
          onChange={(e) => handleChange("duration", parseInt(e.target.value, 10))}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Setup Time</label>
        <input
          type="time"
          value={datetime.setupTime}
          onChange={(e) => handleChange("setupTime", e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Teardown Time</label>
        <input
          type="time"
          value={datetime.teardownTime}
          onChange={(e) => handleChange("teardownTime", e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

export default UnifiedTimeSelector;