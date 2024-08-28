import { SignInButton } from "../../auth/SignInButton";
import { SparklesIcon } from "@heroicons/react/24/outline";
import PhoneImg from "../../../assets/landing/iphone4.png";
import QrImage from "../../../assets/landing/qrcode.png";
import Logo from "./logo";
import Footer from "./footer";
// Example video source
import BackgroundVideo from "../../../../public/salad.mp4";

export default function Title() {
  return (
    <>
    <section className="h-full overflow-hidden pt-6">
      <header className=" relative  overflow-hidden bg-base py-4 px-10 lg:px-32 flex flex-row justify-center items-center md:justify-between z-20">
        <div className="flex items-center gap-2 md:gap-5">
          <Logo />
          <h1 className="font-bold text-2xl primaryText">Meal Master</h1>
        </div>
        <div className="hidden md:block">
          <SignInButton />
        </div>
      </header>
      <div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white z-10 "></div>
        {/* Video Background */}
        <video
          className="absolute w-full h-3/4 object-cover z-0 blur-sm"
          src={BackgroundVideo}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      <div className="relative bg-base z-20 ">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="pb-12 pt-32 md:pb-20 md:pt-40">
            <div className="pb-12 text-center md:pb-16">
              <h1
                className="mb-6 md:text-8xl text-6xl font-bold"
              >
                SAVING TIME
                <br />
                <span className="text-[#fb923c]">ONE MEAL AT A TIME</span>
              </h1>
              <div className="mx-auto max-w-3xl">
                <p className="mb-8 text-lg text-gray-700">
                  Get tailored recipes fast with MealMaster's AI powered chat.
                </p>
                <div className="btn group mb-4 w-full flex justify-center items-center text-center">
                  <SignInButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
    </>
  );
}
