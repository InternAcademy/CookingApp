import React from "react";
import { View, Image, TextInput, TouchableOpacity } from "react-native";
import tw from "twrnc";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../redux/uiSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userActions } from "../../redux/userSlice";
import useChatMutation from "../../hooks/useChatMutation";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function ChatInput() {
  const input = useSelector((state) => state.ui.input);
  const isDarkTheme = useSelector((state) => state.ui.isDarkTheme);
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

  async function openGallery() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
      base64: true,
    });
    console.log(result);
    const uri = result.assets[0].uri;
    const token = await AsyncStorage.getItem("token");
    dispatch(
      userActions.selectChat({
        ...selectedChat,
        content: [
          ...(selectedChat?.content || []),
          { role: "user", type: "Image", content: uri },
        ],
      })
    );
    dispatch(uiActions.setResponseError(null));
    mutate({
      token: token,
      chatId: selectedChat && selectedChat.id,
      type: "Image",
      content: `data:${result.assets[0].mimeType};base64,${result.assets[0].base64}`,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // navigation.goBack();
    }
  }

  async function sendMessage() {
    if (input) {
      const token = await AsyncStorage.getItem("token");

      dispatch(
        userActions.selectChat({
          ...selectedChat,
          content: [
            ...(selectedChat?.content || []),
            { type: "Text", role: "user", content: input },
          ],
        })
      );
      mutate({
        token: token,
        chatId: selectedChat ? selectedChat.id : null,
        type: "Text",
        content: input,
      });
    }
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
            <Ionicons name="camera" size={30} color={isDarkTheme ? "white" : "orange"} />
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
            placeholderTextColor={isDarkTheme ? "gray" : "gray"}
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
