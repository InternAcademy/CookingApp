import { useSelector } from "react-redux";
import useStripeProduct from "@/hooks/useStripeProduct";
import useStripeSession from "@/hooks/useStripeSession";
import { getToken } from "@/msal/msal";
import { jwtDecode } from "jwt-decode";
import stripe from "../../assets/by-stripe.png";
import { FireIcon } from "@heroicons/react/24/outline";
import cookingsImage1 from "../../assets/plans/cartoon-chef.jpg";
import cookingsImage2 from "../../assets/plans/animated-girl.jpg";
import cookingsImage3 from "../../assets/plans/animated-female.jpg";
import cookingsImage4 from "../../assets/plans/femalechef.jpg";
import cookingsImage5 from "../../assets/cookings.png";
import plans1 from "../../assets/plans/untitled6.png";
import plans2 from "../../assets/plans/untitled7.png";
import plans3 from "../../assets/plans/untitled5.png";
import SubscriptionDetails from "../subscribtion/SubscriptionDetails";

const subscriptionId = import.meta.env.VITE_STRIPE_SUBSCRIPTION_ID;
const basicPackId = import.meta.env.VITE_STRIPE_BASIC_PACK_ID;
const valuePackId = import.meta.env.VITE_STRIPE_VALUE_PACK_ID;
const proPackId = import.meta.env.VITE_STRIPE_PRO_PACK_ID;

export default function Store() {
  const isOpenRecipes = useSelector((state) => state.ui.recipesOpen);
  const isOpenSideBar = useSelector((state) => state.ui.sidebarOpen);
  const role = useSelector((state) => state.user.role.type);
  const { subscribe, payOneTime } = useStripeSession();

  async function handleClick() {
    const token = await getToken();
    const decodedToken = jwtDecode(token);
    subscribe({
      token,
      email: decodedToken.preferred_username,
      priceId: subscriptionId,
    });
  }
  async function buyThisPack(id) {
    console.log("id " + id);
    const token = await getToken();
    const decodedToken = jwtDecode(token);
    payOneTime({
      token,
      email: decodedToken.preferred_username,
      priceId: id,
    });
  }
  console.log(subscriptionId);
  console.log(basicPackId);
  console.log(valuePackId);
  console.log(proPackId);
  return (
    <div className="flex flex-col w-full h-full justify-start content-start items-start bg-secondary px-10 text-primaryText overflow-y-auto">
      <div className="w-full flex flex-col justify-center items-center text-center mt-2 text-primaryText">
        <div className="text-4xl font-bold text-center flex flex-col md:flex-row justify-center items-center">
          <div>Meal Master</div>
          <div className="bg-gradient-to-l from-orange-500 to-pink-400 px-2 pb-1 ml-2 rounded-2xl text-white">
            Store
          </div>
        </div>

        <div className="flex flex-col justify-center items-center text-center mb-20 text-primaryText">
          <div
            className={`flex gap-5 md:gap-2 mt-20 mb-5 ${
              isOpenSideBar || isOpenRecipes
                ? "flex-col lg:flex-row"
                : "flex-col md:flex-row"
            }`}
          >
            <div className="flex flex-row justify-center items-center text-center text-primaryText">
              <div className="max-w-sm bg-secondary border-2 border-primaryBorder rounded-lg shadow">
                <a href="#">
                  <img className="rounded-t-lg" src={plans3} alt="" />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-primaryText">
                      Starter Pack
                    </h5>
                    <h5 className="mb-2 text-lg tracking-tight italic">
                      700 Messages + 10 Meals
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-primaryText">
                    Ideal for light users who want an introduction to the
                    service with essential features.
                  </p>
                  <div className="flex flex-row justify-center items-center text-center text-primaryText">
                    <p className="text-2xl font-bold mr-2 text-primaryText">
                      €6.99
                    </p>
                    <div
                      onClick={() => buyThisPack(basicPackId)}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center hover:cursor-pointer text-white bg-black rounded-lg hover:bg-gradient-to-l from-orange-500 to-pink-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Get now
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center text-center gap-10 text-primaryText">
              <div className="max-w-sm bg-secondary rounded-lg shadow border-4 border-primary">
                <a href="#">
                  <img className="rounded-t" src={plans1} alt="" />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-primaryText">
                      Value Pack
                    </h5>
                    <h5 className="mb-2 text-lg tracking-tight italic">
                      1,500 Messages + 25 Meals
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-primaryText">
                    Best suited for regular users looking for a balance between
                    messages and meal options.
                  </p>
                  <div className="flex flex-row justify-center items-center text-center text-primaryText">
                    <a className="text-2xl font-bold mr-2 text-primaryText">
                      €11.99
                    </a>
                    <div
                      onClick={() => buyThisPack(valuePackId)}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center hover:cursor-pointer text-white bg-gradient-to-l from-orange-500 to-pink-400 rounded-lg hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Get now
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center text-center gap-10 text-primaryText">
              <div className="max-w-sm bg-secondary border-2 border-primaryBorder rounded-lg shadow">
                <a href="#">
                  <img className="rounded-t-lg" src={plans2} alt="" />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-primaryText">
                      Pro Pack
                    </h5>
                    <h5 className="mb-2 text-lg tracking-tight italic">
                      3,500 Messages + 50 Meals
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-primaryText">
                    Perfect for frequent users who want more messages and meals
                    at a great value.
                  </p>
                  <div className="flex flex-row justify-center items-center text-center text-primaryText">
                    <a className="text-2xl font-bold mr-2 text-primaryText">
                      €19.99
                    </a>
                    <div
                      onClick={() => buyThisPack(proPackId)}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white hover:cursor-pointer bg-black rounded-lg hover:bg-gradient-to-l from-orange-500 to-pink-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Get now
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-start content-start items-center flex-row">
            <div
              className={`w-1/2 overflow-hidden lg:p-10 h-[32rem] justify-center items-center ${
                isOpenSideBar || isOpenRecipes
                  ? "hidden lg:flex"
                  : "hidden md:flex"
              }`}
            >
              <img
                className="border h-full border-gray-200 rounded-lg shadow"
                src={cookingsImage5}
                alt=""
              />
            </div>
            {role && role === "Basic" ? (
              <div
                className={`p-10 h-[32rem] ${
                  isOpenSideBar || isOpenRecipes
                    ? "w-full lg:w-1/2"
                    : "w-full md:w-1/2"
                }`}
              >
                <ul className="flex flex-col justify-center content-center items-start gap-5 ">
                  <li className="text-4xl font-bold">
                    Explore our subscription plan:
                  </li>
                  <li>
                    <div
                      className="bg-primary primaryText p-2 uppercase font-bold rounded-xl w-fit 
                            flex flex-row justify-center items-center text-center bg-gradient-to-l from-orange-500 to-pink-400 text-white
                            hover:rounded-ss-none hover:rounded-ee-none transition-all duration-100"
                    >
                      <FireIcon className="size-7 mr-1" /> Hot offer
                    </div>
                  </li>
                  <li className="text-xl font-semibold border-b-2 border-transparent hover:border-b-2 ">
                    • Unlimited messages
                  </li>
                  <li className="text-xl font-semibold border-b-2 border-transparent hover:border-b-2 ">
                    • Unlimited chats
                  </li>
                  <li className="text-xl font-semibold border-b-2 border-transparent hover:border-b-2 ">
                    • 30 Meals
                  </li>
                  <li className="text-xl font-semibold border-b-2 border-transparent hover:border-b-2 ">
                    • Customizable dietary options
                  </li>
                  <li className="text-xl font-semibold border-b-2 border-transparent hover:border-b-2 ">
                    • Free cancellation
                  </li>
                </ul>
                <div className="flex flex-row items-center justify-evenly text-center mt-10 max-w-[32rem]">
                  <button
                    className="text-white bg-black hover:bg-gradient-to-l from-orange-500 to-pink-400 py-3 font-bold rounded-xl w-full border-2 border-transparent shadow-md transition-all duration-300 ease-in-out"
                    onClick={handleClick}
                  >
                    <div className="font-semibold text-xl flex flex-row items-center justify-center text-center">
                      Subscribe <span className="mx-2">•</span>{" "}
                      <span className="flex items-center">€14.99/month</span>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <SubscriptionDetails />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
