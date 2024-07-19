// components/NavBar.jsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../redux/userSlice";
import { ChatBubbleBottomCenterTextIcon, Bars3BottomLeftIcon } from "@heroicons/react/solid";
// import Sidebar from "./Sidebar";

const NavBar = () => {
  const router = useRouter();
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const startNewChat = () => {
    dispatch(userActions.clearChat());
    router.push("/home");
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-10 ${isDarkTheme ? "bg-[#202020]" : "bg-white"} w-full`}>
      <div className={`flex justify-between items-center h-16 px-4 ${isDarkTheme ? "bg-[#202020]" : "bg-white"}`}>
        <div className="flex items-center">
          <button onClick={() => setOpen(true)} className="mx-2">
            <Bars3BottomLeftIcon className="w-6 h-6" color={isDarkTheme ? "white" : "black"} />
          </button>
          <button onClick={startNewChat} className="mx-0 mt-1">
            <ChatBubbleBottomCenterTextIcon className="w-6 h-6" color={isDarkTheme ? "white" : "black"} />
          </button>
        </div>
        <div className="flex items-center">
          <button onClick={() => router.push("/recipes")} className="mx-2">
            <svg className="w-6 h-6" fill={isDarkTheme ? "white" : "black"}>
              <use xlinkHref="#icon-restaurant"></use>
            </svg>
          </button>
          <button onClick={() => router.push("/user-menu")} className="mx-2">
            <svg className="w-6 h-6" fill={isDarkTheme ? "white" : "black"}>
              <use xlinkHref="#icon-person"></use>
            </svg>
          </button>
        </div>
      </div>
      {/* <Sidebar open={open} setOpen={setOpen} /> */}
    </div>
  );
};

export default NavBar;
