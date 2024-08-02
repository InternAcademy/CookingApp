import { useMutation } from "@tanstack/react-query";
import { createSub } from "@/http/subs";
import { useNavigate } from "react-router-dom";
const useStripeSession = () => {
  const navigate = useNavigate();
  const {
    mutate,
    isPending: isSubscribing,
    isError: isSubError,
    error: subError,
  } = useMutation({
    mutationFn: createSub,
    onSuccess: (response) => {
      console.log(response.data.sessionUrl);
      window.location.href = response.data.sessionUrl;
    },
  });
  return { mutate };
};

export default useStripeSession;
