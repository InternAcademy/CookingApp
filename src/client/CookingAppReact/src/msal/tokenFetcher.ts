import { PublicClientApplication } from "@azure/msal-browser";

export async function getCurrentToken(
  msalInstance: PublicClientApplication
): Promise<string | null> {
  const acquireAccessToken = async () => {
    const activeAccount = msalInstance.getActiveAccount(); // This will only return a non-null value if you have logic somewhere else that calls the setActiveAccount API
    const accounts = msalInstance.getAllAccounts();

    if (!activeAccount && accounts.length === 0) {
      /*
       * User is not signed in. Throw error or wait for user to login.
       * Do not attempt to log a user in outside of the context of MsalProvider
       */
      return null;
    }

    const scopes =
      "openid profile email api://1de79200-f5b3-4a56-8880-333cfddb121b/MealMaster.Default".split(
        ","
      ) || [];

    const request = {
      scopes: scopes, // Ensuring scopes is an array of strings
      account: activeAccount || accounts[0],
    };

    try {
      const authResult = await msalInstance.acquireTokenSilent(request);
      return authResult.accessToken;
    } catch (error) {
      // If silent acquisition fails, try acquiring token through popup or redirect
      try {
        const authResult = await msalInstance.acquireTokenPopup(request);
        return authResult.accessToken;
      } catch (error) {
        console.error("Error acquiring token:", error);
        return null;
      }
    }
  };

  var token = await acquireAccessToken();

  return token;
}
