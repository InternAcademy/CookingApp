import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { Skeleton } from "@/components/ui/skeleton";

import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import { ChartPieIcon } from "@heroicons/react/24/outline";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../../msal/msal";
import uiSlice, { uiActions } from "../../store/uiSlice";
import ChatItem from "./ChatItem";
import { useEffect } from "react";
import useChatHistory from "../../hooks/useChatHistory";
import { redirect, useNavigate } from "react-router-dom";
import { orderedSections } from "../../utils/sidebar";
import { getSectionTitle } from "../../utils/sidebar";
import useSelectChat from "../../hooks/useSelectChat";
import { userActions } from "../../store/userSlice";
import "../../assets/css/animations.css";
export default function Sidebar() {
  const isOpen = useSelector((state) => state.ui.sidebarOpen);
  const chatPage = useSelector((state) => state.user.chatHistory.page);
  const chatHistory = useSelector((state) => state.user.chatHistory.chats);
  const totalPages = useSelector((state) => state.user.chatHistory.totalPages);
  let role = useSelector((state) => state.user.role.type);
  const selectChat = useSelectChat();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getFirstPage, getNextPage, gettingFirstPage, gettingNextPage } =
    useChatHistory();
  useEffect(() => {
    if (isOpen) {
      async function getFirstPageAsync() {
        const token = await getToken();
        const decoded = jwtDecode(token);
        getFirstPage({ token: token, userId: decoded.sub, pageIndex: 1 });
      }
      console.log(chatHistory);
      getFirstPageAsync();
    }
  }, [isOpen]);
  function handleChatSelection(chatId) {
    if (window.innerWidth < 1300) {
      dispatch(uiActions.closeSidebar());
    }

    navigate(`c/${chatId}`);
  }
  function handleNewChat() {
    dispatch(uiActions.clearActive());
    dispatch(userActions.emptyChat());
    dispatch(uiActions.closeSidebar());

    navigate("/");
  }
  const sortedChatHistory = chatHistory
    ? chatHistory.reduce((acc, chat) => {
        const sectionTitle = getSectionTitle(chat.time);
        if (!acc[sectionTitle]) {
          acc[sectionTitle] = [];
        }
        acc[sectionTitle].push(chat);
        return acc;
      }, {})
    : {};

  function handleClick() {
    dispatch(uiActions.closeSidebar());
  }
  function handleClickDashboard() {
    if (window.innerWidth < 1300) {
      dispatch(uiActions.closeSidebar());
    }

    navigate("/admin/dashboard");
  }
  function handleClickSubscribtion() {
    if (window.innerWidth < 1300) {
      dispatch(uiActions.closeSidebar());
    }

    navigate("/subscription");
  }
  function handleClickYourSubscribtion() {
    if (window.innerWidth < 1300) {
      dispatch(uiActions.closeSidebar());
    }

    navigate("/subscription/manage");
  }

  function isAdmin() {
    if (role === "Admin") {
      return true;
    } else {
      return false;
    }
  }

  function isPremium() {
    if (role === "Premium") {
      return true;
    } else {
      return false;
    }
  }

  async function loadMore() {
    const token = await getToken();
    const decoded = jwtDecode(token);
    getNextPage({ token: token, userId: decoded.sub, pageIndex: chatPage + 1 });
  }
  return (
    <section
      className={`bg-gray-100 flex flex-col flex-shrink-0   ${
        isOpen
          ? "visible w-screen absolute z-10 md:w-80 md:relative md:z-0"
          : "invisible w-0"
      }  h-screen  duration-300`}
    >
      <header className="flex justify-between px-4 py-4">
        <Bars3BottomLeftIcon
          className="size-10  rounded-xl border border-gray-100  hover:border hover:border-gray-200 hover:cursor-pointer p-2"
          onClick={handleClick}
        />
        <ChatBubbleOvalLeftEllipsisIcon
          className="size-10 rounded-xl border border-gray-100  hover:border hover:border-gray-200 hover:cursor-pointer p-2"
          onClick={handleNewChat}
        />
      </header>
      <button
        className={`${isPremium() || !isOpen ? "hidden" : ""}`}
        onClick={handleClickSubscribtion}
      >
        <h5 className="hover:bg-gray-300 mt-5 rounded-lg m-3 px-5 py-2 flex flex-row justify-start items-center hover:cursor-pointer isolate bg-white/20 shadow-sm ring-1 ring-black/5">
          <BanknotesIcon className="size-5 mr-5" />
          Get Premium
        </h5>
      </button>
      <button
        className={`${!isPremium() || !isOpen ? "hidden" : ""}`}
        onClick={handleClickYourSubscribtion}
      >
        <h5 className="hover:bg-gray-300 mt-5 rounded-lg m-3 px-5 py-2 flex flex-row justify-start items-center hover:cursor-pointer isolate bg-white/20 shadow-sm ring-1 ring-black/5">
          <BanknotesIcon className="size-5 mr-5" />
          Your Subscription
        </h5>
      </button>
      <button
        className={`${!isAdmin() || !isOpen ? "hidden" : ""}`}
        onClick={handleClickDashboard}
      >
        <h5 className="hover:bg-gray-300 mt-5 rounded-lg m-3 px-5 py-2 flex flex-row justify-start items-center hover:cursor-pointer isolate bg-white/20 shadow-sm ring-1 ring-black/5">
          <ChartPieIcon className="size-5 mr-5" />
          Dashboard
        </h5>
      </button>

      <ul
        className={`overflow-y-auto overflow-x-hidden px-3 m-2 ${
          isOpen ? "visible" : "invisible "
        }  duration-100 h-full`}
      >
        {gettingFirstPage && (
          <>
            <li className="py-1 flex flex-col mb-10">
              <Skeleton className="w-1/4 h-[20px] rounded-full bg-gray-300 mb-3" />
              <div className="flex flex-col gap-7 w-full items-center">
                <Skeleton className="w-4/5 h-[25px] rounded-full bg-gray-300 " />
                <Skeleton className="w-4/5 h-[25px] rounded-full bg-gray-300 " />
                <Skeleton className="w-4/5 h-[25px] rounded-full bg-gray-300 " />
              </div>
            </li>
            <li className="py-1 flex flex-col">
              <Skeleton className="w-1/4 h-[20px] rounded-full bg-gray-300 mb-3" />
              <div className="flex flex-col gap-7 w-full items-center">
                <Skeleton className="w-4/5 h-[25px] rounded-full bg-gray-300 " />
                <Skeleton className="w-4/5 h-[25px] rounded-full bg-gray-300 " />
                <Skeleton className="w-4/5 h-[25px] rounded-full bg-gray-300 " />
              </div>
            </li>
          </>
        )}
        {orderedSections &&
          orderedSections.map(
            (sectionTitle) =>
              sortedChatHistory[sectionTitle] && (
                <Fragment key={sectionTitle}>
                  <h3
                    className=" text-md font-light tracking-normal"
                    key={sectionTitle}
                  >
                    {sectionTitle}
                  </h3>
                  {sortedChatHistory[sectionTitle].map((chat, idx) => (
                    <li
                      key={chat.chatId}
                      onClick={() => handleChatSelection(chat.chatId)}
                    >
                      <ChatItem
                        title={chat.title}
                        id={chat.chatId}
                        key={chat.chadId}
                      />
                    </li>
                  ))}
                </Fragment>
              )
          )}
        {chatHistory.length === 0 && <p>You don't have any chats</p>}
        {chatPage < totalPages && !gettingNextPage && (
          <button onClick={loadMore}>Load more...</button>
        )}
        {gettingNextPage && (
          <span>
            Loading
            <span className="dot-1">.</span>
            <span className="dot-2">.</span>
            <span className="dot-3">.</span>
          </span>
        )}
      </ul>
    </section>
  );
}
