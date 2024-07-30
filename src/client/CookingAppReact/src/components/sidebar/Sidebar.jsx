import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { BiSolidEdit } from "react-icons/bi";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { ChartPieIcon } from "@heroicons/react/24/outline";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/uiSlice";
import ChatItem from "./ChatItem";
export default function Sidebar() {
  const isOpen = useSelector((state) => state.ui.sidebarOpen);
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(uiActions.closeSidebar());
  }
  return (
    <section
      className={`bg-gray-100 flex flex-col grow   ${
        isOpen ? "visible w-screen absolute z-10 md:w-96 md:relative md:z-0" : "invisible w-0"
      }  h-screen  duration-300`}
    >
      <header className="flex justify-between px-4 py-4">
        <Bars3BottomLeftIcon
          className="size-10  rounded-xl border border-gray-100  hover:border hover:border-gray-200 hover:cursor-pointer p-2"
          onClick={handleClick}
        />
        <ChatBubbleOvalLeftEllipsisIcon className="size-10 rounded-xl border border-gray-100  hover:border hover:border-gray-200 hover:cursor-pointer p-2" />
      </header>
      <button>
        <h5 className="hover:bg-gray-300 mt-5 rounded-lg m-3 px-5 py-2 flex flex-row justify-start items-center hover:cursor-pointer isolate bg-white/20 shadow-sm ring-1 ring-black/5">
          <ChartPieIcon className="size-5 mr-5"/>Dashboard
        </h5>
      </button>
      <button>
        <h5 className="hover:bg-gray-300 mb-10 rounded-lg m-3 px-5 py-2 flex flex-row justify-start items-center hover:cursor-pointer isolate bg-white/20 shadow-sm ring-1 ring-black/5">
          <BanknotesIcon className="size-5 mr-5"/>Cost & Analitics
        </h5>
      </button>
      <ul
        className={`overflow-y-auto overflow-x-hidden px-3 m-2 ${
          isOpen ? "visible" : "invisible "
        }  duration-100 h-full`}
      >
        <h3 className=" text-md font-light tracking-normal">
          Today
        </h3>
        <li>
          <ChatItem title={"Fruit Desert"} />
        </li>
        <li>
          <ChatItem title={"Fruit Desert"} />
        </li>
        <li>
          <ChatItem title={"Fruit Desert"} />
        </li>
        <li>
          <ChatItem title={"Fruit Desert"} />
        </li>
        <h3 className=" text-md font-light">Yesterday</h3>
        <li>
          <ChatItem title={"Fruit Desert"} />
        </li>
        <li>
          <ChatItem title={"Fruit Desert"} />
        </li>
        <h3 className=" text-md font-light">This week</h3>
        <li>
          <ChatItem title={"Fruit Desert"} />
        </li>
        <li>
          <ChatItem title={"Fruit Desert"} />
        </li>
        <h3 className="text-orange-300 text-md font-light">Last month</h3>
        <li>
          <ChatItem title={"Fruit Desert"} />
        </li>
        <li>
          <ChatItem title={"Fruit Desert"} />
        </li>
        <li>
          <ChatItem title={"Fruit Desert"} />
        </li>
        <li>
          <ChatItem title={"Fruit Desert"} />
        </li>
        <li>
          <ChatItem title={"Fruit Desert"} />
        </li>
        <li>
          <ChatItem title={"Fruit Desert"} />
        </li>
        <li>
          <ChatItem title={"Fruit Desert"} />
        </li>
        <li>
          <ChatItem title={"Fruit Desert"} />
        </li>
        <li>
          <ChatItem title={"Fruit Desert"} />
        </li>
        <li>
          <ChatItem title={"Fruit Desert"} />
        </li>
        <li>
          <ChatItem title={"Fruit Desert"} />
        </li>
        <li>
          <ChatItem title={"Fruit Desert"} />
        </li>
        <li>
          <ChatItem title={"Fruit Desert"} />
        </li>
        <li>
          <ChatItem title={"Fruit Desert"} />
        </li>
        <li>
          <ChatItem title={"Fruit Desert"} />
        </li>
        <li>
          <ChatItem title={"Fruit Desert"} />
        </li>
        <li>
          <ChatItem title={"Fruit Desert"} />
        </li>
      </ul>
    </section>
  );
}
