import { useDispatch } from "react-redux";
import { uiActions } from "@/store/uiSlice";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useCancelSub from "@/hooks/useCancelSub";
import { getToken } from "@/msal/msal";
import { useTranslation } from "react-i18next";

export default function CancellationModal({ subId }) {
  const dispatch = useDispatch();
  const { mutate, isPending } = useCancelSub();
  const { t } = useTranslation();

  function handleModalClosing() {
    dispatch(uiActions.closeModal());
  }
  async function handleApproval() {
    const token = await getToken();
    mutate({ token: token, subscriptionId: subId });
  }
  return (
    <div>
      <div className="flex justify-end pr-3 pt-3">
        <XMarkIcon
          className="size-5 hover:cursor-pointer"
          onClick={handleModalClosing}
        />
      </div>
      <div className="py-5 px-10 flex flex-col gap-10">
        <h2>{t("Areyousureyouwant")}</h2>

        <div className="flex justify-end gap-2">
          <button className="bg-" onClick={handleModalClosing}>
          {t("No")}
          </button>

          <button
            className="bg-red-600 px-3 rounded-lg"
            onClick={handleApproval}
          >
            {isPending ? t("Cancelling") : t("Cancel")}
          </button>
        </div>
      </div>
    </div>
  );
}
