import { useState } from "react";
import {
  exchangeCodeAsync,
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
} from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";

const useAuth = (clientId, instance, scopes) => {
  const discovery = useAutoDiscovery(instance);
  const redirectUri = makeRedirectUri({
    scheme: "myapp", // Make sure to replace 'myapp' with your actual app scheme
    path: "redirect",
  });
  const [token, setToken] = useState(null);
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
      setToken(res.accessToken);

      //Linking.openURL("home");
    }
  };

  return { login, token, request };
};

export default useAuth;
