import { useParams } from "react-router-dom";
import { ClockIcon } from "@heroicons/react/24/outline";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

export default function Recipe() {
  let { recipeId } = useParams();
  return (
    <div className="flex w-full pl-5 pr-5 xl:pl-28 xl:pr-36 py-16 flex-col overflow-y-auto">
      <div className="w-full flex flex-col xl:flex-row xl:h-[32rem] bg-gray-100 rounded-2xl">
        <div className="w-full xl:w-2/3">
          <img
            className="h-full w-full object-cover rounded-2xl"
            src="https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/mbocpdne/1ed25fc7-72ab-4966-9922-ed5ec1d13fe0.jpg"
            alt=""
          />
        </div>
        <div className="py-12 px-8 w-full xl:w-1/3 flex flex-col gap-12 justify-center items-start">
          <h1 className="text-4xl font-medium">Bean soup with garlic sauce</h1>
          <p className="text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
      <div className="bg-gray-100 h-fit flex flex-col lg:flex-row w-fit xl:w-1/2 rounded-2xl mt-16 p-5 gap-4">
        <div className="lg:w-1/3 h-full flex flex-row justify-center items-center gap-2">
          <ClockIcon className="size-8" />
          <p className="text-xl">2 minutes</p>
        </div>
        <div className="lg:w-1/3 h-full flex flex-row justify-center items-center gap-2">
          <UserGroupIcon className="size-8" />
          <p className="text-xl">4 portions</p>
        </div>
        <div className="lg:w-1/3 h-full flex flex-row justify-center items-center gap-2">
          <CalendarDaysIcon className="size-8" />
          <p className="text-xl">1/12/2024</p>
        </div>
      </div>
      <div className="flex p-6 flex-col justify-center items-center rounded-2xl w-full mt-16">
        <div className="bg-white w-full rounded-2xl px-6 py-4 flex flex-col items-start gap-4">
          <h2 className="text-xl mb-4">Ingredients</h2>
          <div className="flex flex-row flex-wrap justify-start items-center gap-2">
            <div className="border-2 border-orange-200 flex items-center w-fit justify-center rounded-2xl px-8 py-4">
              <p className="text-xl">aBaaansads</p>
            </div>
            <div className="border-2 border-orange-200 flex items-center w-fit justify-center rounded-2xl px-8 py-4">
              <p className="text-xl">aBaaansads</p>
            </div>
            <div className="border-2 border-orange-200 flex items-center w-fit justify-center rounded-2xl px-8 py-4">
              <p className="text-xl">aBaaaaaaaansads</p>
            </div>
            <div className="border-2 border-orange-200 flex items-center w-fit justify-center rounded-2xl px-8 py-4">
              <p className="text-xl">aBaaaaaaaaaaaaaansads</p>
            </div>
            <div className="border-2 border-orange-200 flex items-center w-fit justify-center rounded-2xl px-8 py-4">
              <p className="text-xl">aBaaansads</p>
            </div>
            <div className="border-2 border-orange-200 flex items-center w-fit justify-center rounded-2xl px-8 py-4">
              <p className="text-xl">aBaaaaaaaaaaansads</p>
            </div>
            <div className="border-2 border-orange-200 flex items-center w-fit justify-center rounded-2xl px-8 py-4">
              <p className="text-xl">aBaaansads</p>
            </div>
          </div>
        </div>
        <div className="bg-white w-full rounded-2xl px-6 py-4 flex flex-col items-start gap-4">
            <h2 className="text-xl mb-4">Preparation Steps</h2>
              <div className=" border flex flex-row items-center justify-center w-full h-full rounded-2xl px-8 py-4">
                <p className="text-xl">1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
              <div className=" border flex flex-row items-center justify-center w-full h-full rounded-2xl px-8 py-4">
                <p className="text-xl">1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
              <div className=" border flex flex-row items-center justify-center w-full h-full rounded-2xl px-8 py-4">
                <p className="text-xl">1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
              <div className=" border flex flex-row items-center justify-center w-full h-full rounded-2xl px-8 py-4">
                <p className="text-xl">1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
        </div>
      </div>
    </div>
  );
}
