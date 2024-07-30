import { GoSidebarExpand } from "react-icons/go";
import { BiSolidEdit } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/uiSlice";
export default function Sidebar() {
  const isOpen = useSelector((state) => state.ui.sidebarOpen);
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(uiActions.closeSidebar());
  }
  return (
    <section
      className={`bg-gray-100 flex flex-col grow   ${
        isOpen ? "visible w-64" : "invisible w-0"
      }  h-screen  duration-300`}
    >
      <header className="flex justify-between px-4 py-4">
        <GoSidebarExpand
          className="text-[2.5rem] text-orange-300 rounded-xl hover:text-white hover:bg-orange-300 hover:cursor-pointer p-2"
          onClick={handleClick}
        />
        <BiSolidEdit className="text-[2.5rem] text-orange-300  rounded-xl hover:text-white hover:bg-orange-300 hover:cursor-pointer p-2" />
      </header>
      <ul
        className={`overflow-y-auto overflow-x-hidden ${
          isOpen ? "visible" : "invisible "
        }   h-full`}
      >
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text</li>
        <li className="text-2xl">Text123123123123123</li>
      </ul>
    </section>
  );
}
