import { SparklesIcon } from "@heroicons/react/24/outline";
import logo from "/public/logo-master.png";
import useSaveRecipe from "@/hooks/useSaveRecipe";
import { getToken } from "@/msal/msal";
import "../../assets/css/animations.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { uiActions } from "@/store/uiSlice";
import { useTranslation } from "react-i18next";
export default function BotResponse({ message }) {
  const language = useSelector((state) => state.ui.lang);
  const limitations = useSelector((state) => state.user.role.limitations);
  const { i18n, t } = useTranslation();
  const role = useSelector((state) => state.user.role.type);
  const navigate = useNavigate();
  const { save, isError, isPending, error, isSuccess } = useSaveRecipe();

  async function handleClick() {
    const token = await getToken();
    if (!isPending) {
      save({ token, request: message.content });
    }
  }
  function handleFreeUser() {
    navigate("/subscription");
  }
  return (
    <li className="w-4/5 text-primaryText" key={message.content}>
      <div className="flex flex-col  justify-start items-start gap-1">
        <div className="flex flex-row items-start">
          <img
            src={logo}
            alt=""
            width={40}
            className="border border-primaryBorder shadow-sm rounded-full p-1 mr-5"
          />
          <p className="whitespace-pre-wrap text-primaryText">
            {message.content}
          </p>
        </div>
        {message.type === "Recipe" && limitations.recipeGeneration > 0 && (
          <div className="w-full flex justify-center content-center items-center my-5">
            <button
              className={`w-fit flex flex-row border border-primaryBorder px-4 py-2 rounded-full bg-primary font-semibold cursor-pointer 
                ${
                  isPending
                    ? "border-dance animate-border-dance"
                    : "hover:scale-105 transition-transform duration-300"
                } 
                relative ${isPending && "sparkle"}`}
              onClick={handleClick}
            >
              <SparklesIcon className="size-6 opacity-70 mr-2 text-primaryText" />
              {isPending ? (
                <span className="text-primaryText">
                  {t("GeneratingMeal")}
                  <span className="dot-1 text-primaryText">.</span>
                  <span className="dot-2 text-primaryText">.</span>
                  <span className="dot-3 text-primaryText">.</span>
                </span>
              ) : (
                `${t("GenerateMeal")}`
              )}
            </button>
          </div>
        )}
        {message.type === "Recipe" &&
          role === "Free" &&
          limitations.recipeGeneration <= 0 && (
          <div className="w-full flex justify-center content-center items-center my-5">
            <div
              className={`w-fit flex flex-row border-2 px-4 py-2 rounded-full bg-primary font-semibold cursor-pointer 
                ${
                  isPending
                    ? "border-dance animate-border-dance"
                    : "hover:border-orange-200 hover:scale-105 transition-transform duration-300"
                } 
                relative ${isPending && "sparkle"}`}
              onClick={handleFreeUser}
            >
              <SparklesIcon className="size-6 opacity-70 mr-2" />
              <p className="text-primaryText">{t("GetPremium")}</p>
            </div>
          </div>
        )}
      </div>
    </li>
  );
}
