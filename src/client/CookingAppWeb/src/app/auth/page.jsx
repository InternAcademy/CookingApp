"use client";

import React from "react";
import "tailwindcss/tailwind.css";
import { useSelector } from "react-redux";

const Contacts = () => {
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);

  return (
    <div className={`flex flex-col p-5 pt-20 min-h-screen ${isDarkTheme ? "bg-customGray" : "bg-customWhite"}`}>
      <h1 className={`text-2xl font-semibold mb-8 ${isDarkTheme ? "text-customWhite" : "text-gray-800"}`}>Hi auth!</h1>
    </div>
  );
};

export default Contacts;
