import React, { useState, useRef } from "react";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uiActions } from "../../store/uiSlice";
import { userActions } from "@/store/userSlice";
import UserMenu from "../userMenu/UserMenu";
import MealIcon from "../ui/mealIcon";
import Tooltip from "../ui/tooltip";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.user.role.type);
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);
  const recipesOpen = useSelector((state) => state.ui.recipesOpen);
  const dropDownOpen = useSelector((state) => state.ui.dropdownOpen);
  function handleSidebar() {
    if (recipesOpen && window.innerWidth < 1300) {
      dispatch(uiActions.toggleRecipes());
    }
    dispatch(uiActions.openSidebar());
  }
  function handleRecipes() {
    dispatch(uiActions.toggleRecipes());
  }
  function handleNewChat() {
    dispatch(uiActions.clearActive());
    dispatch(userActions.emptyChat());

    navigate("/");
  }
  const toggleDropDown = () => {
    dispatch(uiActions.toggleDropdown());
  };

  const [showTooltip, setShowTooltip] = useState(false);
  const hoverTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setShowTooltip(true);
    }, 400); // 1 second delay
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeoutRef.current);
    setShowTooltip(false);
  };

  return (
    <nav className="text-primaryText">
    <ul className={`flex flex-row w-full py-3 justify-between sticky`}>
      <li
        className={`flex flex-row pl-6 items-center gap-2`}
      >
        <div className={`${
          sidebarOpen ? "hidden" : ""
        }`}>
        <Tooltip tooltipText="Sidebar">
          <Bars3BottomLeftIcon
            className="size-10  rounded-xl hover:bg-base hover:cursor-pointer p-2"
            onClick={handleSidebar}
          />
        </Tooltip>

        <Tooltip tooltipText="New Chat">
          <ChatBubbleOvalLeftEllipsisIcon
            className="size-10 hidden xxs:block rounded-xl hover:bg-base hover:cursor-pointer p-2"
            onClick={handleNewChat}
          />
        </Tooltip>
        </div>
        <h2 className={`font-semibold hidden md:flex text-lg flex-row justify-center items-center text-center h-full`}>
          <span className={`hidden md:block text-center px-2 py-2 xs:py-1`}>Meal Master </span>
          <span
            className={`${
              role === "Free" ? "bg-base " : "bg-primary"
            } text-center rounded-full flex justify-center items-center px-4 py-1`}
          >
            {role}
          </span>
        </h2>
      </li>
      <li
        className={` font-semibold flex md:hidden text-lg flex-row justify-center items-center text-center h-full`}
      >
        <h2 className="font-semibold text-lg flex flex-row justify-center content-center text-center">
          <span className={`hidden md:block text-center px-2 py-2 xs:py-1`}>Meal Master </span>
          <span
            className={`${
              role === "Free" ? "bg-base" : "bg-primary"
            } text-center rounded-full flex justify-center items-center px-4 py-1`}
          >
            {role}
          </span>
        </h2>
      </li>

      <li
        className={`flex flex-row items-center justify-center content-center text-center gap-2 visible pr-6 ${
          recipesOpen ? "invisible" : ""
        }`}
      >
        <Tooltip tooltipText="My Meals">
          <div
            className="size-10 rounded-xl hidden xxs:block hover:cursor-pointer p-2 hover:bg-base"
            onClick={handleRecipes}
          >
            <MealIcon className="group-hover:bg-base" />
          </div>
        </Tooltip>
          <Tooltip tooltipText="User Menu">
            <UserIcon
              className="size-10 rounded-xl hover:bg-base hover:cursor-pointer p-2"
              onClick={(e) => {
                e.stopPropagation();
                toggleDropDown();
              }}
            />
          </Tooltip>
          <UserMenu isOpen={dropDownOpen} toggleDropDown={toggleDropDown} />
      </li>
    </ul>
  </nav>
  );
}
