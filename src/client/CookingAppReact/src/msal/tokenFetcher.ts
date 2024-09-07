import {
  PublicClientApplication,
  InteractionRequiredAuthError,
} from "@azure/msal-browser";

export async function getCurrentToken(
  msalInstance: PublicClientApplication
): Promise<string | null> {
  const accounts = msalInstance.getAllAccounts();

  if (accounts.length === 0) {
    return null;
  }

  const accountToUse = msalInstance.getActiveAccount() || accounts[0];
  const scopes = [
    "openid",
    "profile",
    "email",
    "api://1de79200-f5b3-4a56-8880-333cfddb121b/MealMaster.Default",
  ];

  const request = { scopes, account: accountToUse };

  try {
    const authResult = await msalInstance.acquireTokenSilent(request);
    return authResult.accessToken;
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      try {
        const authResult = await msalInstance.acquireTokenPopup(request);
        return authResult.accessToken;
      } catch (popupError) {
        console.error("Popup failed: ", popupError);
        return null;
      }
    } else {
      console.error("Token acquisition failed: ", error);
      return null;
    }
  }
}
