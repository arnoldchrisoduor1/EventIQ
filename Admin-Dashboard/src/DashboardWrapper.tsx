import Sidebar from "./pages/Sidebar";
import { Info } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { Link } from "react-router";

const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarOpen = useSelector(
    (state: RootState) => state.sidebar.sidebarOpen
  );
  const { isVerified, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="w-full bg-gray-100">
      <main
        className={`flex flex-col w-full h-screen transition-all duration-300 ${
          isSidebarOpen ? "pl-24 md:pl-52" : "pl-6 md:pl-28"
        }`}
      >
        {!isVerified && isAuthenticated && (
          <div className="bg-yellow-200 flex items-center justify-center">
            <Link
              className="flex items-center bg-yellow-500 rounded-full px-4"
              to="/verify-email"
            >
              <Info className="h-4 text-yellow-800" />
              <p>Verify your email address</p>
            </Link>
          </div>
        )}
        {children}
      </main>
      </div>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Dashboardlayout>{children}</Dashboardlayout>;
};

export default DashboardWrapper;
