// pages/Contacts.jsx
"use client";

import React from "react";
import "tailwindcss/tailwind.css";
import { useSelector } from "react-redux";

const Contacts = () => {
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);

  return (
    <div className={`flex flex-col p-5 pt-20 min-h-screen ${isDarkTheme ? "bg-customGray" : "bg-customWhite"}`}>
      <h1 className={`text-2xl font-semibold mb-8 ${isDarkTheme ? "text-customWhite" : "text-gray-800"}`}>Contacts</h1>

      <div className="flex flex-col mb-5 w-full">
        <label className={`text-lg ${isDarkTheme ? "text-customWhite" : "text-gray-800"} mb-2`}>Subject</label>
        <input type="text" className={`h-12 border ${isDarkTheme ? "border-customGray600 bg-gray-700 text-customWhite" : "border-customOrange bg-customOrange text-black"} rounded-full px-3 w-full`} placeholder="What would you like to talk about?" style={{ color: isDarkTheme ? "#888" : "#555" }} />
      </div>
      <div className="flex flex-col mb-5 w-full">
        <label className={`text-lg ${isDarkTheme ? "text-customWhite" : "text-gray-800"} mb-2`}>Message</label>
        <textarea className={`h-64 border ${isDarkTheme ? "border-customGray600 bg-gray-700 text-customWhite" : "border-customOrange bg-customOrange text-black"} rounded-lg px-3 pt-2 w-full`} placeholder="Enter your message here..." style={{ color: isDarkTheme ? "#888" : "#555" }} rows="10" />
      </div>
      <button className={`h-12 flex justify-center items-center rounded-full ${isDarkTheme ? "bg-gray-600 border-customWhite border" : "bg-customOrange"} w-full`}>
        <span className={`text-lg ${isDarkTheme ? "text-customWhite" : "text-gray-800"}`}>Send</span>
      </button>
    </div>
  );
};

export default Contacts;
