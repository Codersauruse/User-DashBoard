import { useRecoilState } from "recoil";
import { expandedState } from "../components/recoil/atom";
import { useLocation } from "react-router-dom";
import {
  CalendarDays,
  DollarSign,
  UserCircle,
  BookOpen,
  HomeIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const SidebarItem = ({ Icon, pathname, text, isOpen }) => {
  const location = useLocation();

  return (
    <li
      className={`${
        location.pathname === pathname ? "bg-indigo-600" : "hover:bg-gray-700"
      } flex items-center p-3 text-gray-400 hover:text-white transition-colors duration-200`}
    >
      <Icon className="w-6 h-6" />
      {isOpen && (
        <Link to={pathname} className="ml-3 text-sm font-medium">
          {text}
        </Link>
      )}
    </li>
  );
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useRecoilState(expandedState);

  const sideBarItemList = [
    {
      text: "Time Table",
      icon: CalendarDays,
      path: "/dashboard/timetable",
    },
    {
      text: "My Booking",
      icon: BookOpen,
      path: "/dashboard/booking",
    },
    {
      text: "My Payment", //Booking
      icon: DollarSign,
      path: "/dashboard/payment",
    },
    {
      text: "Profile",
      icon: UserCircle,
      path: "/dashboard/profile",
    },
  ];

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-16"
      } bg-gray-800 text-white h-full transition-all duration-300`}
    >
      <div className="p-4">
        <h1
          className={`text-lg font-bold ${
            isOpen ? "block" : "hidden"
          } transition-all`}
        >
          Astra Ride
        </h1>
      </div>
      <ul className="space-y-2 mt-4">
        <SidebarItem
          key={"/"}
          Icon={HomeIcon}
          pathname={"/"}
          text={"Home"}
          isOpen={isOpen}
        />
        {sideBarItemList.map((item) => (
          <SidebarItem
            key={item.path}
            Icon={item.icon}
            pathname={item.path}
            text={item.text}
            isOpen={isOpen}
          />
        ))}
      </ul>
    </aside>
  );
};

SidebarItem.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  pathname: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
export default Sidebar;
