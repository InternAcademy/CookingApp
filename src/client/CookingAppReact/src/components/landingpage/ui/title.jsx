import { SignInButton } from "../../auth/SignInButton";
import { SparklesIcon } from "@heroicons/react/24/outline";
import PhoneImg from "../../../assets/landing/iphone4.png";
import QrImage from "../../../assets/landing/qrcode.png";

export default function Title() {
  return (
    <section className="relative">
      <section className="bg-base">
        {/* <PageIllustration /> */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="pb-12 pt-32 md:pb-20 md:pt-40">
            <div className="pb-12 text-center md:pb-16">
              <h1
                className="mb-6 md:text-8xl text-6xl font-bold" //border-y  [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1]
              >
                MEAL PLANNING MADE
                <br />
                <span className="text-[#fb923c]">SIMPLE</span>
              </h1>
              <div className="mx-auto max-w-3xl">
                <p className="mb-8 text-lg text-gray-700">
                  Get started today and discover how MealMaster can make every
                  meal a masterpiece.
                </p>
                <div className="btn group mb-4 w-full flex justify-center items-center text-center">
                  <SignInButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
//#fb923c - warm or
//crema or - #fff7ed
//
