import React from 'react';
import { View, TouchableOpacity, Image, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import tw from 'twrnc';

const Navigation = () => {
  return (
    <SafeAreaView style={[styles.safeArea, tw`bg-white`]}>
      <StatusBar barStyle="dark-content" />
      <View style={[styles.navBar, tw`bg-gray-100 border-b border-gray-300`]}>
        <TouchableOpacity onPress={() => console.log('Settings pressed')} style={tw`ml-4`}>
          <Image source={require('../assets/settings.webp')} style={tw`w-8 h-8`} />
        </TouchableOpacity>
        <View style={tw`flex-row`}>
          <TouchableOpacity onPress={() => console.log('Back pressed')}>
            <Image source={require('../assets/back.jpg')} style={tw`w-8 h-8 mx-2`} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Favourites pressed')}>
            <Image source={require('../assets/favorite.png')} style={tw`w-8 h-8 mx-2`} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('User pressed')}>
            <Image source={require('../assets/user.png')} style={tw`w-8 h-8 mx-2`} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    width: '100%',
    paddingHorizontal: 16
  }
});

export default Navigation;
