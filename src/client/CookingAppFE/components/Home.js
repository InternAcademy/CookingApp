import React, { useEffect } from 'react';
import { View, Text, Image, FlatList, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('LandingPage');
      }
    };
    checkToken();
  }, []);

  const renderPost = () => (
    //if user has not generated a recipe yet

    // <View style={tw`flex-1 justify-center items-center p-90`}>
    //   <Image source={require('../assets/icon2.png')} style={tw`w-26 h-26 mb-14`} />
    //   <Text style={tw`text-lg font-bold`}>Let's figure out a recipe</Text>
    //   <Text style={tw`text-base`}>Begin by typing a message</Text>
    // </View>

    //if user has generated a recipe

    //To DO
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={tw`p-6`}>
        <Text style={tw`text-xl font-bold mb-2`}>To make a delicious lava cake, follow these steps:</Text>
        <Text style={tw`text-lg font-semibold mt-4`}>1. Prepare Ingredients:</Text>
        <Text style={tw`text-base`}>
          • 4 ounces of semi-sweet chocolate{'\n'}• 1/2 cup of unsalted butter{'\n'}• 1 cup of powdered sugar{'\n'}• 2 large eggs{'\n'}• 2 large egg yolks{'\n'}• 1 teaspoon of vanilla extract{'\n'}• 1/4 cup of all-purpose flour
        </Text>

        <Text style={tw`text-lg font-semibold mt-4`}>2. Melt Chocolate and Butter:</Text>
        <Text style={tw`text-base`}>• In a microwave-safe bowl, melt the chocolate and butter together in 30-second intervals, stirring each time until smooth.</Text>

        <Text style={tw`text-lg font-semibold mt-4`}>3. Combine Ingredients:</Text>
        <Text style={tw`text-base`}>
          • Whisk in powdered sugar until fully incorporated.{'\n'}• Add eggs and egg yolks, then vanilla, and mix until smooth.{'\n'}• Gently stir in flour until just combined.
        </Text>

        <Text style={tw`text-lg font-semibold mt-4`}>4. Prepare Ramekins:</Text>
        <Text style={tw`text-base`}>• Grease four 6-ounce ramekins and dust them with cocoa powder.{'\n'}• Divide the batter evenly among the ramekins.</Text>

        <Text style={tw`text-lg font-semibold mt-4`}>5. Bake:</Text>
        <Text style={tw`text-base`}>• Preheat your oven to 425°F (220°C).{'\n'}• Place the ramekins on a baking sheet and bake for 12-14 minutes until the edges are firm but the center is still soft.</Text>

        <View style={tw`flex-row items-center mb-2 mt-4`}>
          <Image source={require('../assets/user.png')} style={tw`w-8 h-8 rounded-full mr-2`} />
          <View style={tw`flex-1 justify-center`}>
            <Text style={tw`text-lg font-bold`}>Jane Doe</Text>
            <Text style={tw`text-base`}>Generate me a picture of this recipe</Text>
          </View>
        </View>

        <View style={tw`flex-row items-center mb-2`}>
          <Image source={require('../assets/icon.png')} style={tw`w-8 h-8 rounded-full mr-2`} />
          <View style={tw`flex-1 justify-center`}>
            <Text style={tw`text-lg font-bold`}>MasterBot</Text>
          </View>
        </View>

        <View style={tw`flex-row justify-start items-center mt-0 pl-10`}>
          <Image source={require('../assets/lava_cake1.jpg')} style={tw`w-38 h-38 rounded-lg`} />
          <Image source={require('../assets/lava_cake2.jpg')} style={tw`w-38 h-38 rounded-lg ml-2`} />
        </View>
        <Text style={tw`mt-2 text-sm text-gray-600 pl-10`}>Here are some example pictures of Lava Cakes.</Text>
        <TouchableOpacity style={tw`flex-row items-center mt-2 pl-10`}>
          <Image source={require('../assets/heart.png')} style={tw`w-4 h-4 mr-1 tint-orange-500`} />
          <Image source={require('../assets/printer.png')} style={tw`w-4 h-4 mr-1 tint-orange-500`} />
          <Text style={tw`text-xs text-orange-500`}>Print as a Recipe Card</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <FlatList data={[{ key: '1' }]} renderItem={renderPost} keyExtractor={item => item.key} contentContainerStyle={tw`flex-grow`} />
      <View style={tw`flex-none flex-row items-center p-2 border-t border-gray-300 bg-white`}>
        <View style={tw`flex-1 flex-row items-center border border-gray-300 rounded-full px-2 mx-1 bg-amber-50`}>
          <TouchableOpacity style={tw`p-1`}>
            <Image source={require('../assets/paperClip.png')} style={tw`w-5 h-5`} />
          </TouchableOpacity>
          <TextInput style={tw`flex-1 h-10 px-1`} placeholder="Message MealMasterBot" />
          <TouchableOpacity style={tw`p-1`}>
            <Image source={require('../assets/arrowUpCircle.png')} style={tw`w-6 h-6`} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
