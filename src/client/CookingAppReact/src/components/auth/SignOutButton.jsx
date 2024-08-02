"use client";
import { handleLogout } from "@/msal/msal";
import { FaSignOutAlt } from "react-icons/fa";

const SignOutButton = () => {

  return (
    <button className="flex items-center" title="Sign Out" onClick={() => handleLogout("redirect")}>
      <FaSignOutAlt
        className="w-6 h-6 mr-4
      smallPhone:w-4
      phone:w-4
      tablet:w-6
      web:w-6"
      />
      <span
        className={`
        sm:text-base
        md:text-base
        lg:text-lg
        xl:text-lg`}>Sign Out</span>
    </button>
  );
};

export default SignOutButton;
