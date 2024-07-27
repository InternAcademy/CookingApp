// components/ThemeSwitcher.jsx
"use client";

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "@/store/ui-slice";
import { useTheme } from "next-themes";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(uiActions.setTheme(theme === "dark"));
  }, [theme, dispatch]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);

  return (
    <button onClick={toggleTheme} className={`w-full py-3 rounded-full ${isDarkTheme ? "bg-customGray400 text-white" : "bg-white text-black"} border ${isDarkTheme ? "border-customGray400" : "border-customGray600"}`}>
      {isDarkTheme ? "Dark Mode" : "Light Mode"}
    </button>
  );
}
