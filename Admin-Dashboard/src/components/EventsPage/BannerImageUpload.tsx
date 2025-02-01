import React, { useEffect, useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import { uploadImage } from '../../redux/slices/authSlice';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import toast, { Toaster } from 'react-hot-toast';

interface ProfilePhotoUploadProps {
  profilePhoto: string;
  onPhotoChange: (photoUrl: string) => void;
}

const BannerImageUpload: React.FC<ProfilePhotoUploadProps> = ({
  profilePhoto,
  onPhotoChange
}) => {
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const userImageRef = useRef<HTMLImageElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const img = files[0];
      
      try {
        const action = await dispatch(uploadImage({ img }));
        const img_url = action.payload as string;
        
        if (img_url) {
          if (userImageRef.current) {
            userImageRef.current.src = img_url;
          }
          onPhotoChange(img_url);
        }
      } catch (error) {
        toast.error("Failed to upload image");
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("Uploading profile Image...");
    }

    if (error) {
      toast.dismiss();
      toast.error("Error updating profile Image");
    }

    if(!error) {
      toast.dismiss();
      toast.success("Profile Image Uploaded. Click Update to Save");
    }
  }, [isLoading, error]);

  return (
    <>
      <Toaster position='top-right' reverseOrder={false} />
      <div
        className="relative w-full h-32 cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <input
          type="file"
          accept="image/*"
          id="userImage"
          className="absolute inset-0 opacity-0 cursor-pointer z-10"
          onChange={handleImageUpload}
        />

        {profilePhoto && (
          <img
            ref={userImageRef}
            src={profilePhoto}
            alt="Image"
            className="w-full h-full object-cover"
          />
        )}

        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Camera className="text-white w-8 h-8" />
          </div>
        )}
      </div>
    </>
  );
};

export default BannerImageUpload;