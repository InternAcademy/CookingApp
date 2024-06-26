import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const theme = await AsyncStorage.getItem('theme');
        if (theme !== null) {
          setIsDarkTheme(theme === 'dark');
        }
      } catch (error) {
        console.error('Failed to load theme', error);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkTheme;
      setIsDarkTheme(newTheme);
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Failed to save theme', error);
    }
  };

  return <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
