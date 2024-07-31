import { PaperClipIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
export default function ChatInput() {
  const [input, setInput] = useState("");

  function handleSubmission() {}
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      console.log("Enter key pressed:", input);
      setInput("");
    }
  }
  function handleChange(event) {
    setInput(event.target.value);
  }
  return (
    <section className="flex items-center justify-center mb-5 w-full">
      <ul className="flex w-4/5 md:w-3/5 lg:w-2/5 items-center bg-gray-200 rounded-2xl gap-2  py-2 px-4">
        <li>
          <PaperClipIcon className="size-6" />
        </li>
        <li className="w-full">
          <input
            type="text"
            value={input}
            placeholder="What you wanna cook today?"
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            className="w-full outline-none bg-gray-200 text-black placeholder-black"
          />
        </li>
        <li>
          <PaperAirplaneIcon
            className={`size-10 rounded-xl p-2 duration-200 ${
              input.length > 0 ? "bg-orange-300" : ""
            }`}
            onClick={handleSubmission}
          />
        </li>
      </ul>
    </section>
  );
}
