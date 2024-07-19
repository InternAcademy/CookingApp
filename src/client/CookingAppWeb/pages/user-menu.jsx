"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useRouter } from "next/router";
import { FaUserCircle, FaUtensils, FaCreditCard, FaLeaf, FaArchive, FaLanguage, FaFileAlt, FaInfoCircle, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
// import { uiActions } from "../../../redux/uiSlice";

const UserMenu = () => {
  // const router = useRouter();
  // const dispatch = useDispatch();
  const isDarkTheme = false; // = useSelector(state => state.ui.isDarkTheme);
  // const profileImage = useSelector(state => state.ui.photoUri);
  // const [selectedImage, setSelectedImage] = useState(profileImage);

  const pickImage = async () => {
    const result = await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify({
        /* данни за качване на изображение */
      })
    });

    const data = await result.json();
    if (data.uri) {
      // dispatch(uiActions.setPhotoUri(data.uri));
      setSelectedImage(data.uri);
    } else {
      alert("Грешка при избора на изображение");
    }
  };

  return (
    <div className={`flex flex-col ${isDarkTheme ? "bg-[#202020]" : "bg-white"} p-4`}>
      <div className="flex flex-row justify-center items-center mb-4">{/* <button onClick={pickImage}>{selectedImage ? <img src={selectedImage} className="w-32 h-32 rounded-full" alt="Profile" /> : <FaUserCircle className="w-32 h-32" color={isDarkTheme ? "white" : "black"} />}</button> */}</div>

      <button className="flex flex-row items-center mb-4" onClick={() => router.push("/recipes")}>
        <FaUtensils className="mr-2" color={isDarkTheme ? "white" : "black"} />
        <span className={`text-lg font-bold ${isDarkTheme ? "text-white" : "text-black"}`}>Recipes</span>
      </button>

      <button className="flex flex-row items-center mb-4" onClick={() => router.push("/subscription")}>
        <FaCreditCard className="mr-2" color={isDarkTheme ? "white" : "black"} />
        <span className={`text-lg font-bold ${isDarkTheme ? "text-white" : "text-black"}`}>Subscription</span>
      </button>

      <button className="flex flex-row items-center mb-4" onClick={() => router.push("/food-preferences")}>
        <FaLeaf className="mr-2" color={isDarkTheme ? "white" : "black"} />
        <span className={`text-lg font-bold ${isDarkTheme ? "text-white" : "text-black"}`}>Food Preferences</span>
      </button>

      <button className="flex flex-row items-center mb-4" onClick={() => router.push("/archived-recipes")}>
        <FaArchive className="mr-2" color={isDarkTheme ? "white" : "black"} />
        <span className={`text-lg font-bold ${isDarkTheme ? "text-white" : "text-black"}`}>Archived Recipes</span>
      </button>

      <button className="flex flex-row items-center mb-4" onClick={() => router.push("/language-theme")}>
        <FaLanguage className="mr-2" color={isDarkTheme ? "white" : "black"} />
        <span className={`text-lg font-bold ${isDarkTheme ? "text-white" : "text-black"}`}>Language & Theme</span>
      </button>

      <button className="flex flex-row items-center mb-4" onClick={() => router.push("/rules-policies")}>
        <FaFileAlt className="mr-2" color={isDarkTheme ? "white" : "black"} />
        <span className={`text-lg font-bold ${isDarkTheme ? "text-white" : "text-black"}`}>Rules And Policies</span>
      </button>

      <button className="flex flex-row items-center mb-4" onClick={() => router.push("/about")}>
        <FaInfoCircle className="mr-2" color={isDarkTheme ? "white" : "black"} />
        <span className={`text-lg font-bold ${isDarkTheme ? "text-white" : "text-black"}`}>About</span>
      </button>

      <button className="flex flex-row items-center mb-4" onClick={() => router.push("/contact")}>
        <FaEnvelope className="mr-2" color={isDarkTheme ? "white" : "black"} />
        <span className={`text-lg font-bold ${isDarkTheme ? "text-white" : "text-black"}`}>Contacts</span>
      </button>

      <div className="mx-12 mt-auto items-center py-2">
        <button onClick={() => console.log("Sign Out")} className="flex flex-row justify-center items-center">
          <span className={`text-lg font-bold ${isDarkTheme ? "text-gray-100" : "text-black"}`}>Sign Out</span>
          <FaSignOutAlt className="ml-2" color={isDarkTheme ? "white" : "black"} />
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
