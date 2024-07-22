// components/Sidebar.jsx
"use client";

import React, { useState, useEffect } from "react";
import { FaCommentDots, FaTimes } from "react-icons/fa";
import { useTheme } from "next-themes";
import "tailwindcss/tailwind.css";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/userSlice";
import useSelectChat from "../../hooks/useSelectChat";
import useChatHistory from "../../hooks/useChatHistory";

const Sidebar = ({ open, setOpen }) => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  const chat = useSelector(state => state.user.selectedChat);
  const chatHistory = useSelector(state => state.user.chatHistory);
  const selectChat = useSelectChat();
  const { refetchChatHistory } = useChatHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    refetchChatHistory();
  }, [chat]);

  const handleChatPress = async chat => {
    selectChat(chat);
    setOpen(false);
  };

  const startNewChat = () => {
    dispatch(userActions.clearChat());
    setOpen(false);
  };

  const getSectionTitle = date => {
    const today = new Date();
    const chatDate = new Date(date);

    today.setHours(0, 0, 0, 0);
    chatDate.setHours(0, 0, 0, 0);

    const diffTime = today - chatDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays <= 7) return "Previous 7 days";
    if (diffDays <= 30) return "Previous 30 days";
    return "Older than 30 days";
  };

  const sortedChatHistory =
    chatHistory &&
    chatHistory.reduce((acc, chat) => {
      const sectionTitle = getSectionTitle(chat.time);
      if (!acc[sectionTitle]) {
        acc[sectionTitle] = [];
      }
      acc[sectionTitle].push(chat);
      return acc;
    }, {});

  const orderedSections = ["Today", "Yesterday", "Previous 7 days", "Previous 30 days", "Older than 30 days"];

  return (
    <div className={`fixed inset-0 z-10 ${open ? "block" : "hidden"}`}>
      <div className="absolute inset-0 bg-black opacity-50" onClick={() => setOpen(false)}></div>
      <div className={`absolute top-0 bottom-0 left-0 w-72 p-4 ${isDarkTheme ? "bg-gray-800" : "bg-white"} transform ${open ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-between mb-4">
          <button onClick={startNewChat} className="ml-2">
            <FaCommentDots size={24} color={isDarkTheme ? "white" : "black"} />
          </button>
          <button onClick={() => setOpen(false)} className="mr-2">
            <FaTimes size={30} color={isDarkTheme ? "white" : "black"} />
          </button>
        </div>

        <div className="overflow-y-auto">
          {chatHistory &&
            orderedSections.map(
              sectionTitle =>
                sortedChatHistory[sectionTitle] && (
                  <div key={sectionTitle} className="mb-6">
                    <h3 className={`text-lg font-bold ${isDarkTheme ? "text-white" : "text-gray-700"}`}>{sectionTitle}</h3>
                    {sortedChatHistory[sectionTitle].map((chat, idx) => (
                      <button key={idx} onClick={() => handleChatPress(chat)} className={`block w-full text-left pl-4 pr-4 py-2 ${isDarkTheme ? "text-white" : "text-gray-700"} hover:bg-gray-200 dark:hover:bg-gray-700`}>
                        {chat.title}
                      </button>
                    ))}
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
