import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState('LandingPage');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRoute = async () => {
      const savedRoute = await AsyncStorage.getItem('currentRoute');
      if (savedRoute) {
        setCurrentRoute(savedRoute);
      }
      setIsLoading(false);
    };

    loadRoute();
  }, []);

  const saveRoute = async route => {
    setCurrentRoute(route);
    await AsyncStorage.setItem('currentRoute', route);
  };

  return <NavigationContext.Provider value={{ currentRoute, setCurrentRoute: saveRoute, isLoading }}>{children}</NavigationContext.Provider>;
};

export const useNavigationContext = () => useContext(NavigationContext);
