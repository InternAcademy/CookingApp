import { useQuery } from "@tanstack/react-query";
import { getRecipeById } from "@/http/recipe";
import { getToken } from "@/msal/msal";
const useRecipeDetails = (id) => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["getRecipeById", id],
    queryFn: async () => {
      const token = await getToken();
      const userRecipes = await getRecipeById({
        token: token,
        recipeId: id,
      });
      return userRecipes;
    },
    retry: false,
  });

  return { data, isPending, isError, error, refetch };
};

export default useRecipeDetails;
