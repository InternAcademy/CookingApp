import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import tw from 'twrnc';

const Previous = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={tw`p-4 bg-white pl-8`}>
      <View style={tw`flex-row items-center mb-4`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back2.png')} style={tw`w-8 h-8`} />
        </TouchableOpacity>
      </View>
      <View style={tw`flex-row items-center mb-4`}>
        <TouchableOpacity onPress={() => console.log('Previous pressed')}>
          <Image source={require('../assets/previous.png')} style={tw`w-8 h-8`} />
        </TouchableOpacity>
        <Text style={tw`text-lg text-orange-500 ml-2`}>Previous Chats</Text>
      </View>
      <TouchableOpacity style={tw`bg-gray-100 p-4 rounded-lg mb-4`}>
        <Text style={tw`text-lg font-bold mb-2`}>Strawberry ShortCake</Text>
        <Text style={tw`text-base mb-2`}>To make a delicious lava cake, follow these steps:</Text>
        <View style={tw`flex-row mb-2`}>
          <Text style={tw`text-base font-bold mr-2`}>1.</Text>
          <View style={tw`flex-1`}>
            <Text style={tw`text-base font-bold`}>Prepare Ingredients:</Text>
            <Text style={tw`text-base ml-2`}>• 4 ounces of semi-sweet chocolate</Text>
            <Text style={tw`text-base ml-2`}>• 1/2 cup of unsalted butter</Text>
            <Text style={tw`text-base ml-2`}>• 1 cup of powdered sugar</Text>
            <Text style={tw`text-base ml-2`}>• 2 large eggs</Text>
            <Text style={tw`text-base ml-2`}>• 2 large egg yolks</Text>
            <Text style={tw`text-base ml-2`}>• 1 teaspoon of vanilla extract</Text>
            <Text style={tw`text-base ml-2`}>• 1/4 cup of all-purpose flour</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Text style={tw`text-base text-orange-500 mt-2`}>Show more</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={tw`text-base text-orange-500 mt-0 pl-4`}>More results</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Previous;
