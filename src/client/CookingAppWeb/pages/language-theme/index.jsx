"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "@/app/store/ui-slice";

const LanguageAndTheme = () => {
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const dispatch = useDispatch();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      dispatch(uiActions.setTheme(storedTheme === "dark"));
    }
  }, [dispatch]);

  const handleThemeChange = () => {
    dispatch(uiActions.toggleTheme());
    localStorage.setItem("theme", !isDarkTheme ? "dark" : "light");
  };

  const handleLanguageChange = () => {
    const newLanguage = selectedLanguage === "English" ? "Spanish" : "English";
    setSelectedLanguage(newLanguage);
    window.alert(`Language Changed: Selected language: ${newLanguage}`);
  };

  return (
    <div className={`flex flex-1 ${isDarkTheme ? "bg-[#202020]" : "bg-white"} p-6`}>
      <div className="mb-6">
        <div className="mb-4">
          <button onClick={handleLanguageChange} className={`border rounded-full p-4 ${isDarkTheme ? "bg-[#303030] border-gray-300" : "bg-white border-gray-600"}`}>
            <span className={`${isDarkTheme ? "text-white" : "text-black"} text-base`}>{`Language: ${selectedLanguage}`}</span>
          </button>
        </div>

        <div className="mb-4">
          <button onClick={handleThemeChange} className={`border rounded-full p-4 ${isDarkTheme ? "bg-[#303030] border-gray-300" : "bg-white border-gray-600"}`}>
            <span className={`${isDarkTheme ? "text-white" : "text-black"} text-base`}>{`Theme: ${isDarkTheme ? "Dark" : "Light"}`}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageAndTheme;
