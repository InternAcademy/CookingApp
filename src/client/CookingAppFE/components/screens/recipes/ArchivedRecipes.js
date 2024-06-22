import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import { useTheme } from '../../../context/ThemeContext';

const ProfileSettings = () => {
  const { isDarkTheme } = useTheme();

  return (
    <View style={tw`flex-1 justify-center items-center ${isDarkTheme ? 'bg-[#202020]' : 'bg-white'}`}>
      <Text style={tw`text-xl font-bold ${isDarkTheme ? 'text-white' : 'text-black'}`}>Archived Recipes</Text>
    </View>
  );
};

export default ProfileSettings;
