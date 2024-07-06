import { useState } from "react";
import {
  exchangeCodeAsync,
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
} from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import { useNavigation } from "@react-navigation/native";


const useAuth = (clientId, instance, scopes) => {
  const discovery = useAutoDiscovery(instance);
  const redirectUri = makeRedirectUri({
    scheme: undefined,
    path: "logout",
  });
  const navigation = useNavigation();


  console.log(redirectUri)
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
      await AsyncStorage.setItem("id_token", res.idToken)
      setToken(res.accessToken);
    }
  };

  const logout = async () => {
    const tokenHint = await AsyncStorage.getItem('id_token');
    console.log(tokenHint)
    AsyncStorage.clear()
    

    const logoutUri = makeRedirectUri({
      scheme: undefined,
      path: 'logout'
    });
    console.log(logoutUri)
    const logoutUrl = `${discovery.endSessionEndpoint}?post_logout_redirect_uri=${encodeURIComponent(logoutUri)}&id_token_hint=${tokenHint}`;

    WebBrowser.openAuthSessionAsync(logoutUrl, logoutUri);
    navigation.navigate('LandingPage')
  }

  return { login, token, request, logout};
};

export default useAuth;
