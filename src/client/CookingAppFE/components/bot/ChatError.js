import React from "react";
import { View, Text } from "react-native";
import tw from "twrnc";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const ChatError = ({ message }) => {
  const isDarkTheme = useSelector((state) => state.ui.isDarkTheme);

  return (
    <View style={tw`p-4 bg-red-600 shadow-lg rounded-lg m-4`}>
      <View style={tw`flex flex-row items-center`}>
        <MaterialIcons
          name="computer"
          size={24}
          style={tw`${isDarkTheme ? "text-white" : "text-dark"}`}
        />
        <Text
          style={tw`ml-2 text-sm font-semibold italic ${isDarkTheme ? "text-white" : "text-dark"}`}
        >
          {message}
        </Text>
      </View>
    </View>
  );
};

export default ChatError;
