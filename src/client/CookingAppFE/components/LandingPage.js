import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import * as WebBrowser from 'expo-web-browser';
import tw from 'twrnc';

const tenantId = process.env.EXPO_PUBLIC_TENANT_ID;
const clientId = process.env.EXPO_PUBLIC_CLIENT_ID;
const instance = process.env.EXPO_PUBLIC_INSTANCE;
const scopes = process.env.EXPO_PUBLIC_SCOPES.split(' ');

WebBrowser.maybeCompleteAuthSession();

const LandingPage = () => {
  const navigation = useNavigation();
  const { login, token, request } = useAuth(clientId, instance, scopes);

  useEffect(() => {
    if (token) {
      navigation.navigate('Home');
    }
  }, [token]);

  return (
    <View style={tw`flex-1 bg-yellow-500 items-center justify-center p-94`}>
      <View style={tw`mb-8`}>
        <Image source={require('../assets/icon.png')} style={tw`w-40 h-40 rounded-full`} />
      </View>
      <Text style={tw`text-2xl font-bold text-white mb-2`}>Let's Get Started</Text>
      <Text style={tw`text-lg text-white text-center mb-8`}>Easy way to manage all your cooking tasks as easy as tapping your finger</Text>
      <TouchableOpacity disabled={!request} title="Login" onPress={() => login()} style={tw`bg-white py-4 px-10 rounded-full`}>
        <Text style={tw`text-lg font-bold text-yellow-500`}>Get Started</Text>
      </TouchableOpacity>
      <Text>{token}</Text>
    </View>
  );
};

export default LandingPage;
