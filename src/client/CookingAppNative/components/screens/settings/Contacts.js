import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useTheme } from '../../../context/ThemeContext';

const Contacts = () => {
  const { isDarkTheme } = useTheme();

  return (
    <View style={tw`flex-1 p-5 pt-20 ${isDarkTheme ? 'bg-[#202020]' : 'bg-amber-100'}`}>
      <Text style={tw`text-lg ${isDarkTheme ? 'text-white' : 'text-gray-800'} mb-2`}>Subject</Text>
      <TextInput style={tw`h-12 border ${isDarkTheme ? 'border-gray-600 bg-gray-700 text-white' : 'border-amber-200 bg-amber-300 text-black'} rounded-full mb-5 px-3`} placeholder="What would you like to talk about?" placeholderTextColor={isDarkTheme ? 'gray' : 'black'} />
      <Text style={tw`text-lg ${isDarkTheme ? 'text-white' : 'text-gray-800'} mb-2`}>Message</Text>
      <TextInput style={tw`h-64 border ${isDarkTheme ? 'border-gray-600 bg-gray-700 text-white' : 'border-amber-200 bg-amber-300 text-black'} rounded-lg px-3 pt-2 mb-5`} placeholder="Enter your message here..." placeholderTextColor={isDarkTheme ? 'gray' : 'black'} multiline textAlignVertical="top" />
      <TouchableOpacity style={tw`h-12 bg-orange-400 justify-center items-center rounded-full`}>
        <Text style={tw`text-lg ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Contacts;
