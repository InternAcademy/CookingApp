import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/uiSlice";
import { createRecipe } from "../http/recipe";
import { userActions } from "@/store/userSlice";

const useSaveRecipe = () => {
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.user.selectedChat);
  const lastMessageContent =
    chat && chat.content.length > 0
      ? chat.content[chat.content.length - 1].content
      : null;
  const {
    mutate: save,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationKey: ["recipe ", lastMessageContent],

    mutationFn: createRecipe,
    onMutate: () => {
      dispatch(userActions.reduceRecipeGeneration());
    },
    onSuccess: (response) => {
      console.log(response);
      dispatch(uiActions.showToast(response));
    },
    onError: (error) => {
      dispatch(uiActions.setResponseError(error.message));
    },
  });

  return {
    save,
    isPending,
    isError,
    error,
    isSuccess,
  };
};

export default useSaveRecipe;
