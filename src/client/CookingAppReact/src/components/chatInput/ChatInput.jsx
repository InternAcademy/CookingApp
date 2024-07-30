import { GoPaperclip } from "react-icons/go";
import { IoMdSend } from "react-icons/io";
export default function ChatInput() {
  return (
    <section className=" w-screen flex justify-center mb-5 ">
      <ul className="flex  w-2/5  items-center bg-gray-200 rounded-2xl gap-2  py-2 px-4">
        <li>
          <GoPaperclip className="text-3xl" />
        </li>
        <li className="w-full">
          <input
            type="text"
            placeholder="What you wanna cook today?"
            className="w-full outline-none bg-gray-200 text-black placeholder-black"
          />
        </li>
        <li>
          <IoMdSend className="text-3xl" />
        </li>
      </ul>
    </section>
  );
}
