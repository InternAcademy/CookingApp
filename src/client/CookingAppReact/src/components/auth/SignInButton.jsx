// SignInButton.jsx
"use client";

import { handleLogin } from "../../msal/msal";

export const SignInButton = ({ className = "", text = "Login" }) => {
  return (
    <button className={`bg-basicWhite py-4 px-10 mt-4 mb-4 rounded-full ${className}`} onClick={() => handleLogin("redirect")}>
      <span className="text-lg font-bold text-customOrange">{text}</span>
    </button>
  );
};
