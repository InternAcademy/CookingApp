import { SignInButton } from "./SignInButton";
import Image from "next/image";

export default function UnauthorizedMessage() {
  return (
    <div className="flex flex-col justify-center items-center bg-customGray w-full h-screen relative">
      {/* Header Section */}
      <div className="absolute top-0 w-full flex justify-between items-center p-4 bg-customGray">
        <Image src="/Main/icon2.png" alt="Logo" width={50} height={50} />
        <nav className="flex space-x-6">
          <a href="#" className="text-customWhite hover:text-customGray400">
            Home
          </a>
          <a href="#" className="text-customWhite hover:text-customGray400">
            Recipes
          </a>
          <a href="#" className="text-customWhite hover:text-customGray400">
            Articles
          </a>
          <a href="#" className="text-customWhite hover:text-customGray400">
            About Us
          </a>
        </nav>
      </div>
      {/* Main Content */}
      <div className="text-center max-w-2xl mx-auto mt-40">
        <h1 className="text-5xl font-bold text-customWhite mb-6">The Easiest Way To Make Your Favorite Meal</h1>
        <p className="text-lg text-customWhite mb-12">Discover 1000+ recipes in your hand with the best recipe. Help you to find the easiest way to cook.</p>
        <SignInButton text="Explore Recipes" />
      </div>
    </div>
  );
}
