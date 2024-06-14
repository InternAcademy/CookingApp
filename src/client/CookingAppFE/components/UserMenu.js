import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';

const UserMenu = () => {
  return (
    <View style={tw`flex-1 bg-[#FFF4E9] p-4`}>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Image
          source={require('../assets/user.png')} // Локален файл за потребителска снимка
          style={tw`w-10 h-10 rounded-full`}
        />
        <TouchableOpacity onPress={() => console.log('Close menu')}>
          <Text style={tw`text-2xl font-bold`}>×</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={tw`flex-row items-center mb-4`}>
        <Text style={tw`text-lg font-bold text-[#FFA500]`}>❤️ Favorite Recipes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`flex-row items-center mb-4`}>
        <Text style={tw`text-lg font-bold`}>🔍 Recent Recipes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`mb-4`}>
        <Text style={tw`text-lg font-bold`}>Profile Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`mb-4`}>
        <Text style={tw`text-lg font-bold`}>Subscription</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`mb-4 flex-row items-center`}>
        <Text style={tw`text-lg font-bold`}>🦠 Alergens and Food Preferences</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`mb-4`}>
        <Text style={tw`text-lg font-bold`}>Archived Recipes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`mb-4`}>
        <Text style={tw`text-lg font-bold`}>Language & Theme</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`mb-4`}>
        <Text style={tw`text-lg`}>Rules And Policies</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`mb-4 flex-row items-center`}>
        <Text style={tw`text-lg font-bold`}>ℹ️ About</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`mb-4 flex-row items-center`}>
        <Text style={tw`text-lg font-bold`}>✉️ Contacts</Text>
      </TouchableOpacity>

      <View style={tw`mt-auto bg-[#FFE9CC] py-4 rounded-t-lg`}>
        <TouchableOpacity onPress={() => console.log('Sign Out')} style={tw`flex-row justify-center`}>
          <Text style={tw`text-lg text-[#FFA500] font-bold`}>Sign Out</Text>
          <Text style={tw`text-lg text-[#FFA500] ml-2`}>↩️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserMenu;
