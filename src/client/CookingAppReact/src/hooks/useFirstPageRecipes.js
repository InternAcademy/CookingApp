import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { getRecipes } from "../http/recipe";
import { uiActions } from "../store/uiSlice";

const useFirstPageRecipes = () => {
  const dispatch = useDispatch();

  const { mutate: getFirstPageRecipes, isPending: gettingRecipes } =
    useMutation({
      mutationFn: getRecipes,
      onMutate: () => {},
      onError: (errr) => {
      },
      onSuccess: (data) => {
        dispatch(uiActions.getFirstPage(data));
      },
    });
  const { mutate: loadMoreRecipes, isPending: gettingMoreRecipes } =
    useMutation({
      mutationFn: getRecipes,
      onMutate: () => {},
      onSuccess: (data) => {
        dispatch(uiActions.loadMore(data));
      },
    });

  return {
    getFirstPageRecipes,
    loadMoreRecipes,
    gettingRecipes,
    gettingMoreRecipes,
  };
};

export default useFirstPageRecipes;
