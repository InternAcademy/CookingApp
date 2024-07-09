import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../../redux/uiSlice';

const LanguageAndTheme = () => {
  const isDarkTheme = useSelector((state) => state.ui.isDarkTheme);
  const [selectedLanguage, setSelectedLanguage] = React.useState('English');
  const [selectedTheme, setSelectedTheme] = React.useState(isDarkTheme ? 'Dark' : 'Light');
  const dispatch = useDispatch();

  
  const handleThemeChange = (theme) => {
    dispatch(uiActions.toggleTheme());  
    setSelectedTheme(theme); 
  };


  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    
    Alert.alert("Language Changed", `Selected language: ${language}`);
  };

  return (
    <View style={tw`flex-1 ${isDarkTheme ? 'bg-[#202020]' : 'bg-white'} p-6`}>
      <Text
        style={tw`text-3xl font-bold mb-6 text-center ${isDarkTheme ? 'text-white' : 'text-black'}`}
      >
        Language and Theme
      </Text>

      <View style={tw`mb-6`}>
        <Text
          style={tw`text-2xl text-center font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-black'}`}
        >
          Application Preferences
        </Text>

        {/* Language Selector */}
        <View
          style={tw`mb-4 `}
        >
          <TouchableOpacity
            onPress={() => handleLanguageChange(selectedLanguage === 'English' ? 'Spanish' : 'English')}
            style={tw`border rounded-full p-4 ${isDarkTheme ? 'bg-[#303030] border-gray-300' : 'bg-white border-gray-600'}`}
          >
            <Text
              style={tw`${isDarkTheme ? 'text-white bg-[#303030]' : 'text-black bg-white'} text-base`}
            >
              {`Language: ${selectedLanguage}`}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Theme Selector */}
        <View
          style={tw`mb-4 `}
        >
          <TouchableOpacity
            onPress={() => handleThemeChange(selectedTheme === 'Light' ? 'Dark' : 'Light')}
            style={tw`border rounded-full p-4 ${isDarkTheme ? 'bg-[#303030] border-gray-300' : 'bg-white border-gray-600'}`}
          >
            <Text
              style={tw`${isDarkTheme ? 'text-white bg-[#303030]' : 'bg-white text-black'} text-base`}
            >
              {`Theme: ${selectedTheme}`}
            </Text>
          </TouchableOpacity>
        </View>

        {/*Changing theme button */}
        <View style={tw`w-full flex items-center justify-center`}>

        
        <TouchableOpacity
          style={tw`  flex items-center px-12  justify-center  ${isDarkTheme ? 'bg-zinc-400 text-amber-200' : 'text-black bg-[#303030]'} rounded-full py-2 mt-2`}
          onPress={() => handleThemeChange(selectedTheme === 'Dark' ? 'Light' : 'Dark')}
        >
          <Text style={tw`text-white text-center text-base font-medium`}>
            {isDarkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          </Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LanguageAndTheme;
