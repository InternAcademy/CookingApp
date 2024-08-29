import { useSelector } from "react-redux";
import useStripeProduct from "@/hooks/useStripeProduct";
import useStripeSession from "@/hooks/useStripeSession";
import { getToken } from "@/msal/msal";
import { jwtDecode } from "jwt-decode";
import stripe from "../../assets/by-stripe.png";
import { FireIcon } from "@heroicons/react/24/outline";

export default function Subscription() {
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
    <div className="flex flex-col lg:flex-row w-full h-full justify-start content-start items-start bg-secondary px-10 lg:pl-40 text-primaryText">
      {priceIds && (
        <div className="flex w-full justify-center content-start items-start flex-col h-full">
          <div>
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
              className="text-white bg-black py-3 font-bold rounded-xl w-full mt-10 border-2 border-transparent hover:border-active shadow-md hover:rounded-ss-none hover:rounded-ee-none transition-all duration-100"
              onClick={handleClick}
            >
              <div className=" font-semibold text-xl flex flex-row items-center justify-center text-center selection:bg-primary">
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
  );
}
