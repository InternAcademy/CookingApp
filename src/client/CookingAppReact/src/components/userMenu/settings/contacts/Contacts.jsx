import "tailwindcss/tailwind.css";
import React from "react";

const Contacts = () => {

    return (
        <div className={`flex h-screen flex-col mx-auto p-4 min-h-screen bg-[#FFFFFF]
                        sm:w-full
                        md:w-full
                        lg:w-2/3
                        xl:w-2/3`
        }>
            <h1 className={`text-xl font-semibold mx-auto mb-4 text-gray-800`}>Contacts</h1>

            <div className="flex flex-col mb-5 w-full">
                <label className={`text-lg mb-2 text-gray-800`}>Subject</label>
                <input
                    type="text"
                    className={`h-12 border placeholder-slate-500 rounded-full px-3 w-full 
                                border-[#E5E7EB] bg-[#E5E7EB] text-black placeholder:text-[#555]
                                sm:px-3 sm:h-12 sm:text-sm 
                                md:px-6 md:h-14 md:text-sm 
                                lg:px-7 lg:h-16 lg:text-base 
                                xl:px-7 xl:h-14 xl:text-base`}
                    placeholder="What would you like to talk about?" />
            </div>
            <div className="flex flex-col mb-5 w-full">
                <label className={`text-lg mb-2 text-gray-800`}>Message</label>
                <textarea
                    className={`h-64 border placeholder-slate-500 rounded-lg px-3 pt-2 w-full 
                                border-[#E5E7EB] bg-[#E5E7EB] text-black placeholder:text-[#222]
                                sm:px-5 sm:pt-4 sm:text-sm 
                                md:px-6 md:pt-5 md:text-sm 
                                lg:px-7 lg:pt-6 lg:text-base 
                                xl:px-7 xl:pt-4 xl:text-base`}
                    placeholder="Enter your message here..."
                    rows="10"
                />
            </div>
            <button
                className={`h-12 flex justify-center items-center rounded-full transition duration-300 ease-in-out w-full 
                            border-2 border-[#EAB308] bg-[#EAB308] text-gray-800
                            hover:text-white hover:border-gray-300 hover:shadow-lg
                            sm:h-14 sm:text-sm 
                            md:h-16 md:text-sm 
                            lg:h-18 lg:text-base 
                            xl:h-14 xl:text-base`}>
                <span className={`text-lg`}>Send</span>
            </button>

        </div>
    );
};

export default Contacts;
