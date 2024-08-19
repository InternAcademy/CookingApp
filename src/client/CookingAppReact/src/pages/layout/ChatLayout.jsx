import ChatInput from "../../components/chat/ChatInput";
import { Outlet } from "react-router-dom";
export default function ChatLayout() {
  return (
    <section className="flex flex-col content-between overflow-hidden items-center flex-grow pt-5">
      <Outlet />
      <ChatInput />
    </section>
  );
}
