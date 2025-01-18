import { menuItems } from "../constants/menu";
import { useSelector, useDispatch } from "react-redux";
import { setActiveMenuItem } from "../redux/slices/menuSlice";
import { AppDispatch, RootState } from "../redux/store";
import { useCallback } from "react";
import { Link } from "react-router-dom";

const Menu: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const activeMenuItem = useSelector(
    (state: RootState) => state.menu.activeMenuItem
  );

  const isSidebarOpen = useSelector(
    (state: RootState) => state.sidebar.sidebarOpen
  );

  const handleMenuItemClick = useCallback(
    (link: string) => {
      dispatch(setActiveMenuItem(link));
    },
    [dispatch]
  );

  return (
    <div>
      {menuItems.map((section, index) => (
        <div key={index} className="">
          {/* <h3 className={`${isSidebarOpen ? 'hidden md:block' : 'hidden'}`}>
            {section.menu}
          </h3> */}
          <ul>
            {section.items.map((item, itemIndex) => (
              <li
                key={itemIndex}
                className={`mt-6 p-1 hover:text-gray-950 transition duration-300 ${
                  activeMenuItem === item.link
                    ? "border-l-2 border-customBlue text-customBlue hover:text-customBlue"
                    : "border-l-2 border-transparent text-gray-600"
                }`}
              >
                {/* Use only Link for navigation */}
                <Link
                  to={item.link}
                  onClick={() => handleMenuItemClick(item.link)}
                >
                  <div className={`flex flex-row items-center translate-x-[22%] gap-2 text-sm ${isSidebarOpen ? '' : ''}`}>
                    <item.icon className={`h-4 m-auto  ${isSidebarOpen ? 'md:m-0' : 'm-auto'}`} />
                    <div className={` ${isSidebarOpen ? 'hidden md:block' : 'hidden'}`}>
                      {item.name}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Menu;