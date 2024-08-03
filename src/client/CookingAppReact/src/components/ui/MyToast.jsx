import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { uiActions } from "@/store/uiSlice";

export default function MyToast() {
  const dispatch = useDispatch();
  const toastMealId = useSelector((state) => state.ui.toastMealId);

  useEffect(() => {
    if (toastMealId) {
      toast((t) => (
        <span>
          <Link to={`/r/${toastMealId}`}>
            Your meal is ready <strong>check it out!</strong>
          </Link>
        </span>
      ));

      // Reset toast state after showing it
      dispatch(uiActions.hideToast());
    }
  }, [toastMealId]);

  return null; // No UI elements needed here, it's just for side effects
}
