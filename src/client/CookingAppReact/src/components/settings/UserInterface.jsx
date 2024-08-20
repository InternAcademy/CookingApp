import useUiPreferences from "@/hooks/useUiPreferences";
import { getToken } from "@/msal/msal";
import { uiActions } from "@/store/uiSlice";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
export default function UserInterface() {
  const theme = useSelector((state) => state.ui.theme);
  const language = useSelector((state) => state.ui.lang);

  const { changeUi } = useUiPreferences();
  async function langChange(event) {
    const token = await getToken();
    const decoded = jwtDecode(token);
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
    changeUi({
      token: token,
      userId: decoded.sub,
      theme: event.target.value,
      language: language,
    });
  }
  return (
    <>
      <h1 className="font-semibold text-lg mb-4 bg-secondary">
        Language and Theme
      </h1>
      <div className="flex flex-col md:flex-row bg-secondary">
        <select
          className="border rounded-lg px-4 py-3 m-1 md:w-1/2 text-sm shadow-sm bg-secondary"
          onChange={langChange}
        >
          <option value="none" disabled selected>
            {`Current: ${language}`}
          </option>
          <option value="English">English</option>
        </select>
        <select
          className="border rounded-lg m-1 px-4 py-3 md:w-1/2 text-sm shadow-sm bg-secondary"
          onChange={themeChange}
        >
          <option value="none" disabled selected>
            {`Current: ${theme}`}
          </option>
          <option value="Light">Light</option>
          <option value="Dark">Dark Contrast</option>
        </select>
      </div>
    </>
  );
}
