import { useMutation } from "@tanstack/react-query";
import { setUi } from "../http/user";

const useUiPreferences = () => {
  const { mutate: changeUi } = useMutation({
    mutationKey: ["setUi"],
    mutationFn: setUi,
  });

  return {
    changeUi,
  };
};

export default useUiPreferences;
