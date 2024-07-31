import { handleLogin } from "../../msal/msal";

export const SignInButton = () => {
  return (
    <button className="flex justify-center items-center text-center bg-orange-200 w-36 h-10 rounded-xl" onClick={() => handleLogin("redirect")}>
      Get Started
    </button>
  );
};
