import { useSelector } from "react-redux";
import UserMessage from "@/components/chat/UserMessage";
import BotResponse from "@/components/chat/BotResponse";
import Thinking from "@/components/chat/Thinking";
import useSelectChat from "@/hooks/useSelectChat";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
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
  return (
    <section className="w-full overflow-y-auto grow flex justify-center">
      <ul
        className={`flex flex-col gap-14 pb-10  justify-start  items-center
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
      </ul>
    </section>
  );
}
