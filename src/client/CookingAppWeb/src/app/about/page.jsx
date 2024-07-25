// pages/About.jsx
"use client";

import React from "react";
import "tailwindcss/tailwind.css";
import { useSelector } from "react-redux";
const About = () => {
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);

  return (
    <div className={`flex flex-col p-6 min-h-screen ${isDarkTheme ? "bg-[#202020]" : "bg-white"}`}>
      <h1 className={`text-2xl font-bold mb-4 ${isDarkTheme ? "text-orange-400" : "text-orange-500"}`}>About</h1>
      <p className={`text-base leading-6 mb-5 ${isDarkTheme ? "text-white" : "text-black"}`}>Welcome to Cooking App, where culinary passion meets exceptional service. Established in 2024, we are dedicated to bringing you a dining experience like no other. Our menu features a delightful blend of traditional and contemporary dishes, crafted from the freshest ingredients sourced locally and globally.</p>
      <p className={`text-base leading-6 mb-5 ${isDarkTheme ? "text-white" : "text-black"}`}>At Cooking App, we believe that food is more than just sustenance; it's a way to connect, celebrate, and create memories. Whether you're here for a casual meal, a special occasion, or just a cup of our signature coffee, we strive to make every visit unforgettable.</p>
      <p className={`text-base leading-6 mb-5 ${isDarkTheme ? "text-white" : "text-black"}`}>Our team of talented chefs and friendly staff are committed to providing you with top-notch service and a warm, inviting atmosphere. We are passionate about what we do, and it shows in every plate we serve.</p>
      <p className={`text-base leading-6 mb-5 ${isDarkTheme ? "text-white" : "text-black"}`}>Thank you for choosing Cooking App. We look forward to welcoming you and sharing our love for food with you.</p>
    </div>
  );
};

export default About;
