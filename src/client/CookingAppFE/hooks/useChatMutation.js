import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../http/chat";
import { uiActions } from "../redux/uiSlice";
import { userActions } from "../redux/userSlice";

const useChatMutation = () => {
  const dispatch = useDispatch();
  const selectedChat = useSelector((state) => state.user.selectedChat);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: sendMessage,
    onMutate: () => {
      dispatch(uiActions.setIsThinking(true));
      dispatch(uiActions.setInput(""));
    },
    onSuccess: (response) => {
      const newChatMessage = {
        role: "bot",
        content: response.content,
      };
      if (selectedChat) {
        dispatch(
          userActions.selectChat({
            id: response.chatId,
            content: [...selectedChat.content, newChatMessage],
          })
        );
      } else {
        dispatch(
          userActions.selectChat({
            id: response.chatId,
            content: [newChatMessage],
          })
        );
      }

      dispatch(uiActions.setInput(""));
      dispatch(uiActions.setIsThinking(false));
    },
  });

  return {
    mutate,
    isPending,
    isError,
    error,
  };
};

export default useChatMutation;
