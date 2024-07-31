import logo from "/public/icon2.png";
import ChatInput from "../../components/chat/ChatInput";
import useFetchUserStatus from "../../hooks/useFetchUserStatus";
import { useSelector } from "react-redux";
import UserMessage from "../../components/chat/UserMessage";
import BotResponse from "../../components/chat/BotResponse";
import Thinking from "../../components/chat/Thinking";
export default function Chat() {
  const chat = useSelector((state) => state.user.selectedChat);
  const isThinking = useSelector((state) => state.ui.isThinking);
  const responseError = useSelector((state) => state.ui.responseError);
  const isOpenRecipes = useSelector((state) => state.ui.recipesOpen);
  const isOpenSideBar = useSelector((state) => state.ui.sidebarOpen);
  useFetchUserStatus();
  return (
    <section className="flex flex-col content-between overflow-hidden items-center flex-grow pt-5">
      {!chat && (
        <div className="grow pt-20">
          <img src={logo} alt="" width={100} />
        </div>
      )}

      {chat && (
        <section className="w-full overflow-y-auto grow flex justify-center">
          <ul
            className={`flex flex-col gap-14 pb-10  justify-start  items-center
            ${
              isOpenRecipes || isOpenSideBar
                ? "w-5/5 md:w-5/5 xl:w-4/5"
                : "w-5/5 md:w-4/5 xl:w-3/5"
            } `}
          >
            {chat.content.map((message) =>
              message.role === "user" ? (
                <UserMessage message={message} />
              ) : (
                <BotResponse message={message} />
              )
            )}
            {isThinking && !responseError && <Thinking />}
          </ul>
        </section>
      )}
      <ChatInput />
    </section>
  );
}
