import React, { useState } from 'react'
import InputComponent from '../InputComponent'
import { MapPin } from 'lucide-react'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import ProfilePhotoUpload from '../UserDetails/profilePhotoUpload';

const Scheduele_Program = () => {

    const { user, isLoading, error } = useSelector(
        (state: RootState) => state.auth
      );

    const [formData, setFormData] = useState({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        address: user.address,
        mobilenumber: user.mobilenumber,
        profilePhoto: "",
        occupation: user.occupation,
      });

    const handleProfilePhotoChange = (photoUrl: any) => {
        setFormData((prev) => ({
          ...prev,
          profilePhoto: photoUrl,
        }));
      };
  return (
    <>
        <div className="border border-slate-300 mt-5 p-4">
            <h1 className="text-3xl font-semibold text-black/50">
              Scheduele and Program
            </h1>
            <div className="flex justify-center mb-4 mt-3">
              <ProfilePhotoUpload
                profilePhoto={formData.profilePhoto || user.profileImage}
                onPhotoChange={handleProfilePhotoChange}
              />
            </div>
            <div className="flex justify-between">
              <InputComponent type="text" placeholder="Time" Icon={MapPin} />
              <InputComponent type="text" placeholder="Title" Icon={MapPin} />
            </div>
            <div className="flex mt-3">
              <textarea
                className="w-full h-20 p-3 border border-gray-300 rounded-lg focus:outline-none"
                placeholder="Add a small description (50 words)"
              />
            </div>
            <h1 className="gray-header mb-0 mt-3">Speaker</h1>
            <div>
              <div className="flex justify-between">
                <InputComponent type="text" placeholder="Name" Icon={MapPin} />
                <InputComponent type="text" placeholder="Bio" Icon={MapPin} />
              </div>
              <div className="flex">
                <InputComponent type="email" placeholder="Email" Icon={MapPin} />
              </div>
            </div>
            </div>
    </>
  )
}

export default Scheduele_Program