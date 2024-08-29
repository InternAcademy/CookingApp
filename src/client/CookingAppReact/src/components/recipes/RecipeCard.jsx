import { uiActions } from "@/store/uiSlice";
import { ClockIcon } from "@heroicons/react/24/outline";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import { ImSpinner } from "react-icons/im";
export default function RecipeCard({ recipe }) {
  const isOpen = useSelector((state) => state.ui.recipesOpen);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  function handleClick() {
    dispatch(uiActions.closeRecipes());
    navigate(`/r/${recipe.id}`);
  }
  console.log(recipe.imageUrl);
  function handleLoad() {
    setIsLoaded(true);
  }

  return (
    <li
      key={recipe.id}
      className="group flex flex-col justify-between text-primaryText bg-secondary w-full h-72 rounded-2xl pb-2  hover:cursor-pointer transition"
      onClick={handleClick}
    >
      {!isLoaded && (
        <Skeleton className="relative w-full h-[200px] rounded-t-2xl shadow-inner ">
          <ImSpinner className="absolute top-1/2 left-[45%]  size-10 animate-spin duration-750" />
        </Skeleton>
      )}
      <img
        className={`h-4/6 object-cover rounded-t-2xl shadow-inner ${
          isOpen ? "duration-300" : ""
        } group-hover:h-2/4`}
        src={recipe.imageUrl}
        loading="eager"
        onLoad={handleLoad}
        alt="Image Description"
      />

      <div className="min-w-[250px] max-w-[360px]">
        <h2 className="font-medium px-4 py-2 text-xl overflow-hidden whitespace-nowrap text-ellipsis">
          {recipe.title}
        </h2>
      </div>
      <div className="w-full px-8 text-gray-500 transition-all hidden group-hover:block overflow-hidden">
        <p className="w-full">{recipe.description}</p>
      </div>
      <div className="mb-3"></div>
      <section className="flex flex-row justify-between mb-2">
        <div className="flex w-full flex-row justify-start gap-2 ms-4">
          <ClockIcon className="size-6" />
          <p className="w-4/5 whitespace-nowrap text-ellipsis overflow-hidden">
            {recipe.duration}
          </p>
        </div>
        <div className="flex w-24 flex-row justify-end gap-2 me-4">
          <UserGroupIcon className="size-6" />
          <p>{recipe.numberOfPortions}</p>
        </div>
      </section>
    </li>
  );
}
