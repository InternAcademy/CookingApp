// ChatDetailsScreen.js

import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import tailwind from 'tailwind-rn';

const ChatDetailsScreen = ({ route }) => {
  const { title, details } = route.params;

  return (
    <ScrollView style={tailwind('p-4')}>
      <Text style={tailwind('text-2xl font-bold mb-4')}>{title}</Text>
      <Text style={tailwind('text-base')}>{details}</Text>
    </ScrollView>
  );
};

export default ChatDetailsScreen;
