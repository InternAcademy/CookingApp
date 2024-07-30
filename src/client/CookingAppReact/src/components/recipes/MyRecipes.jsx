import { useDispatch, useSelector } from "react-redux";
import { UserIcon } from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { uiActions } from "../../store/uiSlice";
import Recipe from "../recipes/Recipe"

export default function MyRecipes(){
    const isOpen = useSelector(state => state.ui.recipesOpen);
    const dispatch = useDispatch();
    function handleRecipes() {
        dispatch(uiActions.toggleRecipes());
    }


    return (
        <section className={`bg-gray-100 flex flex-col grow ${
        isOpen ? "visible w-screen md:w-[42rem] absolute md:relative" : "invisible w-0"
      }  h-screen duration-300`}>

        <header className={`flex flex-row justify-between items-center px-3 py-3 ${isOpen ? "" : "hidden"}`}>
            <SparklesIcon 
            className="size-10 text-orange-300  rounded-xl hover:border hover:cursor-pointer p-2" 
            onClick={handleRecipes}
            />
            <h1 className="text-lg">My Recipes</h1>
            <UserIcon className="size-6 hidden md:block " />
            <div className="block md:hidden"></div>
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
            <Recipe/>
            <Recipe/>
            <Recipe/>
            <Recipe/>
            <Recipe/>
            <Recipe/>
            <Recipe/>
            <Recipe/>
        </ul>
        </section>
    );
}