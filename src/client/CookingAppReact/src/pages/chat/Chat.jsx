import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import UserMessage from "@/components/chat/UserMessage";
import BotResponse from "@/components/chat/BotResponse";
import Thinking from "@/components/chat/Thinking";
import useSelectChat from "@/hooks/useSelectChat";
import { userActions } from "@/store/userSlice";

export default function Chat() {
  let { chatId } = useParams();
  const dispatch = useDispatch();
  const { data: response, refetch } = useSelectChat(chatId);

  useEffect(() => {
    if (chatId) {
      refetch();
    }
  }, [chatId]);

  useEffect(() => {
    if (response) {
      dispatch(userActions.selectChat(response));
    }
  }, [response]);

  const chat = useSelector((state) => state.user.selectedChat);
  const isThinking = useSelector((state) => state.ui.isThinking);
  const responseError = useSelector((state) => state.ui.responseError);
  const isOpenRecipes = useSelector((state) => state.ui.recipesOpen);
  const isOpenSideBar = useSelector((state) => state.ui.sidebarOpen);

  const endOfChatRef = useRef(null);

  useEffect(() => {
    // Using requestAnimationFrame to ensure the scroll happens after the DOM update
    const scrollToBottom = () => {
      if (endOfChatRef.current) {
        endOfChatRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    // Wrap in requestAnimationFrame to ensure it runs after rendering
    requestAnimationFrame(scrollToBottom);
  }, [chat]);

  return (
    <section className="w-full overflow-y-auto grow flex justify-center">
      <ul
        className={`flex flex-col gap-14 justify-start items-center [&>*:last-child]:pb-5
    ${
      isOpenRecipes || isOpenSideBar
        ? "w-5/5 md:w-5/5 xl:w-4/5"
        : "w-5/5 md:w-4/5 xl:w-3/5"
    } `}
      >
        {chat &&
          chat.content.map((message, index) =>
            message.role === "user" ? (
              <UserMessage key={index} message={message} />
            ) : (
              <BotResponse key={index} message={message} />
            )
          )}
        {isThinking && !responseError && <Thinking />}
        {/* This div is used to scroll to the bottom */}
        <div ref={endOfChatRef} className="w-1"/>
      </ul>
    </section>
  );
}
