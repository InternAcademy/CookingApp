"use client";
import "tailwindcss/tailwind.css";
import React, { useState } from "react";
import { useTheme } from "next-themes";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { useSelector } from "react-redux";
// import { fetchSubs, createSub } from "../../http/subs";
// import jwtDecode from "jwt-decode";
// import Spinner from "../components/Spinner";

const Subscription = () => {
  // const queryClient = useQueryClient();
  // const { isLoading, isError, data, error } = useQuery("subs", async () => {
  //   const token = localStorage.getItem("token");
  //   return fetchSubs(token);
  // });

  // const {
  //   mutate,
  //   isLoading: isSubscribing,
  //   isError: isSubError,
  //   error: subError
  // } = useMutation(createSub, {
  //   onSuccess: data => {
  //     console.log(data);
  //     window.open(data.data.invoiceUrl, "_blank").focus();
  //     queryClient.invalidateQueries("subs");
  //   }
  // });

  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  async function handleSelection(id) {
    const token = localStorage.getItem("token");
    // const cred = jwtDecode(token);
    // console.log(cred.preferred_username);
    // mutate({ token: token, email: cred.preferred_username, priceId: id });
  }

  const faqs = [
    {
      question: "What's the most frequently asked question?",
      answer: "Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list."
    },
    {
      question: "How about a second one?",
      answer: "Answer for the second question."
    },
    { question: "And a third?", answer: "Answer for the third question." }
  ];

  const toggleFaq = index => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Примерен data обект за тестване // изтрий при свързване
  const data = {
    data: [
      {
        id: 1,
        name: "Meal Master Premium",
        price: 159.99,
        period: "per year",
        priceId: "price_1"
      },
      {
        id: 2,
        name: "Meal Master Premium",
        price: 19.99,
        period: "month",
        priceId: "price_2"
      }
    ]
  };

  return (
    <div className={`flex-1 ${isDarkTheme ? "bg-[#202020]" : "bg-white"} min-h-screen`}>
      <div className="flex-1 flex flex-col items-center p-6 mt-10">
        {/* <h1 className={`text-3xl font-bold mb-2 ${isDarkTheme ? "text-white" : "text-black"}`}>{isSubscribing ? "Subscribing..." : "Pricing page title"}</h1> */}
        <h1 className={`text-3xl font-bold mb-2 ${isDarkTheme ? "text-white" : "text-black"}`}>Pricing page title</h1>
        <p className={`text-lg mb-6 ${isDarkTheme ? "text-gray-400" : "text-gray-500"}`}>And a subheading describing your pricing plans, too</p>

        <div className="flex flex-wrap justify-center w-full px-6 mb-10 space-x-4">
          {/* {isLoading && <div className="mb-4">{ <Spinner size="large" color={isDarkTheme ? "#ffffff" : "#000000"} /> }</div>}
          {isError && (
            <div className="mb-4">
              <p className={`text-xs mb-1 ${isDarkTheme ? "text-white" : "text-black"}`}>{error.message}</p>
            </div>
          )} */}
          {data && (
            <>
              {/* Free sub */}
              <div className={`w-64 p-6 m-4 rounded-lg text-center ${isDarkTheme ? "bg-[#303030]" : "bg-[#FFF4E2]"}`}>
                <p className={`text-lg font-semibold mb-2 ${isDarkTheme ? "text-white" : "text-black"}`}>Meal Master</p>
                <p className={`text-2xl font-bold ${isDarkTheme ? "text-white" : "text-black"}`}>Free</p>
                <p className={`text-sm font-normal mb-4 ${isDarkTheme ? "text-white" : "text-black"}`}>one time</p>
                <div className="mb-4">
                  <p className={`text-xs mb-1 ${isDarkTheme ? "text-white" : "text-black"}`}>• Limited chats</p>
                </div>
                <button className="px-4 py-2 bg-yellow-500 rounded-full text-xs font-medium text-white">Current</button>
              </div>

              {/* Subscriptions */}
              {data.data.map(sub => (
                <div key={sub.id} className={`w-64 p-6 m-4 rounded-lg text-center ${isDarkTheme ? "bg-[#303030]" : "bg-[#FFF4E2]"}`}>
                  <p className={`text-lg font-semibold mb-2 ${isDarkTheme ? "text-white" : "text-black"}`}>{sub.name}</p>
                  <p className={`text-2xl font-bold ${isDarkTheme ? "text-white" : "text-black"}`}>{sub.price}$</p>
                  <p className={`text-sm font-normal mb-4 ${isDarkTheme ? "text-white" : "text-black"}`}>{sub.period === "year" ? "per year" : "per month"}</p>
                  <div className="mb-4">
                    <p className={`text-xs mb-1 ${isDarkTheme ? "text-white" : "text-black"}`}>• Unlimited chats</p>
                    <p className={`text-xs mb-1 ${isDarkTheme ? "text-white" : "text-black"}`}>• Unlimited chats</p>
                  </div>
                  <button className="px-4 py-2 bg-yellow-500 rounded-full text-xs font-medium text-white" onClick={() => handleSelection(sub.priceId)}>
                    Select
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="w-full items-start px-6">
          <h2 className={`text-2xl font-bold mb-4 ${isDarkTheme ? "text-white" : "text-black"}`}>Heading for FAQs</h2>
        </div>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-6 w-full px-6">
            <button onClick={() => toggleFaq(index)} className="w-full text-left">
              <div className="flex justify-between items-center">
                <p className={`text-lg font-semibold ${isDarkTheme ? "text-white" : "text-black"}`}>{faq.question}</p>
                <p className={`text-2xl font-semibold ${isDarkTheme ? "text-white" : "text-black"}`}>{openFaqIndex === index ? "-" : "+"}</p>
              </div>
            </button>
            {openFaqIndex === index && <p className={`text-base mt-2 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
