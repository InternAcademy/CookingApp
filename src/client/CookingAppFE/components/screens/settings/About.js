import React, { useEffect, useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import tw from "twrnc";
import { useSelector } from "react-redux";
import { TranslationContext } from "../../../context/TranslationContext";

const About = () => {
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);
  const { targetLanguage, translateStaticTexts, translatedTexts } = useContext(TranslationContext);

  useEffect(() => {
    translateStaticTexts(["About", "This is a sample text. Welcome to [Your Restaurant Name], where culinary passion meets exceptional service. Established in [Year], we are dedicated to bringing you a dining experience like no other. Our menu features a delightful blend of traditional and contemporary dishes, crafted from the freshest ingredients sourced locally and globally.", "At [Your Restaurant Name], we believe that food is more than just sustenance; it's a way to connect, celebrate, and create memories. Whether you're here for a casual meal, a special occasion, or just a cup of our signature coffee, we strive to make every visit unforgettable.", "Our team of talented chefs and friendly staff are committed to providing you with top-notch service and a warm, inviting atmosphere. We are passionate about what we do, and it shows in every plate we serve.", "Thank you for choosing [Your Restaurant Name]. We look forward to welcoming you and sharing our love for food with you."], targetLanguage);
  }, [targetLanguage]);

  return (
    <ScrollView style={tw`flex-1 p-6 ${isDarkTheme ? "bg-[#202020]" : "bg-white"}`}>
      <Text style={tw`text-2xl font-bold mb-4 ${isDarkTheme ? "text-orange-400" : "text-orange-500"}`}>{translatedTexts["About"] || "About"}</Text>
      <Text style={tw`text-base leading-6 mb-5 ${isDarkTheme ? "text-white" : "text-black"}`}>{translatedTexts["This is a sample text. Welcome to [Your Restaurant Name], where culinary passion meets exceptional service. Established in [Year], we are dedicated to bringing you a dining experience like no other. Our menu features a delightful blend of traditional and contemporary dishes, crafted from the freshest ingredients sourced locally and globally."] || "This is a sample text. Welcome to [Your Restaurant Name], where culinary passion meets exceptional service. Established in [Year], we are dedicated to bringing you a dining experience like no other. Our menu features a delightful blend of traditional and contemporary dishes, crafted from the freshest ingredients sourced locally and globally."}</Text>
      <Text style={tw`text-base leading-6 mb-5 ${isDarkTheme ? "text-white" : "text-black"}`}>{translatedTexts["At [Your Restaurant Name], we believe that food is more than just sustenance; it's a way to connect, celebrate, and create memories. Whether you're here for a casual meal, a special occasion, or just a cup of our signature coffee, we strive to make every visit unforgettable."] || "At [Your Restaurant Name], we believe that food is more than just sustenance; it's a way to connect, celebrate, and create memories. Whether you're here for a casual meal, a special occasion, or just a cup of our signature coffee, we strive to make every visit unforgettable."}</Text>
      <Text style={tw`text-base leading-6 mb-5 ${isDarkTheme ? "text-white" : "text-black"}`}>{translatedTexts["Our team of talented chefs and friendly staff are committed to providing you with top-notch service and a warm, inviting atmosphere. We are passionate about what we do, and it shows in every plate we serve."] || "Our team of talented chefs and friendly staff are committed to providing you with top-notch service and a warm, inviting atmosphere. We are passionate about what we do, and it shows in every plate we serve."}</Text>
      <Text style={tw`text-base leading-6 mb-5 ${isDarkTheme ? "text-white" : "text-black"}`}>{translatedTexts["Thank you for choosing [Your Restaurant Name]. We look forward to welcoming you and sharing our love for food with you."] || "Thank you for choosing [Your Restaurant Name]. We look forward to welcoming you and sharing our love for food with you."}</Text>
    </ScrollView>
  );
};

export default About;
