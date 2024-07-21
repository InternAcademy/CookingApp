// components/ThemeSwitcher.jsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <button onClick={toggleTheme} className="w-full py-3 rounded-full bg-white border-customGray600 text-black border">
      {theme === "light" ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
