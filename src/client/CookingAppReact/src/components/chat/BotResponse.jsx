import { SparklesIcon } from "@heroicons/react/24/outline";
import logo from "/public/logo-master.png";
import useSaveRecipe from "@/hooks/useSaveRecipe";
import { getToken } from "@/msal/msal";
import '../../assets/css/animations.css';

export default function BotResponse({ message }) {
  const { save, isError, isPending, error } = useSaveRecipe();

  async function handleClick() {
    // if (userRole.type === "Free") {
    //   navigation.navigate("Subscription");
    // }
    const token = await getToken();
    save({ token, request: message.content });
  }

  return (
    <li className="w-4/5" key={message.content} >
      <div className="flex flex-col  justify-start items-start gap-1">
        <div className="flex flex-row items-start">
            <img
              src={logo}
              alt=""
              width={40}
              className="border shadow-sm rounded-full p-1 mr-5"
            />
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        {message.type === "Recipe" && (
          <div className="w-full flex justify-center content-center items-center my-5">
            <div
              className={`w-fit flex flex-row border-2 px-4 py-2 rounded-full bg-orange-200 font-semibold cursor-pointer 
                ${isPending ? 'border-dance animate-border-dance' : 'hover:border-orange-200 hover:scale-105 transition-transform duration-300'} 
                relative ${isPending && 'sparkle'}`}
              onClick={handleClick}
            >
              <SparklesIcon className="size-6 opacity-70 mr-2" />
              {isPending ? (
                <span>
                  Crafting Meal
                  <span className="dot-1">.</span>
                  <span className="dot-2">.</span>
                  <span className="dot-3">.</span>
                </span>
              ) : (
                'Use Meal Crafter'
              )}
            </div>
          </div>
        )}
      </div>
    </li>
  );
}
