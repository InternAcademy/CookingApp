import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/userSlice";
import { uiActions } from "@/store/ui-slice";
import { PaperclipIcon, ArrowUpCircle } from "lucide-react";
import useChatMutation from "@/hooks/useChatMutation";

export default function ChatInput({ isPending }) {
  const input = useSelector(state => state.ui.input);
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);
  const selectedChat = useSelector(state => state.user.selectedChat);
  const { mutate, isPending: isChatPending, isError, error } = useChatMutation();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const dispatch = useDispatch();

  function handleTyping(event) {
    dispatch(uiActions.setInput(event.target.value));
  }

  async function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      // You can add preview functionality here if needed
    }
  }

  async function sendMessage() {
    const token = await localStorage.getItem("token");

    if (input) {
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
    } else if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        dispatch(
          userActions.selectChat({
            ...selectedChat,
            content: [...(selectedChat?.content || []), { role: "user", type: "Image", content: "Image uploaded" }]
          })
        );
        mutate({
          token: token,
          chatId: selectedChat && selectedChat.id,
          type: "Image",
          content: base64String
        });
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      };
      reader.readAsDataURL(selectedFile);
    }
    dispatch(uiActions.setInput(""));
  }

  function openFileDialog() {
    fileInputRef.current.click();
  }

  return (
    <div className={`flex w-3/4 flex-col justify-center items-center border ${isDarkTheme ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-amber-50"} rounded-full px-2 mx-1`}>
      <div className="flex w-full flex-row justify-center items-center">
        <button onClick={openFileDialog} className="p-1" disabled={isPending}>
          <PaperclipIcon className={`w-5 h-5 ${isDarkTheme ? "text-white" : "text-orange-500"} ${isPending ? "text-gray-400" : ""}`} />
        </button>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={{ display: "none" }} />
        <input type="text" className={`flex-1 h-10 px-1 ${isDarkTheme ? "text-white bg-gray-900" : "text-black bg-amber-50"}`} placeholder={selectedFile ? "Image selected. Click send to upload." : "Message MealMasterBot"} value={input} onChange={handleTyping} />
        <button onClick={sendMessage} className="p-1" disabled={isPending || (!input && !selectedFile)}>
          <ArrowUpCircle className={`w-6 h-6 ${isDarkTheme ? "text-white" : "text-orange-500"} ${isPending || (!input && !selectedFile) ? "text-gray-400" : ""}`} />
        </button>
      </div>
    </div>
  );
}
