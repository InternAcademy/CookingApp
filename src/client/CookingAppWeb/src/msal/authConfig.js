export const msalConfig = {
    auth: {
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
        authority: process.env.NEXT_PUBLIC_INSTANCE,
        redirectUri: "/auth",
        postLogoutRedirectUri: "/",
        scope: process.env.NEXT_PUBLIC_SCOPES,
        domain: "mealmasterbot",
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: true,
    },
};

export const loginRequest = {
    scopes: [process.env.NEXT_PUBLIC_SCOPES]
};

export const userDataLoginRequest = {
    scopes: ["user.read"]
};

export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};