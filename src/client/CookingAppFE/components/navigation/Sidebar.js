// Sidebar.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../context/ThemeContext';
import { useChat } from '../../context/ChatContext';
import jwtDecode from 'jwt-decode';

const Sidebar = ({ open, setOpen }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const { isDarkTheme } = useTheme();
  const navigation = useNavigation();
  const { clearChat } = useChat();

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          throw new Error('No OAuth2 token found');
        }
        const decodedToken = jwtDecode(token);

        const response = await fetch(`https://localhost:8001/user-chats/${decodedToken.sub}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();
        if (data) {
          setChatHistory(data);
        }
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    }

    fetchData();
  }, []);

  const handleChatPress = chat => {
    async function fetchData() {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          throw new Error('No OAuth2 token found');
        }

        const response = await fetch(`https://localhost:8001/c/${chat.chatId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();
        if (data) {
          navigation.navigate('Home', { selectedChat: data });
        }
      } catch (error) {
        console.error('Error fetching chat:', error);
      }
    }

    fetchData();
  };

  const startNewChat = () => {
    clearChat();
    navigation.navigate('Home');
  };

  const getSectionTitle = date => {
    const today = new Date();
    const chatDate = new Date(date);

    today.setHours(0, 0, 0, 0);
    chatDate.setHours(0, 0, 0, 0);

    const diffTime = today - chatDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays <= 7) return 'Previous 7 days';
    if (diffDays <= 30) return 'Previous 30 days';
    return 'Older than 30 days';
  };

  const sortedChatHistory = chatHistory.reduce((acc, chat) => {
    const sectionTitle = getSectionTitle(chat.date);
    if (!acc[sectionTitle]) {
      acc[sectionTitle] = [];
    }
    acc[sectionTitle].push(chat);
    return acc;
  }, {});

  const orderedSections = ['Today', 'Yesterday', 'Previous 7 days', 'Previous 30 days', 'Older than 30 days'];

  return (
    <Modal visible={open} animationType="slide">
      <View style={[styles.sidebar, tw`${isDarkTheme ? 'bg-[#202020]' : 'bg-white'} mt-0 pt-0`]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setOpen(false)}>
            <Text style={[tw`pt-0 ${isDarkTheme ? 'text-white' : 'text-gray-700'}`, styles.toggleIcon]}>{'≡'}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView}>
          {orderedSections.map(
            sectionTitle =>
              sortedChatHistory[sectionTitle] && (
                <View key={sectionTitle} style={styles.section}>
                  <Text style={[styles.title, tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`]}>{sectionTitle}</Text>
                  {sortedChatHistory[sectionTitle].map((chat, idx) => (
                    <TouchableOpacity key={idx} onPress={() => handleChatPress(chat)}>
                      <Text style={[styles.bullet, tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`]}>{chat.title}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    padding: 16
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8
  },
  toggleIcon: {
    fontSize: 30
  },
  section: {
    flexDirection: 'column',
    paddingLeft: 4,
    paddingRight: 4,
    marginBottom: 16
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  bullet: {
    marginLeft: 16,
    marginBottom: 4,
    fontSize: 14
  },
  scrollView: {
    paddingRight: 16
  }
});

export default Sidebar;
