import React from "react";
import { View, Image, TextInput, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../redux/uiSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userActions } from "../../redux/userSlice";
import useChatMutation from "../../hooks/useNewChat";
import useContinueChatMutation from "../../hooks/useKeepChatting";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function ChatInput() {
  const input = useSelector(state => state.ui.input);
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);
  const photoUri = useSelector(state => state.ui.photoUri);
  const selectedChat = useSelector(state => state.user.selectedChat);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { initialMessage, isPending, isError, error } = useChatMutation();
  const { keepChatting, isChatting, isChatError, chatError } = useContinueChatMutation();

  async function sendMessage() {
    const token = await AsyncStorage.getItem("token");

    if (!selectedChat) {
      if (photoUri) {
        initialMessage({ token: token, messageType: "Image", image: { uri: photoUri, name: "photo.jpg", type: "image/jpeg" } });
        dispatch(
          userActions.selectChat({
            ...selectedChat,
            content: [{ role: "user", content: photoUri }]
          })
        );
        dispatch(uiActions.clearPhotoUri());
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
      if (photoUri) {
        keepChatting({ token: token, chatId: selectedChat.id, messageType: "Image", image: { uri: photoUri, name: "photo.jpg", type: "image/jpeg" } });
        dispatch(
          userActions.selectChat({
            ...selectedChat,
            content: [...selectedChat.content, { role: "user", content: photoUri }]
          })
        );
        dispatch(uiActions.clearPhotoUri());
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

  function handleTyping(value) {
    dispatch(uiActions.setInput(value));
  }

  function openCamera() {
    navigation.navigate("CameraScreen");
  }

  function openGallery() {
    navigation.navigate("ImageScreen");
  }

  function handleRemovePhoto() {
    dispatch(uiActions.clearPhotoUri());
  }

  return (
    <>
      <View style={tw`flex w-6/8 flex-col justify-center items-center border ${isDarkTheme ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-amber-50"} rounded-full px-2 mx-1`}>
        {photoUri && (
          <View style={tw`flex w-full flex-row justify-start items-center mb-2 relative`}>
            <View style={tw`relative`}>
              <Image source={{ uri: photoUri }} style={tw`w-16 h-16`} />
              <TouchableOpacity style={tw`absolute top-0 right-0 p-1`} onPress={handleRemovePhoto}>
                <Ionicons name="close-circle" size={16} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={tw`flex w-full flex-row justify-center items-center`}>
          <TouchableOpacity onPress={openCamera} style={tw`p-1`}>
            <Ionicons name="camera" size={30} color="orange" />
          </TouchableOpacity>

          <TouchableOpacity onPress={openGallery} style={tw`p-1`}>
            <Image source={require("../../assets/HomeMessageBar/paperClip.png")} style={tw`w-5 h-5 ${isDarkTheme ? "tint-white" : ""}`} />
          </TouchableOpacity>
          <TextInput style={tw`flex-1 h-10 px-1 ${isDarkTheme ? "text-white" : "text-black"}`} placeholder="Message MealMasterBot" placeholderTextColor={isDarkTheme ? "gray" : "black"} value={input} onChangeText={handleTyping} />
          <TouchableOpacity onPress={sendMessage} style={tw`p-1`}>
            <Image source={require("../../assets/HomeMessageBar/arrowUpCircle.png")} style={tw`w-6 h-6 ${isDarkTheme ? "tint-white" : ""}`} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
