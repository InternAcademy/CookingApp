import React from "react";
import MealMaster from "/public/logo-master.png";
import { CheckIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";

export const SubscriptionPlanFree = () => {
  return (
    <div className="bg-white p-2 border rounded-2xl w-[20rem] h-[32rem] flex flex-col justify-between items-center">
      <div className="active primaryText text-center p-2 w-full uppercase font-bold rounded-xl">
        Free
      </div>
      <div className="flex flex-col w-full justify-start items-center">
        <p className="mt-2 text-gray-700 text-sm">
          For those who need to make sure they want to be masters.
        </p>
        <img src={MealMaster} alt="" width={100} className="rounded-2xl" />
        <ul className="mt-4 text-gray-600">
          <li className="flex flex-row text-center justify-start items-center">
            <CheckIcon className="size-5 font-bold text-green mr-2" /> Little
            amount of messages
          </li>
          <li className="flex flex-row text-center justify-start items-center">
            <CheckIcon className="size-5 font-bold text-green mr-2" /> Image
            recognition
          </li>
          <li className="flex flex-row text-center justify-start items-center">
            <XMarkIcon className="size-5 font-bold text-red-500 mr-2" /> Dietary
            Preferences
          </li>
          <li className="flex flex-row text-center justify-start items-center">
            <XMarkIcon className="size-5 font-bold text-red-500 mr-2" /> Recipe
            Generation
          </li>
        </ul>
      </div>
      <div className="mt-4 flex justify-between items-center border p-3 rounded">
        <span className="text-gray-400 font-bold">Limited Test Period</span>
      </div>
      <p className="text-xs text-gray-800 text-center mt-1">Not featured</p>
      <button className="w-full text-gray-500 bg-base py-3 mt-6 font-bold rounded-xl cursor-default">
        Current Plan
      </button>
    </div>
  );
};
