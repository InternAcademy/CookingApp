import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { useSelector } from "react-redux";

const Contacts = () => {
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);

  return (
    <View style={tw`flex-1 p-5 pt-20 ${isDarkTheme ? "bg-[#202020]" : "bg-white"}`}>
      <Text style={tw`text-lg ${isDarkTheme ? "text-white" : "text-gray-800"} mb-2`}>Subject</Text>
      <TextInput style={tw`h-12 border ${isDarkTheme ? "border-gray-600 bg-gray-700 text-white" : "border-yellow-500 bg-yellow-500 text-black"} rounded-full mb-5 px-3`} placeholder="What would you like to talk about?" placeholderTextColor={isDarkTheme ? "#888" : "#555"} />
      <Text style={tw`text-lg ${isDarkTheme ? "text-white" : "text-gray-800"} mb-2`}>Message</Text>
      <TextInput style={tw`h-64 border ${isDarkTheme ? "border-gray-600 bg-gray-700 text-white" : "border-yellow-500 bg-yellow-500 text-black"} rounded-lg px-3 pt-2 mb-5`} placeholder="Enter your message here..." placeholderTextColor={isDarkTheme ? "#888" : "#555"} multiline textAlignVertical="top" />
      <TouchableOpacity style={tw`h-12 justify-center items-center rounded-full ${isDarkTheme ? "bg-gray-600" : "bg-yellow-500"}`}>
        <Text style={tw`text-lg ${isDarkTheme ? "text-white" : "text-gray-800"}`}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Contacts;
