import { FaRegClock } from "react-icons/fa";
import { PiCookingPotBold } from "react-icons/pi";
import { IoArchiveOutline } from "react-icons/io5";

export default function Recipe(){
    return (
        <section className="flex flex-col bg-white w-3/4 min-h-56 rounded-2xl pb-2 shadow-md">
            <img className="h-2/3 object-cover  rounded-t-2xl shadow-inner" src='https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/mbocpdne/1ed25fc7-72ab-4966-9922-ed5ec1d13fe0.jpg'></img>
            <h2 className="font-medium px-4 py-2 text-xl">Bean soup with garlic</h2>
            <section className="flex flex-row justify-between px-4">
                <div className="flex w-24 flex-row justify-center gap-2 items-center">            
                    <FaRegClock />
                    <p>2 minutes</p>
                </div>
                <div className="flex w-24 flex-row justify-center gap-2 items-center">            
                    <PiCookingPotBold className="text-[1.5rem]"/>    
                    <p>4</p>
                </div>
                <div className="flex w-12 px-2 py-2 flex-row justify-center rounded-2xl gap-2 items-center hover:bg-orange-300 hover:text-white">            
                    <IoArchiveOutline className="text-[1.5rem]"/>                    
                </div>
            </section>
        </section>
    );
}