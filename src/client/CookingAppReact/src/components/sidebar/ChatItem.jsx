import useDeleteChat from "@/hooks/useDeleteChat";
import { getToken } from "@/msal/msal";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

export default function ChatItem({ title, id }) {
  const activeChat = useSelector((state) => state.ui.activeChat);
  const { mutate, isPending } = useDeleteChat();

  async function handleDeletion() {
    const token = await getToken();
    mutate({ token, chatId: id });
  }
  return (
    <div
      className={`rounded-lg h-10 my-5  hover:bg-gray-300 ${
        activeChat && activeChat === id ? "bg-orange-200" : "bg-transparent"
      } hover:cursor-pointer flex flex-row justify-between items-center text-center group transition-colors duration-1000"`}
    >
      <h5 className="px-5 py-2 whitespace-nowrap hover:text-ellipsis overflow-hidden">
        {title}
      </h5>
      <TrashIcon
        className="ml-1 mr-5 size-6 text-gray-600 hidden group-hover:inline-block"
        onClick={handleDeletion}
      />
    </div>
  );
}
