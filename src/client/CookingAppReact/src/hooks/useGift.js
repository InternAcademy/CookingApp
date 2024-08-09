import { useMutation } from "@tanstack/react-query";
import { gift } from "@/http/admin";
import toast from "react-hot-toast";

export default function useGift() {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: gift,
    onError: () => {
      toast.error("There was an error!");
    },
    onSuccess: async () => {
      toast.success("Successfully gifted!");
    },
  });

  return { mutate, isPending, isError, error };
}
