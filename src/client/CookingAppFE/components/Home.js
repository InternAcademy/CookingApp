import React from 'react';
import { View, Text, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const Home = () => {
  const renderPost = () => (
    <View style={tw`p-6`}>
      <View style={tw`flex-row items-center mb-2`}>
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
    </View>
  );

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList data={[{ key: '1' }]} renderItem={renderPost} keyExtractor={item => item.key} contentContainerStyle={tw`flex-grow`} />
      <View style={tw`flex-none flex-row items-center p-2 border-t border-gray-300 bg-white`}>
        <TouchableOpacity style={tw`p-1`}>
          <Image source={require('../assets/camera.png')} style={tw`w-6 h-6`} />
        </TouchableOpacity>
        <TouchableOpacity style={tw`p-1`}>
          <Image source={require('../assets/upload.png')} style={tw`w-6 h-6`} />
        </TouchableOpacity>
        <TouchableOpacity style={tw`p-1`}>
          <Image source={require('../assets/drive.png')} style={tw`w-6 h-6`} />
        </TouchableOpacity>
        <View style={tw`flex-1 flex-row items-center border border-gray-300 rounded-full px-4 mx-1 bg-amber-50`}>
          <TextInput style={tw`flex-1 h-10`} placeholder="Message MasterBot" />
          <TouchableOpacity style={tw`p-1`}>
            <Image source={require('../assets/microphone.png')} style={tw`w-6 h-6`} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={tw`p-1`}>
          <Image source={require('../assets/headphone.png')} style={tw`w-6 h-6`} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
