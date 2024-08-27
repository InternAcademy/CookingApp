import { useState, useEffect } from "react";
import Logo from "./logo";
import { SignInButton } from "../../auth/SignInButton";

export default function Header() {
  return (
    <header className="h-full bg-base py-4 px-10 lg:px-32 flex flex-row justify-center items-center md:justify-between">
      <div className="flex items-center gap-2 md:gap-5">
        <Logo />
        <h1 className="font-bold text-2xl primaryText">Meal Master</h1>
      </div>
      <div className="hidden md:block">
        <SignInButton />
      </div>
    </header>
  );
}
