import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../http/chat";
import { uiActions } from "../redux/uiSlice";
import { userActions } from "../redux/userSlice";
import { preferences } from "../http/user";

const useFoodPreferences = () => {
  const dispatch = useDispatch();
  const selectedChat = useSelector((state) => state.user.selectedChat);

  const {
    mutate: save,
    isPending: isSaving,
    isError,
    error,
  } = useMutation({
    mutationFn: preferences,
    onSuccess: (response) => {
      console.log(response);
    },
  });

  return {
    save,
    isSaving,
    isError,
    error,
  };
};

export default useFoodPreferences;
