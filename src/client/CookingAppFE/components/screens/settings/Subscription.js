import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import tw from "twrnc";
import { jwtDecode } from "jwt-decode";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { fetchSubs, createSub } from "../../../http/subs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "../../common/Spinner";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
const Subscription = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["subs"],
    queryFn: async () => {
      const token = await AsyncStorage.getItem("token");
      return fetchSubs(token);
    },
  });
  const {
    mutate,
    isPending: isSubscribing,
    isError: isSubError,
    error: subError,
  } = useMutation({
    mutationFn: createSub,
    onSuccess: (data) => {
      console.log(data);
      Linking.openURL(data.data.invoiceUrl).catch((err) => {
        Alert.alert("Error", `Failed to open URL: ${err.message}`);
      });
      queryClient.invalidateQueries("subs");
    },
  });
  const isDarkTheme = useSelector((state) => state.ui.isDarkTheme);
  const role = useSelector((state) => state.user.role);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  useEffect(() => {
    async function checkToken() {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        navigation.navigate("LandingPage");
      }
    }
    checkToken();
  }, []);
  async function handleSelection(id) {
    const token = await AsyncStorage.getItem("token");
    const cred = jwtDecode(token);
    console.log(cred.preferred_username);
    mutate({ token: token, email: cred.preferred_username, priceId: id });
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

  if (role.type === "Premium") {
    return (
      <View style={tw`mb-4`}>
        <Text
          style={tw`text-lg mb-6 ${isDarkTheme ? "text-gray-400" : "text-gray-500"}`}
        >
          You have an active subscription!
        </Text>
      </View>
    );
  }
  return (
    <ScrollView
      style={tw`flex-1 ${isDarkTheme ? "bg-[#202020]" : "bg-white"}  `}
    >
      <View style={tw`flex-1 items-center p-6 mt-10`}>
        <Text
          style={tw`text-3xl font-bold mb-2 ${isDarkTheme ? "text-white" : "text-black"}`}
        >
          {isSubscribing ? "Subscribing..." : "Pricing page title"}
        </Text>
        <Text
          style={tw`text-lg mb-6 ${isDarkTheme ? "text-gray-400" : "text-gray-500"}`}
        >
          And a subheading describing your pricing plans, too
        </Text>

        <View style={tw`flex-row w-full px-6 mb-10 justify-between`}>
          {isPending && (
            <View style={tw`mb-4`}>
              <Spinner
                size="large"
                color={isDarkTheme ? "#ffffff" : "#000000"}
              />
            </View>
          )}
          {isError && (
            <View style={tw`mb-4`}>
              <Text
                style={tw`text-xs mb-1 ${isDarkTheme ? "text-white" : "text-black"}`}
              >
                {error.message}
              </Text>
            </View>
          )}
          {data && (
            <>
              {/* Subscriptions */}
              {data.data.map((sub) => (
                <View
                  key={sub.id}
                  style={[
                    tw`flex-1 p-4 rounded-lg items-center`,
                    { backgroundColor: isDarkTheme ? "#303030" : "#FFF4E2" },
                  ]}
                >
                  <Text
                    style={tw`text-lg font-semibold mb-2 ${isDarkTheme ? "text-white" : "text-black"}`}
                  >
                    {sub.name}
                  </Text>
                  <Text
                    style={tw`text-2xl font-bold ${isDarkTheme ? "text-white" : "text-black"}`}
                  >
                    {sub.price / 100}$
                  </Text>
                  <Text
                    style={tw`text-sm font-normal mb-4 ${isDarkTheme ? "text-white" : "text-black"}`}
                  >
                    {sub.period === "year" ? "per year" : "per month"}
                  </Text>
                  <View style={tw`mb-4`}>
                    <Text
                      style={tw`text-xs mb-1 ${isDarkTheme ? "text-white" : "text-black"}`}
                    >
                      • Unlimited chats
                    </Text>
                    <Text
                      style={tw`text-xs mb-1 ${isDarkTheme ? "text-white" : "text-black"}`}
                    >
                      • Unlimited chats
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={tw`px-4 py-2 bg-yellow-500 rounded-full`}
                  >
                    <Text
                      style={tw`text-base font-medium text-white text-xs`}
                      onPress={() => handleSelection(sub.priceId)}
                    >
                      Select
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </>
          )}
        </View>
        <View style={tw`w-full items-start px-6`}>
          <Text
            style={tw`text-2xl font-bold mb-4 ${isDarkTheme ? "text-white" : "primaryText"}`}
          >
            Heading for FAQs
          </Text>
        </View>
        {faqs.map((faq, index) => (
          <View key={index} style={tw`mb-6 w-full px-6`}>
            <TouchableOpacity onPress={() => toggleFaq(index)}>
              <View style={tw`flex-row justify-between items-center`}>
                <Text
                  style={tw`text-lg font-semibold ${isDarkTheme ? "text-white" : "text-black"}`}
                >
                  {faq.question}
                </Text>
                <Text
                  style={tw`text-2xl font-semibold ${isDarkTheme ? "text-white" : "text-black"}`}
                >
                  {openFaqIndex === index ? "-" : "+"}
                </Text>
              </View>
            </TouchableOpacity>
            {openFaqIndex === index && (
              <Text
                style={tw`text-base mt-2 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}
              >
                {faq.answer}
              </Text>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Subscription;
