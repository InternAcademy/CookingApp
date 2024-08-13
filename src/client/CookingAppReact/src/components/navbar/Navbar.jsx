import React, { useState } from "react";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uiActions } from "../../store/uiSlice";
import { userActions } from "@/store/userSlice";
import Unlimited from "../../assets/unlimited.png";
import SignOutButton from "../auth/SignOutButton";
import UserMenu from "../userMenu/UserMenu";

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
            className="size-10 hidden sm:block rounded-xl hover:bg-gray-100 hover:cursor-pointer p-2"
            onClick={handleNewChat}
          />
          <h2 className="font-semibold text-xl flex flex-row justify-center content-center text-center h-full">
            <span className="text-center px-2 py-1">Meal Master </span>
            <span
              className={`${
                role === "Free" ? "bg-gray-200" : "bg-orange-200"
              } text-gray-900 rounded-full px-4 py-1`}
            >
              {role}
            </span>
          </h2>
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
          <h2 className="font-semibold text-xl flex flex-row justify-center content-center text-center">
            <span className="text-center px-2 py-1">Meal Master </span>
            <span
              className={`${
                role === "Free" ? "bg-gray-200" : "bg-orange-200"
              } text-gray-900 rounded-full px-4 py-1`}
            >
              {role}
            </span>
          </h2>
          {/* <h2 className="font-semibold text-xl flex flex-row justify-center items-center text-center content-center gap-2">
            <div className="flex justify-center items-center text-center border-2 border-orange-300 text-black p-3 font-semibold text-xl rounded-full w-fit h-10">
                Meal Master
            </div>
          </h2> */}
        </div>
        <li
          className={`right-0 sticky flex flex-row pr-10 items-center gap-5 ${
            recipesOpen ? "invisible" : ""
          }`}
        >
          <ClipboardDocumentCheckIcon
            className="size-10 rounded-xl hidden sm:block hover:bg-gray-100 hover:cursor-pointer p-2"
            onClick={handleRecipes}
          />
          <div className="relative">
            <UserIcon
              className="size-10 rounded-xl hover:bg-gray-100 hover:cursor-pointer p-2"
              onClick={(e) => {
                e.stopPropagation();
                toggleDropDown();
              }}
            />
            <UserMenu isOpen={dropDownOpen} toggleDropDown={toggleDropDown} />
          </div>
        </li>
      </ul>
    </nav>
  );
}
