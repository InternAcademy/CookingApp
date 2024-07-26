// hooks/useChatHistory.jsx
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/userSlice";
import { getUserChats } from "../http/chat";

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
      const token = localStorage.getItem("token");
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
