import "tailwindcss/tailwind.css";
import React from "react";

const Contacts = () => {

    return (
        <div className={`flex h-screen flex-col mx-auto p-4 min-h-screen 
    smallPhone:w-full
    phone:w-full
    table:w-2/3
    web:w-2/3`
        }>
            <h1 className={`text-xl font-semibold mx-auto mb-4`}>Contacts</h1>

            <div className="flex flex-col mb-5 w-full">
                <label className={`text-lg mb-2`}>Subject</label>
                <input
                    type="text"
                    className={`h-12 border border-primaryBorder placeholder-slate-500 rounded-full px-3 w-full 
        smallPhone:px-3 smallPhone:h-12 smallPhone:text-sm 
        phone:px-6 phone:h-14 phone:text-sm 
        table:px-7 tablet:h-16 tablet:text-base 
        web:px-7 web:h-14 web:text-base`}
                    placeholder="What would you like to talk about?" />
            </div>
            <div className="flex flex-col mb-5 w-full">
                <label className={`text-lg mb-2`}>Message</label>
                <textarea
                    className={`h-64 border placeholder-slate-500 
        rounded-lg px-3 pt-2 w-full 
        smallPhone:px-5 smallPhone:pt-4 smallPhone:text-sm 
        phone:px-6 phone:pt-5 phone:text-sm 
        tablet:px-7 tablet:pt-6 tablet:text-base 
        web:px-7 web:pt-4 web:text-base`}
                    placeholder="Enter your message here..."
                    rows="10"
                />
            </div>
            <button
                className={`h-12 flex justify-center items-center rounded-full transition duration-300 ease-in-out w-full 
        smallPhone:h-14 smallPhone:text-sm 
        phone:h-16 phone:text-sm 
        tablet:h-18 tablet:text-base 
        web:h-14 web:text-base`}>
                <span className={`text-lg`}>Send</span>
            </button>

        </div>
    );
};

export default Contacts;
