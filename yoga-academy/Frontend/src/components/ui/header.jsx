import React, { useState, useEffect } from "react";

const Header = () => {
  const [signInUrl, setSignInUrl] = useState("#");
  const [signUpUrl, setSignUpUrl] = useState("#");

  useEffect(() => {
    setSignInUrl("/yoga/login");
    setSignUpUrl("/yoga/register");
  }, []);

  return (
    <header
      className="flex justify-between items-center py-4 px-8 bg-black border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700"
      style={{ position: "sticky", top: "0", zIndex: "999" }}
    >
      <a
        href="#"
        className="text-lg font-mono text-gray-800 dark:text-gray-200"
        style={{ fontSize: "1.5rem" }} // Adjust the font size as needed
      >
        Om Yoga
      </a>
    </header>
  );
};

export default Header;
