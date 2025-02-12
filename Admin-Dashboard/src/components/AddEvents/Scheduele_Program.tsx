import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/hooks/hooks';
import { RootState } from '@/redux/store';
import { addScheduleItem, updateScheduleItem, removeScheduleItem } from '@/redux/slices/addEventSlice';
import InputComponent from '../InputComponent';
import ProfilePhotoUpload from '../UserDetails/profilePhotoUpload';
import defaultImg from '../../assets/img/logo.png';
import { 
  Clock, 
  Type, 
  User2, 
  BookOpen, 
  Mail,
  Trash2,
  Edit
} from 'lucide-react';

interface ScheduleEntry {
  time: string;
  title: string;
  description: string;
  speaker: {
    name: string;
    bio: string;
    photo: string;
    email: string;
  };
}

const Schedule_Program = () => {
  const { schedule } = useSelector((state: RootState) => state.addEvent);
  const dispatch = useAppDispatch();

  const emptySchedule: ScheduleEntry = {
    time: '',
    title: '',
    description: '',
    speaker: {
      name: '',
      bio: '',
      photo: '',
      email: ''
    }
  };

  const [currentSchedule, setCurrentSchedule] = useState<ScheduleEntry>(emptySchedule);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith('speaker.')) {
      const propertyName = field.split('.')[1];
      setCurrentSchedule(prev => ({
        ...prev,
        speaker: {
          ...prev.speaker,
          [propertyName]: value
        }
      }));
    } else {
      setCurrentSchedule(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handlePhotoChange = (photoUrl: string) => {
    setCurrentSchedule(prev => ({
      ...prev,
      speaker: {
        ...prev.speaker,
        photo: photoUrl
      }
    }));
  };

  const handleSaveSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIndex !== null) {
      await dispatch(updateScheduleItem({ index: editingIndex, item: currentSchedule }));
    } else {
      await dispatch(addScheduleItem(currentSchedule));
      console.log("adding new scheduele item", schedule);
      
    }
    setCurrentSchedule(emptySchedule);
    setEditingIndex(null);
  };

  const handleEditSchedule = (index: number) => {
    setCurrentSchedule(schedule[index]);
    setEditingIndex(index);
  };

  const handleRemoveSchedule = async (index: number) => {
    await dispatch(removeScheduleItem(index));
  };

  console.log("seeign new scheduele item", schedule);


  return (
    <div>
      {/* Saved Schedules Preview */}
      {schedule.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-black/50 mb-4">Saved Schedules</h2>
          <div className="space-y-4">
            {schedule.map((entry, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4 items-start">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img 
                        src={entry.speaker.photo || defaultImg}
                        alt="Speaker" 
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{entry.title}</h3>
                      <p className="text-sm text-gray-600">{entry.time}</p>
                      <p className="text-sm mt-1">Speaker: {entry.speaker.name}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditSchedule(index)}
                      className="p-2 text-blue-500 hover:text-blue-700"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveSchedule(index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Schedule Form */}
      <form onSubmit={handleSaveSchedule} className="border border-slate-300 mt-5 p-4">
        <h1 className="text-3xl font-semibold text-black/50">
          {editingIndex !== null ? 'Edit Schedule' : 'Add New Schedule'}
        </h1>

        <div className="flex justify-center mb-4 mt-3">
          <ProfilePhotoUpload
            profilePhoto={currentSchedule.speaker.photo || defaultImg}
            onPhotoChange={handlePhotoChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputComponent
            type="time"
            placeholder="Time"
            Icon={Clock}
            value={currentSchedule.time}
            onChange={(e) => handleInputChange('time', e.target.value)}
          />
          <InputComponent
            type="text"
            placeholder="Title"
            Icon={Type}
            value={currentSchedule.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
          />
        </div>

        <div className="mt-3">
          <textarea
            className="w-full h-20 p-3 border border-gray-300 rounded-lg focus:outline-none"
            placeholder="Add a small description (50 words)"
            value={currentSchedule.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
        </div>

        <h2 className="gray-header mb-4 mt-6">Speaker Details</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputComponent
              type="text"
              placeholder="Name"
              Icon={User2}
              value={currentSchedule.speaker.name}
              onChange={(e) => handleInputChange('speaker.name', e.target.value)}
            />
            <InputComponent
              type="text"
              placeholder="Bio"
              Icon={BookOpen}
              value={currentSchedule.speaker.bio}
              onChange={(e) => handleInputChange('speaker.bio', e.target.value)}
            />
          </div>
          <div>
            <InputComponent
              type="email"
              placeholder="Email"
              Icon={Mail}
              value={currentSchedule.speaker.email}
              onChange={(e) => handleInputChange('speaker.email', e.target.value)}
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="btn-primary mt-6 w-[150px]"
        >
          {editingIndex !== null ? 'Update Schedule' : 'Add Schedule'}
        </button>
      </form>
    </div>
  );
};

export default Schedule_Program;