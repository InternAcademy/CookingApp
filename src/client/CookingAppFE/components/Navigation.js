import React from 'react';
import { View, TouchableOpacity, Image, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { useNavigationContext } from './NavigationContext';

const Navigation = () => {
  const navigation = useNavigation();
  const { currentRoute } = useNavigationContext();

  return (
    <SafeAreaView style={[styles.safeArea, tw`bg-white`]}>
      <StatusBar barStyle="dark-content" />
      <View style={[styles.navBar, tw`bg-white`]}>
        <View style={styles.rightContainer}>
          {currentRoute !== 'Home' && currentRoute !== 'LandingPage' && (
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={tw`mx-2`}>
              <Image source={require('../assets/NavigationBar/chat.png')} style={tw`w-10 h-10`} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => navigation.navigate('Previous')} style={tw`mx-2`}>
            <Image source={require('../assets/NavigationBar/previous2.png')} style={tw`w-6 h-6`} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Favourite')} style={tw`mx-2`}>
            <Image source={require('../assets/NavigationBar/favorite.png')} style={tw`w-6 h-6`} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('UserMenu')} style={tw`mx-2`}>
            <Image source={require('../assets/NavigationBar/user.png')} style={tw`w-6 h-6`} />
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 60,
    width: '100%',
    paddingHorizontal: 16
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16
  }
});

export default Navigation;
