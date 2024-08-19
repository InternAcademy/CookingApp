import { useSelector } from "react-redux";
import stripe from "../../assets/by-stripe.png";
import { FireIcon } from "@heroicons/react/24/outline";

export default function SubscribtionDetails() {
  const isOpenRecipes = useSelector((state) => state.ui.recipesOpen);
  const isOpenSideBar = useSelector((state) => state.ui.sidebarOpen);

  return (
    <div className="flex flex-col lg:flex-row w-full h-full justify-start content-start items-start bg-orange-50 px-10 lg:pl-40">
        <div className="flex w-full justify-center content-start items-start flex-col h-full">
          <div>
            <ul className="flex flex-col justify-center content-center items-start gap-5 selection:bg-orange-400">
              <li className="text-4xl font-bold">
                Your subscription plan:
              </li>
              <li>
                <div className="bg-orange-400 text-black p-2 uppercase font-bold rounded-xl w-fit 
                flex flex-row justify-center items-center text-center selection:bg-white
                hover:rounded-ss-none hover:rounded-ee-none transition-all duration-100">
                  Premium
                </div>
              </li>
              <li className="text-xl font-semibold border-b-2 border-transparent hover:border-b-2 hover:border-orange-400 selection:bg-orange-400">• Unlimited messages</li>
              <li className="text-xl font-semibold border-b-2 border-transparent hover:border-b-2 hover:border-orange-400 selection:bg-orange-400">• Unlimited chats</li>
              <li className="text-xl font-semibold border-b-2 border-transparent hover:border-b-2 hover:border-orange-400 selection:bg-orange-400">
                • More than enough recipies
              </li>
              <li className="text-xl font-semibold border-b-2 border-transparent hover:border-b-2 hover:border-orange-400 selection:bg-orange-400">
                • Customizable dietary options
              </li>
              <li className="text-xl font-semibold border-b-2 border-transparent hover:border-b-2 hover:border-orange-400 selection:bg-orange-400">• Free cancellation</li>
            </ul>
            <button
              className="text-white bg-black py-3 font-bold rounded-xl w-full mt-10 border-2 border-transparent hover:border-gray-300 shadow-md hover:rounded-ss-none hover:rounded-ee-none transition-all duration-100"
            >
              <div className=" font-semibold text-xl flex flex-row items-center justify-center text-center selection:bg-orange-400">
                Cancel Subscribtion
              </div>
            </button>
            <div className="w-full flex justify-center items-center text-center mt-2 text-base selection:bg-orange-400">
              <img className="w-28 mr-1" src={stripe} alt="stripe" />
            </div>
          </div>
        </div>
    </div>
  );
}
