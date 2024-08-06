import { SparklesIcon } from "@heroicons/react/24/outline";

export default function Benefits(){
    return (
    <section className="bg-[#fb923c] w-full md:h-[48rem] flex flex-col gap-12 items-center">
        <div className="w-full h-1/4 px-48 py-12 md:py-32 font-bold flex justify-center items-center text-center">
          <h2 className="text-5xl md:text-7xl text-white">
            THE{" "}
            <span className="bg-white block text-[#fb923c] skew-y-[-2deg] py-3 my-1">
              MOST ADVANCED{" "}
            </span>{" "}
            CULINARY ASSISTANT
          </h2>
        </div>
        <div className="text-center md:px-16 md:w-1/2 text-lg">
          <p className="text-white">
            MealMaster is your ultimate cooking assistant, designed to make meal
            preparation effortless and enjoyable. With cutting-edge AI
            technology, MealMaster offers:
          </p>
        </div>
        <div className="w-full flex flex-col md:flex-row h-full mb-28 px-24 gap-6">
          <div className="md:w-1/4 h-full flex flex-col items-center justify-start text-center gap-6 text-lg px-5 md:border-r md:border-dashed md:border-white">
            <div className="h-40 w-40 bg-[#fb9d50] rounded-full flex justify-center items-center">
              <SparklesIcon className="h-1/2 w-1/2 text-white" />
            </div>
            <h3 className="text-white">
              Personalized Recipes: Tailored to your dietary preferences and
              taste.
            </h3>
          </div>
          <div className="md:w-1/4 h-full flex flex-col items-center justify-start text-center gap-6 text-lg px-5 md:border-r md:border-dashed md:border-white">
            <div className="h-40 w-40 bg-[#fb9d50] rounded-full flex justify-center items-center">
              <SparklesIcon className="h-1/2 w-1/2 text-white" />
            </div>
            <h3 className="text-white">
              Personalized Recipes: Tailored to your dietary preferences and
              taste.
            </h3>
          </div>
          <div className="md:w-1/4 h-full flex flex-col items-center justify-start text-center gap-6 text-lg px-5 md:border-r md:border-dashed md:border-white">
            <div className="h-40 w-40 bg-[#fb9d50] rounded-full flex justify-center items-center">
              <SparklesIcon className="h-1/2 w-1/2 text-white" />
            </div>
            <h3 className="text-white">
              Personalized Recipes: Tailored to your dietary preferences and
              taste.
            </h3>
          </div>
          <div className="md:w-1/4 h-full flex flex-col items-center justify-start text-center gap-6 text-lg px-5 md:border-r md:border-dashed md:border-white">
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
      );
}