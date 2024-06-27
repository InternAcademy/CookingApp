import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';
import { useTheme } from '../../../context/ThemeContext';

const Subscription = () => {
  const { isDarkTheme } = useTheme();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const combinedPlans = [
    { name: 'Plan 1', price: 'Free', features: ['Feature', 'Feature', 'Feature', 'Feature'] },
    { name: 'Plan 2', price: '$5', features: ['Feature', 'Feature', 'Feature', 'Feature'] },
    { name: 'Plan 3', price: '$50', features: ['Feature', 'Feature', 'Feature', 'Feature'] }
  ];

  const faqs = [
    { question: "What's the most frequently asked question?", answer: 'Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list.' },
    { question: 'How about a second one?', answer: 'Answer for the second question.' },
    { question: 'And a third?', answer: 'Answer for the third question.' }
  ];

  const toggleFaq = index => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <ScrollView style={tw`flex-1 ${isDarkTheme ? 'bg-[#202020]' : 'bg-white'} mt-10`}>
      <View style={tw`flex-1 items-center p-6`}>
        <Text style={tw`text-3xl font-bold mb-2 ${isDarkTheme ? 'text-white' : 'text-black'}`}>Pricing page title</Text>
        <Text style={tw`text-lg mb-6 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>And a subheading describing your pricing plans, too</Text>

        <View style={tw`flex-row w-full px-6 mb-10`}>
          {combinedPlans.map((plan, index) => (
            <View key={index} style={tw`flex-1 mb-4 p-4 ${isDarkTheme ? 'bg-gray-800' : 'bg-yellow-100'} rounded-lg items-center`}>
              <Text style={tw`text-lg font-semibold mb-2 ${isDarkTheme ? 'text-white' : 'text-black'}`}>{plan.name}</Text>
              <Text style={tw`text-2xl font-bold mb-4 ${isDarkTheme ? 'text-white' : 'text-black'}`}>
                {plan.price} <Text style={tw`text-base  font-normal`}>{plan.name === 'Plan 3' ? 'per year' : 'per month'}</Text>
              </Text>
              <View style={tw`mb-4`}>
                {plan.features.map((feature, idx) => (
                  <Text key={idx} style={tw`text-xs mb-1 ${isDarkTheme ? 'text-white' : 'text-black'}`}>
                    • {feature}
                  </Text>
                ))}
              </View>
              <TouchableOpacity style={tw`px-4 py-2 bg-yellow-500 rounded-full`}>
                <Text style={tw`text-base font-medium text-white text-xs`}>Select</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={tw`w-full items-start px-6`}>
          <Text style={tw`text-2xl font-bold mb-4 ${isDarkTheme ? 'text-white' : 'text-black'}`}>Heading for FAQs</Text>
        </View>
        {faqs.map((faq, index) => (
          <View key={index} style={tw`mb-6 w-full px-6`}>
            <TouchableOpacity onPress={() => toggleFaq(index)}>
              <View style={tw`flex-row justify-between items-center`}>
                <Text style={tw`text-lg font-semibold ${isDarkTheme ? 'text-white' : 'text-black'}`}>{faq.question}</Text>
                <Text style={tw`text-2xl font-semibold ${isDarkTheme ? 'text-white' : 'text-black'}`}>{openFaqIndex === index ? '-' : '+'}</Text>
              </View>
            </TouchableOpacity>
            {openFaqIndex === index && <Text style={tw`text-base mt-2 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>{faq.answer}</Text>}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Subscription;
