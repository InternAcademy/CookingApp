import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/uiSlice";
import { createRecipe } from "../http/recipe";
import { userActions } from "@/store/userSlice";
import useFirstPageRecipes from "./useFirstPageRecipes";
import { jwtDecode } from "jwt-decode";
import { getToken } from "@/msal/msal";
const useSaveRecipe = () => {
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.user.selectedChat);
  const lastMessageContent =
    chat && chat.content.length > 0
      ? chat.content[chat.content.length - 1].content
      : null;

  const { getFirstPageRecipes } = useFirstPageRecipes();
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
    onSuccess: async (response) => {
      dispatch(uiActions.showToast(response));
      const token = await getToken();
      const decoded = jwtDecode(token);
      console.log("trigerring");
      getFirstPageRecipes({ token: token, page: 1, userId: decoded.sub });
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
