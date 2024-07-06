import { View, Image, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { uiActions } from '../../redux/uiSlice';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userActions } from '../../redux/userSlice';
import useChatMutation from '../../hooks/useNewChat';
import useContinueChatMutation from '../../hooks/useKeepChatting';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';

export default function ChatInput() {
  const input = useSelector(state => state.ui.input);
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);
  const selectedChat = useSelector(state => state.user.selectedChat);
  const dispatch = useDispatch();
  const { initialMessage, isPending, isError, error } = useChatMutation();
  const { keepChatting, isChatting, isChatError, chatError } = useContinueChatMutation();
  const navigation = useNavigation();
  const route = useRoute();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (route.params?.photo) {
      setPhoto(route.params.photo);
    }
  }, [route.params?.photo]);

  async function sendMessage() {
    const token = await AsyncStorage.getItem('token');
    const newMessage = { role: 'user', content: input };

    if (!selectedChat) {
      initialMessage({ token: token, message: input });
      dispatch(
        userActions.selectChat({
          ...selectedChat,
          content: [newMessage]
        })
      );
    } else {
      keepChatting({ token: token, chatId: selectedChat.id, message: input });
      dispatch(
        userActions.selectChat({
          ...selectedChat,
          content: [...selectedChat.content, newMessage]
        })
      );
    }
  }

  function handleTyping(value) {
    dispatch(uiActions.setInput(value));
  }

  return (
    <>
      {photo && <Image source={{ uri: photo }} style={tw`w-20 h-20 mx-auto my-2 rounded-full`} />}
      <View style={tw`flex w-6/8 flex-row justify-center items-center border ${isDarkTheme ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-amber-50'} rounded-full px-2 mx-1`}>
        <TouchableOpacity onPress={() => navigation.navigate('CameraScreen')} style={tw`p-1`}>
          <Ionicons name="camera" size={30} color="orange" />
        </TouchableOpacity>

        <TouchableOpacity onPress={sendMessage} style={tw`p-1`}>
          <Image source={require('../../assets/HomeMessageBar/paperClip.png')} style={tw`w-5 h-5 ${isDarkTheme ? 'tint-white' : ''}`} />
        </TouchableOpacity>
        <TextInput style={tw`flex-1 h-10 px-1 ${isDarkTheme ? 'text-white' : 'text-black'}`} placeholder="Message MealMasterBot" placeholderTextColor={isDarkTheme ? 'gray' : 'black'} value={input} onChangeText={handleTyping} />
        <TouchableOpacity onPress={sendMessage} style={tw`p-1`}>
          <Image source={require('../../assets/HomeMessageBar/arrowUpCircle.png')} style={tw`w-6 h-6 ${isDarkTheme ? 'tint-white' : ''}`} />
        </TouchableOpacity>
      </View>
    </>
  );
}
