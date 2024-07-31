import { PaperClipIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { userActions } from "../../store/userSlice";
import { useState } from "react";
import { getToken } from "../../msal/msal";
import { useDispatch, useSelector } from "react-redux";
import useChat from "../../hooks/useChat";
import { uiActions } from "../../store/uiSlice";
export default function ChatInput() {
  const input = useSelector((state) => state.ui.input);
  const selectedChat = useSelector((state) => state.user.selectedChat);
  const role = useSelector((state) => state.user.role);
  const { mutate, isPending, error, isError } = useChat();
  const dispatch = useDispatch();
  async function handleSubmission() {
    if (input) {
      dispatch(
        userActions.selectChat({
          ...selectedChat,
          content: [
            ...(selectedChat?.content || []),
            { type: "Text", role: "user", content: input },
          ],
        })
      );
      if (role.type === "Free") {
        dispatch(userActions.reduceChatGeneration());
      }
      const token = await getToken();
      mutate({
        token: token,
        chatId: selectedChat ? selectedChat.id : null,
        type: "Text",
        content: input,
      });
    }
  }

  function handleChange(event) {
    if (event.key === "Enter") {
      handleSubmission();
    }
    dispatch(uiActions.setInput(event.target.value));
  }
  return (
    <section className="flex items-center justify-center mb-5 w-full">
      <ul className="flex w-4/5 md:w-3/5 lg:w-2/5 items-center bg-gray-200 rounded-2xl gap-2  py-2 px-4">
        <li>
          <PaperClipIcon className="size-6" />
        </li>
        <li className="w-full">
          <input
            type="text"
            value={input}
            placeholder="What you wanna cook today?"
            onKeyDown={handleChange}
            onChange={handleChange}
            className="w-full outline-none bg-gray-200 text-black placeholder-black"
          />
        </li>
        <li>
          <PaperAirplaneIcon
            className={`size-10 rounded-xl p-2 duration-200 ${
              input.length > 0 ? "bg-orange-300" : ""
            }`}
            onClick={handleSubmission}
          />
        </li>
      </ul>
    </section>
  );
}
