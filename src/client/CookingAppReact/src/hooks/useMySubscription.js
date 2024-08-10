import { useQuery } from "@tanstack/react-query";
import { getRecipeById } from "@/http/recipe";
import { getToken } from "@/msal/msal";
import { mySub } from "@/http/subs";
const useMySubscription = () => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["mySub"],
    queryFn: async () => {
      const token = await getToken();
      const userSub = await mySub({
        token: token,
      });
      return userSub;
    },
  });

  return { data, isPending, isError, error, refetch };
};

export default useMySubscription;
