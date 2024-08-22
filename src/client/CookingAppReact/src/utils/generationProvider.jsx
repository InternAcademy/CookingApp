import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const GenerationContext = createContext();

const calculateElapsed = (lastTimestamp, maxDuration) => {
  const now = Date.now();
  const timeElapsed = now - lastTimestamp;
  return timeElapsed < maxDuration;
};

export const GenerationProvider = ({ children }) => {
  const maxDuration = 2 * 60 * 1000; // 2 minutes in milliseconds

  const [isGenerating, setIsGenerating] = useState(() => {
    const savedState = localStorage.getItem('isGenerating');
    const lastTimestamp = JSON.parse(localStorage.getItem('generationTimestamp'));
    const isElapsed = lastTimestamp ? calculateElapsed(lastTimestamp, maxDuration) : false;
    return savedState && isElapsed ? JSON.parse(savedState) : false;
  });

  const lastTimestamp = JSON.parse(localStorage.getItem('generationTimestamp')) || null;
  const isElapsed = lastTimestamp ? calculateElapsed(lastTimestamp, maxDuration) : false;

  useEffect(() => {
    localStorage.setItem('isGenerating', JSON.stringify(isGenerating));
    if (isGenerating) {
      localStorage.setItem('generationTimestamp', JSON.stringify(Date.now()));
    }
  }, [isGenerating]);

  return (
    <GenerationContext.Provider value={{ isGenerating, setIsGenerating, lastTimestamp, maxDuration, isElapsed }}>
      {children}
    </GenerationContext.Provider>
  );
};

export const useGeneration = () => useContext(GenerationContext);
