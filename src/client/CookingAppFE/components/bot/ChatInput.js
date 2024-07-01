import { View, Image, TextInput, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { uiActions } from "../../redux/uiSlice";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { newChat, continueChat } from "../../http/chat";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userActions } from "../../redux/userSlice";
export default function ChatInput() {
  const input = useSelector((state) => state.ui.input);
  const isDarkTheme = useSelector((state) => state.ui.isDarkTheme);
  const selectedChat = useSelector((state) => state.user.selectedChat);
  const dispatch = useDispatch();
  const {
    mutate: initialMessage,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: newChat,
    onMutate: () => {
      dispatch(uiActions.setIsThinking(true));
    },
    onSuccess: (response) => {
      const newMessage = { role: "user", content: input };
      dispatch(
        userActions.selectChat({
          id: response.data.chatId,
          title: response.data.title,
          content: [
            newMessage,
            { role: "bot", content: response.data.response },
          ],
        })
      );
      dispatch(uiActions.setInput(""));
      dispatch(uiActions.setIsThinking(false));
    },
  });
  const {
    mutate: keepChatting,
    isPending: isChatting,
    isError: isChatError,
    error: chatError,
  } = useMutation({
    mutationKey: "continue",
    mutationFn: continueChat,
    onMutate: () => {
      dispatch(uiActions.setIsThinking(true));
      dispatch(uiActions.setInput(""));
    },
    onSuccess: (response) => {
      console.log("onSuccess called with response:", response);
      dispatch(
        userActions.selectChat({
          ...selectedChat,
          content: [
            ...selectedChat.content,
            { role: "bot", content: response.data.response },
          ],
        })
      );
      dispatch(uiActions.setIsThinking(false));
    },
    onError: (error) => {
      console.error("Error in keepChatting:", error);
    },
  });

  console.log(selectedChat);

  async function sendMessage() {
    const token = await AsyncStorage.getItem("token");
    if (!selectedChat) {
      initialMessage({ token: token, message: input });
    } else {
      const newMessage = { role: "user", content: input };
      dispatch(
        userActions.selectChat({
          ...selectedChat,
          content: [...selectedChat.content, newMessage],
        })
      );
      keepChatting({ token: token, chatId: selectedChat.id, message: input });
    }
  }
  function handleTyping(value) {
    dispatch(uiActions.setInput(value));
  }
  return (
    <>
      <View
        style={tw`flex w-6/8 flex-row justify-center items-center border ${isDarkTheme ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-amber-50"} rounded-full px-2 mx-1`}
      >
        <TouchableOpacity onPress={sendMessage} style={tw`p-1`}>
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
    </>
  );
}
