import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';

const UserMenu = () => {
  const navigation = useNavigation();
  const { isDarkTheme } = useTheme();

  return (
    <View style={tw`flex-1 ${isDarkTheme ? 'bg-black' : 'bg-[#FFF4E9]'} p-4`}>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Image
          source={require('../../assets/NavigationBar/user.png')} // Локален файл за потребителска снимка
          style={tw`w-10 h-10 rounded-full`}
        />
        <TouchableOpacity onPress={() => console.log('Close menu')}>
          <Text style={tw`text-2xl font-bold ${isDarkTheme ? 'text-white' : 'text-black'}`}>×</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={tw`flex-row items-center mb-4`} onPress={() => navigation.navigate('Favourite')}>
        <Text style={tw`text-lg font-bold ${isDarkTheme ? 'text-white' : 'text-[#FFA500]'}`}>❤️ Favorite Recipes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`flex-row items-center mb-4`} onPress={() => navigation.navigate('RecentRecipes')}>
        <Text style={tw`text-lg font-bold ${isDarkTheme ? 'text-white' : 'text-black'}`}>🔍 Recent Recipes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`mb-4`} onPress={() => navigation.navigate('ProfileSettings')}>
        <Text style={tw`text-lg font-bold ${isDarkTheme ? 'text-white' : 'text-black'}`}>Profile Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`mb-4`} onPress={() => navigation.navigate('Subscription')}>
        <Text style={tw`text-lg font-bold ${isDarkTheme ? 'text-white' : 'text-black'}`}>Subscription</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`mb-4 flex-row items-center`} onPress={() => navigation.navigate('AlergensAndFoodPreferences')}>
        <Text style={tw`text-lg font-bold ${isDarkTheme ? 'text-white' : 'text-black'}`}>🦠 Alergens and Food Preferences</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`mb-4`} onPress={() => navigation.navigate('ArchivedRecipes')}>
        <Text style={tw`text-lg font-bold ${isDarkTheme ? 'text-white' : 'text-black'}`}>Archived Recipes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`mb-4`} onPress={() => navigation.navigate('LanguageAndTheme')}>
        <Text style={tw`text-lg font-bold ${isDarkTheme ? 'text-white' : 'text-black'}`}>Language & Theme</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`mb-4 flex-row items-center`} onPress={() => navigation.navigate('RulesAndPolicies')}>
        <Text style={tw`text-lg font-bold ${isDarkTheme ? 'text-white' : 'text-black'}`}>Rules And Policies</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`mb-4 flex-row items-center`} onPress={() => navigation.navigate('About')}>
        <Text style={tw`text-lg font-bold ${isDarkTheme ? 'text-white' : 'text-black'}`}>ℹ️ About</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`mb-4 flex-row items-center`} onPress={() => navigation.navigate('Contact')}>
        <Text style={tw`text-lg font-bold ${isDarkTheme ? 'text-white' : 'text-black'}`}>✉️ Contacts</Text>
      </TouchableOpacity>

      <View style={tw`mt-auto ${isDarkTheme ? 'bg-gray-800' : 'bg-[#FFE9CC]'} py-4 rounded-t-lg`}>
        <TouchableOpacity onPress={() => console.log('Sign Out')} style={tw`flex-row justify-center`}>
          <Text style={tw`text-lg ${isDarkTheme ? 'text-white' : 'text-[#FFA500]'} font-bold`}>Sign Out</Text>
          <Text style={tw`text-lg ${isDarkTheme ? 'text-white' : 'text-[#FFA500]'} ml-2`}>↩️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserMenu;
