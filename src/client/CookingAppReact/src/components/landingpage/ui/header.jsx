import { useState, useEffect } from "react";
import Logo from "./logo";
import { SignInButton } from "../../auth/SignInButton";

export default function Header() {
  
  return (
    <header className="bg-gray-100 py-4 px-32 flex flex-row justify-between">
          <div className="flex flex-1 items-center gap-5">
            <Logo />
            <h1 className="font-bold text-2xl text-black">MEALMASTER</h1>
          </div>
          <SignInButton />
    </header>
  );
}
