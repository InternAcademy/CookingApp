import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/userSlice";
import { continueChat } from "../http/chat";
import { uiActions } from "../redux/uiSlice";

const useContinueChatMutation = () => {
  const dispatch = useDispatch();
  const selectedChat = useSelector(state => state.user.selectedChat);

  const {
    mutate: keepChatting,
    isPending: isChatting,
    isError: isChatError,
    error: chatError
  } = useMutation({
    mutationKey: "continue",
    mutationFn: continueChat,
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
          ...selectedChat,
          content: [...(selectedChat.content || []), newChatMessage]
        })
      );
      dispatch(uiActions.setIsThinking(false));
    },
    onError: error => {}
  });

  return {
    keepChatting,
    isChatting,
    isChatError,
    chatError
  };
};

export default useContinueChatMutation;
