// SignOutButton.jsx
"use client";
import { handleLogout } from "@/msal/msal";
import { FaSignOutAlt } from "react-icons/fa";
import { useTheme } from "next-themes";

const SignOutButton = () => {
  const { isDarkTheme } = useTheme();

  return (
    <button className="flex items-center" title="Sign Out" onClick={() => handleLogout("redirect")}>
      <FaSignOutAlt className="w-6 h-6 mr-4" color={isDarkTheme ? "white" : "black"} />
      <span className={`text-lg ${isDarkTheme ? "text-gray-100" : "text-black"}`}>Sign Out</span>
    </button>
  );
};

export default SignOutButton;
