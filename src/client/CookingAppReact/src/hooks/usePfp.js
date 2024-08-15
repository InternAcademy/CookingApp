import { useMutation } from "@tanstack/react-query";
import { setProfilePicture } from "@/http/user";
import useFetchUserStatus from "./useFetchUserStatus";
import { useDispatch } from "react-redux";
import { userActions } from "@/store/userSlice";
import { checkUserStatus } from "@/http/user";
import { getToken } from "@/msal/msal";
export default function usePfp() {
  const dispatch = useDispatch();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: setProfilePicture,
    onSuccess: async () => {
      const token = await getToken();
      const response = await checkUserStatus({ token });
      if (response.status !== 401) {
        const body = await response.json();
        dispatch(userActions.setProfilePicture(body.data.imageUrl));
      }
    },
  });

  return { mutate, isPending, isError, error };
}
