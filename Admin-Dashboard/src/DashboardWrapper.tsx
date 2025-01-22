import Sidebar from "./pages/Sidebar";

import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
    const isSidebarOpen = useSelector(
        (state: RootState) => state.sidebar.sidebarOpen
    )
    return (
        <div className="flex w-full">
            <Sidebar />
            <main className={`flex flex-col w-full h-screen bg-gray-100 transition-all duration-300 ${isSidebarOpen ? 'pl-24 md:pl-52' : 'pl-6 md:pl-28'}`}>
                {children}
            </main>
        </div>
    )
}

const DashboardWrapper = ({ children } : { children: React.ReactNode }) => {
    return (
        <Dashboardlayout>{children}</Dashboardlayout>
    )
}

export default DashboardWrapper;