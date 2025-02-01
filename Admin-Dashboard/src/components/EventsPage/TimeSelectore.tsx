import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";

export default function TimeSelector() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("10:15 AM");
  const [duration, setDuration] = useState("2h 45m");
  
  // Generate time options in 15-minute intervals
  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const period = hour < 12 ? 'AM' : 'PM';
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const timeString = `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
      timeOptions.push(timeString);
    }
  }

  // Generate duration options
  const durationOptions = [];
  for (let hours = 0; hours <= 8; hours++) {
    for (let minutes = 0; minutes < 60; minutes += 15) {
      if (hours === 0 && minutes === 0) continue;
      const hoursText = hours > 0 ? `${hours}h` : '';
      const minutesText = minutes > 0 ? ` ${minutes}m` : '';
      durationOptions.push(`${hoursText}${minutesText}`.trim());
    }
  }

  return (
    <div className="flex gap-4 items-center">
      {/* Day Selector with Calendar */}
      <div className="flex flex-col">
        <label className="gray-header mb-0 text-center">Day</label>
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative flex items-center border rounded-lg px-3 py-2 w-48 cursor-pointer hover:bg-gray-50">
              <span className="flex-grow">{format(date, "dd MMMM yyyy")}</span>
              <CalendarIcon className="w-5 h-5 text-gray-500" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Time Selector */}
      <div className="flex flex-col">
        <label className="gray-header mb-0 text-center">Time</label>
        <Select value={time} onValueChange={setTime}>
          <SelectTrigger className="w-32">
            <SelectValue>{time}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {timeOptions.map((timeOption) => (
              <SelectItem key={timeOption} value={timeOption}>
                {timeOption}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Duration Selector */}
      <div className="flex flex-col">
        <label className="gray-header mb-0 text-center">Duration</label>
        <Select value={duration} onValueChange={setDuration}>
          <SelectTrigger className="w-28">
            <SelectValue>{duration}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {durationOptions.map((durationOption) => (
              <SelectItem key={durationOption} value={durationOption}>
                {durationOption}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}