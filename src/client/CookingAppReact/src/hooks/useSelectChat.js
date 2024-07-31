import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { getChat } from "../http/chat";
import { userActions } from "../store/userSlice";
import { getToken } from "../msal/msal";
import { useQuery } from "@tanstack/react-query";
const useSelectChat = (chatId) => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["getChat", chatId],
    queryFn: async () => {
      const token = await getToken();
      return getChat({ token, chatId: chatId });
    },
    enabled: false,
  });

  return { data, isPending, isError, error, refetch };
};

export default useSelectChat;
