import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';
import { useTheme } from '../../../context/ThemeContext';

const ProfileSettings = () => {
  const { isDarkTheme } = useTheme();

  return (
    <ScrollView style={tw`flex-1 ${isDarkTheme ? 'bg-[#202020]' : 'bg-white'}`}>
      <View style={tw`flex-1 items-center p-6`}>
        <Text style={tw`text-3xl font-bold mb-6 ${isDarkTheme ? 'text-white' : 'text-black'}`}>Profile Settings</Text>

        <View style={tw`w-full mb-6`}>
          <Text style={tw`text-lg font-semibold mb-2 ${isDarkTheme ? 'text-white' : 'text-black'}`}>Change Password</Text>
          <TextInput style={tw`border ${isDarkTheme ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg px-4 py-2 mb-2`} placeholder="Current Password" placeholderTextColor={isDarkTheme ? 'gray' : 'black'} secureTextEntry />
          <TextInput style={tw`border ${isDarkTheme ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg px-4 py-2 mb-2`} placeholder="New Password" placeholderTextColor={isDarkTheme ? 'gray' : 'black'} secureTextEntry />
          <TextInput style={tw`border ${isDarkTheme ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg px-4 py-2 mb-2`} placeholder="Confirm New Password" placeholderTextColor={isDarkTheme ? 'gray' : 'black'} secureTextEntry />
          <TouchableOpacity style={tw`bg-blue-500 rounded-full py-2 mt-2`}>
            <Text style={tw`text-white text-center text-base font-medium`}>Update Password</Text>
          </TouchableOpacity>
        </View>

        <View style={tw`w-full mb-6`}>
          <Text style={tw`text-lg font-semibold mb-2 ${isDarkTheme ? 'text-white' : 'text-black'}`}>Logout</Text>
          <TouchableOpacity style={tw`bg-red-500 rounded-full py-2`}>
            <Text style={tw`text-white text-center text-base font-medium`}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileSettings;
