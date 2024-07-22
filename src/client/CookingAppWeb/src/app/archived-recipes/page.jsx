"use client";

import React from "react";
import { useTheme } from "next-themes";
import "tailwindcss/tailwind.css";

const ArchivedRecipes = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  return (
    <div className={`flex items-center justify-center min-h-screen ${isDarkTheme ? "bg-[#202020]" : "bg-gray-100"}`}>
      <h1 className={`text-2xl font-bold ${isDarkTheme ? "text-white" : "text-gray-900"}`}>ArchivedRecipes</h1>
    </div>
  );
};

export default ArchivedRecipes;
