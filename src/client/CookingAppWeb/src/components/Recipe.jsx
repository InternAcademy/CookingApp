// components/Recipe.jsx
"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { archive } from "@/http/recipe";

import { FaArchive, FaRegBookmark, FaClock, FaUtensils, FaSpinner } from "react-icons/fa";

export default function Recipe({ recipe, refetch }) {
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: archive,
    onSuccess: () => {
      queryClient.invalidateQueries(["getRecipes"]);
      queryClient.invalidateQueries(["getRecipeById", recipe.id]);
      refetch();
      setLoading(false);
    },
    onError: error => {
      console.error(error);
      setLoading(false);
    }
  });

  function handleSelection() {
    router.push(`/recipes/${recipe.id}`);
  }

  async function archiveThisRecipe(e) {
    e.stopPropagation();
    console.log(recipe);
    const token = localStorage.getItem("token");
    setLoading(true);

    mutate({ token, recipeId: recipe.id });
  }

  return (
    <div onClick={handleSelection} className="cursor-pointer">
      <div className={`bg-white w-80 m-4 rounded-lg shadow-md overflow-hidden ${isDarkTheme ? "bg-[#303030]" : "bg-white"}`}>
        <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-40 object-cover" />
        <div className="p-4 flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <h2 className={`text-xl font-bold ${isDarkTheme ? "text-white" : "text-black"}`}>{recipe.title}</h2>
            {loading ? <FaSpinner className={`animate-spin ${isDarkTheme ? "text-white" : "text-black"} mr-2`} /> : <div onClick={archiveThisRecipe}>{recipe.isArchived ? <FaArchive className={isDarkTheme ? "text-white" : "text-black"} size={24} /> : <FaRegBookmark className={isDarkTheme ? "text-white" : "text-black"} size={24} />}</div>}
          </div>

          <div className="flex flex-row justify-start items-center">
            <FaClock size={20} className={isDarkTheme ? "text-white" : "text-black"} />
            <span className={`text-[16px] font-semibold ml-1 ${isDarkTheme ? "text-white" : "text-black"}`}>{recipe.duration}</span>
          </div>
          <div className="flex flex-row justify-start items-center">
            <FaUtensils size={20} className={isDarkTheme ? "text-white" : "text-black"} />
            <span className={`text-[16px] font-semibold ml-1 pt-1 ${isDarkTheme ? "text-white" : "text-black"}`}>{recipe.numberOfPortions}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
