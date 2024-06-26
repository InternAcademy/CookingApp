import { useState } from 'react';
import { exchangeCodeAsync, makeRedirectUri, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuth = (clientId, instance, scopes) => {
  const discovery = useAutoDiscovery(instance);

  const redirectUri = makeRedirectUri({
    scheme: undefined,
    path: 'redirect'
  });

  console.log(redirectUri);

  const [token, setToken] = useState(null);

  const [request, , promptAsync] = useAuthRequest(
    {
      clientId,
      scopes: scopes,
      redirectUri
    },
    discovery
  );

  const login = async () => {
    const codeResponse = await promptAsync();
    console.log(codeResponse);
    if (request && codeResponse?.type === 'success' && discovery) {
      const res = await exchangeCodeAsync(
        {
          clientId,
          code: codeResponse.params.code,
          extraParams: request.codeVerifier ? { code_verifier: request.codeVerifier } : undefined,
          redirectUri
        },
        discovery
      );
      await AsyncStorage.setItem('token', res.accessToken);
      setToken(res.accessToken);
    }
  };

  const loadToken = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  };

  return { login, token, request, loadToken };
};

export default useAuth;
