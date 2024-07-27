// app/hooks/useSaveRecipe.jsx
import { useMutation } from "@tanstack/react-query";

import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "@/store/ui-slice";
import { createRecipe } from "@/http/recipe";

const useSaveRecipe = () => {
  const dispatch = useDispatch();
  const chat = useSelector(state => state.user.selectedChat);
  const lastMessageContent = chat && chat.content.length > 0 ? chat.content[chat.content.length - 1].content : null;

  const {
    mutate: save,
    isLoading,
    isError,
    error
  } = useMutation({
    mutationKey: ["recipe", lastMessageContent],
    mutationFn: createRecipe,
    onMutate: () => {},
    onSuccess: response => {
      console.log(response);
    },
    onError: error => {
      dispatch(uiActions.setResponseError(error.message));
    }
  });

  return {
    save,
    isLoading,
    isError,
    error
  };
};

export default useSaveRecipe;
