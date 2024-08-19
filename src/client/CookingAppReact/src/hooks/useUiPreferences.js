import { useMutation } from "@tanstack/react-query";
import { setUi } from "../http/user";
import { useDispatch } from "react-redux";
import { uiActions } from "@/store/uiSlice";
import { checkUserStatus } from "../http/user";
import { getToken } from "@/msal/msal";
const useUiPreferences = () => {
  const dispatch = useDispatch();
  const { mutate: changeUi } = useMutation({
    mutationKey: ["setUi"],
    mutationFn: setUi,
    onSuccess: async () => {
      const token = await getToken();
      const response = await checkUserStatus({ token });
      if (response.status !== 401) {
        const body = await response.json();
        dispatch(uiActions.setTheme(body.data.interfacePreference.theme));
        dispatch(uiActions.setLanguage(body.data.interfacePreference.language));
      }
    },
  });

  return {
    changeUi,
  };
};

export default useUiPreferences;
