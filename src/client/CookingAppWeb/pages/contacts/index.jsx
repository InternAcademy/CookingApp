// pages/Contacts.jsx
"use client";

import React from "react";
import { useTheme } from "next-themes";
import "tailwindcss/tailwind.css";

const Contacts = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  return (
    <div className={`flex flex-col p-5 pt-20 min-h-screen ${isDarkTheme ? "bg-[#202020]" : "bg-white"}`}>
      <div className="flex flex-col mb-5 w-full">
        <label className={`text-lg ${isDarkTheme ? "text-white" : "text-gray-800"} mb-2`}>Subject</label>
        <input type="text" className={`h-12 border ${isDarkTheme ? "border-gray-600 bg-gray-700 text-white" : "border-yellow-500 bg-yellow-500 text-black"} rounded-full px-3 w-full`} placeholder="What would you like to talk about?" style={{ color: isDarkTheme ? "#888" : "#555" }} />
      </div>
      <div className="flex flex-col mb-5 w-full">
        <label className={`text-lg ${isDarkTheme ? "text-white" : "text-gray-800"} mb-2`}>Message</label>
        <textarea className={`h-64 border ${isDarkTheme ? "border-gray-600 bg-gray-700 text-white" : "border-yellow-500 bg-yellow-500 text-black"} rounded-lg px-3 pt-2 w-full`} placeholder="Enter your message here..." style={{ color: isDarkTheme ? "#888" : "#555" }} rows="10" />
      </div>
      <button className={`h-12 flex justify-center items-center rounded-full ${isDarkTheme ? "bg-gray-600" : "bg-yellow-500"} w-full`}>
        <span className={`text-lg ${isDarkTheme ? "text-white" : "text-gray-800"}`}>Send</span>
      </button>
    </div>
  );
};

export default Contacts;
