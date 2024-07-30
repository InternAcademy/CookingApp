import { PaperClipIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
export default function ChatInput() {
  return (
    <section className="flex items-center justify-center mb-5 w-full">
      <ul className="flex w-4/5 md:w-3/5 lg:w-2/5 items-center bg-gray-200 rounded-2xl gap-2  py-2 px-4">
        <li>
          <PaperClipIcon className="size-6"/>
        </li>
        <li className="w-full">
          <input
            type="text"
            placeholder="What you wanna cook today?"
            className="w-full outline-none bg-gray-200 text-black placeholder-black"
          />
        </li>
        <li>
          <PaperAirplaneIcon className="size-6" />
        </li>
      </ul>
    </section>
  );
}
