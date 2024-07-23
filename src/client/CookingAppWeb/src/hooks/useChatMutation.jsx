// hooks/useChatMutation.jsx
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "@/http/chat";
import { uiActions } from "@/store/ui-slice";
import { userActions } from "@/store/userSlice";

const useChatMutation = () => {
  const dispatch = useDispatch();
  const selectedChat = useSelector(state => state.user.selectedChat);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: sendMessage,
    onMutate: () => {
      dispatch(uiActions.setIsThinking(true));
      dispatch(uiActions.setInput(""));
    },
    onSuccess: response => {
      console.log(response);
      const newChatMessage = {
        type: response.type,
        role: "bot",
        content: response.content
      };
      if (selectedChat) {
        dispatch(
          userActions.selectChat({
            id: response.chatId,
            content: [...selectedChat.content, newChatMessage]
          })
        );
      } else {
        dispatch(
          userActions.selectChat({
            id: response.chatId,
            content: [newChatMessage]
          })
        );
      }

      dispatch(uiActions.setIsThinking(false));
    },
    onError: error => {
      dispatch(uiActions.setResponseError(error.message));
    }
  });

  return {
    mutate,
    isPending,
    isError,
    error
  };
};

export default useChatMutation;
