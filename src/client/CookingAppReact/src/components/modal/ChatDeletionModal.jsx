import { useDispatch } from "react-redux";
import { uiActions } from "@/store/uiSlice";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useDeleteChat from "@/hooks/useDeleteChat";
import { getToken } from "@/msal/msal";
export default function ChatDeletionModal({ chatId }) {
  const dispatch = useDispatch();
  const { mutate, isPending } = useDeleteChat();
  function handleModalClosing() {
    dispatch(uiActions.closeModal());
  }
  async function handleApproval() {
    const token = await getToken();
    mutate({ token: token, chatId: chatId });
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
        <h2>Are you sure you want to delete this chat?</h2>

        <div className="flex justify-end gap-2">
          <button className="bg-" onClick={handleModalClosing}>
            No
          </button>

          <button
            className="bg-red-600 px-3 rounded-lg"
            onClick={handleApproval}
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
