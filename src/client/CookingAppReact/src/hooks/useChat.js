import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../http/chat";
import { uiActions } from "../store/uiSlice";
import { userActions } from "../store/userSlice";
import useChatHistory from "./useChatHistory";
import { jwtDecode } from "jwt-decode";
import { getToken } from "@/msal/msal";

const useChat = () => {
  const dispatch = useDispatch();
  const selectedChat = useSelector((state) => state.user.selectedChat);
  const responseError = useSelector((state) => state.ui.responseError);
  const { getFirstPage, getNextPage, gettingFirstPage } = useChatHistory();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: sendMessage,
    onMutate: () => {
      dispatch(uiActions.setIsThinking(true));
      dispatch(uiActions.setInput(""));
    },
    onSuccess: async (response) => {
      if (responseError) {
        dispatch(uiActions.setResponseError(null));
      }
      const newChatMessage = {
        type: response.type,
        role: "bot",
        content: response.content,
      };
      if (selectedChat) {
        dispatch(
          userActions.continueChat({
            id: response.chatId,
            content: [...selectedChat.content, newChatMessage],
          })
        );
      } else {
        dispatch(
          userActions.continueChat({
            id: response.chatId,
            content: [newChatMessage],
          })
        );
      }

      dispatch(uiActions.setIsThinking(false));
      const token = await getToken();
      const decoded = jwtDecode(token);
      getFirstPage({ token: token, userId: decoded.sub, pageIndex: 1 });
    },
    onError: (error) => {
      dispatch(uiActions.setResponseError(error.message));
    },
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

export default useChat;
