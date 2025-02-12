import { Link, useNavigate } from "react-router";
import { LogIn, Power } from "lucide-react";
import Menu from "../components/Menu";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks/hooks";
import { logout } from "../redux/slices/authSlice";
import logo from "../assets/img/logo.png";

const Sidebar = () => {
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/signup");
  };

  return (
    <div className="h-screen w-[200px] fixed top-0 left-0 p-4 bg-gradientto-t from-customBlue to-white">
      {/* Top Profile Section */}

      {isAuthenticated ? (
        <Link
          to="/user-details"
          className="w-full flex flex-col items-center mt-8 mb-10 gap-3"
        >
          <div className="h-12 w-12 rounded-full">
            <img
              src={user.profileImage}
              alt="Profile Picture"
              className="h-full w-full object-cover rounded-full"
            />
          </div>
          <div>
            {user.firstname} {user.lastname}
          </div>
        </Link>
      ) : (
        <div className="w-full flex flex-col items-center mt-8 mb-10 gap-3">
          <div className="h-12 w-12 rounded-full">
            <img
              src={logo}
              alt="Profile Picture"
              className="h-full w-full object-cover rounded-full"
            />
          </div>
          <div className="text-2xl font-semibold">Events<span className="text-customBlue">IQ</span></div>
        </div>
      )}

      {/* Navigation Section */}
      <div>
        <Menu />
      </div>

      {/* Logout Logic Area */}
      <div className="absolute w-[65%] left-[50%] -translate-x-[50%] bottom-10">
        {isAuthenticated ? (
          <div
            className="btn-primary flex gap-2 items-center w-full justify-center"
            onClick={handleLogout}
          >
            <div>
              <Power className="h-5" />
            </div>
            <p>Log Out</p>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn-primary flex gap-2 items-center w-full justify-center"
          >
            <div>
              <LogIn className="h-5" />
            </div>
            <p>Sign In</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
