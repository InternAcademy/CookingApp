import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "@/store/uiSlice";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useDeleteRecipe from "@/hooks/useDeleteRecipe";
import { getToken } from "@/msal/msal";
export default function RecipeRemovalModal({ recipeId }) {
  const recipes = useSelector((state) => state.ui.filteredRecipes.recipes);

  const dispatch = useDispatch();
  const { mutate, isPending } = useDeleteRecipe();

  function handleModalClosing() {
    dispatch(uiActions.closeModal());
  }

  async function handleApproval() {
    const token = await getToken();
    dispatch(uiActions.removeRecipe(recipeId));
    mutate({ token: token, recipeId: recipeId });
  }
  return (
    <div>
      <div className="flex justify-end pr-3 pt-3">
        <XMarkIcon
          className="size-5 hover:cursor-pointer"
          onClick={handleModalClosing}
        />
      </div>
      <div className="py-5 px-10 flex flex-col gap-10">
        <h2>Are you sure you want to remove this recipe?</h2>
        <div className="flex justify-end gap-2">
          <button className="bg-" onClick={handleModalClosing}>
            Cancel
          </button>
          <button
            className="bg-red-600 px-3 rounded-lg"
            onClick={handleApproval}
          >
            {isPending ? "Removing..." : "Yes"}
          </button>
        </div>
      </div>
    </div>
  );
}
