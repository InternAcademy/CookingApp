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
import Tooltip from "../ui/tooltip";
import { useTranslation } from "react-i18next";

export default function ChatInput() {
  const input = useSelector((state) => state.ui.input);
  const fileAttacher = useRef();
  const selectedChat = useSelector((state) => state.user.selectedChat);
  const isInitial = useSelector((state) => state.ui.isMessageWarningShowed);
  const role = useSelector((state) => state.user.role);
  const { mutate, isPending, error, isError } = useChat();
  const isOpenRecipes = useSelector((state) => state.ui.recipesOpen);
  const isOpenSideBar = useSelector((state) => state.ui.sidebarOpen);
  const dispatch = useDispatch();
  const [base64Image, setBase64Image] = useState(null);
  const [maxChars] = useState(200);
  const { t } = useTranslation();

  useEffect(() => {
    if (role.limitations.chatGeneration === 10 && !isInitial) {
      toast(
        (t) => (
          <span>
            <strong>Warning</strong> you have <strong>{10}</strong> messages
            left!
          </span>
        ),
        { position: "bottom-right" }
      );
      dispatch(uiActions.setIsShown(true));
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

    if (file) {
      console.log(file);
      if (file.size > 2000000) {
        toast.error("Maximum image size exceeded");
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          setBase64Image(reader.result);
        };
        reader.readAsDataURL(file);
      }
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
    }
  }, [base64Image]);

  return (
    <section className="flex flex-col items-center justify-center mb-5 w-full gap-1 ">
      <ul
        className={`flex 
      ${
        isOpenRecipes || isOpenSideBar
          ? "w-4/5 md:w-4/5 lg:w-3/5 xl:w-3/5"
          : "w-4/5 md:w-3/5 xl:w-2/5"
      }
       items-center secondary rounded-full gap-2  py-2 px-4 bg-active text-primaryText`}
      >
        <Tooltip tooltipText="Attach Image">
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
        </Tooltip>
        <li className="w-full">
          <input
            type="text"
            value={input}
            placeholder={t("WhatToCook")}
            onKeyDown={handleChange}
            onChange={handleChange}
            maxLength={maxChars}
            className="w-full outline-none bg-active text-primaryText"
          />
        </li>
        <p className="text-sm text-right text-primaryText">
          {maxChars - input.length}/200
        </p>

        <Tooltip tooltipText="Send">
          <li>
            <PaperAirplaneIcon
              className={`size-10 rounded-xl p-2 duration-200 ${
                input.length > 0 ? "bg-orange-300" : ""
              } cursor-pointer`}
              onClick={handleSubmission}
            />
          </li>
        </Tooltip>
      </ul>
      <p className="hidden md:inline text-sm opacity-80 text-primaryText">
        {t("chatwarn")}
      </p>
    </section>
  );
}
