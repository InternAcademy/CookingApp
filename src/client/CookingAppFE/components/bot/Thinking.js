import React, { useEffect, useContext } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import tw from "twrnc";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { TranslationContext } from "../../context/TranslationContext";

const Thinking = () => {
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);
  const { targetLanguage, translateStaticTexts, translatedTexts } = useContext(TranslationContext);

  useEffect(() => {
    translateStaticTexts(["thinking..."], targetLanguage);
  }, [targetLanguage]);

  return (
    <View style={tw`p-4 ${isDarkTheme ? "bg-[#202020]" : "bg-white"} shadow-lg rounded-lg m-4`}>
      <View style={tw`flex flex-row items-center`}>
        <ActivityIndicator size="small" color="#4f46e5" style={tw`mr-2`} />
        <MaterialIcons name="computer" size={24} style={tw`${isDarkTheme ? "text-white" : "text-indigo-600"}`} />
        <Text style={tw`ml-2 text-sm font-semibold italic ${isDarkTheme ? "text-white" : "text-indigo-600"}`}>{translatedTexts["thinking..."] || "thinking..."}</Text>
      </View>
    </View>
  );
};

export default Thinking;
