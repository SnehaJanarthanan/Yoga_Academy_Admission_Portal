import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <aside
      className="flex flex-col w-56 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700"
      style={{
        overflowY: "hidden",
        height: "100vh",
        position: "sticky",
        top: "0",
      }}
    >
      <div className="flex flex-col justify-between flex-1">
        <nav>
          <a
            href=""
            className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-200"
            onClick={() => handleNavigation("/yoga/user/home")}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG path */}
            </svg>
            <span className="mx-4 font-medium">Home</span>
          </a>

          <a
            href=""
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            onClick={() => handleNavigation("/yoga/user/class")}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG path */}
            </svg>
            <span className="mx-4 font-medium">Classes</span>
          </a>

          <a
            href=""
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            onClick={() => handleNavigation("/yoga/user/institute")}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG path */}
            </svg>
            <span className="mx-4 font-medium">Institutes</span>
          </a>

          <a
            href=""
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            onClick={() => handleNavigation("/yoga/user/about")}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG path */}
            </svg>
            <span className="mx-4 font-medium">About Us</span>
          </a>
        </nav>
      </div>
    </aside>
  );
};

export default Navbar;
