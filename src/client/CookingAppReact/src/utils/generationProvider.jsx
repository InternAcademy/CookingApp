import React, { createContext, useContext, useState, useEffect } from "react";

const GenerationContext = createContext();

export const GenerationProvider = ({ children }) => {
  const [isGenerating, setIsGenerating] = useState(() => {
    // Retrieve the initial state from local storage
    const savedState = localStorage.getItem('isGenerating');
    return savedState ? JSON.parse(savedState) : false;
  });

  useEffect(() => {
    // Save the state to local storage whenever it changes
    localStorage.setItem('isGenerating', JSON.stringify(isGenerating));
  }, [isGenerating]);

  return (
    <GenerationContext.Provider value={{ isGenerating, setIsGenerating }}>
      {children}
    </GenerationContext.Provider>
  );
};

export const useGeneration = () => useContext(GenerationContext);
