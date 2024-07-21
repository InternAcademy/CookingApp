// pages/language-theme/index.jsx
"use client";
import { useState } from "react";
import { ThemeSwitcher } from "@/app/components/ThemeSwitcher";
import { useTheme } from "next-themes";
import "tailwindcss/tailwind.css";

const LanguageAndTheme = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  const handleLanguageChange = () => {
    const newLanguage = selectedLanguage === "English" ? "Spanish" : "English";
    setSelectedLanguage(newLanguage);
    window.alert(`Language Changed: Selected language: ${newLanguage}`);
  };

  return (
    <div className={`h-screen flex items-start justify-center ${isDarkTheme ? "bg-customGray" : "bg-customWhite"} ${isDarkTheme ? "text-white" : "text-black"}`}>
      <div className={`p-8 rounded-lg shadow-lg ${isDarkTheme ? "bg-customGray600" : "bg-white"}`}>
        <h1 className={`text-center text-2xl mb-6 ${isDarkTheme ? "text-white" : "text-black"}`}>Language And Theme</h1>
        <div className="space-y-4">
          <button onClick={handleLanguageChange} className={`w-full py-3 rounded-full ${isDarkTheme ? "bg-customGray400 text-white" : "bg-white text-black"} border ${isDarkTheme ? "border-customGray400" : "border-customGray600"} mb-4`}>
            {`Language: ${selectedLanguage}`}
          </button>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};

export default LanguageAndTheme;
