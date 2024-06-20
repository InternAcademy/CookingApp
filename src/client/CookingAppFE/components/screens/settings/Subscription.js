import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';

const Subscription = () => {
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
    <ScrollView style={tw`flex-1 bg-white mt-10`}>
      <View style={tw`flex-1 items-center p-6`}>
        <Text style={tw`text-3xl font-bold mb-2`}>Pricing page title</Text>
        <Text style={tw`text-lg text-gray-500 mb-6`}>And a subheading describing your pricing plans, too</Text>

        <View style={tw`flex-row justify-center mb-6`}>
          <TouchableOpacity style={tw`px-4 py-2 bg-gray-200 rounded-full mr-2`}>
            <Text style={tw`text-base font-medium`}>Monthly plans</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`px-4 py-2 bg-gray-200 rounded-full`}>
            <Text style={tw`text-base font-medium`}>Annual plans</Text>
          </TouchableOpacity>
        </View>

        <View style={tw`flex-row justify-between w-full px-6 mb-10`}>
          {plans.map((plan, index) => (
            <View key={index} style={tw`flex-1 mx-2 p-4 bg-yellow-100 rounded-lg items-center`}>
              <Text style={tw`text-xl font-semibold mb-2`}>{plan.name}</Text>
              <Text style={tw`text-2xl font-bold mb-4`}>
                {plan.price} <Text style={tw`text-lg font-normal`}>per month</Text>
              </Text>
              <View style={tw`mb-4`}>
                {plan.features.map((feature, idx) => (
                  <Text key={idx} style={tw`text-base mb-1`}>
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

        <Text style={tw`text-2xl font-bold mb-4`}>Heading for FAQs</Text>
        {faqs.map((faq, index) => (
          <View key={index} style={tw`mb-6 w-full px-6`}>
            <Text style={tw`text-lg font-semibold`}>{faq.question}</Text>
            <Text style={tw`text-base text-gray-600 mt-2`}>{faq.answer}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Subscription;
