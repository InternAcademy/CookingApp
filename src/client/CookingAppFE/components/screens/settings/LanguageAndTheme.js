import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import tw from "twrnc";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../../redux/uiSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LanguageAndTheme = () => {
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);
  const [selectedLanguage, setSelectedLanguage] = React.useState("English");
  const [selectedTheme, setSelectedTheme] = React.useState(isDarkTheme ? "Dark" : "Light");
  const dispatch = useDispatch();

  const handleThemeChange = async theme => {
    dispatch(uiActions.toggleTheme());
    setSelectedTheme(theme);
    const storedTheme = await AsyncStorage.getItem("theme");
    await AsyncStorage.setItem("theme", storedTheme === "dark" ? "light" : "dark");
  };

  const handleLanguageChange = language => {
    setSelectedLanguage(language);

    Alert.alert("Language Changed", `Selected language: ${language}`);
  };

  return (
    <View style={tw`flex-1 ${isDarkTheme ? "bg-[#202020]" : "bg-white"} p-6`}>
      <View style={tw`mb-6`}>
        <View style={tw`mb-4 `}>
          <TouchableOpacity onPress={() => handleLanguageChange(selectedLanguage === "English" ? "Spanish" : "English")} style={tw`border rounded-full p-4 ${isDarkTheme ? "bg-[#303030] border-gray-300" : "bg-white border-gray-600"}`}>
            <Text style={tw`${isDarkTheme ? "text-white bg-[#303030]" : "text-black bg-white"} text-base`}>{`Language: ${selectedLanguage}`}</Text>
          </TouchableOpacity>
        </View>

        <View style={tw`mb-4 `}>
          <TouchableOpacity onPress={() => handleThemeChange(selectedTheme === "Light" ? "Dark" : "Light")} style={tw`border rounded-full p-4 ${isDarkTheme ? "bg-[#303030] border-gray-300" : "bg-white border-gray-600"}`}>
            <Text style={tw`${isDarkTheme ? "text-white bg-[#303030]" : "bg-white text-black"} text-base`}>{`Theme: ${selectedTheme}`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LanguageAndTheme;
