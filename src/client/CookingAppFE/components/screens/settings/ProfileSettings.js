import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import tw from 'twrnc';
import { useSelector } from 'react-redux';

const ProfileSettings = () => {
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subscriptionInfo, setSubscriptionInfo] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.canceled) {
      setProfileImage(result.uri);
    }
  };

  const updateProfile = async () => {
    try {
      const response = await fetch('https://localhost:8001/api/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView style={tw`flex-1 ${isDarkTheme ? 'bg-[#202020]' : 'bg-white'}`}>
      <View style={tw`flex-1 items-center p-6`}>
        <Text style={tw`text-3xl font-bold mb-6 ${isDarkTheme ? 'text-white' : 'text-black'}`}>Profile Settings</Text>

        <View style={tw`w-full mb-6 items-center`}>
          <Text style={tw`text-lg font-semibold mb-2 ${isDarkTheme ? 'text-white' : 'text-black'}`}>Profile Picture</Text>
          {profileImage && <Image source={{ uri: profileImage }} style={tw`w-32 h-32 rounded-full mb-4`} />}
          <TouchableOpacity style={tw`bg-blue-500 rounded-full py-2 w-40 self-center`} onPress={pickImage}>
            <Text style={tw`text-white text-center text-base font-medium`}>Change Picture</Text>
          </TouchableOpacity>
        </View>

        <View style={tw`w-full mb-6`}>
          <Text style={tw`text-lg font-semibold mb-2 ${isDarkTheme ? 'text-white' : 'text-black'}`}>Name</Text>
          <TextInput style={tw`border ${isDarkTheme ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg px-4 py-2 mb-2`} placeholder="Name" placeholderTextColor={isDarkTheme ? 'gray' : 'black'} value={name} onChangeText={setName} />
        </View>

        <View style={tw`w-full mb-6`}>
          <Text style={tw`text-lg font-semibold mb-2 ${isDarkTheme ? 'text-white' : 'text-black'}`}>Email</Text>
          <TextInput style={tw`border ${isDarkTheme ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg px-4 py-2 mb-2`} placeholder="Email" placeholderTextColor={isDarkTheme ? 'gray' : 'black'} value={email} onChangeText={setEmail} />
        </View>

        <View style={tw`w-full mb-6`}>
          <Text style={tw`text-lg font-semibold mb-2 ${isDarkTheme ? 'text-white' : 'text-black'}`}>Subscription Information</Text>
          <TextInput style={tw`border ${isDarkTheme ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg px-4 py-2 mb-2`} placeholder="Subscription Info" placeholderTextColor={isDarkTheme ? 'gray' : 'black'} value={subscriptionInfo} onChangeText={setSubscriptionInfo} />
        </View>

        <View style={tw`w-full mb-6`}>
          <Text style={tw`text-lg font-semibold mb-2 ${isDarkTheme ? 'text-white' : 'text-black'}`}>Change Password</Text>
          <TextInput style={tw`border ${isDarkTheme ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg px-4 py-2 mb-2`} placeholder="Current Password" placeholderTextColor={isDarkTheme ? 'gray' : 'black'} secureTextEntry />
          <TextInput style={tw`border ${isDarkTheme ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg px-4 py-2 mb-2`} placeholder="New Password" placeholderTextColor={isDarkTheme ? 'gray' : 'black'} secureTextEntry />
          <TextInput style={tw`border ${isDarkTheme ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg px-4 py-2 mb-2`} placeholder="Confirm New Password" placeholderTextColor={isDarkTheme ? 'gray' : 'black'} secureTextEntry />
          <TouchableOpacity style={tw`bg-blue-500 rounded-full py-2 mt-2 w-40 self-center`}>
            <Text style={tw`text-white text-center text-base font-medium`}>Update Password</Text>
          </TouchableOpacity>
        </View>

        <View style={tw`w-full mb-6 flex-row justify-center items-center`}>
          <TouchableOpacity style={tw`bg-green-500 rounded-full py-2 px-4 mx-2`} onPress={updateProfile}>
            <Text style={tw`text-white text-center text-base font-medium`}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity style={tw`bg-red-500 rounded-full py-2 px-4 mx-2`} onPress={() => Alert.alert('Logout', 'Logging out...')}>
            <Text style={tw`text-white text-center text-base font-medium`}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileSettings;
