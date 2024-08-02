import { useParams } from "react-router-dom";
import { ClockIcon } from "@heroicons/react/24/outline";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import useRecipeDetails from "@/hooks/useRecipeDetails";
import { useEffect } from "react";
// import Icon1 from "../../assets/stepsimages/01-01.png";
// import Icon2 from "../../assets/stepsimages/02-01.png";
// import Icon3 from "../../assets/stepsimages/03-01.png";
// import Icon4 from "../../assets/stepsimages/04-01.png";
// import Icon5 from "../../assets/stepsimages/05-01.png";
// import Icon6 from "../../assets/stepsimages/06-01.png";
// import Icon7 from "../../assets/stepsimages/07-01.png";
// import Icon8 from "../../assets/stepsimages/08-01.png";
// import Icon9 from "../../assets/stepsimages/09-01.png";
// import Icon10 from "../../assets/stepsimages/10-01.png";
// import Icon11 from "../../assets/stepsimages/11-01.png";
// import Icon12 from "../../assets/stepsimages/12-01.png";
// import Icon13 from "../../assets/stepsimages/13-01.png";
// import Icon14 from "../../assets/stepsimages/14-01.png";
// import Icon15 from "../../assets/stepsimages/15-01.png";
// import Icon16 from "../../assets/stepsimages/16-01.png";
// import Icon17 from "../../assets/stepsimages/17-01.png";
// import Icon18 from "../../assets/stepsimages/18-01.png";
// import Icon19 from "../../assets/stepsimages/19-01.png";
// import Icon20 from "../../assets/stepsimages/20-01.png";
// import Icon21 from "../../assets/stepsimages/21-01.png";
// import Icon22 from "../../assets/stepsimages/22-01.png";
// import Icon23 from "../../assets/stepsimages/23-01.png";
// import Icon24 from "../../assets/stepsimages/24-01.png";
// import Icon25 from "../../assets/stepsimages/25-01.png";

// const icons = [
//   Icon1,
//   Icon2,
//   Icon3,
//   Icon4,
//   Icon5,
//   Icon6,
//   Icon7,
//   Icon8,
//   Icon9,
//   Icon10,
//   Icon11,
//   Icon12,
//   Icon13,
//   Icon14,
//   Icon15,
//   Icon16,
//   Icon17,
//   Icon18,
//   Icon19,
//   Icon20,
//   Icon21,
//   Icon22,
//   Icon23,
//   Icon24,
//   Icon25,
// ];

// Import all images dynamically
const iconImports = import.meta.glob('../../assets/stepsimages/*.png', { eager: true });

// Create an array of the imported images
const icons = Object.values(iconImports).map((mod) => mod.default);;

// Now you can use iconArray as needed in your component
console.log(icons); // This will log all the imported images


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
          <div className="bg-gray-100 h-fit flex flex-col lg:flex-row w-fit xl:w-1/2 rounded-2xl mt-16 p-5 gap-4">
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
          <div className="flex bg-gray-100 py-6 flex-col justify-center items-start rounded-2xl w-full mt-16">
            <div className="w-full rounded-2xl px-6 py-4 flex flex-col items-start gap-4">
              <h2 className="text-xl mb-4">Ingredients</h2>
              <div className="flex flex-row flex-wrap justify-start items-center gap-2">
                {data.ingredients.map((ingredient) => (
                  <div className="border-2 border-orange-300 flex items-center w-fit justify-center rounded-2xl px-8 py-4">
                    <p className="text-lg">{`${ingredient.quantity} ${ingredient.metric} ${ingredient.name}`}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full rounded-2xl px-6 py-4 flex flex-col items-start gap-4">
              <h2 className="text-xl mb-4">Preparation Steps</h2>
              {data.preparationSteps.map((step, index) => (
                <div className="rounded-2xl w-full p-1">
                  <div className="border flex flex-col items-center md:items-start justify-start w-full h-full rounded-2xl px-8 py-4">
                    <div className="text-center text-black text-3xl font-light md:flex md:flex-row md:items-center md:gap-2">
                      <img
                        className="size-14"
                        src={icons[index % icons.length]}
                      />
                      <p className="">{index + 1}</p>
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
