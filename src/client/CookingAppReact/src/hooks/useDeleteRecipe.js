import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteRecipe } from "@/http/recipe";
import { useDispatch } from "react-redux";
import { uiActions } from "@/store/uiSlice";
export default function useDeleteRecipe() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: deleteRecipe,
    onSuccess: async () => {
      dispatch(uiActions.closeModal());

      if (window.innerWidth < 1300) {
        dispatch(uiActions.toggleRecipes());
      }
      navigate("/");
    },
  });

  return { mutate, isPending, isError, error };
}
