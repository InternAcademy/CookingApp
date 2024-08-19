import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { preferences } from "../http/user";
import { getToken } from "@/msal/msal";
import { userActions } from "@/store/userSlice";
import { checkUserStatus } from "../http/user";
import toast from "react-hot-toast";
const useFoodPreferences = () => {
  const dispatch = useDispatch();
  const selectedChat = useSelector((state) => state.user.selectedChat);

  const {
    mutate: save,
    isPending: isSaving,
    isError,
    error,
  } = useMutation({
    mutationFn: preferences,
    onSuccess: async () => {
      toast.success("Preferences saved!", { position: "top-center" });
      const token = await getToken();
      const response = await checkUserStatus({ token });
      if (response.status !== 401) {
        const body = await response.json();
        dispatch(
          userActions.setDietaryPreferences({
            allergies: body.data.allergies,
            avoidedFoods: body.data.avoidedFoods,
            dietaryPreference: body.data.dietaryPreference,
          })
        );
      }
    },
  });

  return {
    save,
    isSaving,
    isError,
    error,
  };
};

export default useFoodPreferences;
