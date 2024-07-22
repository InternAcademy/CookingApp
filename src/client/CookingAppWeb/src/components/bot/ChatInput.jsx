// components/ChatInput.jsx
"use client";
import React from "react";
import Image from "next/image";
import { IoCameraOutline } from "react-icons/io5";
import { useTheme } from "next-themes";

import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "@/store/ui-slice";
import { userActions } from "@/store/userSlice";
import useChatMutation from "@/hooks/useChatMutation";

export default function ChatInput({ isPending }) {
  const input = useSelector(state => state.ui.input);
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  const selectedChat = useSelector(state => state.user.selectedChat);
  const { mutate, isPending: isChatPending, isError, error } = useChatMutation();

  const dispatch = useDispatch();

  function handleTyping(event) {
    dispatch(uiActions.setInput(event.target.value));
    console.log(event.target.value);
  }

  async function openGallery() {
    if (!isPending) {
      let result = await window.navigator.mediaDevices.getUserMedia({ video: true });
      console.log(result);
      const uri = result.assets[0].uri;
      const token = await localStorage.getItem("token");
      dispatch(
        userActions.selectChat({
          ...selectedChat,
          content: [...(selectedChat?.content || []), { role: "user", type: "Image", content: uri }]
        })
      );
      dispatch(uiActions.setResponseError(null));
      mutate({
        token: token,
        chatId: selectedChat && selectedChat.id,
        type: "Image",
        content: `data:${result.assets[0].mimeType};base64,${result.assets[0].base64}`
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }
  }

  async function sendMessage() {
    if (input) {
      const token = await localStorage.getItem("token");

      dispatch(
        userActions.selectChat({
          ...selectedChat,
          content: [...(selectedChat?.content || []), { type: "Text", role: "user", content: input }]
        })
      );
      mutate({
        token: token,
        chatId: selectedChat ? selectedChat.id : null,
        type: "Text",
        content: input
      });
    }
    console.log("Send message");
  }

  function handleRemovePhoto() {
    dispatch(uiActions.clearPhotoUri());
    console.log("Remove photo");
  }

  return (
    <div className={`flex w-3/4 flex-col justify-center items-center border ${isDarkTheme ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-amber-50"} rounded-full px-2 mx-1`}>
      <div className="flex w-full flex-row justify-center items-center">
        <button onClick={openGallery} className="p-1" disabled={isPending}>
          <IoCameraOutline size={30} color={isPending ? "gray" : isDarkTheme ? "white" : "orange"} />
        </button>
        <button onClick={openGallery} className="p-1" disabled={isPending}>
          <Image src="/HomeMessageBar/paperClip.png" alt="Paper Clip" width={20} height={20} className={`${isDarkTheme ? "tint-white" : ""} ${isPending ? "tint-gray-400" : ""}`} />
        </button>
        <input type="text" className={`flex-1 h-10 px-1 ${isDarkTheme ? "text-white" : "text-black"}`} placeholder="Message MealMasterBot" value={input} onChange={handleTyping} />
        <button onClick={sendMessage} className="p-1" disabled={isPending}>
          <Image src="/HomeMessageBar/arrowUpCircle.png" alt="Send" width={24} height={24} className={`${isDarkTheme ? "tint-white" : ""} ${isPending ? "tint-gray-400" : ""}`} />
        </button>
      </div>
    </div>
  );
}
