import { useState } from "react";
import {
  exchangeCodeAsync,
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
} from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/userSlice";
const useAuth = (clientId, instance, scopes) => {
  const discovery = useAutoDiscovery(instance);
  const dispatch = useDispatch();
  const redirectUri = makeRedirectUri({
    scheme: undefined,
    path: "redirect",
  });

  const [request, , promptAsync] = useAuthRequest(
    {
      clientId,
      scopes: scopes,
      redirectUri,
    },
    discovery
  );

  const login = async () => {
    const codeResponse = await promptAsync();
    if (request && codeResponse?.type === "success" && discovery) {
      const res = await exchangeCodeAsync(
        {
          clientId,
          code: codeResponse.params.code,
          extraParams: request.codeVerifier
            ? { code_verifier: request.codeVerifier }
            : undefined,
          redirectUri,
        },
        discovery
      );
      await AsyncStorage.setItem("token", res.accessToken);
      dispatch(userActions.setToken(res.accessToken));
    }
  };

  return { login, request };
};

export default useAuth;
