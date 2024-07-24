// pages/Recipes.jsx
"use client";
import "tailwindcss/tailwind.css";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import { MdSearch } from "react-icons/md";
import { getRecipes } from "../../http/recipe";
import Recipe from "@/components/Recipe";

const Recipes = () => {
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);
  const router = useRouter();
  const [input, setInput] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["getRecipes"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userRecipes = await getRecipes({
        token: token,
        userId: decodedToken.sub
      });
      return userRecipes;
    }
  });

  const memoizedRefetch = useCallback(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (data) {
      setFilteredRecipes(data);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const filtered = data.filter(recipe => recipe.title.toLowerCase().includes(input.toLowerCase()));
      setFilteredRecipes(filtered);
    }
  }, [input, data]);

  function handleSelection(id) {
    router.push(`/recipes/${id}`);
  }

  const clearSearch = () => {
    setInput("");
  };

  const CustomCloseIcon = ({ color }) => (
    <svg height="14" width="14" viewBox="0 0 14 14">
      <line x1="1" y1="1" x2="13" y2="13" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="1" y1="13" x2="13" y2="1" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  return (
    <div className={`flex flex-col items-center min-h-screen ${isDarkTheme ? "bg-[#202020]" : "bg-white"}`}>
      <h1 className={`text-3xl font-bold my-4 ${isDarkTheme ? "text-white" : "text-black"}`}>Recipes</h1>
      <div className="flex flex-row justify-between items-center px-4 py-2 w-full">
        <div className={`flex flex-row items-center flex-1 border ${isDarkTheme ? "border-gray-700" : "border-gray-300"} rounded-md`}>
          <button className="ml-2" onClick={memoizedRefetch}>
            <MdSearch size={24} color={isDarkTheme ? "white" : "black"} />
          </button>
          <input className={`flex-1 p-2 ${isDarkTheme ? "text-white bg-[#202020]" : "text-black bg-white"}`} placeholder="Search for recipes" value={input} onChange={e => setInput(e.target.value)} />
          {input !== "" && (
            <button onClick={clearSearch} className="pr-3 pl-2">
              <CustomCloseIcon color={isDarkTheme ? "white" : "black"} />
            </button>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col items-center">
        {filteredRecipes.map(recipe => (
          <Recipe key={recipe.id} recipe={recipe} refetch={memoizedRefetch} />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
