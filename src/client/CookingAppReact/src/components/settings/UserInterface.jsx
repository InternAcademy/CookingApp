import useUiPreferences from "@/hooks/useUiPreferences";
import { getToken } from "@/msal/msal";
import { uiActions } from "@/store/uiSlice";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { supportedLngs } from "@/i18n/config";
import { useTranslation } from "react-i18next";
export default function UserInterface() {
  const theme = useSelector((state) => state.ui.theme);
  const language = useSelector((state) => state.ui.lang);
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const { changeUi } = useUiPreferences();
  async function langChange(event) {
    const token = await getToken();
    const decoded = jwtDecode(token);
    console.log(event.target.value);
    i18n.changeLanguage(event.target.value);
    changeUi({
      token: token,
      userId: decoded.sub,
      theme: theme,
      language: event.target.value,
    });
  }
  async function themeChange(event) {
    const token = await getToken();
    const decoded = jwtDecode(token);
    dispatch(uiActions.setTheme(event.target.value));
    localStorage.setItem("theme", event.target.value);
    changeUi({
      token: token,
      userId: decoded.sub,
      theme: event.target.value,
      language: language,
    });
  }
  return (
    <>
      <h1 className="font-semibold text-lg mb-4 bg-secondary">{t("lnt")}</h1>
      <div className="flex flex-col md:flex-row bg-secondary">
        <select
          className="border border-primaryBorder rounded-lg px-4 py-3 m-1 md:w-1/2 text-sm shadow-sm bg-secondary"
          onChange={langChange}
        >
          <option value="none" disabled selected>
            {`Current: ${language}`}
          </option>
          {Object.entries(supportedLngs).map(([code, name]) => (
            <option value={code} key={code}>
              {name}
            </option>
          ))}
        </select>
        <select
          className="border border-primaryBorder  rounded-lg m-1 px-4 py-3 md:w-1/2 text-sm shadow-sm bg-secondary"
          onChange={themeChange}
        >
          <option value="none" disabled selected>
            {`Current: ${theme}`}
          </option>
          <option value="Light">Light</option>
          <option value="Dark">Dark</option>
          <option value="SunnyLight">Sunny Light</option>
          <option value="CoolLight">Cool Light</option>
          <option value="WarmDark">Warm Dark</option>
        </select>
      </div>
    </>
  );
}
