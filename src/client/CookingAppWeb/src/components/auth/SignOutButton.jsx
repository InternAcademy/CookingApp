"use client";
import { handleLogout } from "@/msal/msal";

const SignOutButton = () => {
  return (
    <button
      className="flex items-center"
      title="Sign Out"
      onClick={() => handleLogout("redirect")}
    >
      <span className={`text-lg primaryText`}>Sign Out</span>
    </button>
  );
};
export default SignOutButton;
