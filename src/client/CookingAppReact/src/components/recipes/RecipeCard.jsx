import { ClockIcon } from "@heroicons/react/24/outline";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  const isOpen = useSelector((state) => state.ui.recipesOpen);
  let navigate = useNavigate();
  function handleClick() {
    navigate(`/r/${recipe.id}`);
  }
  return (
    <li
      key={recipe.id}
      className="group flex flex-col bg-white w-full h-72 rounded-2xl pb-2 border hover:cursor-pointer transition"
      onClick={handleClick}
    >
      <img
        className={`h-4/6 object-cover rounded-t-2xl shadow-inner ${
          isOpen ? "duration-300" : ""
        } group-hover:h-2/4`}
        src={recipe.imageUrl}
        alt="Image Description"
      ></img>
      <div className="min-w-[250px] max-w-[360px]">
        <h2 className="font-medium px-4 py-2 text-xl overflow-hidden whitespace-nowrap text-ellipsis">
            {recipe.title}
        </h2>
      </div>
      <div className="w-full px-8 mb-3 text-gray-500 transition-all invisible group-hover:visible overflow-hidden">
        <p className="w-full">{recipe.description}</p>
      </div>
      <section className="flex flex-row justify-between mb-2">
        <div className="flex w-full flex-row justify-start gap-2 ms-4">
          <ClockIcon className="size-6" />
          <p className="w-4/5 whitespace-nowrap text-ellipsis overflow-hidden">{recipe.duration}</p>
        </div>
        <div className="flex w-24 flex-row justify-end gap-2 me-4">
          <UserGroupIcon className="size-6" />
          <p>{recipe.numberOfPortions}</p>
        </div>
      </section>
    </li>
  );
}
