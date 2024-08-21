import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUserStatus } from "../http/user";
import { getToken } from "../msal/msal";
import { uiActions } from "../store/uiSlice";
import { useTranslation } from "react-i18next";
import { userActions } from "../store/userSlice";

const useFetchUserStatus = () => {
  const isInitial = useSelector((state) => state.ui.isInitial);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const fetchToken = async () => {
    const token = await getToken();
    if (isInitial) {
      const response = await checkUserStatus({ token });
      if (response.status !== 401) {
        const body = await response.json();
        dispatch(uiActions.setTheme(body.data.interfacePreference.theme));
        localStorage.setItem("theme", body.data.interfacePreference.theme);
        dispatch(uiActions.setLanguage(body.data.interfacePreference.language));
        i18n.changeLanguage(body.data.interfacePreference.language);
        dispatch(userActions.setRole(body.data.role));
        dispatch(
          userActions.setPersonal({ name: body.data.name, picture: null })
        );
        dispatch(
          userActions.setDietaryPreferences({
            allergies: body.data.allergies,
            avoidedFoods: body.data.avoidedFoods,
            dietaryPreference: body.data.dietaryPreference,
          })
        );
        dispatch(userActions.setProfilePicture(body.data.imageUrl));
        dispatch(uiActions.setIsInitial(false));
      }
    }
  };
  useEffect(() => {
    fetchToken();
  }, [isInitial, dispatch]);
};

export default useFetchUserStatus;
