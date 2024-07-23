// app/ThemeProvider.jsx
"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "@/store/ui-slice";

const ThemeProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      document.documentElement.classList.add(theme === "dark" ? "dark" : "light");
      dispatch(uiActions.setTheme(theme === "dark" ? "dark" : null));
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default ThemeProvider;
