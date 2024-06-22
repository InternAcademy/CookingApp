import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import { useTheme } from '../../../context/ThemeContext';

const Favourite = () => {
  const { isDarkTheme } = useTheme();

  return (
    <View style={tw`flex-1 mx-4 ${isDarkTheme ? 'bg-[#202020]' : 'bg-white'}`}>
      <View style={tw`${isDarkTheme ? 'bg-[#202020]' : 'bg-white'}`}>
        <Text style={tw`text-lg font-bold mt-20 mb-2 ${isDarkTheme ? 'text-white' : 'text-black'}`}>Favorite Recipes</Text>
      </View>
      <View style={tw`py-4 px-2 rounded-md bg-white ${isDarkTheme ? 'bg-[#202020]' : 'bg-white'}`}>
        <Text style={tw`text-base font-medium text-black ${isDarkTheme ? 'text-white' : 'text-black'}`}>Lava Cake</Text>
      </View>
    </View>
  );
};

export default Favourite;
