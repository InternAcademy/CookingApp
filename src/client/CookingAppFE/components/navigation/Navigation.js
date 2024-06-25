import React from 'react';
import { View, TouchableOpacity, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import { useNavigationContext } from '../../context/NavigationContext';
import { useChat } from '../../context/ChatContext';
import { useTheme } from '../../context/ThemeContext';

const Navigation = () => {
  const navigation = useNavigation();
  const { currentRoute } = useNavigationContext();
  const { clearChat } = useChat();
  const { isDarkTheme } = useTheme();

  const startNewChat = () => {
    clearChat();
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={[styles.safeArea, tw`${isDarkTheme ? 'bg-[#202020]' : 'bg-white'}`]}>
      <StatusBar barStyle={isDarkTheme ? 'light-content' : 'dark-content'} />
      <View style={[styles.navBar, tw`${isDarkTheme ? 'bg-[#202020]' : 'bg-white'}`]}>
        <View style={styles.rightContainer}>
          <TouchableOpacity onPress={startNewChat} style={tw`mx-2`}>
            <Ionicons name="chatbox-ellipses-sharp" size={24} color={isDarkTheme ? 'white' : 'black'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Previous')} style={tw`mx-2`}>
            <Ionicons name="time" size={24} color={isDarkTheme ? 'white' : 'black'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Favourite')} style={tw`mx-2`}>
            <Ionicons name="heart" size={24} color={isDarkTheme ? 'white' : 'black'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('UserMenu')} style={tw`mx-2`}>
            <Ionicons name="person" size={24} color={isDarkTheme ? 'white' : 'black'} />
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
