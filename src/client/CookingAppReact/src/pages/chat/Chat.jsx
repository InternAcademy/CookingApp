import Navbar from "../../components/navbar/Navbar";
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

  console.log(isThinking);
  useFetchUserStatus();
  return (
    <section className="flex w-screen flex-col overflow-hidden shrink rounded-2xl bg-white border m-1 h-[calc(100vh-1vh)]">
      <Navbar />
      <section className="flex flex-col content-between overflow-hidden items-center flex-grow pt-5">
        {!chat && (
          <div className="grow pt-20">
            <img src={logo} alt="" width={100} />
          </div>
        )}

        {chat && (
          <section className="w-full overflow-y-auto mb-20 grow flex justify-center">
            <ul className=" flex flex-col w-5/5 md:w-4/5 xl:w-3/5 gap-14 pb-10  justify-start  items-center">
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
    </section>
  );
}
