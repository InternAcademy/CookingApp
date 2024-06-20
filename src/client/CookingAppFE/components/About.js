import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';

const About = () => {
  return (
    <ScrollView style={tw`flex-1 p-6 bg-white`}>
      <Text style={tw`text-2xl font-bold mb-4 text-orange-400`}>About</Text>
      <Text style={tw`text-base leading-6 mb-5`}>This is a sample text. Welcome to [Your Restaurant Name], where culinary passion meets exceptional service. Established in [Year], we are dedicated to bringing you a dining experience like no other. Our menu features a delightful blend of traditional and contemporary dishes, crafted from the freshest ingredients sourced locally and globally.</Text>
      <Text style={tw`text-base leading-6 mb-5`}>At [Your Restaurant Name], we believe that food is more than just sustenance; it's a way to connect, celebrate, and create memories. Whether you're here for a casual meal, a special occasion, or just a cup of our signature coffee, we strive to make every visit unforgettable.</Text>
      <Text style={tw`text-base leading-6 mb-5`}>Our team of talented chefs and friendly staff are committed to providing you with top-notch service and a warm, inviting atmosphere. We are passionate about what we do, and it shows in every plate we serve.</Text>
      <Text style={tw`text-base leading-6 mb-5`}>Thank you for choosing [Your Restaurant Name]. We look forward to welcoming you and sharing our love for food with you.</Text>
    </ScrollView>
  );
};

export default About;