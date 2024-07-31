import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUserStatus } from "../http/user";
import { getToken } from "../msal/msal";
import { uiActions } from "../store/uiSlice";
import { userActions } from "../store/userSlice";

const useFetchUserStatus = () => {
  const isInitial = useSelector((state) => state.ui.isInitial);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      if (isInitial) {
        const response = await checkUserStatus({ token });
        if (response.status !== 401) {
          const body = await response.json();
          dispatch(
            uiActions.setTheme(
              body.data.interfacePreference.theme === "Light" ? false : true
            )
          );
          dispatch(
            uiActions.setLanguage(body.data.interfacePreference.language)
          );
          dispatch(userActions.setRole(body.data.role));
          dispatch(
            userActions.setDietaryPreferences({
              allergies: body.data.allergies,
              avoidedFoods: body.data.avoidedFoods,
              dietaryPreference: body.data.dietaryPreference,
            })
          );
          dispatch(uiActions.setIsInitial(false));
        }
      }
    };

    fetchToken();
  }, [isInitial, dispatch]);
};

export default useFetchUserStatus;
