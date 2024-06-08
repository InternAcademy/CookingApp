import { useState } from 'react';
import { exchangeCodeAsync, makeRedirectUri, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';

const useAuth = (clientId, tenantId) => {
  const discovery = useAutoDiscovery(`https://mealmasterbot.ciamlogin.com/MealMasterBot.onmicrosoft.com/v2.0/`);

  const redirectUri = makeRedirectUri({
    scheme: undefined,
    path: 'redirect',
  });

  console.log(redirectUri)

  const [token, setToken] = useState(null);

  const [request, , promptAsync] = useAuthRequest(
    {
      clientId,
      scopes: ['openid', 'profile', 'email', 'api://d6e2de7e-3bf2-44fc-96e9-148f6df299d0/MealMaster.Default'], // 'email', 
      redirectUri,
    },
    discovery,
  );

  const login = async () => {
    const codeResponse = await promptAsync();
    console.log(codeResponse)
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
