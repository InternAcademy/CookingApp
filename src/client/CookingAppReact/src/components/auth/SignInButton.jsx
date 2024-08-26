import { handleLogin } from "../../msal/msal";

export const SignInButton = () => {
  return (
    <button className="flex justify-center text-white font-semibold text-lg items-center text-center bg-[#fb923c] w-36 h-10 rounded-xl" onClick={() => handleLogin("redirect")}>
      Sign up
    </button>
  );
};
