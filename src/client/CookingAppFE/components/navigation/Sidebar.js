import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useWindowDimensions } from 'react-native';
import tw from 'twrnc';
import { useTheme } from '../../context/ThemeContext';

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const window = useWindowDimensions();
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      window.width <= 720 ? setOpen(false) : setOpen(true);
    };

    handleResize();
  }, [window]);

  useEffect(() => {
    // Функция за извличане на данни от API
    const fetchChatHistory = async () => {
      try {
        const response = await fetch('http://localhost:4000/respond');
        const data = await response.json();
        setChatHistory(data);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();
  }, []);

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
          {chatHistory.map((section, index) => (
            <View key={index} style={styles.section}>
              <Text style={[styles.title, tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`]}>{section.date}</Text>
              {section.chats.map((chat, idx) => (
                <Text key={idx} style={[styles.bullet, tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`]}>
                  {chat}
                </Text>
              ))}
            </View>
          ))}
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
  }
});

export default Sidebar;
