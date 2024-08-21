import React from "react";
import MealMaster from "/public/logo-master.png";
import { CheckIcon } from "@heroicons/react/24/outline";

export const SubscriptionPlanPremium = () => {
  return (
    <div className="bg-slate-50 p-2 border border-primaryBorder rounded-2xl w-[25rem] h-[32rem] flex flex-col justify-between items-center ml-20">
      <div className="bg-primary primaryText text-center p-2 w-full uppercase font-bold rounded-xl">
        Unlimited
      </div>
      <div className="flex flex-col w-full justify-start items-center">
        <p className="mt-2 text-gray-700 text-sm">
          For those who want to live healthy and meaningfully.
        </p>
        <img src={MealMaster} alt="" width={100} className="rounded-2xl" />

        <ul className="mt-4 text-gray-600">
          <li className="flex flex-row text-center justify-start items-center">
            <CheckIcon className="size-5 font-bold text-green mr-2" /> Unlimited
            messages
          </li>
          <li className="flex flex-row text-center justify-start items-center">
            <CheckIcon className="size-5 font-bold text-green mr-2" /> Unlimited
            chats
          </li>
          <li className="flex flex-row text-center justify-start items-center">
            <CheckIcon className="size-5 font-bold text-green mr-2" /> Recipe
            Generation
          </li>
          <li className="flex flex-row text-center justify-start items-center">
            <CheckIcon className="size-5 font-bold text-green mr-2" />{" "}
            Customizable dietary options
          </li>
          <li className="flex flex-row text-center justify-start items-center">
            <CheckIcon className="size-5 font-bold text-green mr-2" /> Free
            cancellation
          </li>
        </ul>
      </div>
      <div className="mt-4 flex justify-between items-center border border-primaryBorder p-3 rounded">
        <span className="text-red-500 font-bold">8.99 euro/month</span>
      </div>
      <p className="text-xs text-gray-800 text-center mt-1">
        Old price: 12.99$
      </p>
      <button className="w-full primaryText active py-3 mt-6 font-bold rounded-xl">
        Start a subscribtion
      </button>
    </div>
  );
};
