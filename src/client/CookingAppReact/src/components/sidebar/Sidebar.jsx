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
import { uiActions } from "../../store/uiSlice";
import ChatItem from "./ChatItem";
import { useEffect } from "react";
import useChatHistory from "../../hooks/useChatHistory";
import { redirect, useNavigate } from "react-router-dom";
import { orderedSections } from "../../utils/sidebar";
import { getSectionTitle } from "../../utils/sidebar";
import useSelectChat from "../../hooks/useSelectChat";
import { userActions } from "../../store/userSlice";
export default function Sidebar() {
  const isOpen = useSelector((state) => state.ui.sidebarOpen);
  const chatPage = useSelector((state) => state.user.chatHistory.page);
  const chatHistory = useSelector((state) => state.user.chatHistory.chats);
  const selectChat = useSelectChat();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getFirstPage, getNextPage, gettingFirstPage } = useChatHistory();
  useEffect(() => {
    if (isOpen) {
      async function getFirstPageAsync() {
        const token = await getToken();
        const decoded = jwtDecode(token);
        getFirstPage({ token: token, userId: decoded.sub, pageIndex: 1 });
      }
      getFirstPageAsync();
    }
  }, [isOpen]);
  function handleChatSelection(chatId) {
    navigate(`c/${chatId}`);
  }
  function handleNewChat() {
    dispatch(userActions.emptyChat());
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
    navigate("/admin/dashboard");
  }
  function handleClickSubscribtion() {
    navigate("/subscribtion");
  }

  return (
    <section
      className={`bg-gray-100 flex flex-col grow   ${
        isOpen
          ? "visible w-screen absolute z-10 md:w-96 md:relative md:z-0"
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
      <button onClick={handleClickSubscribtion}>
        <h5 className="hover:bg-gray-300 mt-5 rounded-lg m-3 px-5 py-2 flex flex-row justify-start items-center hover:cursor-pointer isolate bg-white/20 shadow-sm ring-1 ring-black/5">
          <BanknotesIcon className="size-5 mr-5" />
          Get Premium
        </h5>
      </button>
      <button onClick={handleClickDashboard}>
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
        {gettingFirstPage ||
          (chatHistory.length < 1 && (
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
          ))}
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
                      <ChatItem title={chat.title} key={chat.chadId} />
                    </li>
                  ))}
                </Fragment>
              )
          )}
      </ul>
    </section>
  );
}
