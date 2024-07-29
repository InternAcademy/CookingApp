// pages/User-Menu.jsx
"use client";

import "tailwindcss/tailwind.css";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import SignOutButton from '@/components//auth/SignOutButton';
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "@/store/ui-slice";
import { FaUserCircle, FaUtensils, FaCreditCard, FaCog, faGear, FaLeaf, FaArchive, FaLanguage, FaFileAlt, FaInfoCircle, FaEnvelope } from "react-icons/fa";
// import { IoSettingsSharp } from "react-icons/io5";

const UserMenu = ({ isOpen, toggleDropDown }) => {
  const router = useRouter();
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);
  const dispatch = useDispatch();
  // const photoUri = useSelector(state => state.ui.photoUri);

  // useEffect(() => {
  //   const savedPhotoUri = localStorage.getItem("photoUri");
  //   if (savedPhotoUri) {
  //     dispatch(uiActions.setPhotoUri(savedPhotoUri));
  //   }
  // }, [dispatch]);

  // const handleImageUpload = event => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const result = reader.result;
  //       dispatch(uiActions.setPhotoUri(result));
  //       if (typeof window !== "undefined") {
  //         localStorage.setItem("photoUri", result);
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  if (!isOpen) return null;

  return (
    <div
      onClick={event => event.stopPropagation()}
      className={`absolute right-10 top-12 w-64  
    ${isDarkTheme
          ? "bg-[#2F2F2F]"
          : "bg-white"} 
        border border-gray-300 rounded-md shadow-lg z-20`}>
      <div className="flex flex-col p-4">
        <div className="flex  flex-col items-start w-full space-y-2">
          <div
            className={`flex items-center w-full cursor-pointer p-2 
              ${isDarkTheme
                ? 'hover:bg-[#424242]'
                : 'hover:bg-gray-100'} hover:rounded`}
            onClick={() => { router.push("/recipes"); toggleDropDown(); }}
            title="Recipes">
            <FaUtensils
              className="w-6 h-6 mr-4
            smallPhone:w-4
            phone:w-4
            tablet:w-6
            web:w-6"
              color={isDarkTheme ? "white" : "black"} />
            <span
              className={` 
            ${isDarkTheme
                  ? "text-white"
                  : "text-black"}
            smallPhone:text-base
            phone:text-base
            tablet:text-lg
            web:text-lg`}>Recipes</span>
          </div>
          <div
            className={`flex items-center w-full  cursor-pointer p-2  
              ${isDarkTheme
                ? 'hover:bg-[#424242]'
                : 'hover:bg-gray-100'} hover:rounded`}
            onClick={() => { router.push("/subscription"); toggleDropDown(); }}
            title="Subscription">
            <FaCreditCard
              className="w-6 h-6 mr-4
            smallPhone:w-4
            phone:w-4
            tablet:w-6
            web:w-6"
              color={isDarkTheme ? "white" : "black"} />
            <span
              className={`
                ${isDarkTheme ? "text-white" : "text-black"}
            smallPhone:text-base
            phone:text-base
            tablet:text-lg
            web:text-lg`}>Subscription</span>
          </div>
          <div
            className={`flex items-center w-full  cursor-pointer p-2 
              ${isDarkTheme
                ? 'hover:bg-[#424242]'
                : 'hover:bg-gray-100'} hover:rounded`}
            onClick={() => { router.push("/settings"); toggleDropDown(); }}
            title="Settings">
            <FaCog
              className="w-6 h-6 mr-4
            smallPhone:w-4
            phone:w-4
            tablet:w-6
            web:w-6"
              color={isDarkTheme ? "white" : "black"} />
            <span
              className={`
            ${isDarkTheme ? "text-white" : "text-black"}
            smallPhone:text-base
            phone:text-base
            tablet:text-lg
            web:text-lg`}>Settings</span>
          </div>
        </div>
        <hr className={`w-full mt-2 mb-2
        ${isDarkTheme
            ? 'border-[#3C3C3C]'
            : 'border-gray-200'}`} />
        <div className={`p-2 
        ${isDarkTheme
            ? 'hover:bg-[#424242]'
            : 'hover:bg-gray-100'} hover:rounded`}>
          <SignOutButton />
        </div>
      </div>
    </div>
  );
};

export default UserMenu;