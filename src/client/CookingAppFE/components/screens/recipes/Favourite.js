import React from "react";
import { View, Text } from "react-native";
import tw from "twrnc";
import Ionicons from "react-native-vector-icons/Ionicons"; // Импортирайте Ionicons
import { useSelector } from "react-redux";
const Favourite = () => {
  const isDarkTheme = useSelector((state) => state.ui.isDarkTheme);

  return (
    <View
      style={tw`flex-1 w-full px-4 ${isDarkTheme ? "bg-[#202020]" : "bg-white"}`}
    >
      <View style={tw`${isDarkTheme ? "bg-[#202020]" : "bg-white"}`}>
        <View style={tw`flex-row items-center mt-20 mb-2`}>
          <Ionicons
            name="heart"
            size={24}
            color={isDarkTheme ? "white" : "black"}
            style={tw`mr-2`}
          />
          <Text
            style={tw`text-lg font-bold ${isDarkTheme ? "text-white" : "text-black"}`}
          >
            Favorite Recipes
          </Text>
        </View>
      </View>
      <View
        style={tw`py-4 px-2 rounded-md bg-white ${isDarkTheme ? "bg-[#202020]" : "bg-white"}`}
      >
        <Text
          style={tw`text-base font-medium text-black ${isDarkTheme ? "text-white" : "text-black"}`}
        >
          Lava Cake
        </Text>
      </View>
    </View>
  );
};

export default Favourite;
