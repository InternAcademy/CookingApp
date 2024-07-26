// pages/Contacts.jsx
"use client";

import "tailwindcss/tailwind.css";
import React from "react";
import { useTheme } from "next-themes";

const Contacts = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  return (
    <div
      className={`flex h-screen flex-col mx-auto mt-10 p-5 min-h-screen ${isDarkTheme ? "bg-rgba(18, 18, 18, 1)" : "bg-customWhite"}
    smallPhone:w-full
    phone:w-full
    table:w-1/2
    web:w-1/2`}>
      <h1 className={`text-2xl font-semibold mx-auto mb-8 ${isDarkTheme ? "text-customWhite" : "text-gray-800"}`}>Contacts</h1>

      <div className="flex flex-col mb-5 w-full">
        <label className={`text-lg ${isDarkTheme ? "text-customWhite" : "text-gray-800"} mb-2`}>Subject</label>
        <input
          type="text"
          className={`h-12 border placeholder-slate-500 ${isDarkTheme ? "border-customGray600 bg-gray-700 text-customWhite placeholder:text-#fff" : "border-customLightGray bg-customLightGray text-black placeholder:text-#555"} 
        rounded-full px-3 w-full 
        smallPhone:px-3 smallPhone:h-12 smallPhone:text-sm 
        phone:px-6 phone:h-14 phone:text-sm 
        table:px-7 tablet:h-16 tablet:text-base 
        web:px-7 web:h-14 web:text-base`}
          placeholder="What would you like to talk about?"
        />
      </div>
      <div className="flex flex-col mb-5 w-full">
        <label className={`text-lg ${isDarkTheme ? "text-customWhite" : "text-gray-800"} mb-2`}>Message</label>
        <textarea
          className={`h-64 border placeholder-slate-500 ${isDarkTheme ? "border-customGray600 bg-gray-700 text-customWhite placeholder:text-#fff" : "border-customLightGray bg-customLightGray text-black placeholder:text-#222"} 
        rounded-lg px-3 pt-2 w-full 
        smallPhone:px-5 smallPhone:pt-4 smallPhone:text-sm 
        phone:px-6 phone:pt-5 phone:text-sm 
        tablet:px-7 tablet:pt-6 tablet:text-base 
        web:px-7 web:pt-4 web:text-base`}
          placeholder="Enter your message here..."
          rows="10"
        />
      </div>
      <button
        className={`h-12 flex justify-center items-center rounded-full transition duration-300 ease-in-out ${isDarkTheme ? "bg-gray-600 border-customWhite border hover:border-gray-700 hover:text-gray-400" : "bg-customOrange border hover:border-gray-800 hover:text-gray-800 hover:shadow-lg"} w-full 
        smallPhone:h-14 smallPhone:text-sm 
        phone:h-16 phone:text-sm 
        tablet:h-18 tablet:text-base 
        web:h-14 web:text-base`}>
        <span className={`text-lg ${isDarkTheme ? "text-customWhite hover:text-gray-400" : "text-gray-800 hover:text-gray-800"}`}>Send</span>
      </button>
    </div>
  );
};

export default Contacts;
