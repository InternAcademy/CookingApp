// Импортиране на необходимите зависимости от Next.js и библиотеки
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";

const useAuth = (clientId, instance, scopes) => {
  const [token, setToken] = useState(null);
  const router = useRouter();

  const redirectUri = `${window.location.origin}/logout`;

  const login = async () => {
    try {
      // Пренасочване към страницата за автентикация
      const authUrl = `${instance}/authorize?client_id=${clientId}&response_type=code&scope=${scopes.join(" ")}&redirect_uri=${redirectUri}`;
      window.location.href = authUrl;
    } catch (error) {
      console.error("Login error: ", error);
    }
  };

  const handleAuthResponse = async code => {
    try {
      const response = await axios.post(`${instance}/token`, {
        client_id: clientId,
        code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code"
      });
      const { access_token } = response.data;
      Cookies.set("token", access_token);
      setToken(access_token);
      console.log("token", Cookies.get("token"));
    } catch (error) {
      console.error("Error exchanging code: ", error);
    }
  };

  return { login, token, handleAuthResponse };
};

export default useAuth;
