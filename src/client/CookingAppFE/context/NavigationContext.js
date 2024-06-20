import React, { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState('LandingPage');

  return <NavigationContext.Provider value={{ currentRoute, setCurrentRoute }}>{children}</NavigationContext.Provider>;
};

export const useNavigationContext = () => useContext(NavigationContext);
