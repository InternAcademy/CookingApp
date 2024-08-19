// pages/RecipesDetails.jsx
"use client";

import "tailwindcss/tailwind.css";
import React from "react";

import { useSelector } from "react-redux";

const RecipesDetails = () => {
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);

  return (
    <div className={`flex items-center justify-center min-h-screen ${isDarkTheme ? "bg-[#202020]" : "bg-base
      <h1 className={`text-2xl font-bold ${isDarkTheme ? "text-white" : "text-gray-900"}`}>RecipesDetails</h1>
    </div>
  );
};

export default RecipesDetails;
