import { uiActions } from "@/store/uiSlice";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";

export default function ChatItem({ title, id }) {
  const activeChat = useSelector((state) => state.ui.activeChat);
  const dispatch = useDispatch();
  async function handleDeletion() {
    dispatch(uiActions.openChatDeletionModal(id));
  }
  return (
    <div
      className={`rounded-lg h-10 my-5 ${
        activeChat && activeChat === id
          ? "bg-active"
          : "hover:bg-active bg-transparent"
      } hover:cursor-pointer flex flex-row justify-between items-center text-center group transition-colors duration-1000"`}
    >
      <h5 className="px-5 text-primaryText py-2 whitespace-nowrap text-ellipsis overflow-hidden">
        {title}
      </h5>
      <TrashIcon
        className="ml-1 mr-5 size-6 text-primaryText hidden group-hover:inline-block"
        onClick={handleDeletion}
      />
    </div>
  );
}
