import { useMutation } from "@tanstack/react-query";
import { buyPack, createSub } from "@/http/subs";
import { useNavigate } from "react-router-dom";
const useStripeSession = () => {
  const {
    mutate: subscribe,
    isPending: isSubscribing,
    isError: isSubError,
    error: subError,
  } = useMutation({
    mutationFn: createSub,
    onSuccess: (response) => {
      window.location.href = response.data.sessionUrl;
    },
  });

  const {
    mutate: payOneTime,
    isPending: isBuying,
    isError: isBuyError,
    error: buyError,
  } = useMutation({
    mutationFn: buyPack,
    onSuccess: (response) => {
      window.location.href = response.data.sessionUrl;
    },
  });
  return { subscribe, payOneTime };
};

export default useStripeSession;
