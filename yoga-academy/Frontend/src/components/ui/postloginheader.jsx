import { FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa"; // Import icons for user circle, cog, and sign out
import { useState, useRef, useEffect } from "react";

const PostLoginHeader = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logout clicked");
  };

  return (
    <header
      className="flex justify-between items-center py-4 px-8 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700"
      style={{ position: "sticky", top: "0", zIndex: "999" }}
    >
      <div className="flex items-center space-x-2">
        {/* Yoga icon */}
        {/* Om Yoga text */}
        <a
          href="#"
          className="text-lg font-mono text-gray-800 dark:text-gray-200"
          style={{ fontSize: "1.5rem" }} // Adjust the font size as needed
        >
          Om Yoga
        </a>
      </div>
      <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
        {/* Circle with user icon */}
        <div
          className="bg-blue-500 rounded-full p-2 hover:bg-blue-600 cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <FaUserCircle className="text-white" />
        </div>
        {/* Dropdown menu */}
        {showDropdown && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded shadow-lg">
            <button
              className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-left flex items-center"
              onClick={() => console.log("Profile settings clicked")}
            >
              <FaCog className="mr-2" /> Profile Settings
            </button>
            <button
              className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-left flex items-center"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default PostLoginHeader;
