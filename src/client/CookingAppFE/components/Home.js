// Home.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Thinking from './Thinking';
import { useChat } from './ChatContext'; // Импортиране на Chat контекста

const Home = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const { chat, setChat } = useChat(); // Използване на Chat контекста

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

  const sendMessage = async () => {
    if (!message) return;

    const newMessage = { role: 'user', content: message };
    setChat([...chat, newMessage]);
    setIsThinking(true);

    try {
      const response = await fetch('http://localhost:4000/respond', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      });

      const data = await response.json();
      if (data.botResponse) {
        setChat([...chat, newMessage, { role: 'bot', content: data.botResponse }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsThinking(false);
    }

    setMessage('');
  };

  const renderPost = () => {
    if (chat.length === 0) {
      return (
        <View style={tw`flex-1 justify-center items-center p-10 mt-94`}>
          <Image source={require('../assets/Main/icon2.png')} style={tw`w-26 h-26 mb-2`} />
          <Text style={tw`text-lg font-bold`}>Let's figure out a recipe</Text>
          <Text style={tw`text-base`}>Begin by typing a message</Text>
        </View>
      );
    }

    return (
      <SafeAreaView style={tw`flex-1 bg-white`}>
        <ScrollView contentContainerStyle={tw`p-6 mt-10`}>
          {chat.map((msg, index) => (
            <View key={index} style={tw`mb-4 flex-row items-center`}>
              <Image source={msg.role === 'user' ? require('../assets/NavigationBar/user.png') : require('../assets/Main/icon2.png')} style={tw`w-8 h-8 rounded-full mr-2 mb-7`} />
              <View>
                <Text style={tw`text-base font-semibold mb-1`}>{msg.role === 'user' ? 'You' : 'MealMasterBot'}:</Text>
                <Text style={tw`text-base mb-1`}>{msg.content}</Text>
              </View>
            </View>
          ))}
          {isThinking && <Thinking />}
        </ScrollView>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <FlatList data={[{ key: '1' }]} renderItem={renderPost} keyExtractor={item => item.key} contentContainerStyle={tw`flex-grow`} />
      <View style={tw`flex-none flex-row items-center p-2 border-t border-gray-300 bg-white`}>
        <View style={tw`flex-1 flex-row items-center border border-gray-300 rounded-full px-2 mx-1 bg-amber-50`}>
          <TouchableOpacity onPress={sendMessage} style={tw`p-1`}>
            <Image source={require('../assets/HomeMessageBar/paperClip.png')} style={tw`w-5 h-5`} />
          </TouchableOpacity>
          <TextInput style={tw`flex-1 h-10 px-1`} placeholder="Message MealMasterBot" value={message} onChangeText={setMessage} />
          <TouchableOpacity onPress={sendMessage} style={tw`p-1`}>
            <Image source={require('../assets/HomeMessageBar/arrowUpCircle.png')} style={tw`w-6 h-6`} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
