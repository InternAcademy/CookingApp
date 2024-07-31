import { ClockIcon } from "@heroicons/react/24/outline";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { IoArchiveOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function RecipeCard(){
    const isOpen = useSelector(state => state.ui.recipesOpen);
    let navigate = useNavigate()
    function handleClick(){
        navigate("/recipe/1")
    }
    return (
        <section className="group flex flex-col bg-white w-3/4 h-72 rounded-2xl pb-2 border hover:cursor-pointer transition" onClick={handleClick}>
            <img className={`h-4/6 object-cover rounded-t-2xl shadow-inner ${isOpen ? "duration-300" : ""} group-hover:h-2/4`} src='https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/mbocpdne/1ed25fc7-72ab-4966-9922-ed5ec1d13fe0.jpg' alt="Image Description"></img>
            <h2 className="font-medium px-4 py-2 text-xl">Bean soup with garlic</h2>
            <div className="w-full px-8 mb-3 text-gray-500 transition-all invisible group-hover:visible overflow-hidden">
                <p className="w-full ">re! How can I help you today? Hey there! How can I help you today?</p>
            </div>
            <section className="flex flex-row justify-between px-4">
                <div className="flex w-24 flex-row justify-start gap-2 ms-4">            
                    <ClockIcon className="size-6" />
                    <p className="w-full">2 minutes</p>
                </div>
                <div className="flex w-24 flex-row justify-end gap-2 me-4">            
                    <UserGroupIcon className="size-6"/>    
                    <p>4</p>
                </div>
            </section>
        </section>
    );
}