import PageIllustration from "../ui/page-illustration";
import Avatar01 from "../../../assets/imgavatar/avatar-01.jpg";
import Avatar02 from "../../../assets/imgavatar/avatar-02.jpg";
import Avatar03 from "../../../assets/imgavatar/avatar-03.jpg";
import Avatar04 from "../../../assets/imgavatar/avatar-04.jpg";
import Avatar05 from "../../../assets/imgavatar/avatar-05.jpg";
import Avatar06 from "../../../assets/imgavatar/avatar-06.jpg";
import { SignInButton } from "../../auth/SignInButton";
import { SparklesIcon } from "@heroicons/react/24/outline";
import CookingImg from "../../../assets/landing/cooking.jpg";

export default function HeroHome() {
  return (
    <section className="relative">
      <section className="bg-gray-100">
        {/* <PageIllustration /> */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="pb-12 pt-32 md:pb-20 md:pt-40">
            <div className="pb-12 text-center md:pb-16">
              <div
                className="mb-6" //border-y [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1]
                data-aos="zoom-y-out"
              ></div>
              <h1
                className="mb-6 md:text-8xl text-8xl font-bold" //border-y  [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1]
              >
                MEAL PLANNING MADE
                <br className="max-lg:hidden" />
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
      <section className="bg-[#fb923c] w-full h-[48rem] flex flex-col gap-12 items-center">
        <div className="w-full h-1/4 px-48 py-32 font-bold flex justify-center items-center text-center">
          <h2 className="text-7xl text-white">
            THE{" "}
            <span className="bg-white block text-[#fb923c] skew-y-[-2deg] py-3 my-1">
              MOST ADVANCED{" "}
            </span>{" "}
            CULINARY ASSISTANT
          </h2>
        </div>
        <div className="text-center px-16 w-1/2 text-lg">
          <p className="text-white">
            MealMaster is your ultimate cooking assistant, designed to make meal
            preparation effortless and enjoyable. With cutting-edge AI
            technology, MealMaster offers:
          </p>
        </div>
        <div className="w-full flex flex-row h-full mb-28 px-24">
          <div className="w-1/4 h-full flex flex-col items-center justify-start text-center gap-6 text-lg px-5 border-r border-dashed border-white">
            <div className="h-40 w-40 bg-[#fb9d50] rounded-full flex justify-center items-center">
              <SparklesIcon className="h-1/2 w-1/2 text-white" />
            </div>
            <h3 className="text-white">
              Personalized Recipes: Tailored to your dietary preferences and
              taste.
            </h3>
          </div>
          <div className="w-1/4 h-full flex flex-col items-center justify-start text-center gap-6 text-lg px-5 border-r border-dashed border-white">
            <div className="h-40 w-40 bg-[#fb9d50] rounded-full flex justify-center items-center">
              <SparklesIcon className="h-1/2 w-1/2 text-white" />
            </div>
            <h3 className="text-white">
              Personalized Recipes: Tailored to your dietary preferences and
              taste.
            </h3>
          </div>
          <div className="w-1/4 h-full flex flex-col items-center justify-start text-center gap-6 text-lg px-5 border-r border-dashed border-white">
            <div className="h-40 w-40 bg-[#fb9d50] rounded-full flex justify-center items-center">
              <SparklesIcon className="h-1/2 w-1/2 text-white" />
            </div>
            <h3 className="text-white">
              Personalized Recipes: Tailored to your dietary preferences and
              taste.
            </h3>
          </div>
          <div className="w-1/4 h-full flex flex-col items-center justify-start text-center gap-6 text-lg px-5">
            <div className="h-40 w-40 bg-[#fb9d50] rounded-full flex justify-center items-center">
              <SparklesIcon className="h-1/2 w-1/2 text-white" />
            </div>
            <h3 className="text-white">
              Personalized Recipes: Tailored to your dietary preferences and
              taste.
            </h3>
          </div>
        </div>
      </section>
      <section className="h-[64rem] bg-gray-100 p-16">
        <section className="bg-white h-full w-full rounded-3xl flex flex-col p-12 text-center gap-6">
          <div className="h-full w-full rounded-3xl bg-[#fb923c] p-16 flex justify-start items-center">
            <div className="w-2/3 h-full flex justify-center">
              <div className="bg-white h-full w-1/2 rotate-[-6deg] rounded-3xl">
              <img src={CookingImg} alt="" className="object-cover rounded-3xl" />
              </div>
            </div>
            <div className="w-1/3 h-full pt-24 flex flex-col justify-start gap-12">
              <h2 className="text-white text-6xl font-bold">DOWNLOAD OUR APP</h2>
              <p className="text-white">Cooking has never been easier. Download the MealMaster app on your mobile device today and have a personal chef right in your pocket. Available on:</p>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}
//#fb923c - warm or
//crema or - #fff7ed
//
