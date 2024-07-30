import Sidebar from "../../components/sidebar/Sidebar";
import logo from "/public/icon2.png";
import ChatInput from "../../components/chatInput/ChatInput";
export default function Chat() {
  return (
    <>
      <Sidebar></Sidebar>
      <main className="flex flex-col items-center justify-center overflow-y-hidden  flex-wrap box-border">
        {/* <img src={logo} alt="" /> */}
        <ul className="overflow-y-scroll w-screen h-[36rem] flex flex-col  justify-center items-center">
          <li>
            <p className="text-3xl">text</p>
          </li>
          <li>
            <p className="text-3xl">text</p>
          </li>
          <li>
            <p className="text-3xl">text</p>
          </li>
          <li>
            <p className="text-3xl">text</p>
          </li>
          <li>
            <p className="text-3xl">text</p>
          </li>
          <li>
            <p className="text-3xl">text</p>
          </li>
          <li>
            <p className="text-3xl">text</p>
          </li>
          <li>
            <p className="text-3xl">text</p>
          </li>
          <li>
            <p className="text-3xl">text</p>
          </li>
          <li>
            <p className="text-3xl">text</p>
          </li>
          <li>
            <p className="text-3xl">text</p>
          </li>
          <li>
            <p className="text-3xl">text</p>
          </li>
          <li>
            <p className="text-3xl">text</p>
          </li>
          <li>
            <p className="text-3xl">text</p>
          </li>
          <li>
            <p className="text-3xl">text</p>
          </li>
          <li>
            <p className="text-3xl">text</p>
          </li>
          <li>
            <p className="text-3xl">text</p>
          </li>
          <li>
            <p className="text-3xl">text</p>
          </li>
          <li>
            <p className="text-3xl">text</p>
          </li>
          <li>
            <p className="text-3xl">text</p>
          </li>
          <li>
            <p className="text-3xl">text</p>
          </li>
          <li>
            <p className="text-3xl">text</p>
          </li>
          <li>
            <p className="text-3xl">text</p>
          </li>
          <li>
            <p className="text-3xl">text</p>
          </li>
          <li>
            <p className="text-3xl">text</p>
          </li>
          <li>
            <p className="text-3xl">text</p>
          </li>
        </ul>
        <ChatInput />
      </main>
    </>
  );
}
