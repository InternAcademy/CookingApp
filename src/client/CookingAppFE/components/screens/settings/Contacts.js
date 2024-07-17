import React, { useEffect, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { useSelector } from "react-redux";
import { TranslationContext } from "../../../context/TranslationContext";

const Contacts = () => {
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);
  const { targetLanguage, translateStaticTexts, translatedTexts } = useContext(TranslationContext);

  useEffect(() => {
    translateStaticTexts(["Subject", "What would you like to talk about?", "Message", "Enter your message here...", "Send"], targetLanguage);
  }, [targetLanguage]);

  return (
    <View style={tw`flex-1 p-5 pt-20 ${isDarkTheme ? "bg-[#202020]" : "bg-white"}`}>
      <Text style={tw`text-lg ${isDarkTheme ? "text-white" : "text-gray-800"} mb-2`}>{translatedTexts["Subject"] || "Subject"}</Text>
      <TextInput style={tw`h-12 border ${isDarkTheme ? "border-gray-600 bg-gray-700 text-white" : "border-yellow-500 bg-yellow-500 text-black"} rounded-full mb-5 px-3`} placeholder={translatedTexts["What would you like to talk about?"] || "What would you like to talk about?"} placeholderTextColor={isDarkTheme ? "#888" : "#555"} />
      <Text style={tw`text-lg ${isDarkTheme ? "text-white" : "text-gray-800"} mb-2`}>{translatedTexts["Message"] || "Message"}</Text>
      <TextInput style={tw`h-64 border ${isDarkTheme ? "border-gray-600 bg-gray-700 text-white" : "border-yellow-500 bg-yellow-500 text-black"} rounded-lg px-3 pt-2 mb-5`} placeholder={translatedTexts["Enter your message here..."] || "Enter your message here..."} placeholderTextColor={isDarkTheme ? "#888" : "#555"} multiline textAlignVertical="top" />
      <TouchableOpacity style={tw`h-12 justify-center items-center rounded-full ${isDarkTheme ? "bg-gray-600" : "bg-yellow-500"}`}>
        <Text style={tw`text-lg ${isDarkTheme ? "text-white" : "text-gray-800"}`}>{translatedTexts["Send"] || "Send"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Contacts;
