import React, { useEffect } from 'react';
import { View, Text, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';
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
    <View style={tw`flex-1 justify-center items-center p-90`}>
      <Image source={require('../assets/icon2.png')} style={tw`w-26 h-26 mb-14`} />
      <Text style={tw`text-lg font-bold`}>Let's figure out a recipe</Text>
      <Text style={tw`text-base`}>Begin by typing a message</Text>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-white`}>
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
    </View>
  );
};

export default Home;
