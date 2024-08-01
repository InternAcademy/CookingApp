import { useParams } from "react-router-dom";
import { ClockIcon } from "@heroicons/react/24/outline";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import useRecipeDetails from "@/hooks/useRecipeDetails";
import { useEffect } from "react";
function getFormattedDate(datetime) {
  const date = new Date(datetime);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  const formattedDate = `${month}/${day}/${year}`;

  return formattedDate;
}
export default function Recipe() {
  let { recipeId } = useParams();
  const { data, isPending, isError, refetch } = useRecipeDetails(recipeId);
  return (
    <section className="flex w-full pl-28 pr-36 py-16 flex-col overflow-y-auto grow rounded-none md:rounded-2xl bg-white border-none md:border m-0 md:m-1 h-screen md:h-[calc(100vh-1vh)]">
      {data && !isError && (
        <>
          <section className="w-full  flex flex-row h-[32rem] bg-gray-100 rounded-2xl">
            <section className="w-2/3">
              <img
                className="h-full w-full object-cover rounded-2xl"
                src={data.imageUrl}
                alt=""
              />
            </section>
            <section className="py-12 px-8 w-1/3 flex flex-col gap-12 justify-center items-start">
              <h1 className="text-4xl font-medium">{data.title}</h1>
              <p className="text-base">{data.description}</p>
            </section>
          </section>
          <section className="bg-gray-100 min-h-24 flex flex-row w-1/2 rounded-2xl mt-16 p-2">
            <section className="w-1/3 h-full flex flex-row justify-center items-center gap-2">
              <ClockIcon className="size-8" />
              <p className="text-lg">{data.duration}</p>
            </section>
            <section className="w-1/3 h-full flex flex-row justify-center items-center gap-2">
              <UserGroupIcon className="size-8" />
              <p className="text-lg">{data.numberOfPortions}</p>
            </section>
            <section className="w-1/3 h-full flex flex-row justify-center items-center gap-2">
              <CalendarDaysIcon className="size-8" />
              <p className="text-lg">
                {getFormattedDate(data.createdDateTime)}
              </p>
            </section>
          </section>
          <section className="bg-gray-100 flex p-6 flex-row justify-around rounded-2xl w-full mt-16 gap-3">
            <section className="bg-white w-1/4 rounded-2xl px-6 py-4 flex flex-col items-center gap-4">
              <h2 className="text-xl mb-4">Ingredients</h2>
              {data.ingredients.map((ingredient) => (
                <section className="bg-gray-100 rounded-2xl h-16 w-full p-1">
                  <section className="border-orange-300 border-2 flex flex-row items-center justify-center w-full h-full rounded-2xl px-8 py-4">
                    <p className="text-lg">{`${ingredient.quantity} ${ingredient.metric} ${ingredient.name}`}</p>
                  </section>
                </section>
              ))}
            </section>
            <section className="bg-white w-3/4 rounded-2xl px-6 py-4 flex flex-col items-center gap-4">
              <h2 className="text-xl mb-4">Preparation Steps</h2>
              {data.preparationSteps.map((step) => (
                <section className="bg-gray-100 rounded-2xl w-full p-1">
                  <section className="border-orange-300 border-2 flex flex-row items-center justify-center w-full h-full rounded-2xl px-8 py-4">
                    <p className="text-lg">{step}</p>
                  </section>
                </section>
              ))}
            </section>
          </section>
        </>
      )}
    </section>
  );
}
