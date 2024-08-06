"use client";
import { handleLogout } from "@/msal/msal";
import { FaSignOutAlt } from "react-icons/fa";

import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
// import { useTheme } from "next-themes";

const SignOutButton = () => {
  // const { theme } = useTheme();
  // const isDarkTheme = theme === 'dark';

  return (
    <button className="flex items-center" title="Sign Out" onClick={() => handleLogout("redirect")}>
      <ArrowRightStartOnRectangleIcon
        className="w-6 h-6 mr-4
      smallPhone:w-4
      phone:w-4
      tablet:w-6
      web:w-6"
        // color={isDarkTheme ? "white" : "black"} 
        />
      <span
        className={`
        smallPhone:text-base
        phone:text-base
        tablet:text-lg
        web:text-lg`}>Sign Out</span>
    </button>
  );
};

export default SignOutButton;
