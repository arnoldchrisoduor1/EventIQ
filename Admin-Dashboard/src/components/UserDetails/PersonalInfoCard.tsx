import { Facebook, Twitter, X, Youtube } from "lucide-react";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { setEditProfileState } from "../../redux/slices/editProfileSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const PersonalInfoCard = () => {

  const { editState } = useSelector((state: RootState) => state.editProf);
  const { user } = useSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();

  const handleOpenUpdateForm = () => {
    dispatch(setEditProfileState(!editState));
  }

  return (
    <>
      <div className="flex w-full py-4 floating-card">
        <div className="flex flex-1 bassis-1/4 flex-col justify-center items-center">
          <div className="p-1 bg-customBlue/50 rounded-full">
            <img
              src={user.profileImage}
              alt="Profile Picture"
              className="h-16 w-16 rounded-full"
            />
          </div>
          <div className="flex flex-col gap-3 mt-6">
            <div>
              <p className="font-semibold text-2xl">{user.firstname} {user.lastname}</p>
            </div>
            <div>
              <p className="text-black/50">Occupation <span className="text-black">{user.occupation}</span></p>
            </div>
            <div className="text-black/50">Member since <span className="text-black">13/04/2024</span></div>
          </div>
          <div className="my-5">
            <button className="btn-primary">Send Email</button>
          </div>
          <div className="flex gap-3 text-black/50">
            <div>
              <Facebook className="hover:text-customBlue/50 cursor-pointer transition duration-custom"/>
            </div>
            <div>
              <Twitter className="hover:text-customBlue/50 cursor-pointer transition duration-custom"/>
            </div>
            <div>
              <Youtube className="hover:text-customBlue/50 cursor-pointer transition duration-custom"/>
            </div>
          </div>
        </div>

        <div className="flex-2 basis-3/4">
        <div className="grid w-full px-5">
          {/* Second Upper Section */}
          <div className="text-start text-black/50 border-b">
            <div>
              <p className="text-lg mb-3">Official Information</p>
            </div>
            <div className="grid grid-cols-3">
              <div>
                <p className="text-black">Email</p>
                <p>{user.email}</p>
              </div>
              <div>
                <p className="text-black">Phone Number</p>
                <p>{user.mobilenumber}</p>
              </div>
              <div>
                <p className="text-black">Address</p>
                <p>{user.address}</p>
              </div>
            </div>
          </div>

          {/* Second Middle Section */}
          <div className="text-black/50 text-start mt-5 border-b">
            <div>
              <p className="text-lg mb-3">Personal Information</p>
            </div>
            <div className="grid grid-cols-3">
              <div>
                <p className="text-black">FaceBook</p>
                <p>{user.facebook}</p>
              </div>
              <div>
                <p className="text-black">Phone Number</p>
                <p>{user.mobilenumber}</p>
              </div>
            </div>
          </div>

          {/* Second Lower Section */}
          <div className="flex flex-col text-black/50 mt-5">
            <div>
              <p className="text-lg text-start mb-3">Tags</p>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center justify-center bg-customBlue/30 hover:bg-customBlue/70 transition duration-custom cursor-pointer rounded-full px-2 py-1">
                <p>Lounges</p>
                <X className="h-4"/>
              </div>
              <div className="flex items-center justify-center bg-customBlue/30 hover:bg-customBlue/70 transition duration-custom cursor-pointer rounded-full px-2 py-1">
                <p>Lounges</p>
                <X className="h-4"/>
              </div>
              <div className="flex items-center justify-center bg-customBlue/30 hover:bg-customBlue/70 transition duration-custom cursor-pointer rounded-full px-2 py-1">
                <p>Lounges</p>
                <X className="h-4"/>
              </div>
              <div className="flex items-center justify-center bg-customBlue/30 hover:bg-customBlue/70 transition duration-custom cursor-pointer rounded-full px-2 py-1">
                <p>Lounges</p>
                <X className="h-4"/>
              </div>
            </div>
            <div className="text-end"
            onClick={handleOpenUpdateForm}
            >
              <button className="btn-primary">Update Profile</button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfoCard;
