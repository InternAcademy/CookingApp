import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useWindowDimensions } from 'react-native';
import tw from 'twrnc';
import { useTheme } from '../../context/ThemeContext';
import { chatHistoryData } from '../../components/navigation/chatHistoryData'; // Import mock data

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null); // Добавено състояние за текущо избрания чат
  const window = useWindowDimensions();
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      window.width <= 720 ? setOpen(false) : setOpen(true);
    };

    handleResize();
  }, [window]);

  useEffect(() => {
    // Вместо извличане от API, използвайте seed data
    console.log('Setting chat history:', chatHistoryData);
    setChatHistory(chatHistoryData);
  }, []);

  const handleChatPress = chat => {
    setSelectedChat(chat); // Актуализиране на текущо избрания чат
  };

  const getSectionTitle = date => {
    const today = new Date();
    const chatDate = new Date(date);

    const diffTime = Math.abs(today - chatDate);
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

  console.log('Sorted chat history:', sortedChatHistory);

  return (
    <View style={[styles.sidebar, { width: open ? 256 : 64 }, tw`${isDarkTheme ? 'bg-[#202020]' : 'bg-white'}`]}>
      <View style={styles.header}>
        <View style={styles.headerContent}>{open && <Image source={require('../../assets/NavigationBar/previous2.png')} style={styles.icon} />}</View>
        <TouchableOpacity onPress={() => setOpen(!open)}>
          <Text style={[tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`, styles.toggleIcon]}>{open ? '×' : '≡'}</Text>
        </TouchableOpacity>
      </View>

      {open && (
        <ScrollView style={styles.scrollView}>
          {selectedChat ? ( // Условие за визуализация на информацията за текущо избрания чат
            <View style={styles.chatDetails}>
              <TouchableOpacity onPress={() => setSelectedChat(null)}>
                <Text style={[tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`, styles.backButton]}>Back</Text>
              </TouchableOpacity>
              <Text style={[styles.title, tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`]}>{selectedChat.title}</Text>
              <Text style={[styles.details, tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`]}>{selectedChat.details}</Text>
              <TouchableOpacity onPress={() => setSelectedChat(null)}>
                <Text style={[tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`, styles.backButton]}>Back</Text>
              </TouchableOpacity>
            </View>
          ) : (
            Object.entries(sortedChatHistory).map(([sectionTitle, chats], index) => (
              <View key={index} style={styles.section}>
                <Text style={[styles.title, tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`]}>{sectionTitle}</Text>
                {chats.map((chat, idx) => (
                  <TouchableOpacity key={idx} onPress={() => handleChatPress(chat)}>
                    <Text style={[styles.bullet, tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`]}>{chat.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    flexDirection: 'column',
    height: '100%',
    padding: 16
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    width: 16,
    height: 16
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
  },
  chatDetails: {
    padding: 16
  },
  details: {
    fontSize: 14,
    marginBottom: 16
  },
  backButton: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8
  }
});

export default Sidebar;
