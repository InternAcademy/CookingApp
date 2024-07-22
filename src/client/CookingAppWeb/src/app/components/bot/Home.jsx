// app/components/Home.jsx
"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import "tailwindcss/tailwind.css";
import { useTheme } from "next-themes";

import { useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "@/store/ui-slice";
import ChatInput from "./ChatInput";
import ChatError from "./ChatError";
import NavBar from "../navigation/NavBar";
import Thinking from "./Thinking";

const Home = () => {
  const router = useRouter();
  const { save, isPending } = useSaveRecipe();
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  const isThinking = useSelector(state => state.ui.isThinking);
  const responseError = useSelector(state => state.ui.responseError);
  const chat = useSelector(state => state.user.selectedChat);
  const profileImage = useSelector(state => state.ui.photoUri);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenAndTheme = async () => {
      const token = localStorage.getItem("token");
      console.log(token);
      const theme = localStorage.getItem("theme");
      if (!token) {
        router.push("/landing-page");
      }
      if (theme) {
        console.log(theme);
        dispatch(uiActions.setTheme(theme === "dark" ? "dark" : null));
      }
    };
    checkTokenAndTheme();
  }, []);

  useEffect(() => {
    console.log(isDarkTheme);
  }, [isDarkTheme]);

  async function handleRecipeSave(request) {
    const token = localStorage.getItem("token");
    save({ token, request });
  }

  const renderPost = () => {
    if (chat) {
      console.log(chat);
      return (
        <div className={`flex-1 ${isDarkTheme ? "bg-[#202020]" : "bg-white"}`}>
          <div className="p-6 mt-10">
            {chat.content.map((msg, index) => (
              <div key={index} className="mb-2 flex flex-row justify-start wrap pt-1">
                {msg.role === "user" ? profileImage ? <Image src={profileImage} alt="Profile" className="w-8 h-8 rounded-full mr-2 mb-7" /> : <div className={`mr-2 mb-7 items-start -mt-1 ${isDarkTheme ? "text-white" : "text-black"}`}>👤</div> : <Image src="/icon2.png" alt="Icon" className="w-8 h-8 rounded-full mr-2 mb-7 items-start -mt-1" />}
                <div>
                  <p className={`text-base font-semibold mb-1 ${isDarkTheme ? "text-white" : "text-black"}`}>{msg.role === "user" ? "You" : "MealMasterBot"}:</p>
                  {msg.role === "user" && msg.type === "Text" && <p className={`text-base mr-4 w-screen mb-1 ${isDarkTheme ? "text-white" : "text-black"}`}>{msg.content}</p>}
                  {msg.role === "user" && msg.type === "Image" && <Image src={msg.content} alt="User content" className="w-32 h-32 rounded-md mr-2 mb-7" />}
                  {msg.role === "bot" && msg.type === "Recipe" && (
                    <>
                      <p className={`max-w-full mr-12 text-base mb-1 ${isDarkTheme ? "text-white" : "text-black"}`}>{msg.content}</p>
                      <button onClick={() => handleRecipeSave(msg.content)} className="mx-2 self-end">
                        {!isPending && <div className={`text-${isDarkTheme ? "white" : "black"}`}>🍴</div>}
                        {isPending && <div className={`mr-2 ${isDarkTheme ? "text-white" : "text-black"}`}>Loading...</div>}
                      </button>
                    </>
                  )}
                  {msg.role === "bot" && msg.type === "Text" && <p className={`max-w-full mr-12 text-base mb-1 ${isDarkTheme ? "text-white" : "text-black"}`}>{msg.content}</p>}
                </div>
              </div>
            ))}
            {isThinking && !responseError && <Thinking />}
            {responseError && <ChatError message={responseError} />}
          </div>
        </div>
      );
    }

    return (
      <div className="flex w-full h-full justify-center items-center flex-col p-5">
        <Image src="/Main/icon2.png" alt="Icon" width={104} height={104} className="w-26 h-26 mb-2" />
        <p className={`text-lg font-bold ${isDarkTheme ? "text-white" : "text-black"}`}>Let's figure out a recipe</p>
        <p className={`text-base ${isDarkTheme ? "text-gray-400" : "text-black"}`}>Begin by typing a message</p>
      </div>
    );
  };

  return (
    <div className={`flex flex-col items-center justify-center pt-22 w-full h-full ${isDarkTheme ? "bg-[#202020]" : "bg-white"}`}>
      <NavBar />
      <div className="flex-grow w-full">{renderPost()}</div>
      <div className={`flex w-full flex-row justify-center mb-5 ${isDarkTheme ? "border-gray-700 bg-[#202020]" : "border-gray-300 bg-white"}`}>{<ChatInput isPending={isPending} />}</div>
    </div>
  );
};

export default Home;
