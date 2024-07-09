import React, { useEffect } from "react";
import { View, Image, TextInput, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../redux/uiSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userSlice, { userActions } from "../../redux/userSlice";
import useChatMutation from "../../hooks/useChatMutation";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
export default function ChatInput() {
  const input = useSelector((state) => state.ui.input);
  const isDarkTheme = useSelector((state) => state.ui.isDarkTheme);
  const uri = useSelector((state) => state.chat.uri);
  const selectedChat = useSelector((state) => state.user.selectedChat);
  const { mutate, isPending, isError, error } = useChatMutation();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  function handleTyping(value) {
    dispatch(uiActions.setInput(value));
  }

  function openCamera() {
    navigation.navigate("CameraScreen");
  }

  function openGallery() {
    navigation.navigate("ImageScreen");
  }
  async function sendMessage() {
    const token = await AsyncStorage.getItem("token");

    dispatch(
      userActions.selectChat({
        ...selectedChat,
        content: [
          ...(selectedChat?.content || []),
          { role: "user", content: input },
        ],
      })
    );
    console.log(selectedChat && selectedChat.id);
    mutate({
      token: token,
      chatId: selectedChat ? selectedChat.id : null,
      type: "Text",
      content: input,
    });
  }
  function handleRemovePhoto() {
    dispatch(uiActions.clearPhotoUri());
  }

  return (
    <>
      <View
        style={tw`flex w-6/8 flex-col justify-center items-center border ${isDarkTheme ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-amber-50"} rounded-full px-2 mx-1`}
      >
        <View style={tw`flex w-full flex-row justify-center items-center`}>
          <TouchableOpacity onPress={openCamera} style={tw`p-1`}>
            <Ionicons name="camera" size={30} color="orange" />
          </TouchableOpacity>

          <TouchableOpacity onPress={openGallery} style={tw`p-1`}>
            <Image
              source={require("../../assets/HomeMessageBar/paperClip.png")}
              style={tw`w-5 h-5 ${isDarkTheme ? "tint-white" : ""}`}
            />
          </TouchableOpacity>
          <TextInput
            style={tw`flex-1 h-10 px-1 ${isDarkTheme ? "text-white" : "text-black"}`}
            placeholder="Message MealMasterBot"
            placeholderTextColor={isDarkTheme ? "gray" : "black"}
            value={input}
            onChangeText={handleTyping}
          />
          <TouchableOpacity onPress={sendMessage} style={tw`p-1`}>
            <Image
              source={require("../../assets/HomeMessageBar/arrowUpCircle.png")}
              style={tw`w-6 h-6 ${isDarkTheme ? "tint-white" : ""}`}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
