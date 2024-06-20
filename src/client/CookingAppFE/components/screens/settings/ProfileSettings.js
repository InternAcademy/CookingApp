import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import tw from 'twrnc';

const ProfileSettings = () => {
  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1 items-center p-6`}>
        <Text style={tw`text-3xl font-bold mb-6`}>Profile Settings</Text>

        <View style={tw`w-full mb-6`}>
          <Text style={tw`text-lg font-semibold mb-2`}>Change Password</Text>
          <TextInput style={tw`border border-gray-300 rounded-lg px-4 py-2 mb-2`} placeholder="Current Password" secureTextEntry />
          <TextInput style={tw`border border-gray-300 rounded-lg px-4 py-2 mb-2`} placeholder="New Password" secureTextEntry />
          <TextInput style={tw`border border-gray-300 rounded-lg px-4 py-2 mb-2`} placeholder="Confirm New Password" secureTextEntry />
          <TouchableOpacity style={tw`bg-blue-500 rounded-full py-2 mt-2`}>
            <Text style={tw`text-white text-center text-base font-medium`}>Update Password</Text>
          </TouchableOpacity>
        </View>

        <View style={tw`w-full mb-6`}>
          <Text style={tw`text-lg font-semibold mb-2`}>Logout</Text>
          <TouchableOpacity style={tw`bg-red-500 rounded-full py-2`}>
            <Text style={tw`text-white text-center text-base font-medium`}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileSettings;
