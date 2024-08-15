import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { CurrencyEuroIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import useGift from "@/hooks/useGift";
import { getToken } from "@/msal/msal";
const chartConfig = {
  type: "line",
  height: 240,
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: "",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#020617"],
    stroke: {
      lineCap: "round",
      curve: "smooth",
    },
    markers: {
      size: 1,
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: "dark",
    },
  },
};

export default function Admin() {
  const ref = useRef();
  const { mutate } = useGift();
  async function handleGifting() {
    if (ref.current.value && ref.current.value !== "") {
      const token = await getToken();
      mutate({ token: token, userId: ref.current.value });
      ref.current.value = "";
    }
  }
  return (
    <>
      <div className="p-10">
        <Card className="p-10 w-full lg:w-3/5">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            <div className="w-max rounded-lg bg-orange-300 p-5 m-2 primaryText">
              <CurrencyEuroIcon className="h-6 w-6" />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray">
                Sales this week
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="max-w-sm font-normal"
              >
                For the period mon - sun
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="px-2 pb-0">
            <Chart {...chartConfig} />
          </CardBody>
        </Card>
      </div>
      <div className="flex flex-col w-96 justify-center items-center p-5">
        <h1 className="text-gray-800 font-semibold text-lg">
          {"Gift 100 chat tokens & 10 recipe tokens"}
        </h1>
        <input
          type="text"
          placeholder="User ID"
          className="w-full mt-2 border shadow-sm rounded-2xl px-5 py-2"
          ref={ref}
        />
        <button
          className="px-5 py-1 rounded-2xl border bg-primary mt-2"
          onClick={handleGifting}
        >
          Gift
        </button>
      </div>
    </>
  );
}
