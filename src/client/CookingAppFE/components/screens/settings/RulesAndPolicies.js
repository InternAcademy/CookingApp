import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';

const RulesAndPolicies = () => {
  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <View style={tw`p-6`}>
        <Text style={tw`text-3xl font-bold mb-6 text-center`}>Rules And Policies</Text>

        <View style={tw`mb-6`}>
          <Text style={tw`text-2xl font-semibold mb-2`}>Usage Rules</Text>
          <Text style={tw`text-base text-gray-600 mb-4`}>1. Use the app responsibly. Do not misuse the generated recipes.</Text>
          <Text style={tw`text-base text-gray-600 mb-4`}>2. Ensure you have the proper ingredients and tools before attempting any recipe.</Text>
          <Text style={tw`text-base text-gray-600 mb-4`}>3. Follow the instructions in the recipes carefully to achieve the best results.</Text>
          <Text style={tw`text-base text-gray-600 mb-4`}>4. Report any issues or bugs in the app to help us improve your experience.</Text>
          <Text style={tw`text-base text-gray-600 mb-4`}>5. Do not share sensitive or personal information with the chat bot. The chat bot is not designed to handle such information securely.</Text>
        </View>

        <View style={tw`mb-6`}>
          <Text style={tw`text-2xl font-semibold mb-2`}>Privacy Policy</Text>
          <Text style={tw`text-base text-gray-600 mb-4`}>We are committed to protecting your privacy. Please read our Privacy Policy to understand how we handle your personal information.</Text>
          <Text style={tw`text-base text-gray-600 mb-4`}>We do not share your personal information with third parties without your consent.</Text>
          <Text style={tw`text-base text-gray-600 mb-4`}>Our app may collect data to improve your user experience, such as usage statistics and preferences.</Text>
        </View>

        <View style={tw`mb-6`}>
          <Text style={tw`text-2xl font-semibold mb-2`}>Terms of Service</Text>
          <Text style={tw`text-base text-gray-600 mb-4`}>By using our app, you agree to our Terms of Service. Please read these terms carefully before using the app.</Text>
          <Text style={tw`text-base text-gray-600 mb-4`}>We reserve the right to update these terms at any time. Continued use of the app constitutes acceptance of the new terms.</Text>
          <Text style={tw`text-base text-gray-600 mb-4`}>If you have any questions about our terms or policies, please contact our support team.</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default RulesAndPolicies;
