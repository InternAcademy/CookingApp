import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';
import { useTheme } from '../../../context/ThemeContext';

const Subscription = () => {
  const { isDarkTheme } = useTheme();

  const plans = [
    { name: 'Plan 1', price: '$5', features: ['Feature', 'Feature', 'Feature', 'Feature'] },
    { name: 'Plan 2', price: '$10', features: ['Feature', 'Feature', 'Feature', 'Feature'] },
    { name: 'Plan 3', price: '$20', features: ['Feature', 'Feature', 'Feature', 'Feature'] }
  ];

  const faqs = [
    { question: "What's the most frequently asked question?", answer: 'Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list.' },
    { question: 'How about a second one?', answer: 'Answer for the second question.' },
    { question: 'And a third?', answer: 'Answer for the third question.' }
  ];

  return (
    <ScrollView style={tw`flex-1 ${isDarkTheme ? 'bg-[#202020]' : 'bg-white'} mt-10`}>
      <View style={tw`flex-1 items-center p-6`}>
        <Text style={tw`text-3xl font-bold mb-2 ${isDarkTheme ? 'text-white' : 'text-black'}`}>Pricing page title</Text>
        <Text style={tw`text-lg mb-6 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>And a subheading describing your pricing plans, too</Text>

        <View style={tw`flex-row justify-center mb-6`}>
          <TouchableOpacity style={tw`px-4 py-2 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'} rounded-full mr-2`}>
            <Text style={tw`text-base font-medium ${isDarkTheme ? 'text-white' : 'text-black'}`}>Monthly plans</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`px-4 py-2 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'} rounded-full`}>
            <Text style={tw`text-base font-medium ${isDarkTheme ? 'text-white' : 'text-black'}`}>Annual plans</Text>
          </TouchableOpacity>
        </View>

        <View style={tw`flex-row justify-between w-full px-6 mb-10`}>
          {plans.map((plan, index) => (
            <View key={index} style={tw`flex-1 mx-2 p-4 ${isDarkTheme ? 'bg-gray-800' : 'bg-yellow-100'} rounded-lg items-center`}>
              <Text style={tw`text-xl font-semibold mb-2 ${isDarkTheme ? 'text-white' : 'text-black'}`}>{plan.name}</Text>
              <Text style={tw`text-2xl font-bold mb-4 ${isDarkTheme ? 'text-white' : 'text-black'}`}>
                {plan.price} <Text style={tw`text-lg font-normal`}>per month</Text>
              </Text>
              <View style={tw`mb-4`}>
                {plan.features.map((feature, idx) => (
                  <Text key={idx} style={tw`text-base mb-1 ${isDarkTheme ? 'text-white' : 'text-black'}`}>
                    • {feature}
                  </Text>
                ))}
              </View>
              <TouchableOpacity style={tw`px-4 py-2 bg-yellow-500 rounded-full`}>
                <Text style={tw`text-base font-medium text-white`}>Select</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <Text style={tw`text-2xl font-bold mb-4 ${isDarkTheme ? 'text-white' : 'text-black'}`}>Heading for FAQs</Text>
        {faqs.map((faq, index) => (
          <View key={index} style={tw`mb-6 w-full px-6`}>
            <Text style={tw`text-lg font-semibold ${isDarkTheme ? 'text-white' : 'text-black'}`}>{faq.question}</Text>
            <Text style={tw`text-base mt-2 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>{faq.answer}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Subscription;
