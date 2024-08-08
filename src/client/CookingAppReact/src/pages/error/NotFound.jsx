import React from "react";
import Lottie from "lottie-react";
import animation from "../../../public/notFound.json";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <Link
      className="flex w-full h-screen justify-center bg-[rgb(254,245,189)]"
      to={"/"}
    >
      <Lottie
        animationData={animation}
        loop={true}
        autoplay={true}
        style={{ width: "50%" }}
      />
    </Link>
  );
}
