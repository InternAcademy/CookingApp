// hooks/useSelectChat.jsx
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { useDispatch } from "react-redux";
import { userActions } from "@/store/userSlice";
import { getChat } from "../http/chat";

const useSelectChat = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: getChat,
    onSuccess: response => {
      const { requests, responses } = response.data;
      const minLength = Math.min(requests.length, responses.length);
      let combinedArray = [];
      for (let i = 0; i < minLength; i++) {
        combinedArray.push({
          type: requests[i].type,
          content: requests[i].content,
          role: "user"
        });
        combinedArray.push({
          type: responses[i].type,
          content: responses[i].content,
          role: "bot"
        });
      }

      for (let i = minLength; i < requests.length; i++) {
        combinedArray.push({
          type: requests[i].type,
          content: requests[i].content,
          role: "user"
        });
      }

      for (let i = minLength; i < responses.length; i++) {
        combinedArray.push({
          type: responses[i].type,
          content: responses[i].content,
          role: "bot"
        });
      }
      dispatch(
        userActions.selectChat({
          id: response.data.id,
          content: combinedArray
        })
      );
      router.push("/");
    }
  });

  const selectChat = async chat => {
    const token = localStorage.getItem("token");
    if (token) {
      mutate({ token, chatId: chat.chatId });
    } else {
      router.push("/");
    }
  };

  return selectChat;
};

export default useSelectChat;
