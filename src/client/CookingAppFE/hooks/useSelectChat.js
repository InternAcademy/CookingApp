import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { getChat } from "../http/chat";
import { userActions } from "../redux/userSlice";

const useSelectChat = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { mutate } = useMutation({
    mutationFn: getChat,
    onSuccess: (response) => {
      const { requests, responses } = response.data;
      const minLength = Math.min(requests.length, responses.length);
      let combinedArray = [];
      for (let i = 0; i < minLength; i++) {
        combinedArray.push({
          type: requests[i].type,
          content: requests[i].content,
          role: "user",
        });
        combinedArray.push({
          type: responses[i].type,
          content: responses[i].content,
          role: "bot",
        });
      }

      for (let i = minLength; i < requests.length; i++) {
        combinedArray.push({
          type: requests[i].type,
          content: requests[i].content,
          role: "user",
        });
      }

      for (let i = minLength; i < responses.length; i++) {
        combinedArray.push({
          type: responses[i].type,
          content: responses[i].content,
          role: "bot",
        });
      }
      dispatch(
        userActions.selectChat({
          id: response.data.id,
          content: combinedArray,
        })
      );
      navigation.navigate("Home");
    },
  });

  const selectChat = async (chat) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      mutate({ token, chatId: chat.chatId });
    } else {
      navigation.navigate("LandingPage");
    }
  };

  return selectChat;
};

export default useSelectChat;
