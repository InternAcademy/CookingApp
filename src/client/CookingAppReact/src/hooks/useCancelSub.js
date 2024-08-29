import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { cancelSub } from "@/http/subs";
import { useDispatch } from "react-redux";
import { uiActions } from "@/store/uiSlice";
import useMySubscription from "./useMySubscription";
export default function useCancelSub() {
  const dispatch = useDispatch();
  const { refetch } = useMySubscription();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: cancelSub,
    onError: () => {
      toast.error("There was an error!");
    },
    onSuccess: async () => {
      toast.success("Successfully cancelled!");
      refetch();
      dispatch(uiActions.closeModal());
    },
  });

  return { mutate, isPending, isError, error };
}
