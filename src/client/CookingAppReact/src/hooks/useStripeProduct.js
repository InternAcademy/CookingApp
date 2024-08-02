import { fetchSubs } from "@/http/subs";
import { getToken } from "../msal/msal";
import { useQuery } from "@tanstack/react-query";
const useStripeProduct = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["subs"],
    queryFn: async () => {
      const token = await getToken();
      return fetchSubs(token);
    },
  });

  return { data, isPending, isError, error };
};

export default useStripeProduct;
