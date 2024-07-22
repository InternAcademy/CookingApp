// pages/RecipesDetails.jsx
"use client";

import React from "react";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";

const RecipesDetails = () => {
  const { theme } = useTheme();
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);

  return (
    <div className={`flex items-center justify-center min-h-screen ${isDarkTheme ? "bg-[#202020]" : "bg-gray-100"}`}>
      <h1 className={`text-2xl font-bold ${isDarkTheme ? "text-white" : "text-gray-900"}`}>RecipesDetails</h1>
    </div>
  );
};

export default RecipesDetails;
