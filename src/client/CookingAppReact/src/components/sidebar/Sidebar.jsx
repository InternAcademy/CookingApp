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
      className={`bg-orange-100 h-screen w-64 fixed top-0 left-0 ${
        !isOpen && "left-[-50rem]"
      } duration-300`}
    >
      <header className="flex justify-between px-4 py-4">
        <GoSidebarExpand
          className="text-[2.5rem] text-orange-300 rounded-xl hover:bg-gray-100 hover:cursor-pointer p-2"
          onClick={handleClick}
        />
        <BiSolidEdit className="text-[2.5rem] text-orange-300  rounded-xl hover:bg-gray-100 hover:cursor-pointer p-2" />
      </header>
      <ul className="overflow-y-scroll h-screen">
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
      </ul>
    </section>
  );
}
