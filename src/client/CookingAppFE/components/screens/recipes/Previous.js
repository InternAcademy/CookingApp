import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { useSelector } from 'react-redux';

const Previous = ({ navigation }) => {
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);

  return (
    <ScrollView contentContainerStyle={tw`p-4 h-full ${isDarkTheme ? 'bg-[#202020]' : 'bg-white'} pl-8`}>
      <View style={tw`flex-row items-center mb-4`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={isDarkTheme ? 'white' : 'black'} style={tw`mr-2`} />
        </TouchableOpacity>
      </View>
      <View style={tw`flex-row items-center mb-4 ml-4`}>
        <TouchableOpacity onPress={() => console.log('Previous pressed')}>
          <Ionicons name="time" size={24} color={isDarkTheme ? 'white' : 'black'} style={tw`mr-2`} />
        </TouchableOpacity>
        <Text style={tw`text-lg ${isDarkTheme ? 'text-orange-400' : 'text-black'}`}>Recent Chats</Text>
      </View>
      <TouchableOpacity style={tw`p-4 rounded-lg mb-4 ${isDarkTheme ? 'bg-[#202020]' : 'bg-gray-100'}`}>
        <Text style={tw`text-lg font-bold mb-2 ${isDarkTheme ? 'text-white' : 'text-black'}`}>Strawberry ShortCake</Text>
        <Text style={tw`text-base mb-2 ${isDarkTheme ? 'text-white' : 'text-black'}`}>To make a delicious lava cake, follow these steps:</Text>
        <View style={tw`flex-row mb-2`}>
          <Text style={tw`text-base font-bold mr-2 ${isDarkTheme ? 'text-white' : 'text-black'}`}>1.</Text>
          <View style={tw`flex-1`}>
            <Text style={tw`text-base font-bold ${isDarkTheme ? 'text-white' : 'text-black'}`}>Prepare Ingredients:</Text>
            <Text style={tw`text-base ml-2 ${isDarkTheme ? 'text-white' : 'text-black'}`}>• 4 ounces of semi-sweet chocolate</Text>
            <Text style={tw`text-base ml-2 ${isDarkTheme ? 'text-white' : 'text-black'}`}>• 1/2 cup of unsalted butter</Text>
            <Text style={tw`text-base ml-2 ${isDarkTheme ? 'text-white' : 'text-black'}`}>• 1 cup of powdered sugar</Text>
            <Text style={tw`text-base ml-2 ${isDarkTheme ? 'text-white' : 'text-black'}`}>• 2 large eggs</Text>
            <Text style={tw`text-base ml-2 ${isDarkTheme ? 'text-white' : 'text-black'}`}>• 2 large egg yolks</Text>
            <Text style={tw`text-base ml-2 ${isDarkTheme ? 'text-white' : 'text-black'}`}>• 1 teaspoon of vanilla extract</Text>
            <Text style={tw`text-base ml-2 ${isDarkTheme ? 'text-white' : 'text-black'}`}>• 1/4 cup of all-purpose flour</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Text style={tw`text-base mt-2 ${isDarkTheme ? 'text-orange-400' : 'text-orange-500'}`}>Show more</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={tw`text-base mt-0 pl-4 ${isDarkTheme ? 'text-orange-400' : 'text-orange-500'}`}>More results</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Previous;
