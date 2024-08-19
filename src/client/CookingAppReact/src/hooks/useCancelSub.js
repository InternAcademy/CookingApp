import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { cancelSub } from "@/http/subs";

export default function useCancelSub({ refetchFn }) {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: cancelSub,
    onError: () => {
      toast.error("There was an error!");
    },
    onSuccess: async () => {
      toast.success("Successfully cancelled!");
      refetchFn();
    },
  });

  return { mutate, isPending, isError, error };
}
