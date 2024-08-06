import logo from "../../../../public/icon2.png";

export default function Footer() {
  return (
    <footer className="bg-gray-100 h-32 py-6 flex justify-center">
          <div className="w-1/3 flex flex-col text-center md:justify-end items-center gap-4 h-full">
          <img src={logo} alt="" className="object-cover size-11" />
          <p className="text-orange-400 font-normal">&copy; MealMaster - All rights reserved.</p>
          </div>
    </footer>
  );
}
