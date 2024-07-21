// pages/language-theme/index.jsx
"use client";
import { useState, useEffect } from "react";
import { ThemeSwitcher } from "@/app/components/ThemeSwitcher";
import "tailwindcss/tailwind.css";

const LanguageAndTheme = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const handleLanguageChange = () => {
    const newLanguage = selectedLanguage === "English" ? "Spanish" : "English";
    setSelectedLanguage(newLanguage);
    window.alert(`Language Changed: Selected language: ${newLanguage}`);
  };

  return (
    <div className="h-screen flex items-start justify-center bg-background">
      <div className="p-8 rounded-lg shadow-lg bg-gray-800">
        <h1 className="text-center text-2xl mb-6">Language And Theme</h1>
        <div className="space-y-4">
          <button onClick={handleLanguageChange} className="w-full py-3 rounded-full bg-white border-customGray600 text-black border">
            {`Language: ${selectedLanguage}`}
          </button>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};

export default LanguageAndTheme;
