import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import tw from 'twrnc';

const SidebarChatDetails = ({ route }) => {
  const { chatTitle, chatDetails } = route.params;

  return (
    <View style={[styles.container, tw`bg-white`]}>
      <Text style={styles.title}>{chatTitle}</Text>
      <Text>{chatDetails}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  }
});

export default SidebarChatDetails;
