// // components/LandingPage.jsx
// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Cookies from "js-cookie";
// import { handleLogin, initializeMsal } from "@/msal/msal";
// import { getLoggedInUser, isUserAllowed } from "@/msal/userHelper";

// const LandingPage = () => {
//   const [isDarkTheme, setIsDarkTheme] = useState(false);
//   const [error, setError] = useState(null);

//   const user = getLoggedInUser();
//   console.log(`User ${JSON.stringify(user)}`);

//   return (
//     <div className={`flex flex-col justify-center items-center bg-customOrange w-full h-full`}>
//       <div className="mb-20">
//         <Image src="/Main/icon2_dark.png" alt="Icon" width={100} height={100} />
//       </div>
//       <h1 className={`text-2xl font-bold ${isDarkTheme ? "text-customWhite" : "text-basicBlack"} mb-2`}>Let's Get Started</h1>
//       <p className={`text-lg px-4 ${isDarkTheme ? "text-customGray400" : "text-customWhite"} text-center mb-8`}>Easy way to manage all your cooking tasks as easy as tapping your finger</p>
//       <button onClick={() => handleLogin("redirect")} className="bg-basicWhite py-4 px-10 mt-40 -mb-46 rounded-full">
//         <span className={`text-lg font-bold ${isDarkTheme ? "text-customGray" : "text-customOrange"}`}>Get Started</span>
//       </button>
//     </div>
//   );
// };

// export default LandingPage;
