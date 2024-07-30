import { SignInButton } from "./SignInButton";

export default function UnauthorizedMessage() {
  return (
    <div className={`flex flex-col justify-center items-center bg-customOrange w-full h-screen`}>
      <div className="mb-8">
      </div>
      <h1 className={`text-2xl font-bold text-customWhite mb-2`}>Let's Get Started</h1>
      <p className={`text-lg px-4 text-customWhite text-center mb-8`}>Easy way to manage all your cooking tasks as easy as tapping your finger</p>
      <SignInButton text="Get Started" />
    </div>
  );
}
