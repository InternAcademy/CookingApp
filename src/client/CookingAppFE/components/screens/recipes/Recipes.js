import React from "react";
import { View, Text } from "react-native";
import tw from "twrnc";
import { useSelector } from "react-redux";

const Recipes = () => {
  const isDarkTheme = useSelector((state) => state.ui.isDarkTheme);

  return (
    <View
      style={tw`flex-1 justify-center items-center ${isDarkTheme ? "bg-[#202020]" : "bg-white"}`}
    >
      <Text
        style={tw`text-xl font-bold ${isDarkTheme ? "text-white" : "text-black"}`}
      >
           Recipes
      </Text>
    </View>
  );
};

export default Recipes;
