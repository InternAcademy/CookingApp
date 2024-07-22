// pages/Contacts.jsx
"use client";

import React from "react";
import { useTheme } from "next-themes";
import "tailwindcss/tailwind.css";

const Contacts = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  return (
    <div className={`flex h-screen w-auto flex-col p-5 min-h-screen ${isDarkTheme ? "bg-customGray" : "bg-customWhite"}`}>
      <h1 className={`text-2xl font-semibold mb-8 ${isDarkTheme ? "text-customWhite" : "text-gray-800"}`}>Contacts</h1>

      <div className="flex flex-col mb-5 w-full">
        <label className={`text-lg ${isDarkTheme ? "text-customWhite" : "text-gray-800"} mb-2`}>Subject</label>
        <input type="text" className={`h-12 border placeholder-slate-500 ${isDarkTheme ? "border-customGray600 bg-gray-700 text-customWhite" : "border-customOrange bg-customOrange text-black"} rounded-full px-3 w-full smallPhone:px-5 smallPhone:h- smallPhone:text-sm`} placeholder="What would you like to talk about?" style={{ color: isDarkTheme ? "#888" : "#555" }} />
      </div>
      <div className="flex flex-col mb-5 w-full">
        <label className={`text-lg ${isDarkTheme ? "text-customWhite" : "text-gray-800"} mb-2`}>Message</label>
        <textarea className={`h-64 border placeholder-slate-500 ${isDarkTheme ? "border-customGray600 bg-gray-700 text-customWhite" : "border-customOrange bg-customOrange text-black"} rounded-lg px-3 pt-2 w-full smallPhone:px-5 smallPhone:pt-4 smallPhone:text-sm`} placeholder="Enter your message here..." style={{ color: isDarkTheme ? "#888" : "#555" }} rows="10" />
      </div>
      <button className={`h-12 flex justify-center items-center rounded-full transition duration-300 ease-in-out ${isDarkTheme
        ? "bg-gray-600 border-customWhite border hover:border-gray-400 hover:text-gray-400"
        : "bg-customOrange border hover:border-gray-800 hover:text-gray-800 hover:shadow-lg"} w-full smallPhone:h-14 smallPhone:text-xl`}>
        <span className={`text-lg ${isDarkTheme ? "text-customWhite hover:text-gray-400" : "text-gray-800 hover:text-gray-800"}`}>Send</span>
      </button>

    </div>
  );
};

export default Contacts;
