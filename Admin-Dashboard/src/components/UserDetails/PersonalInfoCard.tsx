import { Facebook, Twitter, X, Youtube } from "lucide-react";
import profilePhoto from "../../assets/img/profile.jpg";

const PersonalInfoCard = () => {
  return (
    <>
      <div className="flex w-full py-4 floating-card">
        <div className="flex flex-col justify-center items-center">
          <div className="p-1 bg-customBlue/50 rounded-full">
            <img
              src={profilePhoto}
              alt="Profile Picture"
              className="h-16 w-16 rounded-full"
            />
          </div>
          <div className="flex flex-col gap-3 mt-6">
            <div>
              <p className="font-semibold text-2xl">Arnold Chris</p>
            </div>
            <div>
              <p className="text-black/50">Event Manager <span className="text-black">@EventsIQ ltd</span></p>
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

        <div className="grid w-full px-5">
          {/* Second Upper Section */}
          <div className="text-start text-black/50 border-b">
            <div>
              <p className="text-lg mb-3">Official Information</p>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="text-black">Email</p>
                <p>arnoldchrisoduor@gmail.com</p>
              </div>
              <div>
                <p className="text-black">Phone Number</p>
                <p>+254 791 165</p>
              </div>
              <div>
                <p className="text-black">Address</p>
                <p>946 Melvina Coves, CA, Mountain View</p>
              </div>
            </div>
          </div>

          {/* Second Middle Section */}
          <div className="text-black/50 text-start mt-5 border-b">
            <div>
              <p className="text-lg mb-3">Personal Information</p>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="text-black">FaceBook</p>
                <p>Facebook.com/arnoldchris</p>
              </div>
              <div>
                <p className="text-black">Phone Number</p>
                <p>+254 791 165</p>
              </div>
            </div>
          </div>

          {/* Second Lower Section */}
          <div className="flex flex-col text-black/50 mt-5">
            <div>
              <p className="text-lg text-start mb-3">Tags</p>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center justify-center bg-gray-300 rounded-full px-2 py-1">
                <p>Lounges</p>
                <X className="h-4"/>
              </div>
              <div className="flex items-center justify-center bg-gray-300 rounded-full px-2 py-1">
                <p>Lounges</p>
                <X className="h-4"/>
              </div>
              <div className="flex items-center justify-center bg-gray-300 rounded-full px-2 py-1">
                <p>Lounges</p>
                <X className="h-4"/>
              </div>
              <div className="flex items-center justify-center bg-gray-300 rounded-full px-2 py-1">
                <p>Lounges</p>
                <X className="h-4"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfoCard;
