// Contacts.js

import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const Contacts = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Subject</Text>
      <TextInput
        style={styles.subjectInput}
        placeholder="What would you like to talk about?"
      />
      <Text style={styles.label}>Message</Text>
      <TextInput
        style={styles.messageInput}
        placeholder="Enter your message here..."
        multiline
        textAlignVertical="top" // Добавяме това свойство
      />
      <TouchableOpacity style={styles.sendButton}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    backgroundColor: "#FFF8E1",
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  subjectInput: {
    height: 50,
    borderColor: "#FFF4E2",
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#FFECB3",
    // paddingLeft: 20,
  },
  messageInput: {
    height: 250,
    borderColor: "#FFF4E2",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingTop: 10,
    // paddingLeft: 20,
    marginBottom: 20,
    backgroundColor: "#FFECB3",
    textAlignVertical: "top",
  },
  sendButton: {
    height: 50,
    backgroundColor: "#FFB04B",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  sendButtonText: {
    color: "#333333",
    fontSize: 22,
  },
});

export default Contacts;
