import { useDispatch, useSelector } from "react-redux";
import { UserIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { uiActions } from "../../store/uiSlice";
import RecipeCard from "./RecipeCard";
import { getToken } from "@/msal/msal";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState, useRef } from "react";
import { Skeleton } from "../ui/skeleton";
import useFirstPageRecipes from "@/hooks/useFirstPageRecipes";
import "../../assets/css/animations.css";
import UserMenu from "../userMenu/UserMenu";
import Tooltip from "../ui/tooltip";
import { useTranslation } from "react-i18next";

export default function MyRecipes() {
  const { i18n, t } = useTranslation();
  const isOpen = useSelector((state) => state.ui.recipesOpen);
  const recipesState = useSelector((state) => state.ui.filteredRecipes);
  const [search, setSearch] = useState({ isTyping: false, message: "" });
  const timeoutRef = useRef();
  const dropDownOpen = useSelector((state) => state.ui.dropdownOpen);
  const dispatch = useDispatch();

  const {
    getFirstPageRecipes,
    loadMoreRecipes,
    gettingMoreRecipes,
    gettingRecipes,
  } = useFirstPageRecipes();
  function handleRecipes() {
    dispatch(uiActions.toggleRecipes());
  }
  const toggleDropDown = () => {
    dispatch(uiActions.toggleDropdown());
  };
  useEffect(() => {
    if (isOpen) {
      async function getFirstPageAsync() {
        const token = await getToken();
        const decoded = jwtDecode(token);
        getFirstPageRecipes({
          token: token,
          userId: decoded.sub,
          page: 1,
        });
      }
      getFirstPageAsync();
    }
  }, [isOpen]);
  async function loadMore() {
    const token = await getToken();
    const decodedToken = jwtDecode(token);

    loadMoreRecipes({
      token: token,
      userId: decodedToken.sub,
      page: recipesState.page + 1,
      title: search.message,
    });
  }
  function handleChange(event) {
    setSearch({ isTyping: true, message: event.target.value });
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    if (search.isTyping) {
      timeoutRef.current = setTimeout(async () => {
        const token = await getToken();
        const decoded = jwtDecode(token);
        getFirstPageRecipes({
          token: token,
          page: 1,
          userId: decoded.sub,
          title: search.message,
        });
        setSearch((prevState) => ({ ...prevState, isTyping: false }));
      }, 1000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [search.message]);
  return (
    <section
      className={`bg-base flex max-h-dvh flex-col flex-shrink-0 ${
        isOpen ? "visible w-screen md:w-[25rem] md:relative" : "invisible w-0"
      }  h-screen md:duration-300`}
    >
      <header
        className={`flex flex-row justify-between items-center px-3 py-3 text-primaryText ${
          isOpen ? "" : "hidden"
        }`}
      >
        <Tooltip tooltipText="Close">
          <XMarkIcon
            className="size-10 rounded-xl border border-transparent hover:border hover:border-active hover:cursor-pointer p-2 md:hidden"
            onClick={handleRecipes}
          />
          <ChevronLeftIcon
            className="size-10 rounded-xl border border-transparent hover:border hover:border-active hover:cursor-pointer p-2 hidden md:block"
            onClick={handleRecipes}
          />
        </Tooltip>
        <h1 className="text-lg font-semibold text-primaryText">
          {t("MyMeals")}
        </h1>
        <Tooltip tooltipText="Profile">
          <UserIcon
            className="size-10 invisible md:visible rounded-xl border border-transparent  hover:border hover:border-active hover:cursor-pointer p-2"
            onClick={(e) => {
              e.stopPropagation();
              toggleDropDown();
            }}
          />
        </Tooltip>
        <UserMenu isOpen={dropDownOpen} toggleDropDown={toggleDropDown} />
      </header>

      <section
        className={`flex justify-center items-center px-4 py-4 h-28 ${
          isOpen ? "" : "hidden"
        }`}
      >
        <input
          type="text"
          onChange={handleChange}
          className="bg-secondary text-primaryText w-full h-3/4 rounded-xl outline-none px-6 py-3"
          placeholder={t("LookingForFav")}
        />
      </section>
      <ul
        className={`
              overflow-y-scroll 
              overflow-x-hidden 
              flex
              flex-col
              items-center
              gap-4
              pl-4 pr-3 py-4
              ${isOpen ? "" : "hidden"}
              h-full`}
      >
        {(gettingRecipes || search.isTyping) && (
          <section className="flex flex-col gap-1 w-full">
            <li className="py-1 flex flex-col w-full ">
              <Skeleton className="h-72 flex flex-col gap-1 justify-start items-center bg-base  rounded-2xl">
                <Skeleton className="h-4/6 w-full rounded-2xl bg-secondary" />
                <Skeleton className="h-[25px] mt-3 min-w-[250px] max-w-[360px]  rounded-2xl bg-secondary" />
                <footer className="flex w-full justify-between mt-3 px-4">
                  <section className="flex gap-2">
                    <Skeleton className="size-6  rounded-full bg-secondary" />
                    <Skeleton className="h-[25px] w-20  rounded-2xl bg-secondary" />
                  </section>
                  <Skeleton className="h-[25px] size-6  rounded-2xl bg-secondary" />
                </footer>
              </Skeleton>
            </li>
            <li className="py-1 flex flex-col w-full ">
              <Skeleton className="h-72 flex flex-col gap-1 justify-start items-center bg-base  rounded-2xl">
                <Skeleton className="h-4/6 w-full rounded-2xl bg-secondary" />
                <Skeleton className="h-[25px] mt-3 min-w-[250px] max-w-[360px]  rounded-2xl bg-secondary" />
                <footer className="flex w-full justify-between mt-3 px-4">
                  <section className="flex gap-2">
                    <Skeleton className="size-6  rounded-full bg-secondary" />
                    <Skeleton className="h-[25px] w-20  rounded-2xl bg-secondary" />
                  </section>
                  <Skeleton className="h-[25px] size-6  rounded-2xl bg-secondary" />
                </footer>
              </Skeleton>
            </li>
            <li className="py-1 flex flex-col w-full ">
              <Skeleton className="h-72 flex flex-col gap-1 justify-start items-center bg-base  rounded-2xl">
                <Skeleton className="h-4/6 w-full rounded-2xl bg-secondary" />
                <Skeleton className="h-[25px] mt-3 min-w-[250px] max-w-[360px]  rounded-2xl bg-secondary" />
                <footer className="flex w-full justify-between mt-3 px-4">
                  <section className="flex gap-2">
                    <Skeleton className="size-6  rounded-full bg-secondary" />
                    <Skeleton className="h-[25px] w-20  rounded-2xl bg-secondary" />
                  </section>
                  <Skeleton className="h-[25px] size-6  rounded-2xl bg-secondary" />
                </footer>
              </Skeleton>
            </li>
          </section>
        )}
        {recipesState.recipes.length > 0 &&
          !gettingRecipes &&
          !search.isTyping &&
          recipesState.recipes.map((recipe) => (
            <RecipeCard recipe={recipe} key={recipe.id} />
          ))}
        {recipesState.page < recipesState.totalPages && !gettingMoreRecipes && (
          <button onClick={loadMore} className="text-primaryText">
            {t("LoadMore")}
          </button>
        )}
        {recipesState.recipes.length === 0 && (
          <p className="text-primaryText">{t("NoRecipes")} </p>
        )}

        {gettingMoreRecipes && (
          <span className="text-primaryText">
            {t("Loading")}
            <span className="dot-1">.</span>
            <span className="dot-2">.</span>
            <span className="dot-3">.</span>
          </span>
        )}
      </ul>
    </section>
  );
}
