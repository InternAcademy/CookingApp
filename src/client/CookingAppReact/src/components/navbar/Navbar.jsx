import { BiSolidEdit } from "react-icons/bi";
import { GoSidebarExpand } from "react-icons/go";
import { MdFoodBank } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/uiSlice";
export default function Navbar() {
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(uiActions.openSidebar());
  }
  return (
    <ul className="flex flex-row w-full py-3 justify-between">
      <li className="flex flex-row pl-6 items-center gap-2">
        <GoSidebarExpand
          className="text-[2.5rem] text-orange-300 rounded-xl hover:bg-gray-100 hover:cursor-pointer p-2"
          onClick={handleClick}
        />
        <BiSolidEdit className="text-[2.5rem] text-orange-300  rounded-xl hover:bg-gray-100 hover:cursor-pointer p-2" />
        <h2 className="font-semibold text-xl text-orange-200">Meal Master</h2>
      </li>
      <li className="flex flex-row pr-10 items-center gap-5">
        <MdFoodBank className="text-[3rem] text-orange-300  rounded-xl hover:bg-gray-100 hover:cursor-pointer p-2" />
        <RxAvatar className="text-4xl text-orange-300" />
      </li>
    </ul>
  );
}
