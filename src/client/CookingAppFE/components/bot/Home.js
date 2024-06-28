import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Thinking from '../bot/Thinking';
import { useChat } from '../../context/ChatContext';
import { useTheme } from '../../context/ThemeContext';

const Home = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [message, setMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const { chat, setChat } = useChat();
  const { isDarkTheme } = useTheme();
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('LandingPage');
      }
    };

    const loadChat = async () => {
      const savedChat = await AsyncStorage.getItem('chat');
      if (savedChat) {
        setChat(JSON.parse(savedChat));
      }
    };

    checkToken();
    loadChat();
  }, []);

  useEffect(() => {
    const saveChat = async () => {
      await AsyncStorage.setItem('chat', JSON.stringify(chat));
    };

    if (chat.length > 0) {
      saveChat();
    }
  }, [chat]);

  useEffect(() => {
    if (route.params?.selectedChat) {
      setSelectedChat(route.params.selectedChat);
    }
  }, [route.params]);

  const sendMessage = async () => {
    if (!message) return;

    const newMessage = { role: 'user', content: message };
    setChat([...chat, newMessage]);
    setIsThinking(true);

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('No OAuth2 token found');
      }

      let response;

      if (await AsyncStorage.getItem('chatId')) {
        const chatId = await AsyncStorage.getItem('chatId');
        response = await fetch(`https://localhost:8001/continue/${chatId}/${message}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      } else {
        response = await fetch(`https://localhost:8001/new-chat/${message}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }

      const data = await response.json();
      if (data.content) {
        setChat([...chat, newMessage, { role: 'bot', content: data.content }]);
        await AsyncStorage.setItem('chatId', data.chatId);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsThinking(false);
    }

    setMessage('');
  };

  const renderPost = () => {
    if (selectedChat) {
      const messages = [
        ...selectedChat.requests.map(req => ({
          ...req,
          role: 'user',
          content: req.message
        })),
        ...selectedChat.responses.map(res => ({
          ...res,
          role: 'bot',
          content: res.message
        }))
      ].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      return (
        <SafeAreaView style={tw`flex-1 ${isDarkTheme ? 'bg-[#202020]' : 'bg-white'}`}>
          <ScrollView contentContainerStyle={tw`p-6 mt-10`}>
            <View style={tw`mb-4 flex-row items-center`}>
              <Image source={require('../../assets/Main/icon2.png')} style={tw`w-8 h-8 rounded-full mr-2 mb-7`} />
              <View>
                <Text style={tw`text-base font-semibold mb-1 ${isDarkTheme ? 'text-white' : 'text-black'}`}>{selectedChat.title}</Text>
                <Text style={tw`text-base mb-1 ${isDarkTheme ? 'text-white' : 'text-black'}`}>{/* Additional details if needed */}</Text>
              </View>
            </View>
            {messages.map((msg, index) => (
              <View key={index} style={tw`mb-4 flex-row items-center`}>
                <Image source={msg.role === 'user' ? require('../../assets/NavigationBar/user.png') : require('../../assets/Main/icon2.png')} style={tw`w-8 h-8 rounded-full mr-2 mb-7`} />
                <View>
                  <Text style={tw`text-base font-semibold mb-1 ${isDarkTheme ? 'text-white' : 'text-black'}`}>{msg.role === 'user' ? 'You' : 'MealMasterBot'}:</Text>
                  <Text style={tw`text-base mb-1 ${isDarkTheme ? 'text-white' : 'text-black'}`}>{msg.content}</Text>
                </View>
              </View>
            ))}
            {isThinking && <Thinking />}
          </ScrollView>
        </SafeAreaView>
      );
    }

    if (chat.length === 0) {
      // remove pr-15 when sidebar is fixed logo to be centered!
      return (
        <View style={tw`flex w-full h-full  justify-center items-center  `}>
          <Image source={require('../../assets/Main/icon2.png')} style={tw`w-26 h-26 mb-2`} />
          <Text style={tw`text-lg font-bold ${isDarkTheme ? 'text-white' : 'text-black'}`}>Let's figure out a recipe</Text>
          <Text style={tw`text-base ${isDarkTheme ? 'text-gray-400' : 'text-black'}`}>Begin by typing a message</Text>
        </View>
      );
    }

    return (
      <SafeAreaView style={tw`flex-1 ${isDarkTheme ? 'bg-[#202020]' : 'bg-white'}`}>
        <ScrollView contentContainerStyle={tw`p-6 mt-10`}>
          {chat.map((msg, index) => (
            <View key={index} style={tw`mb-4 flex-row items-center`}>
              <Image source={msg.role === 'user' ? require('../../assets/NavigationBar/user.png') : require('../../assets/Main/icon2.png')} style={tw`w-8 h-8 rounded-full mr-2 mb-7`} />
              <View>
                <Text style={tw`text-base font-semibold mb-1 ${isDarkTheme ? 'text-white' : 'text-black'}`}>{msg.role === 'user' ? 'You' : 'MealMasterBot'}:</Text>
                <Text style={tw`text-base mb-1 ${isDarkTheme ? 'text-white' : 'text-black'}`}>{msg.content}</Text>
              </View>
            </View>
          ))}
          {isThinking && <Thinking />}
        </ScrollView>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={tw`flex w-full h-full ${isDarkTheme ? 'bg-[#202020]' : 'bg-white'}`}>
      <FlatList data={[{ key: '1' }]} renderItem={renderPost} keyExtractor={item => item.key} contentContainerStyle={tw`flex-grow`} />
      <View style={tw`flex w-full flex-row items-center   mb-5 ${isDarkTheme ? 'border-gray-700 bg-[#202020]' : 'border-gray-300 bg-white'}`}>
        <View style={tw`flex w-1/8 flex-row items-center justify-center  `}>
          {/* <TouchableOpacity onPress={sendMessage} style={tw``}>
            <Image source={require('../../assets/HomeMessageBar/paperClip.png')} style={tw`w-5 h-5 ${isDarkTheme ? 'tint-white' : ''}`} />
          </TouchableOpacity> */}
        </View>
        <View style={tw`flex w-6/8 flex-row justify-center items-center border ${isDarkTheme ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-amber-50'} rounded-full px-2 mx-1`}>
          <TouchableOpacity onPress={sendMessage} style={tw`p-1`}>
            <Image source={require('../../assets/HomeMessageBar/paperClip.png')} style={tw`w-5 h-5 ${isDarkTheme ? 'tint-white' : ''}`} />
          </TouchableOpacity>
          <TextInput style={tw`flex-1 h-10 px-1 ${isDarkTheme ? 'text-white' : 'text-black'}`} placeholder="Message MealMasterBot" placeholderTextColor={isDarkTheme ? 'gray' : 'black'} value={message} onChangeText={setMessage} />
          <TouchableOpacity onPress={sendMessage} style={tw`p-1`}>
            <Image source={require('../../assets/HomeMessageBar/arrowUpCircle.png')} style={tw`w-6 h-6 ${isDarkTheme ? 'tint-white' : ''}`} />
          </TouchableOpacity>
        </View>
        <View style={tw`flex w-1/8 flex-row items-center`}>
          {/* <TouchableOpacity onPress={sendMessage} style={tw`p-1`}>
            <Image source={require('../../assets/HomeMessageBar/paperClip.png')} style={tw`w-5 h-5 ${isDarkTheme ? 'tint-white' : ''}`} />
          </TouchableOpacity> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
//flex w-full h-full  justify-center items-center pr-15
