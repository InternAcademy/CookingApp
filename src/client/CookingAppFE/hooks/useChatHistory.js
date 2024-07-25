import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import { getUserChats } from "../http/chat";
import { userActions } from "../redux/userSlice";

const useChatHistory = () => {
  const dispatch = useDispatch();
  const chatHistory = useSelector((state) => state.user.chatHistory);

  const {
    data: chatHistoryData,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["getHistory"],
    queryFn: async () => {
      const token = await AsyncStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      console.log(decodedToken.sub);
      const userChats = await getUserChats({
        token: token,
        userId: decodedToken.sub,
      });
      return userChats;
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (chatHistoryData) {
      dispatch(userActions.setChatHistory(chatHistoryData.data));
    }
  }, [chatHistoryData]);

  return {
    chatHistory,
    isPending,
    isError,
    error,
    refetchChatHistory: refetch,
  };
};

export default useChatHistory;
