// components/NavBar.jsx
"use client";
import "tailwindcss/tailwind.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useSelector } from "react-redux";
import { FaCommentDots, FaBars, FaUtensils, FaUser } from "react-icons/fa";
import Sidebar from "./Sidebar";
import UserMenu from "../UserMenu";
const NavBar = () => {
  const router = useRouter();
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);
  const [open, setOpen] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const startNewChat = () => {
    router.push("/");
  };

  const toggleDropDown = (event) => {
    // event.stopPropagation();
    setDropDownOpen(!dropDownOpen);
  }

  const handleClickOutside = () => {
    setDropDownOpen(false);
  };

  useEffect(() => {

    if (dropDownOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropDownOpen]);

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
            <button onClick={() => toggleDropDown()} className="mx-2">
              <FaUser className="w-6 h-6" color={isDarkTheme ? "white" : "black"} />
            </button>
            <UserMenu isOpen={dropDownOpen} toggleDropDown={toggleDropDown}  />
          </div>
        </div>
      </div>
      <Sidebar open={open} setOpen={setOpen} />
    </>
  );
};

export default NavBar;
