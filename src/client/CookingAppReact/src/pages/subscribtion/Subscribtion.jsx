import { SubscriptionPlanPremium } from "@/components/subscriptions/SubscriptionPlanPremium";
import { SubscriptionPlanFree } from "@/components/subscriptions/SubscriptionPlanFree";
import { useSelector } from "react-redux";
import MealMaster from "/public/meal-master.png";
import { CheckIcon } from '@heroicons/react/24/outline';
import { CurrencyEuroIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon } from "@heroicons/react/24/outline";

export default function Subscribtion() {
  const isOpenRecipes = useSelector((state) => state.ui.recipesOpen);
  const isOpenSideBar = useSelector((state) => state.ui.sidebarOpen);
  return (
    <div className="flex flex-col lg:flex-row w-full h-full justify-start content-start items-start bg-orange-50 px-10 lg:pl-40">
        <div className="flex w-full justify-center content-start items-start flex-col h-full">
            <div>
                <ul className="flex flex-col justify-center content-center items-start gap-5">
                    <li className="text-4xl font-bold">Explore our subscribtion plan:</li>
                    <li>
                        <div className="bg-orange-400 text-black text-center p-2 uppercase font-bold rounded-xl w-fit">
                                Hot offer
                        </div>
                    </li>
                    <li className="text-xl font-semibold">• Unlimited messages</li>
                    <li className="text-xl font-semibold">• Unlimited chats</li>
                    <li className="text-xl font-semibold">• More than enough recipies</li>
                    <li className="text-xl font-semibold">• Customizable dietary options</li>
                    <li className="text-xl font-semibold">• Free cancellation</li>
                </ul>
                <button className="text-white bg-black py-3 font-bold rounded-xl w-full mt-10">
                    <div className=' font-semibold text-xl flex flex-row items-center justify-center text-center'>
                        Pay <CurrencyEuroIcon className="size-6 ml-2" />8.99
                    </div>
                </button>
                <div className="w-full flex justify-center items-center text-center mt-2 text-sm">Stripe checkout <LockClosedIcon className="size-4 ml-2"/></div>
            </div>
        </div>
    </div>
  );    
}
