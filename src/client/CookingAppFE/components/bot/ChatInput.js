import { useState } from "react";
import { View, Image, TextInput, TouchableOpacity } from "react-native";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../redux/uiSlice";
import { userActions } from "../../redux/userSlice";
import useChatMutation from "../../hooks/useNewChat";
import useContinueChatMutation from "../../hooks/useKeepChatting";

export default function ChatInput() {
  const input = useSelector(state => state.ui.input);
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);
  const selectedChat = useSelector(state => state.user.selectedChat);
  const dispatch = useDispatch();
  const { initialMessage, isPending, isError, error } = useChatMutation();
  const { keepChatting, isChatting, isChatError, chatError } = useContinueChatMutation();
  const [image, setImage] = useState(null);

  async function sendMessage() {
    const token = await AsyncStorage.getItem("token");
    if (!selectedChat) {
      if (image) {
        initialMessage({ token: token, messageType: "Image", image: image });
        dispatch(
          userActions.selectChat({
            ...selectedChat,
            content: [{ role: "user", content: image.uri }]
          })
        );
        setImage(null);
      } else {
        initialMessage({ token: token, messageType: "Text", content: input });
        dispatch(
          userActions.selectChat({
            ...selectedChat,
            content: [{ role: "user", content: input }]
          })
        );
      }
    } else {
      if (image) {
        keepChatting({ token: token, chatId: selectedChat.id, messageType: "Image", image: image });
        dispatch(
          userActions.selectChat({
            ...selectedChat,
            content: [...selectedChat.content, { role: "user", content: image.uri }]
          })
        );
        setImage(null);
      } else {
        keepChatting({ token: token, chatId: selectedChat.id, messageType: "Text", content: input });
        dispatch(
          userActions.selectChat({
            ...selectedChat,
            content: [...selectedChat.content, { role: "user", content: input }]
          })
        );
      }
    }
    dispatch(uiActions.setInput(""));
  }

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  }

  function handleTyping(value) {
    dispatch(uiActions.setInput(value));
  }

  return (
    <>
      <View style={tw`flex w-6/8 flex-row justify-center items-center border ${isDarkTheme ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-amber-50"} rounded-full px-2 mx-1`}>
        <TouchableOpacity onPress={pickImage} style={tw`p-1`}>
          <Image source={require("../../assets/HomeMessageBar/paperClip.png")} style={tw`w-5 h-5 ${isDarkTheme ? "tint-white" : ""}`} />
        </TouchableOpacity>
        <TextInput style={tw`flex-1 h-10 px-1 ${isDarkTheme ? "text-white" : "text-black"}`} placeholder="Message MealMasterBot" placeholderTextColor={isDarkTheme ? "gray" : "black"} value={input} onChangeText={handleTyping} />
        <TouchableOpacity onPress={sendMessage} style={tw`p-1`}>
          <Image source={require("../../assets/HomeMessageBar/arrowUpCircle.png")} style={tw`w-6 h-6 ${isDarkTheme ? "tint-white" : ""}`} />
        </TouchableOpacity>
      </View>
    </>
  );
}
