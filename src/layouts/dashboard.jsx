import {
  Bars3Icon,
  BellIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Logo from "../assets/logo.jpg";
// import DarkModeToggle from "../DarkModeTheme/DarkModeToggle";
import { useRecoilState } from "recoil";
import { expandedState } from "../components/recoil/atom";
import { X } from "lucide-react";
import { Route, Routes } from "react-router-dom";
import routes from "../routes";
import Sidebar from "../components/sidebar";

const Dashboard = () => {
  const [isExpanded, setIsExpanded] = useRecoilState(expandedState);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div>
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 z-50 h-full transition-transform duration-300 ${
            isExpanded ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar />
        </div>

        {/* Dashboard Content */}
        <div
          className={`flex-1 transition-all duration-300 ${
            isExpanded ? "ml-64" : "ml-0"
          }`}
        >
          <div className="header flex justify-between items-center p-5 bg-sky-700 text-white">
            <div className="flex items-center space-x-4">
              <div className="bar3 cursor-pointer" onClick={handleClick}>
                {!isExpanded ? (
                  <Bars3Icon className="h-8 w-8 text-white" />
                ) : (
                  <X className="h-8 w-8 text-white" />
                )}
              </div>
              <div className="logo w-14 h-14">
                <img
                  src={Logo}
                  alt="Logo"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
            <div className="flex items-center space-x-8">
              {/* <DarkModeToggle /> */}
              <BellIcon className="h-8 w-8 text-white" />
              <UserCircleIcon className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>
      <Routes>
        {routes.map(
          ({ layout, pages }) =>
            layout === "dashboard" &&
            pages.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))
        )}
      </Routes>
    </>
  );
};

export default Dashboard;
