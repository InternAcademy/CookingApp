"use client";
import { handleLogout } from "@/msal/msal";
import { FaSignOutAlt } from "react-icons/fa";

const SignOutButton = () => {

    return (
        <button className="flex items-center" title="Sign Out" onClick={() => handleLogout("redirect")}>
            <FaSignOutAlt
                className="mr-4
                        sm:w-4 sm:h-4
                        md:w-6 md:h-6
                        lg:w-6 lg:h-6
                        xl:w-6 xl:h-6"
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
