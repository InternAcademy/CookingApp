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
  const photoUri = useSelector(state => state.ui.photoUri);

  useEffect(() => {
    const savedPhotoUri = localStorage.getItem("photoUri");
    if (savedPhotoUri) {
      dispatch(uiActions.setPhotoUri(savedPhotoUri));
    }
  }, [dispatch]);

  const handleImageUpload = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        dispatch(uiActions.setPhotoUri(result));
        if (typeof window !== "undefined") {
          localStorage.setItem("photoUri", result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div onClick={event => event.stopPropagation()} className={`absolute right-10 top-12 w-64 bg-gray-200 
    ${isDarkTheme
        ? "bg-[#202020]"
        : "bg-white"} 
        border border-gray-300 rounded-md shadow-lg z-20`}>
      <div className="flex flex-col p-4">
        {/* <div className="flex justify-center w-full mb-8 relative">
          {photoUri ? <img src={photoUri} alt="Profile" className="w-24 h-24 rounded-full object-cover cursor-pointer" onClick={() => document.getElementById("fileInput").click()} style={{ width: "8rem", height: "8rem" }} /> : <FaUserCircle className="w-24 h-24 cursor-pointer" color={isDarkTheme ? "white" : "black"} onClick={() => document.getElementById("fileInput").click()} style={{ width: "6rem", height: "6rem" }} />}
          <input type="file" id="fileInput" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
        </div> */}
        <div className="flex  flex-col items-start w-full space-y-2">
          <div className="flex items-center w-full cursor-pointer p-2 hover:bg-gray-100 hover:rounded" onClick={() => { router.push("/recipes"); toggleDropDown(); }} title="Recipes">
            <FaUtensils className="w-6 h-6 mr-4" color={isDarkTheme ? "white" : "black"} />
            <span className={`text-lg ${isDarkTheme ? "text-white" : "text-black"}`}>Recipes</span>
          </div>
          <div className="flex items-center w-full  cursor-pointer p-2 hover:bg-gray-100 hover:rounded" onClick={() => { router.push("/subscription"); toggleDropDown(); }} title="Subscription">
            <FaCreditCard className="w-6 h-6 mr-4" color={isDarkTheme ? "white" : "black"} />
            <span className={`text-lg ${isDarkTheme ? "text-white" : "text-black"}`}>Subscription</span>
          </div> <div className="flex items-center w-full  cursor-pointer p-2 hover:bg-gray-100 hover:rounded" onClick={() => { router.push("/settings"); toggleDropDown(); }} title="Settings">
            <FaCog className="w-6 h-6 mr-4" color={isDarkTheme ? "white" : "black"} />
            <span className={`text-lg ${isDarkTheme ? "text-white" : "text-black"}`}>Settings</span>
          </div>
          {/* <div className="flex items-center w-full mb-2 cursor-pointer" onClick={() => { router.push("/food-preferences"); toggleDropDown(); }} title="Food Preferences">
            <FaLeaf className="w-6 h-6 mr-4" color={isDarkTheme ? "white" : "black"} />
            <span className={`text-lg ${isDarkTheme ? "text-white" : "text-black"}`}>Food Preferences</span>
          </div> */}
          {/* <div className="flex items-center w-full mb-2 cursor-pointer" onClick={() => { router.push("/archived-recipes"); toggleDropDown(); }} title="Archived Recipes">
            <FaArchive className="w-6 h-6 mr-4" color={isDarkTheme ? "white" : "black"} />
            <span className={`text-lg ${isDarkTheme ? "text-white" : "text-black"}`}>Archived Recipes</span>
          </div> */}
          {/* <div className="flex items-center w-full mb-2 cursor-pointer" onClick={() => { router.push("/language-theme"); toggleDropDown(); }} title="Language & Theme">
            <FaLanguage className="w-6 h-6 mr-4" color={isDarkTheme ? "white" : "black"} />
            <span className={`text-lg ${isDarkTheme ? "text-white" : "text-black"}`}>Language & Theme</span>
          </div> */}
          {/* <div className="flex items-center w-full mb-2 cursor-pointer" onClick={() => { router.push("/rules-policies"); toggleDropDown(); }} title="Rules And Policies">
            <FaFileAlt className="w-6 h-6 mr-4" color={isDarkTheme ? "white" : "black"} />
            <span className={`text-lg ${isDarkTheme ? "text-white" : "text-black"}`}>Rules And Policies</span>
          </div> */}
          {/* <div className="flex items-center w-full mb-2 cursor-pointer" onClick={() => { router.push("/about"); toggleDropDown(); }} title="About">
            <FaInfoCircle className="w-6 h-6 mr-4" color={isDarkTheme ? "white" : "black"} />
            <span className={`text-lg ${isDarkTheme ? "text-white" : "text-black"}`}>About</span>
          </div> */}
          {/* <div className="flex items-center w-full mb-2 cursor-pointer" onClick={() => { router.push("/contacts"); toggleDropDown(); }} title="Contacts">
            <FaEnvelope className="w-6 h-6 mr-4" color={isDarkTheme ? "white" : "black"} />
            <span className={`text-lg ${isDarkTheme ? "text-white" : "text-black"}`}>Contacts</span>
          </div> */}
        </div>
        <hr className="w-full border-gray-200 mt-2 mb-2" />
        <div className="p-2 hover:bg-gray-100 hover:rounded">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
};

export default UserMenu;