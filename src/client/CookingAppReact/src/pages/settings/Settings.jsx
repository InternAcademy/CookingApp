import Preferences from "@/components/settings/Preferences";
import { UserIcon } from "@heroicons/react/24/outline";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Settings() {
  const isOpenRecipes = useSelector((state) => state.ui.recipesOpen);
  const isOpenSideBar = useSelector((state) => state.ui.sidebarOpen);

  return (
    <div
      className={`flex flex-col w-full py-10 overflow-y-auto
        ${
          isOpenRecipes && isOpenSideBar
            ? "px-10"
            : !isOpenRecipes && !isOpenSideBar
            ? "px-5 sm:px-10 md:px-20 lg:px-40 xl:px-60 2xl:px-80"
            : "px-5 sm:px-10 md:px-10 lg:px-20 xl:px-40 2xl:px-60"
        }`}
    >
      <h1 className="font-semibold text-lg mb-4">Profile</h1>
      <div className="flex flex-row justify-between rounded-2xl border py-5 px-5 items-center shadow-sm bg-gray-50">
        <div className="flex flex-row items-center">
          <UserIcon className="size-10 mr-1" />
          <div>
            <h1 className="font-semibold text-lg text-gray-800">
              David Petkov
            </h1>
            <h2 className="text-gray-500 font-semibold text-sm flex flex-row items-center text-center">
              Copy User Id <ClipboardDocumentIcon className="ml-1 size-5" />
            </h2>
          </div>
        </div>
        <div className="">
          <button className="bg-gray-200 font-semibold border rounded-full py-2 px-5">
            Upload
          </button>
        </div>
      </div>
      <Preferences />
    </div>
  );
}
