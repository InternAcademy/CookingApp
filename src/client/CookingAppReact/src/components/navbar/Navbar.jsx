import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uiActions } from "../../store/uiSlice";
import { userActions } from "@/store/userSlice";
import Unlimited from "../../assets/unlimited.png";
export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);
  const recipesOpen = useSelector((state) => state.ui.recipesOpen);
  function handleSidebar() {
    dispatch(uiActions.openSidebar());
  }
  function handleRecipes() {
    dispatch(uiActions.toggleRecipes());
  }
  function handleNewChat() {
    dispatch(userActions.emptyChat());
    navigate("/");
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
          {/* <h2 className="font-semibold text-xl flex flex-row justify-center items-center text-center content-center gap-2">
            <div className="flex justify-center items-center text-center border-2 border-orange-300 text-black p-3 font-semibold text-xl rounded-full w-fit h-10">
                Meal Master
            </div>
          </h2> */}
        </li>
        <div
          className={`flex flex-row pl-6 items-center gap-2 ${
            sidebarOpen ? "block" : "hidden"
          }`}
        >
          <h2 className="font-semibold text-xl">Meal Master</h2>
          {/* <h2 className="font-semibold text-xl flex flex-row justify-center items-center text-center content-center gap-2">
            <div className="flex justify-center items-center text-center border-2 border-orange-300 text-black p-3 font-semibold text-xl rounded-full w-fit h-10">
                Meal Master
            </div>
          </h2> */}
        </div>
        <li
          className={`right-0 sticky flex flex-row pr-10 items-center gap-5 ${
            recipesOpen ? "invisible" : "visible"
          }`}
        >
          <ClipboardDocumentCheckIcon
            className="size-10 rounded-xl hover:bg-gray-100 hover:cursor-pointer p-2"
            onClick={handleRecipes}
          />
          <UserIcon className="size-10 rounded-xl hover:bg-gray-100 hover:cursor-pointer p-2" />
        </li>
      </ul>
    </nav>
  );
}
