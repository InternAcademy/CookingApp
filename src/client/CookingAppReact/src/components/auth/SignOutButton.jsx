"use client";
import { handleLogout } from "@/msal/msal";
import { FaSignOutAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
// import { useTheme } from "next-themes";

const SignOutButton = () => {
  const { i18n, t } = useTranslation();
  // const { theme } = useTheme();
  // const isDarkTheme = theme === 'dark';

  return (
    <button className="flex items-center" title="Sign Out" onClick={() => handleLogout("redirect")}>
      <ArrowRightStartOnRectangleIcon
        className="w-6 h-6 mr-4
      sm:w-4
      md:w-4
      lg:w-6
      xl:w-6"
        // color={isDarkTheme ? "white" : "black"} 
        />
      <span
        className={`text-primaryText`}>{t("SignOut")}</span>
    </button>
  );
};

export default SignOutButton;
