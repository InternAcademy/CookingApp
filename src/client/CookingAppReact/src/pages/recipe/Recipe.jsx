import { useParams } from "react-router-dom";
import { ClockIcon } from "@heroicons/react/24/outline";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

export default function Recipe() {
  let { recipeId } = useParams();
  return (
    <section className="flex w-full pl-28 pr-36 py-16 flex-col overflow-y-auto grow rounded-none md:rounded-2xl bg-white border-none md:border m-0 md:m-1 h-screen md:h-[calc(100vh-1vh)]">
      <section className="w-full  flex flex-row h-[32rem] bg-gray-100 rounded-2xl">
        <section className="w-2/3">
          <img
            className="h-full w-full object-cover rounded-2xl"
            src="https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/mbocpdne/1ed25fc7-72ab-4966-9922-ed5ec1d13fe0.jpg"
            alt=""
          />
        </section>
        <section className="py-12 px-8 w-1/3 flex flex-col gap-12 justify-center items-start">
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
        </section>
      </section>
      <section className="bg-gray-100 min-h-24 flex flex-row w-1/2 rounded-2xl mt-16 p-2">
        <section className="w-1/3 h-full flex flex-row justify-center items-center gap-2">
          <ClockIcon className="size-8" />
          <p className="text-lg">2 minutes</p>
        </section>
        <section className="w-1/3 h-full flex flex-row justify-center items-center gap-2">
          <UserGroupIcon className="size-8" />
          <p className="text-lg">4 portions</p>
        </section>
        <section className="w-1/3 h-full flex flex-row justify-center items-center gap-2">
          <CalendarDaysIcon className="size-8" />
          <p className="text-lg">1/12/2024</p>
        </section>
      </section>
      <section className="bg-gray-100 flex p-6 flex-row justify-around rounded-2xl w-full mt-16 gap-3">
        <section className="bg-white w-1/4 rounded-2xl px-6 py-4 flex flex-col items-center gap-4">
          <h2 className="text-xl mb-4">Ingredients</h2>
          <section className="bg-gray-100 rounded-2xl h-16 w-full p-1">
            <section className="border-orange-300 border-2 flex flex-row items-center justify-center w-full h-full rounded-2xl px-8 py-4">
              <p className="text-lg">1. Beans</p>
            </section>
          </section>
          <section className="bg-gray-100 rounded-2xl h-16 w-full p-1">
            <section className="border-orange-300 border-2 flex flex-row items-center justify-center w-full h-full rounded-2xl px-8 py-4">
              <p className="text-lg">1. Beans</p>
            </section>
          </section>
          <section className="bg-gray-100 rounded-2xl h-16 w-full p-1">
            <section className="border-orange-300 border-2 flex flex-row items-center justify-center w-full h-full rounded-2xl px-8 py-4">
              <p className="text-lg">1. Beans</p>
            </section>
          </section>
          <section className="bg-gray-100 rounded-2xl h-16 w-full p-1">
            <section className="border-orange-300 border-2 flex flex-row items-center justify-center w-full h-full rounded-2xl px-8 py-4">
              <p className="text-lg">1. Beans</p>
            </section>
          </section>
          <section className="bg-gray-100 rounded-2xl h-16 w-full p-1">
            <section className="border-orange-300 border-2 flex flex-row items-center justify-center w-full h-full rounded-2xl px-8 py-4">
              <p className="text-lg">1. Beans</p>
            </section>
          </section>
        </section>
        <section className="bg-white w-3/4 rounded-2xl px-6 py-4 flex flex-col items-center gap-4">
            <h2 className="text-xl mb-4">Preparation Steps</h2>
            <section className="bg-gray-100 rounded-2xl w-full p-1">
            <section className="border-orange-300 border-2 flex flex-row items-center justify-center w-full h-full rounded-2xl px-8 py-4">
              <p className="text-lg">1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </section>
          </section>
          <section className="bg-gray-100 rounded-2xl w-full p-1">
            <section className="border-orange-300 border-2 flex flex-row items-center justify-center w-full h-full rounded-2xl px-8 py-4">
              <p className="text-lg">1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </section>
          </section>
          <section className="bg-gray-100 rounded-2xl w-full p-1">
            <section className="border-orange-300 border-2 flex flex-row items-center justify-center w-full h-full rounded-2xl px-8 py-4">
              <p className="text-lg">1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </section>
          </section>
          <section className="bg-gray-100 rounded-2xl w-full p-1">
            <section className="border-orange-300 border-2 flex flex-row items-center justify-center w-full h-full rounded-2xl px-8 py-4">
              <p className="text-lg">1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </section>
          </section>
          <section className="bg-gray-100 rounded-2xl w-full p-1">
            <section className="border-orange-300 border-2 flex flex-row items-center justify-center w-full h-full rounded-2xl px-8 py-4">
              <p className="text-lg">1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
}
