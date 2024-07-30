export const msalConfig = {
    auth: {
        clientId: import.meta.env.VITE_PUBLIC_CLIENT_ID,
        authority: import.meta.env.VITE_PUBLIC_INSTANCE,
        redirectUri: "/auth",
        postLogoutRedirectUri: "/",
        scope: import.meta.env.VITE_PUBLIC_SCOPES,
        domain: "mealmasterbot",
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: true,
    },
};

export const loginRequest = {
    scopes: [import.meta.env.VITE_PUBLIC_SCOPES]
};

export const userDataLoginRequest = {
    scopes: ["user.read"]
};

export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};