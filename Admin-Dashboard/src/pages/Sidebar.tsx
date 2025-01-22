import profilePhoto from "../assets/img/profile.jpg";
import Menu from "../components/Menu";
import { Power } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="h-screen w-[200px] fixed top-0 left-0 p-4 bg-gradientto-t from-customBlue to-white">
        {/* Top Profile Section */}
        <div className="w-full flex flex-col items-center mt-10 mb-10 gap-3">
            <div className="h-12 w-12 rounded-full">
                <img src={profilePhoto} alt="Profile Picture" className="h-12 w-12 rounded-full" />
            </div>
            <div>
                Arnold Chris
            </div>
        </div>

        {/* Navigation Section */}
        <div>
            <Menu />
        </div>

        {/* Logout Logic Area */}
        <div className="absolute left-[50%] -translate-x-[50%] bottom-10">
            <div className="flex gap-3 text-gray-500 hover:text-black cursor-pointer transition duration-custom">
                <div>
                    <Power />
                </div>
                <div>
                    <p>Log Out</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Sidebar