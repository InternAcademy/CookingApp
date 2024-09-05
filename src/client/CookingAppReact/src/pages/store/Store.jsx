import { useSelector } from "react-redux";
import useStripeProduct from "@/hooks/useStripeProduct";
import useStripeSession from "@/hooks/useStripeSession";
import { getToken } from "@/msal/msal";
import { jwtDecode } from "jwt-decode";
import stripe from "../../assets/by-stripe.png";
import { FireIcon } from "@heroicons/react/24/outline";
import cookingsImage from "../../assets/cookings.png";
import plans1 from "../../assets/plans/untitled6.png";
import plans2 from "../../assets/plans/untitled7.png";
import plans3 from "../../assets/plans/untitled5.png";

export default function Store() {
  const isOpenRecipes = useSelector((state) => state.ui.recipesOpen);
  const isOpenSideBar = useSelector((state) => state.ui.sidebarOpen);
  const { data: priceIds, isPending, isError, error } = useStripeProduct();
  const { mutate } = useStripeSession();
  async function handleClick() {
    const token = await getToken();
    const decodedToken = jwtDecode(token);
    mutate({
      token,
      email: decodedToken.preferred_username,
      priceId: priceIds.data[0],
    });
  }
  return (
    <div className="flex flex-col w-full h-full justify-start content-start items-start bg-secondary px-10 text-primaryText overflow-y-auto">
        <div className="w-full flex flex-col justify-center items-center text-center mt-2 text-primaryText">
            <h1 className="text-4xl font-bold">
                Meal Master <span className="bg-gradient-to-l from-orange-500 to-pink-400 px-2 rounded-2xl text-white">Store</span>
            </h1>
            <div className=" flex flex-row gap-2">
                <div className="flex flex-row justify-center items-center text-center mt-20 mb-20 gap-10 text-primaryText">
                    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img class="rounded-t-lg" src={plans3} alt="" />
                        </a>
                        <div class="p-5">
                            <a href="#">
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Starter Pack: 100 Messages + 5 Meals</h5>
                            </a>
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                            <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Buy now
                                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-center items-center text-center mt-20 mb-20 gap-10 text-primaryText">
                    <div class="max-w-sm bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 border-4 border-pink-500">
                        <a href="#">
                            <img class="rounded-t-lg" src={plans1} alt="" />
                        </a>
                        <div class="p-5">
                            <a href="#">
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Value Pack: 800 Messages + 15 Meals</h5>
                            </a>
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                            <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gradient-to-l from-orange-500 to-pink-400 px-2 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Buy now
                                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-center items-center text-center mt-20 mb-20 gap-10 text-primaryText">
                    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img class="rounded-t-lg" src={plans2} alt="" />
                        </a>
                        <div class="p-5">
                            <a href="#">
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Pro Pack: 3,000 Messages + 45 Meals</h5>
                            </a>
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                            <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Buy now
                                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {priceIds && (
        <div className="flex w-full justify-start content-start items-center flex-row">
            <div className="w-2/5 overflow-hidden pl-40">
                <img className="rounded-2xl shadow-xl border-2 border-primaryBorder" src={cookingsImage} alt="" />
            </div>
            <div className="w-1/2 p-20">
                <ul className="flex flex-col justify-center content-center items-start gap-5 selection:bg-primary">
                <li className="text-4xl font-bold">
                    Explore our subscription plan:
                </li>
                <li>
                    <div
                    className="bg-primary primaryText p-2 uppercase font-bold rounded-xl w-fit 
                    flex flex-row justify-center items-center text-center selection:bg-secondary
                    hover:rounded-ss-none hover:rounded-ee-none transition-all duration-100"
                    >
                    <FireIcon className="size-7 mr-1" /> Hot offer
                    </div>
                </li>
                <li className="text-xl font-semibold border-b-2 border-transparent hover:border-b-2 selection:bg-primary">
                    • Unlimited messages
                </li>
                <li className="text-xl font-semibold border-b-2 border-transparent hover:border-b-2 selection:bg-primary">
                    • Unlimited chats
                </li>
                <li className="text-xl font-semibold border-b-2 border-transparent hover:border-b-2 selection:bg-primary">
                    • More than enough recipies
                </li>
                <li className="text-xl font-semibold border-b-2 border-transparent hover:border-b-2 selection:bg-primary">
                    • Customizable dietary options
                </li>
                <li className="text-xl font-semibold border-b-2 border-transparent hover:border-b-2 selection:bg-primary">
                    • Free cancellation
                </li>
                </ul>
                <button
                className="text-white bg-gradient-to-l from-orange-500 to-pink-400 py-3 font-bold rounded-xl w-full mt-10 border-2 border-transparent hover:border-active shadow-md hover:rounded-ss-none hover:rounded-ee-none transition-all duration-100"
                onClick={handleClick}
                >
                <div className=" font-semibold text-xl flex flex-row items-center justify-center text-center selection:bg-primary ">
                    Subscribe
                </div>
                </button>
                <div className="w-full flex justify-center items-center text-center mt-2 text-base selection:bg-primary">
                <img className="w-28 mr-1" src={stripe} alt="stripe" />
                </div>
            </div>
            </div>
        )}
        </div>
    </div>
  );
}
