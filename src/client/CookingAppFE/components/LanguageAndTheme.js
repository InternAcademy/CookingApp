import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

const ProfileSettings = () => {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`text-xl font-bold`}>Language And Theme</Text>
    </View>
  );
};

export default ProfileSettings;
