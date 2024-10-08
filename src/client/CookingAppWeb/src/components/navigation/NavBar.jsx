// components/NavBar.jsx
"use client";
import "tailwindcss/tailwind.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { useSelector } from "react-redux";
import { FaCommentDots, FaBars, FaUtensils, FaUser } from "react-icons/fa";
import Sidebar from "./Sidebar";

const NavBar = () => {
  const router = useRouter();
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);
  const [open, setOpen] = useState(false);

  const startNewChat = () => {
    router.push("/");
  };

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-10 ${isDarkTheme ? "bg-[#202020]" : "bg-white"} w-full`}>
        <div className={`flex justify-between items-center h-16 px-4 ${isDarkTheme ? "bg-[#202020]" : "bg-white"}`}>
          <div className="flex items-center">
            <button onClick={() => setOpen(true)} className="mx-2">
              <FaBars className="w-6 h-6" color={isDarkTheme ? "white" : "black"} />
            </button>
            <button onClick={startNewChat} className="mx-0 mt-1">
              <FaCommentDots className="w-6 h-6" color={isDarkTheme ? "white" : "black"} />
            </button>
          </div>
          <div className="flex items-center">
            <button onClick={() => router.push("/recipes")} className="mx-2">
              <FaUtensils className="w-6 h-6" color={isDarkTheme ? "white" : "black"} />
            </button>
            <button onClick={() => router.push("/user-menu")} className="mx-2">
              <FaUser className="w-6 h-6" color={isDarkTheme ? "white" : "black"} />
            </button>
          </div>
        </div>
      </div>
      <Sidebar open={open} setOpen={setOpen} />
    </>
  );
};

export default NavBar;
