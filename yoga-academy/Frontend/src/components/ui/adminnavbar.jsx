import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <nav className="bg-gray-800 text-white py-3 px-4 flex items-center justify-between">
      <a
        className="font-mono text-xl tracking-tight"
        href="#"
        onClick={() => handleNavigation("/")}
      >
        Om Yoga
      </a>
      <div className="flex items-center">
        <a
          className="text-sm px-4 py-2 leading-none rounded-full hover:bg-gray-700"
          href=""
          onClick={() => handleNavigation("/yoga/admin/class")}
        >
          Class
        </a>
        <a
          className="text-sm px-4 py-2 leading-none rounded-full hover:bg-gray-700"
          href=""
          onClick={() => handleNavigation("/yoga/admin/institute")}
        >
          Institute
        </a>
        <a
          className="text-sm px-4 py-2 leading-none rounded-full hover:bg-gray-700"
          href=""
          onClick={() => handleNavigation("/yoga/admin/add_class")}
        >
          Add Course
        </a>
        <a
          className="text-sm px-4 py-2 leading-none rounded-full hover:bg-gray-700"
          href=""
          onClick={() => handleNavigation("/yoga/admin/student")}
        >
          Students
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
