import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { userActions } from "../../store/userSlice";
import { uiActions } from "../../store/uiSlice";
export default function Navbar() {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);
  const recipesOpen = useSelector((state) => state.ui.recipesOpen);
  function handleSidebar() {
    dispatch(uiActions.openSidebar());
  }
  function handleRecipes() {
    dispatch(uiActions.toggleRecipes());
  }
  function handleNewChat() {
    dispatch(userActions.clearChat());
    dispatch(uiActions.closeSidebar());
  }
  return (
    <nav className="">
      <ul className={`flex flex-row w-full py-3 justify-between sticky`}>
        <li
          className={`flex flex-row pl-6 items-center gap-2 ${
            sidebarOpen ? "hidden" : "visible"
          }`}
        >
          <Bars3BottomLeftIcon
            className="size-10 rounded-xl hover:bg-gray-100 hover:cursor-pointer p-2"
            onClick={handleSidebar}
          />
          <ChatBubbleOvalLeftEllipsisIcon
            className="size-10   rounded-xl hover:bg-gray-100 hover:cursor-pointer p-2"
            onClick={handleNewChat}
          />
          <h2 className="font-semibold text-xl">Meal Master</h2>
        </li>
        <div
          className={`flex flex-row pl-6 items-center gap-2 ${
            sidebarOpen ? "block" : "hidden"
          }`}
        >
          <h2 className="font-semibold text-xl">Meal Master</h2>
        </div>
        <li
          className={`right-0 sticky flex flex-row pr-10 items-center gap-5 ${
            recipesOpen ? "invisible" : "visible"
          }`}
        >
          <SparklesIcon
            className="size-10 text-orange-300  rounded-xl hover:bg-gray-100 hover:cursor-pointer p-2"
            onClick={handleRecipes}
          />
          <UserIcon className="size-10 rounded-xl hover:bg-gray-100 hover:cursor-pointer p-2" />
        </li>
      </ul>
    </nav>
  );
}
