import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import { getUserChats } from "../http/chat";
import { userActions } from "../redux/userSlice";

const useChatHistory = () => {
  const dispatch = useDispatch();
  const chatHistory = useSelector(state => state.user.chatHistory);

  const {
    data: chatHistoryData,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ["getHistory"],
    queryFn: async () => {
      const token = localStorage.getItem("token"); // Замяна на AsyncStorage с localStorage
      if (!token) throw new Error("Token not found");
      const decodedToken = jwtDecode(token);
      const userChats = await getUserChats({
        token: token,
        userId: decodedToken.sub
      });
      return userChats;
    }
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
    isLoading,
    isError,
    error,
    refetchChatHistory: refetch
  };
};

export default useChatHistory;
