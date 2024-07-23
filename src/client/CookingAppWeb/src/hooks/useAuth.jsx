// hooks/useAuth.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useAuth = () => {
  const [token, setToken] = useState(null);

  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID || "";
  const instance = process.env.NEXT_PUBLIC_INSTANCE || "";
  const scopes = process.env.NEXT_PUBLIC_SCOPES ? process.env.NEXT_PUBLIC_SCOPES.split(" ") : [];
  const redirectUri = `${typeof window !== "undefined" ? window.location.origin : ""}/api/auth/callback`;

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = () => {
    const authUrl = `${instance}/authorize?client_id=${clientId}&response_type=code&scope=${scopes.join(" ")}&redirect_uri=${redirectUri}`;
    window.location.href = authUrl;
  };

  const handleAuthResponse = async code => {
    try {
      const response = await axios.post("/api/auth/token", { code });
      const { access_token } = response.data;
      Cookies.set("token", access_token);
      setToken(access_token);
    } catch (error) {
      console.error("Error exchanging code: ", error);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setToken(null);
  };

  return { login, token, handleAuthResponse, logout };
};

export default useAuth;
