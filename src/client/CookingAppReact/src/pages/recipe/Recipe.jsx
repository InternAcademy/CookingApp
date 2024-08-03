import { useParams } from "react-router-dom";
import { ClockIcon } from "@heroicons/react/24/outline";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import useRecipeDetails from "@/hooks/useRecipeDetails";

const iconImports = import.meta.glob('../../assets/stepsimages/*.png', { eager: true });

const icons = Object.values(iconImports).map((mod) => mod.default);;

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
    <div className="flex w-full pl-5 pr-5 xl:pl-28 xl:pr-36 py-16 flex-col overflow-y-auto">
      {data && !isError && (
        <>
          <div className="w-full flex flex-col xl:flex-row xl:h-[32rem] bg-gray-100 rounded-2xl">
            <div className="w-full xl:w-2/3">
              <img
                className="h-full w-full object-cover rounded-2xl"
                src={data.imageUrl}
                alt=""
              />
            </div>
            <div className="py-12 px-8 w-full xl:w-1/3 flex flex-col gap-12 justify-center items-start">
              <h1 className="text-4xl font-medium">{data.title}</h1>
              <p className="text-base">{data.description}</p>
            </div>
          </div>
          <div className="h-fit bg-gray-100 flex content-start items-start flex-col lg:flex-row w-fit xl:w-1/2 rounded-2xl mt-16 p-5 gap-4">
            <div className="lg:w-1/3 h-full flex flex-row justify-center items-center gap-2">
              <ClockIcon className="size-8" />
              <p className="text-lg">{data.duration}</p>
            </div>
            <div className="lg:w-1/3 h-full flex flex-row justify-center items-center gap-2">
              <UserGroupIcon className="size-8" />
              <p className="text-lg">{data.numberOfPortions}</p>
            </div>
            <div className="lg:w-1/3 h-full flex flex-row justify-center items-center gap-2">
              <CalendarDaysIcon className="size-8" />
              <p className="text-lg">
                {getFormattedDate(data.createdDateTime)}
              </p>
            </div>
          </div>
          <div className="flex py-6 flex-col lg:flex-row justify-center items-start rounded-2xl w-full mt-16">
            <div className="w-full rounded-2xl px-6 py-4 flex flex-col items-start gap-4">
              <h2 className="text-xl mb-4">Ingredients</h2>
              <div className="grid grid-cols-1  gap-2">
                {data.ingredients.map((ingredient) => (
                  <div className="border-l-2 border-orange-200 shadow-sm rounded-e-xl col-span-1 items-center w-fit justify-center px-8 py-4">
                    <p className="text-lg">• {`${ingredient.quantity} ${ingredient.metric} ${ingredient.name}`}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full rounded-2xl px-6 py-4 flex flex-col items-start gap-4">
              <h2 className="text-xl mb-4">Preparation Steps</h2>
              {data.preparationSteps.map((step, index) => (
                <div className="rounded-2xl bg-orange-50 w-full p-1">
                  <div className="border flex flex-col items-center md:items-start justify-start w-full h-full rounded-2xl px-8 py-4">
                    <div className="text-center text-black text-3xl font-light flex flex-row items-center md:gap-2">
                      <p className="text-xl font-semibold mr-2">Step {index + 1}</p>
                      <img
                        className="size-8"
                        src={icons[index % icons.length]}
                      />
                    </div>
                    <p className="text-lg">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
