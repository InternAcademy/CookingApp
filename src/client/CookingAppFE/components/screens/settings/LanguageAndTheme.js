import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import tw from 'twrnc';

const LanguageAndTheme = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('Light');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleThemeChange = itemValue => {
    setSelectedTheme(itemValue);
    setIsDarkTheme(itemValue === 'Dark');
  };

  const handleLanguageChange = itemValue => {
    setSelectedLanguage(itemValue);
  };

  return (
    <View style={tw`flex-1 ${isDarkTheme ? 'bg-black' : 'bg-white'} p-6`}>
      <Text style={tw`text-3xl font-bold mb-6 text-center ${isDarkTheme ? 'text-white' : 'text-black'}`}>Language And Theme</Text>

      <View style={tw`mb-6`}>
        <Text style={tw`text-lg font-semibold mb-2 ${isDarkTheme ? 'text-white' : 'text-black'}`}>Preferences</Text>
        <View style={tw`border ${isDarkTheme ? 'border-white' : 'border-gray-300'} rounded-lg mb-2`}>
          <Picker selectedValue={selectedLanguage} onValueChange={handleLanguageChange} style={tw`${isDarkTheme ? 'text-black bg-white' : 'text-black'}`} dropdownIconColor={isDarkTheme ? 'black' : 'black'}>
            <Picker.Item label="English" value="English" />
          </Picker>
        </View>
        <View style={tw`border ${isDarkTheme ? 'border-white' : 'border-gray-300'} rounded-lg mb-2`}>
          <Picker selectedValue={selectedTheme} onValueChange={handleThemeChange} style={tw`${isDarkTheme ? 'text-black bg-white' : 'text-black'}`} dropdownIconColor={isDarkTheme ? 'black' : 'black'}>
            <Picker.Item label="Light" value="Light" />
            <Picker.Item label="Dark" value="Dark" />
          </Picker>
        </View>
        <TouchableOpacity style={tw`bg-blue-500 rounded-full py-2 mt-2`} onPress={toggleTheme}>
          <Text style={tw`text-white text-center text-base font-medium`}>{isDarkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LanguageAndTheme;
