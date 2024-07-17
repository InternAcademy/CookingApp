import React, { useEffect, useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import tw from "twrnc";
import { useSelector } from "react-redux";
import { TranslationContext } from "../../../context/TranslationContext";

const RulesAndPolicies = () => {
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);
  const { targetLanguage, translateStaticTexts, translatedTexts } = useContext(TranslationContext);

  useEffect(() => {
    translateStaticTexts(
      [
        "Rules And Policies",
        "Usage Rules",
        "1. Use the app responsibly. Do not misuse the generated recipes.",
        "2. Ensure you have the proper ingredients and tools before attempting any recipe.",
        "3. Follow the instructions in the recipes carefully to achieve the best results.",
        "4. Report any issues or bugs in the app to help us improve your experience.",
        "5. Do not share sensitive or personal information with the chat bot. The chat bot is not designed to handle such information securely.",
        "Privacy Policy",
        "We are committed to protecting your privacy. Please read our Privacy Policy to understand how we handle your personal information.",
        "We do not share your personal information with third parties without your consent.",
        "Our app may collect data to improve your user experience, such as usage statistics and preferences.",
        "Terms of Service",
        "By using our app, you agree to our Terms of Service. Please read these terms carefully before using the app.",
        "We reserve the right to update these terms at any time. Continued use of the app constitutes acceptance of the new terms.",
        "If you have any questions about our terms or policies, please contact our support team."
      ],
      targetLanguage
    );
  }, [targetLanguage]);

  return (
    <ScrollView style={tw`flex-1 ${isDarkTheme ? "bg-[#202020]" : "bg-white"}`}>
      <View style={tw`p-6`}>
        <Text style={tw`text-3xl font-bold mb-6 text-center ${isDarkTheme ? "text-white" : "text-black"}`}>{translatedTexts["Rules And Policies"] || "Rules And Policies"}</Text>

        <View style={tw`mb-6`}>
          <Text style={tw`text-2xl font-semibold mb-2 ${isDarkTheme ? "text-white" : "text-black"}`}>{translatedTexts["Usage Rules"] || "Usage Rules"}</Text>
          <Text style={tw`text-base mb-4 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>{translatedTexts["1. Use the app responsibly. Do not misuse the generated recipes."] || "1. Use the app responsibly. Do not misuse the generated recipes."}</Text>
          <Text style={tw`text-base mb-4 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>{translatedTexts["2. Ensure you have the proper ingredients and tools before attempting any recipe."] || "2. Ensure you have the proper ingredients and tools before attempting any recipe."}</Text>
          <Text style={tw`text-base mb-4 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>{translatedTexts["3. Follow the instructions in the recipes carefully to achieve the best results."] || "3. Follow the instructions in the recipes carefully to achieve the best results."}</Text>
          <Text style={tw`text-base mb-4 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>{translatedTexts["4. Report any issues or bugs in the app to help us improve your experience."] || "4. Report any issues or bugs in the app to help us improve your experience."}</Text>
          <Text style={tw`text-base mb-4 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>{translatedTexts["5. Do not share sensitive or personal information with the chat bot. The chat bot is not designed to handle such information securely."] || "5. Do not share sensitive or personal information with the chat bot. The chat bot is not designed to handle such information securely."}</Text>
        </View>

        <View style={tw`mb-6`}>
          <Text style={tw`text-2xl font-semibold mb-2 ${isDarkTheme ? "text-white" : "text-black"}`}>{translatedTexts["Privacy Policy"] || "Privacy Policy"}</Text>
          <Text style={tw`text-base mb-4 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>{translatedTexts["We are committed to protecting your privacy. Please read our Privacy Policy to understand how we handle your personal information."] || "We are committed to protecting your privacy. Please read our Privacy Policy to understand how we handle your personal information."}</Text>
          <Text style={tw`text-base mb-4 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>{translatedTexts["We do not share your personal information with third parties without your consent."] || "We do not share your personal information with third parties without your consent."}</Text>
          <Text style={tw`text-base mb-4 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>{translatedTexts["Our app may collect data to improve your user experience, such as usage statistics and preferences."] || "Our app may collect data to improve your user experience, such as usage statistics and preferences."}</Text>
        </View>

        <View style={tw`mb-6`}>
          <Text style={tw`text-2xl font-semibold mb-2 ${isDarkTheme ? "text-white" : "text-black"}`}>{translatedTexts["Terms of Service"] || "Terms of Service"}</Text>
          <Text style={tw`text-base mb-4 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>{translatedTexts["By using our app, you agree to our Terms of Service. Please read these terms carefully before using the app."] || "By using our app, you agree to our Terms of Service. Please read these terms carefully before using the app."}</Text>
          <Text style={tw`text-base mb-4 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>{translatedTexts["We reserve the right to update these terms at any time. Continued use of the app constitutes acceptance of the new terms."] || "We reserve the right to update these terms at any time. Continued use of the app constitutes acceptance of the new terms."}</Text>
          <Text style={tw`text-base mb-4 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>{translatedTexts["If you have any questions about our terms or policies, please contact our support team."] || "If you have any questions about our terms or policies, please contact our support team."}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default RulesAndPolicies;
