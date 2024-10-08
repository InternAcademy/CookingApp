import logo from "/public/icon2.png";
import { useSelector } from "react-redux";
import UserMessage from "@/components/chat/UserMessage";
import Thinking from "@/components/chat/Thinking";
import BotResponse from "@/components/chat/BotResponse";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/ui/MealMasterLogo";
export default function EmptyChat() {
  const chat = useSelector((state) => state.user.selectedChat);
  const isThinking = useSelector((state) => state.ui.isThinking);
  const responseError = useSelector((state) => state.ui.responseError);
  const isOpenRecipes = useSelector((state) => state.ui.recipesOpen);
  const isOpenSideBar = useSelector((state) => state.ui.sidebarOpen);
  const navigate = useNavigate();
  useEffect(() => {
    if (chat.id) {
      navigate(`/c/${chat.id}`);
    }
  }, [chat]);

  return (
    <section className="w-full overflow-y-auto grow flex justify-center">
      <ul
        className={`flex flex-col gap-14 pb-10  justify-start  items-center
    ${
      isOpenRecipes || isOpenSideBar
        ? "w-full md:w-5/5 xl:w-4/5"
        : "w-full md:w-4/5 xl:w-3/5"
    } `}
      >
        {!chat.content.length && (
          <div className="grow w-full justify-center items-center content-center">
            <div className="flex flex-col justify-center items-center content-center">
              <div className="w-36"><Logo /></div>
              <div className="flex flex-col justify-center items-center content-center">
                <h1 className="text-lg text-primaryText font-semibold">
                  Let's figure out a recipe
                </h1>
                <h2 className="text-sm text-gray-500">
                  Begin by typing a message
                </h2>
              </div>
            </div>
          </div>
        )}
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
