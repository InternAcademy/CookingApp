import { useDispatch, useSelector } from "react-redux";
import stripe from "../../assets/by-stripe.png";
import { FireIcon } from "@heroicons/react/24/outline";
import useMySubscription from "@/hooks/useMySubscription";
import useCancelSub from "@/hooks/useCancelSub";
import { getToken } from "@/msal/msal";
import { uiActions } from "@/store/uiSlice";
import { useTranslation } from "react-i18next";

export default function SubscriptionDetails() {
  const { data, isPending, refetch } = useMySubscription();
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
      hour12: true, // Use 12-hour time format
    };

    // Format the date according to the user's local timezone
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  return (
    <div className="flex w-full justify-center p-10 h-[32rem]  lg:w-1/2 flex-col ">
      <div>
        {data && !isPending && (
          <>
            <ul className="flex flex-col justify-center content-center items-start gap-5">
              <li className="text-4xl font-bold">{t("Yourubscription")}</li>

              <li>
                <div
                  className="bg-orange-400 primaryText p-2 uppercase font-bold rounded-xl w-fit 
                flex flex-row justify-center items-center text-center selection:bg-secondary
                hover:rounded-ss-none hover:rounded-ee-none transition-all duration-100"
                >
                  {t("Premium")}
                </div>
                <li className="text-xl font-semibold border-b-2 border-transparent hover:border-b-2">
                  {data.subscriptions[0].price}{t("eamonth")}
                </li>
              </li>
              <li className="text-xl font-semibold text-start border-b-2 border-transparent hover:border-b-2">
                {`${t("Createdon")} ${formatDateIso(data.subscriptions[0].created)}`}
              </li>

              {data.subscriptions[0].cancelAt ? (
                <li className="text-xl font-semibold text-start border-b-2 border-transparent hover:border-b-2">
                  {`${t("Yoursubscriptionhasbeen")}${formatDateIso(
                    data.subscriptions[0].cancelAt
                  )}`}
                </li>
              ) : (
                <li className="text-xl font-semibold text-start border-b-2 border-transparent hover:border-b-2">
                  {`${t("Yournextchargewillbeon")}${formatDateIso(
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
                ? t("Cancelled")
                : t("CancelSubscription")}
            </button>
            <div className="w-full flex justify-center items-center text-center mt-2 text-base">
              <img className="w-28 mr-1" src={stripe} alt="stripe" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
