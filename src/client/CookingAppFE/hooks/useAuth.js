import { useState } from 'react';
import { exchangeCodeAsync, makeRedirectUri, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';

const useAuth = (clientId, tenantId) => {
  const discovery = useAutoDiscovery(`https://mealmasterbot.ciamlogin.com/MealMasterBot.onmicrosoft.com/v2.0/`);

  const redirectUri = makeRedirectUri({
    scheme: undefined,
    path: 'auth',
  });

  console.log(redirectUri)

  const [token, setToken] = useState(null);

  const [request, , promptAsync] = useAuthRequest(
    {
      clientId,
      scopes: ['openid', 'profile', 'email'],
      redirectUri,
    },
    discovery,
  );

  const login = async () => {
    const codeResponse = await promptAsync();
    if (request && codeResponse?.type === 'success' && discovery) {
      const res = await exchangeCodeAsync(
        {
          clientId,
          code: codeResponse.params.code,
          extraParams: request.codeVerifier ? { code_verifier: request.codeVerifier } : undefined,
          redirectUri,
        },
        discovery,
      );
      setToken(res.accessToken);
    }
  };

  return { login, token, request };
};

export default useAuth;
