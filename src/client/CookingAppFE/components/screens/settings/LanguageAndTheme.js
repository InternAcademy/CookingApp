import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import tw from "twrnc";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../../redux/uiSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TranslationContext } from "../../../context/TranslationContext";
import RNPickerSelect from "react-native-picker-select";

const LanguageAndTheme = () => {
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);
  const [selectedTheme, setSelectedTheme] = React.useState(isDarkTheme ? "Dark" : "Light");
  const dispatch = useDispatch();
  const { targetLanguage, setTargetLanguage, saveLanguagePreference, translateStaticTexts, translatedTexts } = React.useContext(TranslationContext);

  const handleThemeChange = useCallback(
    async theme => {
      dispatch(uiActions.toggleTheme());
      setSelectedTheme(theme);
      const storedTheme = await AsyncStorage.getItem("theme");
      await AsyncStorage.setItem("theme", storedTheme === "dark" ? "light" : "dark");
    },
    [dispatch]
  );

  const handleLanguageChange = useCallback(
    async newLanguage => {
      setTargetLanguage(newLanguage);
      await saveLanguagePreference(newLanguage);
      Alert.alert("Language Changed", `Selected language: ${newLanguage}`);
    },
    [targetLanguage, setTargetLanguage, saveLanguagePreference]
  );

  useEffect(() => {
    translateStaticTexts(["Language", "Theme"], targetLanguage);
  }, [targetLanguage, translateStaticTexts]);

  const languageOptions = [
    { label: "English", value: "English" },
    { label: "Spanish", value: "Spanish" },
    { label: "French", value: "French" },
    { label: "Russian", value: "Russian" },
    { label: "Chinese (Simplified)", value: "Chinese (Simplified)" },
    { label: "Portuguese", value: "Portuguese" },
    { label: "Japanese", value: "Japanese" },
    { label: "German", value: "German" },
    { label: "Italian", value: "Italian" },
    { label: "Arabic", value: "Arabic" },
    { label: "Hindi", value: "Hindi" }
  ];

  return (
    <View style={tw`flex-1 ${isDarkTheme ? "bg-[#202020]" : "bg-white"} p-6`}>
      <View style={tw`mb-6`}>
        <View style={tw`mb-4 `}>
          <RNPickerSelect
            onValueChange={value => handleLanguageChange(value)}
            items={languageOptions}
            style={{
              inputIOS: {
                color: isDarkTheme ? "white" : "black",
                backgroundColor: isDarkTheme ? "#303030" : "white",
                padding: 10,
                borderRadius: 5,
                borderColor: isDarkTheme ? "gray" : "black",
                borderWidth: 1
              },
              inputAndroid: {
                color: isDarkTheme ? "white" : "black",
                backgroundColor: isDarkTheme ? "#303030" : "white",
                padding: 10,
                borderRadius: 5,
                borderColor: isDarkTheme ? "gray" : "black",
                borderWidth: 1
              }
            }}
            value={targetLanguage}
            placeholder={{}}
          />
        </View>

        <View style={tw`mb-4 `}>
          <TouchableOpacity onPress={() => handleThemeChange(selectedTheme === "Light" ? "Dark" : "Light")} style={tw`border rounded-full p-4 ${isDarkTheme ? "bg-[#303030] border-gray-300" : "bg-white border-gray-600"}`}>
            <Text style={tw`${isDarkTheme ? "text-white bg-[#303030]" : "bg-white text-black"} text-base`}>{`${translatedTexts["Theme"] || "Theme"}: ${selectedTheme}`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LanguageAndTheme;
