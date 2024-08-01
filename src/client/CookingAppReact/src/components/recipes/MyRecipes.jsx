import { useDispatch, useSelector } from "react-redux";
import { UserIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { uiActions } from "../../store/uiSlice";
import RecipeCard from "./RecipeCard";
import { getToken } from "@/msal/msal";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import useFirstPageRecipes from "@/hooks/useFirstPageRecipes";

export default function MyRecipes() {
  const isOpen = useSelector((state) => state.ui.recipesOpen);
  const recipes = useSelector((state) => state.ui.filteredRecipes.recipes);
  const dispatch = useDispatch();
  const { getFirstPageRecipes } = useFirstPageRecipes();
  function handleRecipes() {
    dispatch(uiActions.toggleRecipes());
  }
  useEffect(() => {
    if (isOpen) {
      async function getFirstPageAsync() {
        const token = await getToken();
        const decoded = jwtDecode(token);
        getFirstPageRecipes({
          token: token,
          userId: decoded.sub,
          page: 1,
        });
      }
      getFirstPageAsync();
    }
  }, [isOpen]);

    return (
        <section className={`bg-gray-100 flex flex-col grow ${
        isOpen ? "visible w-screen md:w-[42rem] absolute md:relative" : "invisible w-0"
      }  h-screen duration-300`}>

        <header className={`flex flex-row justify-between items-center px-3 py-3 ${isOpen ? "" : "hidden"}`}>
            <ChevronLeftIcon 
            className="size-10  rounded-xl border border-gray-100  hover:border hover:border-gray-200 hover:cursor-pointer p-2" 
            onClick={handleRecipes}
            />
            <h1 className="text-lg">My Recipes</h1>
            <UserIcon className="size-10 invisible md:visible rounded-xl border border-gray-100  hover:border hover:border-gray-200 hover:cursor-pointer p-2" />
        </header>

        <section className={`flex justify-center items-center px-4 py-4 h-28 ${isOpen ? "" : "hidden"}`}>
            <input type="text" className="bg-white w-full h-3/4 rounded-xl outline-none px-6 py-3" placeholder="Looking for your favourite recipe?" />
        </section>
        <ul
        className={`
            overflow-y-scroll 
            overflow-x-hidden 
            flex
            flex-col
            items-center
            gap-4
            ${isOpen ? "visible" : "invisible"}
            h-full`}
      >
        {recipes.length > 0 &&
          recipes.map((recipe) => <RecipeCard recipe={recipe} />)}
      </ul>
    </section>
  );
}
