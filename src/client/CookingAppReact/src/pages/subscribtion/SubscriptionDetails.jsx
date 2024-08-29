import { useDispatch, useSelector } from "react-redux";
import stripe from "../../assets/by-stripe.png";
import { FireIcon } from "@heroicons/react/24/outline";
import useMySubscription from "@/hooks/useMySubscription";
import useCancelSub from "@/hooks/useCancelSub";
import { getToken } from "@/msal/msal";
import { uiActions } from "@/store/uiSlice";

export default function SubscriptionDetails() {
  const { data, isPending, refetch } = useMySubscription();
  const dispatch = useDispatch();
  async function handleCancellation() {
    dispatch(uiActions.openSubCancelModal(data.subscriptions[0].id));
  }

  function formatDateIso(dateString) {
    const date = new Date(dateString);

    // Define options for formatting the date
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Use 12-hour time format
    };

    // Format the date according to the user's local timezone
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  return (
    <div className="flex flex-col lg:flex-row w-full h-full justify-start content-start items-start px-10 lg:pl-40 text-primaryText">
      <div className="flex w-full justify-center content-start items-start flex-col h-full">
        <div>
          {data && !isPending && (
            <>
              <ul className="flex flex-col justify-center content-center items-start gap-5">
                <li className="text-4xl font-bold">Your subscription plan:</li>

                <li>
                  <div
                    className="bg-orange-400 primaryText p-2 uppercase font-bold rounded-xl w-fit 
                flex flex-row justify-center items-center text-center selection:bg-secondary
                hover:rounded-ss-none hover:rounded-ee-none transition-all duration-100"
                  >
                    Premium
                  </div>
                  <li className="text-xl font-semibold border-b-2 border-transparent hover:border-b-2">
                    {data.subscriptions[0].price}€ a month
                  </li>
                </li>
                <li className="text-xl font-semibold border-b-2 border-transparent hover:border-b-2">
                  {`Created on ${formatDateIso(data.subscriptions[0].created)}`}
                </li>

                {data.subscriptions[0].cancelAt ? (
                  <li className="text-xl font-semibold border-b-2 border-transparent hover:border-b-2">
                    {`Your subscription has been cancelled and it will expire on ${formatDateIso(
                      data.subscriptions[0].cancelAt
                    )}`}
                  </li>
                ) : (
                  <li className="text-xl font-semibold border-b-2 border-transparent hover:border-b-2">
                    {`Your next charge will be on ${formatDateIso(
                      data.subscriptions[0].currentPeriodEnd
                    )}`}
                  </li>
                )}
              </ul>
              <button
                className={`text-white bg-black ${
                  data.subscriptions[0].cancelAt ? "opacity-40" : "opacity-100"
                } py-3 font-bold rounded-xl w-full mt-10 border-2 border-transparent hover:border-active shadow-md hover:rounded-ss-none hover:rounded-ee-none transition-all duration-100`}
                disabled={data.subscriptions[0].cancelAt ? true : false}
                onClick={handleCancellation}
              >
                {data.subscriptions[0].cancelAt
                  ? "Cancelled"
                  : " Cancel Subscription"}
              </button>
              <div className="w-full flex justify-center items-center text-center mt-2 text-base">
                <img className="w-28 mr-1" src={stripe} alt="stripe" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
