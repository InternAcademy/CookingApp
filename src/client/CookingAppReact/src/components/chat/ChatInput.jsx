import { PaperClipIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { userActions } from "../../store/userSlice";
import { useEffect, useState } from "react";
import { getToken } from "../../msal/msal";
import { useDispatch, useSelector } from "react-redux";
import useChat from "../../hooks/useChat";
import { uiActions } from "../../store/uiSlice";
import toast from "react-hot-toast";
import { useRef } from "react";
export default function ChatInput() {
  const input = useSelector((state) => state.ui.input);
  const fileAttacher = useRef();
  const selectedChat = useSelector((state) => state.user.selectedChat);
  const role = useSelector((state) => state.user.role);
  const { mutate, isPending, error, isError } = useChat();
  const dispatch = useDispatch();
  const [base64Image, setBase64Image] = useState(null);
  useEffect(() => {
    if (role.limitations.chatGeneration === 10) {
      toast(
        (t) => (
          <span>
            <strong>Warning</strong> you have <strong>{10}</strong> messages
            left!
          </span>
        ),
        { position: "bottom-right" }
      );
    }
  }, [role.limitations.chatGeneration]);

  async function handleSubmission() {
    if (input) {
      dispatch(
        userActions.continueChat({
          ...selectedChat,
          content: [
            ...(selectedChat?.content || []),
            { type: "Text", role: "user", content: input },
          ],
        })
      );

      const token = await getToken();
      mutate({
        token: token,
        chatId: selectedChat ? selectedChat.id : null,
        type: "Text",
        content: input,
      });
      if (role.type === "Free") {
        dispatch(userActions.reduceChatGeneration());
      }
    }
  }

  function handleChange(event) {
    if (event.key === "Enter") {
      handleSubmission();
    }
    dispatch(uiActions.setInput(event.target.value));
  }
  function handleClick() {
    fileAttacher.current.click();
  }
  function handleImageAttachment(event) {
    const file = event.target.files[0];
    console.log(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
  useEffect(() => {
    if (base64Image) {
      async function sendMessage() {
        const token = await getToken();
        dispatch(
          userActions.continueChat({
            ...selectedChat,
            content: [
              ...(selectedChat?.content || []),
              { role: "user", type: "Image", content: base64Image },
            ],
          })
        );
        dispatch(uiActions.setResponseError(null));
        mutate({
          token: token,
          chatId: selectedChat && selectedChat.id,
          type: "Image",
          content: base64Image,
        });
      }
      sendMessage();
      console.log(base64Image);
    }
  }, [base64Image]);

  return (
    <section className="flex items-center justify-center mb-5 w-full">
      <ul className="flex w-4/5 md:w-3/5 lg:w-2/5 items-center bg-gray-200 rounded-full gap-2  py-2 px-4">
        <li>
          <input
            type="file"
            hidden
            accept="image/*"
            ref={fileAttacher}
            onChange={(event) => handleImageAttachment(event)}
          />
          <PaperClipIcon
            className="size-6 cursor-pointer"
            onClick={handleClick}
          />
        </li>
        <li className="w-full">
          <input
            type="text"
            value={input}
            placeholder="What do you want to cook today?"
            onKeyDown={handleChange}
            onChange={handleChange}
            className="w-full outline-none bg-gray-200 text-black placeholder-black"
          />
        </li>
        <li>
          <PaperAirplaneIcon
            className={`size-10 rounded-xl p-2 duration-200 ${
              input.length > 0 ? "bg-orange-300" : ""
            } cursor-pointer`}
            onClick={handleSubmission}
          />
        </li>
      </ul>
    </section>
  );
}
