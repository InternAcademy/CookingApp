import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../../hooks/useAuth';
import * as WebBrowser from 'expo-web-browser';
import tw from 'twrnc';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

const tenantId = process.env.EXPO_PUBLIC_TENANT_ID;
const clientId = process.env.EXPO_PUBLIC_CLIENT_ID;
const instance = process.env.EXPO_PUBLIC_INSTANCE;
const scopes = process.env.EXPO_PUBLIC_SCOPES.split(' ');

WebBrowser.maybeCompleteAuthSession();

const LandingPage = () => {
  const { isDarkTheme } = useTheme();
  const navigation = useNavigation();
  const { login, token, request, loadToken } = useAuth(clientId, instance, scopes);

  useEffect(() => {
    loadToken();
  }, []);

  useEffect(() => {
    if (token) {
      navigation.navigate('Home');
    }
  }, [token]);

  return (
    <View style={tw` flex-col justify-center items-center bg-yellow-500   w-full h-full `} className=" ">
      <View style={tw`mb-20`}>
        <Image source={require('../../assets/Main/icon.png')} style={tw`w-32 h-32 rounded-full`} />
      </View>
      <Text style={tw`text-2xl font-bold ${isDarkTheme ? 'text-white' : 'text-black'} mb-2`}>Let's Get Started</Text>
      <Text style={tw`text-lg px-4 ${isDarkTheme ? 'text-gray-400' : 'text-white'} text-center mb-8`}>Easy way to manage all your cooking tasks as easy as tapping your finger</Text>
      <TouchableOpacity disabled={!request} title="Login" onPress={() => login()} style={tw`bg-white py-4 px-10  mt-40 -mb-46  rounded-full`}>
        <Text style={tw`text-lg font-bold  ${isDarkTheme ? 'text-[#202020]' : 'text-yellow-500'}`}>Get Started</Text>
      </TouchableOpacity>
      <Text>{token}</Text>
    </View>
  );
};

export default LandingPage;
