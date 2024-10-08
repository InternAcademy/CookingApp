// pages/Subscription.jsx
"use client";
import "tailwindcss/tailwind.css";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import { fetchSubs, createSub } from "@/http/subs";
import Spinner from "@/components/common/Spinner";

const Subscription = () => {
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["subs"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      return fetchSubs(token);
    },
  });

  const mutation = useMutation({
    mutationFn: createSub,
    onSuccess: (data) => {
      console.log(data);
      window.open(data.data.invoiceUrl, "_blank").focus();
      queryClient.invalidateQueries(["subs"]);
    },
  });

  const isDarkTheme = useSelector((state) => state.ui.isDarkTheme);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  async function handleSelection(id) {
    const token = localStorage.getItem("token");
    const cred = jwtDecode(token);
    console.log(cred.preferred_username);
    mutation.mutate({
      token: token,
      email: cred.preferred_username,
      priceId: id,
    });
  }

  const faqs = [
    {
      question: "What's the most frequently asked question?",
      answer:
        "Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list.",
    },
    {
      question: "How about a second one?",
      answer: "Answer for the second question.",
    },
    { question: "And a third?", answer: "Answer for the third question." },
  ];

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div
      className={`flex-1 ${
        isDarkTheme ? "bg-[#202020]" : "bg-white"
      } min-h-screen`}
    >
      <div className="flex-1 flex flex-col items-center p-6 mt-13">
        {/* <h1 className={`text-3xl font-bold mb-2 ${isDarkTheme ? "text-white" : "primaryText"}`}>Subscription</h1> */}
        <h1
          className={`text-3xl font-bold mb-2 ${
            isDarkTheme ? "text-white" : "primaryText"
          }`}
        >
          {mutation.isLoading ? "Subscribing..." : "Choose your plan"}
        </h1>
        <p
          className={`text-lg mb-6 ${
            isDarkTheme ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {" "}
          Change plans or cancel any time your Cooking App Subscription.
        </p>

        <div className="flex flex-wrap justify-center w-full px-6 mb-10 space-x-4">
          {isLoading && (
            <div className="mb-4">
              {
                <Spinner
                  size="large"
                  color={isDarkTheme ? "#ffffff" : "#000000"}
                />
              }
            </div>
          )}
          {isError && (
            <div className="mb-4">
              <p
                className={`text-xs mb-1 ${
                  isDarkTheme ? "text-white" : "primaryText"
                }`}
              >
                {error.message}
              </p>
            </div>
          )}
          {data && (
            <>
              {/* Free sub */}
              <div
                className={`w-64 p-6 m-4 rounded-lg text-center ${
                  isDarkTheme ? "bg-[#303030]" : "bg-[#FFF4E2]"
                }`}
              >
                <p
                  className={`text-lg font-semibold mb-2 ${
                    isDarkTheme ? "text-white" : "primaryText"
                  }`}
                >
                  Meal Master
                </p>
                <p
                  className={`text-2xl font-bold ${
                    isDarkTheme ? "text-white" : "primaryText"
                  }`}
                >
                  Free
                </p>
                <p
                  className={`text-sm font-normal mb-4 ${
                    isDarkTheme ? "text-white" : "primaryText"
                  }`}
                >
                  one time
                </p>
                <div className="mb-4">
                  <p
                    className={`text-xs mb-1 ${
                      isDarkTheme ? "text-white" : "primaryText"
                    }`}
                  >
                    • Limited chats
                  </p>
                </div>
                <button className="px-4 py-2 bg-yellow-500 rounded-full text-xs font-medium text-white">
                  Current
                </button>
              </div>

              {/* Subscriptions */}
              {data.data.map((sub) => (
                <div
                  key={sub.id}
                  className={`w-64 p-6 m-4 rounded-lg text-center ${
                    isDarkTheme ? "bg-[#303030]" : "bg-[#FFF4E2]"
                  }`}
                >
                  <p
                    className={`text-lg font-semibold mb-2 ${
                      isDarkTheme ? "text-white" : "primaryText"
                    }`}
                  >
                    {sub.name}
                  </p>
                  <p
                    className={`text-2xl font-bold ${
                      isDarkTheme ? "text-white" : "primaryText"
                    }`}
                  >
                    {sub.price}$
                  </p>
                  <p
                    className={`text-sm font-normal mb-4 ${
                      isDarkTheme ? "text-white" : "primaryText"
                    }`}
                  >
                    {sub.period === "year" ? "per year" : "per month"}
                  </p>
                  <div className="mb-4">
                    <p
                      className={`text-xs mb-1 ${
                        isDarkTheme ? "text-white" : "primaryText"
                      }`}
                    >
                      • Unlimited chats
                    </p>
                    <p
                      className={`text-xs mb-1 ${
                        isDarkTheme ? "text-white" : "primaryText"
                      }`}
                    >
                      • Unlimited chats
                    </p>
                  </div>
                  <button
                    className="px-4 py-2 bg-yellow-500 rounded-full text-xs font-medium text-white"
                    onClick={() => handleSelection(sub.priceId)}
                  >
                    Select
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="w-full items-start px-6">
          <h2
            className={`text-2xl font-bold mb-4 ${
              isDarkTheme ? "text-white" : "primaryText"
            }`}
          >
            Heading for FAQs
          </h2>
        </div>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-6 w-full px-6">
            <button
              onClick={() => toggleFaq(index)}
              className="w-full text-left"
            >
              <div className="flex justify-between items-center">
                <p
                  className={`text-lg font-semibold ${
                    isDarkTheme ? "text-white" : "primaryText"
                  }`}
                >
                  {faq.question}
                </p>
                <p
                  className={`text-2xl font-semibold ${
                    isDarkTheme ? "text-white" : "primaryText"
                  }`}
                >
                  {openFaqIndex === index ? "-" : "+"}
                </p>
              </div>
            </button>
            {openFaqIndex === index && (
              <p
                className={`text-base mt-2 ${
                  isDarkTheme ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
