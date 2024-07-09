import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { newChat } from "../http/chat";
import { uiActions } from "../redux/uiSlice";
import { userActions } from "../redux/userSlice";

const useChatMutation = () => {
  const dispatch = useDispatch();
  const selectedChat = useSelector(state => state.user.selectedChat);

  const {
    mutate: initialMessage,
    isPending,
    isError,
    error
  } = useMutation({
    mutationFn: newChat,
    onMutate: () => {
      dispatch(uiActions.setIsThinking(true));
      dispatch(uiActions.setInput(""));
    },
    onSuccess: response => {
      let newChatMessage;
      if (response.data.type === "Text") {
        newChatMessage = {
          role: "bot",
          content: response.data.content
        };
      } else if (response.data.type === "Image") {
        newChatMessage = {
          role: "bot",
          content: response.data.image
        };
      }

      dispatch(
        userActions.selectChat({
          id: response.data.chatId,
          title: response.data.title,
          content: [...(selectedChat.content || []), newChatMessage]
        })
      );
      dispatch(uiActions.setInput(""));
      dispatch(uiActions.setIsThinking(false));
    }
  });

  return {
    initialMessage,
    isPending,
    isError,
    error
  };
};

export default useChatMutation;
