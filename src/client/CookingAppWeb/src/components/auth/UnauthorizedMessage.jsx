import { SignInButton } from "./SignInButton";
import Image from "next/image";
import { useRef } from "react";

export default function UnauthorizedMessage() {
  const downloadRef = useRef(null);

  const scrollToDownload = () => {
    if (downloadRef.current) {
      downloadRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-customOrange w-full min-h-screen relative">
      {/* Home Section */}
      <div className="relative w-full min-h-screen flex flex-col justify-center items-center">
        <div className="absolute top-0 w-full flex justify-between items-center p-4 bg-customOrange">
          <div className="flex items-center">
            <Image src="/Main/icon2_dark.png" alt="Logo" width={50} height={50} />
            <span className="text-customWhite text-xl ml-2">MealMasterBot</span>
          </div>
          <nav className="flex space-x-6">
            <a href="#" className="text-customWhite hover:text-customGray400">
              Home
            </a>
            <a href="#recipes" className="text-customWhite hover:text-customGray400">
              Recipes
            </a>
            <a href="#" className="text-customWhite hover:text-customGray400" onClick={scrollToDownload}>
              Download
            </a>
            <a href="#about" className="text-customWhite hover:text-customGray400">
              About Us
            </a>
          </nav>
        </div>
        <div className="text-center max-w-2xl mx-auto mt-40">
          <h1 className="text-5xl font-bold text-customWhite mb-6">The Easiest Way To Make Your Favorite Meal</h1>
          <p className="text-lg text-customWhite mb-12">Discover 1000+ recipes in your hand with the best recipe. Help you to find the easiest way to cook.</p>
          <SignInButton text="Get Started" />
        </div>
      </div>
      {/* Recipes Section */}
      <div id="recipes" className="relative w-full min-h-screen">
        <Image src="/Main/Recipes.jpg" alt="Recipes Background" layout="fill" objectFit="cover" quality={100} className="absolute top-0 left-0 w-full h-full" />
        <div className="relative z-10 flex justify-center items-center h-full">
          <h2 className="text-5xl font-bold text-customWhite">Discover Recipes</h2>
        </div>
      </div>
      {/* Download Section */}
      <div ref={downloadRef} className="w-full flex justify-center items-center p-6 bg-customOrange min-h-screen">
        <div className="flex flex-col items-center">
          <div className="relative overflow-hidden">
            <Image src="/Main/2PhoneThatShouldBeVisibleOnlyHalfUpperSide.png" alt="2 Phones" width={300} height={600} className="object-contain max-h-full" />
          </div>
        </div>
        <div className="text-center max-w-md ml-8">
          <h2 className="text-3xl font-bold text-customWhite mb-4">Download App</h2>
          <p className="text-lg text-customWhite mb-6 leading-relaxed">
            Download the app from App Store or Google Play
            <br />
            for a better experience.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
              <Image src="/Main/apple_store.png" alt="App Store" width={150} height={50} />
            </a>
            <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
              <Image src="/Main/google_play.png" alt="Google Play" width={150} height={50} />
            </a>
          </div>
        </div>
      </div>
      {/* About Us Section */}
      <div id="about" className="w-full bg-customGray p-8 text-customWhite flex flex sm:flex-row justify-between items-start sm:items-center">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <Image src="/Main/icon2_dark.png" alt="Logo" width={50} height={50} />
          <div className="ml-4">
            <h2 className="text-lg font-bold">Cookpedia</h2>
            <p className="text-lg text-customWhite mb-12">
              Discover endless recipes at your fingertips.
              <br />
              Find the best recipe easily.
              <br />
              Cooking made simple and fun.
            </p>
          </div>
        </div>

        <div className="flex sm:flex-row">
          <div>
            <h4 className="font-semibold">Menu</h4>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Recipes
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Articles
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Help</h4>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Privacy and Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Term of Use
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Social</h4>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Youtube
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
