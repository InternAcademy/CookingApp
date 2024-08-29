import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { uiActions } from "@/store/uiSlice";

export default function MealToast() {
  const dispatch = useDispatch();
  const toastMealId = useSelector((state) => state.ui.toastMealId);
  const recipeGeneration = useSelector(
    (state) => state.user.role.limitations.recipeGeneration
  );

  useEffect(() => {
    if (toastMealId) {
      toast(
        (t) => (
          <span>
            <Link to={`/r/${toastMealId}`} onClick={() => toast.dismiss(t.id)}>
              Your meal is ready {`(${recipeGeneration} left) `}
              <strong>check it out!</strong>
            </Link>
          </span>
        ),
        { duration: 4000 }
      );
      dispatch(uiActions.hideToast());
    }
  }, [toastMealId]);
  return null;
}
