import React from "react";
import { FaSpinner } from "react-icons/fa";
import "tailwindcss/tailwind.css";

const Spinner = ({ size = "6", color = "#0000ff" }) => {
  const spinnerSize = size === "large" ? "text-6xl" : "text-4xl";

  return (
    <div className="flex flex-1 justify-center items-center">
      <FaSpinner className={`animate-spin ${spinnerSize}`} style={{ color }} />
    </div>
  );
};

export default Spinner;
