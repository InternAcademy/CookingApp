import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useMutation } from "@tanstack/react-query";
import { getUserChats } from "../http/chat";
import { userActions } from "../redux/userSlice";

const useChatHistory = () => {
  const dispatch = useDispatch();
  const chatHistory = useSelector((state) => state.user.chatHistory);
  const {
    data: firstPageChats,
    mutate: getFirstPage,
    isPending: gettingMovies,
  } = useMutation({
    mutationFn: getUserChats,
    onMutate: () => {
      console.log("hii");
    },
    onSuccess: (response) => {
      dispatch(userActions.firstPageChatHistory(response.data));
    },
  });
  const {
    data: loadedChats,
    mutate: getNextPage,
    isPending,
  } = useMutation({
    mutationFn: getUserChats,
    onMutate: () => {},
    onError: (errr) => {
      console.log(errr);
    },
    onSuccess: (response) => {
      console.log("return next page ", response);
      dispatch(userActions.setChatHistory(response.data));
    },
  });
  useEffect(() => {
    // if (chatHistoryData) {
    //   console.log(chatHistoryData);
    //   dispatch(userActions.setChatHistory(chatHistoryData.data));
    // }
  }, []);

  return {
    getFirstPage,
    getNextPage,
  };
};

export default useChatHistory;
