import LandingPage from "../landingpage/landingpage";
import { useEffect } from 'react';
import { handleLogin } from "../../msal/msal";

export default function UnauthorizedMessage() {
  useEffect(() => {
    handleLogin("redirect");
  }, []);
}
