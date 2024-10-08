import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "@/store/uiSlice";
import { useTranslation } from "react-i18next";
import {
  Cog6ToothIcon,
  CreditCardIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import SignOutButton from "../auth/SignOutButton";

const UserMenu = ({ isOpen, toggleDropDown }) => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state) => state.ui.isDarkTheme);
  let role = useSelector((state) => state.user.role.type);

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        toggleDropDown();
      }
    }
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [toggleDropDown]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      onClick={(e) => e.stopPropagation()}
      className={`absolute right-2 top-12 w-fit
      ${isDarkTheme ? "bg-[#2F2F2F]" : "bg-secondary"} 
      border border-primaryBorder rounded-3xl shadow-sm z-20 text-primaryText  mt-3`}
    >
      <div className="flex flex-col p-4">
        <div className="flex flex-col items-start w-full space-y-2">
          <div
            className={`flex items-center w-full cursor-pointer p-2  
            ${
              isDarkTheme ? "hover:bg-[#424242]" : "hover:bg-base"
            } hover:rounded`}
            onClick={() => {
              dispatch(uiActions.toggleDropdown());
              navigate("/store");
            }}
            title="Subscription"
          >
            <CreditCardIcon className="w-6 h-6 mr-4" />
            <span>{t("Subscription")}</span>
          </div>
          <div
            className={`flex items-center w-full cursor-pointer p-2 
            hover:bg-base
            hover:rounded`}
            onClick={() => {
              dispatch(uiActions.toggleDropdown());
              navigate("/settings");
            }}
            title="Settings"
          >
            <Cog6ToothIcon className="w-6 h-6 mr-4" />
            <span>{t("Settings")}</span>
          </div>
          <div
            className={`flex items-center w-full cursor-pointer p-2 
            ${
              isDarkTheme ? "hover:bg-[#424242]" : "hover:bg-base"
            } hover:rounded`}
            onClick={() => {
              dispatch(uiActions.toggleDropdown());
              navigate("/rules-and-policies");
            }}
            title="Rules & Policies"
          >
            <ExclamationTriangleIcon className="w-6 h-6 mr-4" />
            <span>{t("RulesNPolicies")}</span>
          </div>
        </div>
        <hr className={`w-full mt-2 mb-2 border-primaryBorder`} />
        <div
          className={`flex items-center w-full cursor-pointer p-2 
            ${
              isDarkTheme ? "hover:bg-[#424242]" : "hover:bg-base"
            } hover:rounded`}
        >
          <SignOutButton />
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
