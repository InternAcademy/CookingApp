import { PaperClipIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";

export default function ChatInput() {
  const isOpenRecipes = useSelector(state => state.ui.recipesOpen);
  const isOpenSideBar = useSelector(state => state.ui.sidebarOpen);

  return (
      <section className="flex items-center justify-center mb-5 w-full">

        <ul className={`flex 
        ${isOpenRecipes || isOpenSideBar ? "w-4/5 md:w-4/5 lg:w-3/5" : "w-4/5 md:w-3/5 lg:w-2/5"}
        items-center bg-gray-200 rounded-full gap-2  py-4 px-4`}>
          <li>
            <PaperClipIcon className="size-6"/>
          </li>
          <li className="w-full">
            <input
              type="text"
              placeholder="What you wanna cook today?"
              className="w-full outline-none bg-gray-200 text-black placeholder-black"
            />
          </li>
          <li>
            <PaperAirplaneIcon className="size-6" />
          </li>
        </ul>
      </section>
  );
}
