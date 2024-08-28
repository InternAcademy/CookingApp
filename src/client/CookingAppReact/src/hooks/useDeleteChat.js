import { deleteChat } from "@/http/chat";
import { useMutation } from "@tanstack/react-query";
import useChatHistory from "./useChatHistory";
import { getToken } from "@/msal/msal";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "@/store/userSlice";
import { uiActions } from "@/store/uiSlice";
export default function useDeleteChat() {
  const { getFirstPage } = useChatHistory();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: deleteChat,
    onSuccess: async () => {
      const token = await getToken();
      const decoded = jwtDecode(token);
      getFirstPage({ token, pageIndex: 1, userId: decoded.sub });
      dispatch(userActions.emptyChat());
      navigate("/");
      dispatch(uiActions.closeModal());
    },
  });

  return { mutate, isPending, isError, error };
}
