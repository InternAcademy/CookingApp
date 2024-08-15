import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/userSlice";
import { uiActions } from "@/store/ui-slice";
import { PaperclipIcon, ArrowUpCircle } from "lucide-react";
import useChatMutation from "@/hooks/useChatMutation";

export default function ChatInput({ isPending }) {
  const input = useSelector((state) => state.ui.input);
  const isDarkTheme = useSelector((state) => state.ui.isDarkTheme);
  const selectedChat = useSelector((state) => state.user.selectedChat);
  const { mutate, isPending: isChatPending } = useChatMutation();
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();

  function handleTyping(event) {
    dispatch(uiActions.setInput(event.target.value));
  }

  async function resizeImage(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        const image = new Image();
        image.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = 120;
          canvas.height = 120;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0, 120, 120);
          resolve(canvas.toDataURL(file.type));
        };
        image.src = readerEvent.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  async function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const resizedImage = await resizeImage(file);
      sendMessage(resizedImage, "Image");
    }
  }

  async function sendMessage(content, type = "Text") {
    const token = await localStorage.getItem("token");

    const newContent = { type, role: "user", content };

    dispatch(
      userActions.selectChat({
        ...selectedChat,
        content: [...(selectedChat?.content || []), newContent],
      })
    );

    mutate({
      token,
      chatId: selectedChat ? selectedChat.id : null,
      type,
      content,
    });

    dispatch(uiActions.setInput(""));
  }

  function openFileDialog() {
    fileInputRef.current.click();
  }

  return (
    <div
      className={`flex w-3/4 flex-row justify-center items-center border ${
        isDarkTheme
          ? "border-gray-700 bg-gray-900"
          : "border-gray-300 bg-amber-50"
      } rounded-lg px-2 mx-1`}
    >
      <button onClick={openFileDialog} className="p-1" disabled={isPending}>
        <PaperclipIcon
          className={`w-5 h-5 ${
            isDarkTheme ? "text-white" : "text-[#EAB308]"
          } ${isPending ? "text-gray-400" : ""}`}
        />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: "none" }}
      />
      <input
        type="text"
        className={`flex-1 h-10 px-1 ${
          isDarkTheme ? "text-white bg-gray-900" : "primaryText bg-amber-50"
        }`}
        placeholder="Message MealMasterBot"
        value={input}
        onChange={handleTyping}
      />
      <button
        onClick={() => sendMessage(input)}
        className="p-1"
        disabled={isPending || !input}
      >
        <ArrowUpCircle
          className={`w-6 h-6 ${
            isDarkTheme ? "text-white" : "text-[#EAB308]"
          } ${isPending || !input ? "text-gray-400" : ""}`}
        />
      </button>
    </div>
  );
}
