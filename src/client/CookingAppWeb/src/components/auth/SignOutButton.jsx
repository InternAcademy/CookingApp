"use client";
import { handleLogout } from "@/msal/msal";
import { FaSignOutAlt } from "react-icons/fa";
import { useTheme } from "next-themes";

const SignOutButton = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';

  return (
    <button className="flex items-center" title="Sign Out" onClick={() => handleLogout("redirect")}>
      <FaSignOutAlt className="w-6 h-6 mr-4" color={isDarkTheme ? "white" : "black"} />
      <span className={isDarkTheme ? "text-gray-100" : "text-black"}>Sign Out</span>
    </button>
  );
};

export default SignOutButton;
