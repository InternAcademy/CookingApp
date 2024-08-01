import { SparklesIcon } from "@heroicons/react/24/outline";
import logo from "/public/icon2.png";
export default function BotResponse({ message }) {
  return (
    <li className="w-4/5" key={message.content}>
      <div className="flex flex-col  justify-start items-start gap-1">
        <div className="flex gap-4 items-start ">
          <img
            src={logo}
            alt=""
            width={35}
            className="bg-gray-200 rounded-2xl p-1"
          />
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>

        {message.type === "Recipe" && (
          <SparklesIcon className="size-6 opacity-70 hover:cursor-pointer" />
        )}
      </div>
    </li>
  );
}
