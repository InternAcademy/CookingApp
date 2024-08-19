import { useSelector } from "react-redux";
import stripe from "../../assets/by-stripe.png";
import { FireIcon } from "@heroicons/react/24/outline";
import useMySubscription from "@/hooks/useMySubscription";
import useCancelSub from "@/hooks/useCancelSub";
import { getToken } from "@/msal/msal";

export default function SubscriptionDetails() {
  const isOpenRecipes = useSelector((state) => state.ui.recipesOpen);
  const isOpenSideBar = useSelector((state) => state.ui.sidebarOpen);
  const { data, isPending, refetch } = useMySubscription();
  const { mutate } = useCancelSub({ refetchFn: refetch });

  async function handleCancellation() {
    const token = await getToken();
    mutate({ token: token, subscriptionId: data.subscriptions[0].id });
  }
  return (
    <div className="flex flex-col lg:flex-row w-full h-full justify-start content-start items-start px-10 lg:pl-40 text-primaryText">
      <div className="flex w-full justify-center content-start items-start flex-col h-full">
        <div>
          {data && !isPending && (
            <>
              <ul className="flex flex-col justify-center content-center items-start gap-5 selection:bg-orange-400">
                <li className="text-4xl font-bold">Your subscription plan:</li>

                <li>
                  <div
                    className="bg-orange-400 primaryText p-2 uppercase font-bold rounded-xl w-fit 
                flex flex-row justify-center items-center text-center selection:bg-secondary
                hover:rounded-ss-none hover:rounded-ee-none transition-all duration-100"
                  >
                    Premium
                  </div>
                  <li className="text-xl font-semibold border-b-2 border-transparent hover:border-b-2 hover:border-orange-400 selection:bg-orange-400">
                    {data.subscriptions[0].price}€ a month
                  </li>
                </li>
                <li className="text-xl font-semibold border-b-2 border-transparent hover:border-b-2 hover:border-orange-400 selection:bg-orange-400">
                  {`Created at ${data.subscriptions[0].created}`}
                </li>

                {data.subscriptions[0].cancelAt ? (
                  <li className="text-xl font-semibold border-b-2 border-transparent hover:border-b-2 hover:border-orange-400 selection:bg-orange-400">
                    {`Your subscription has been cancelled and it will expire on ${data.subscriptions[0].cancelAt}`}
                  </li>
                ) : (
                  <li className="text-xl font-semibold border-b-2 border-transparent hover:border-b-2 hover:border-orange-400 selection:bg-orange-400">
                    {`Your next charge will be on ${data.subscriptions[0].currentPeriodEnd}`}
                  </li>
                )}

                <li className="text-xl font-semibold border-b-2 border-transparent hover:border-b-2 hover:border-orange-400 selection:bg-orange-400">
                  • Free cancellation
                </li>
              </ul>
              <button
                className={`text-white bg-black ${
                  data.subscriptions[0].cancelAt ? "opacity-40" : "opacity-100"
                } py-3 font-bold rounded-xl w-full mt-10 border-2 border-transparent hover:border-gray-300 shadow-md hover:rounded-ss-none hover:rounded-ee-none transition-all duration-100`}
                disabled={data.subscriptions[0].cancelAt ? true : false}
                onClick={handleCancellation}
              >
                Cancel Subscription
              </button>
              <div className="w-full flex justify-center items-center text-center mt-2 text-base selection:bg-orange-400">
                <img className="w-28 mr-1" src={stripe} alt="stripe" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
