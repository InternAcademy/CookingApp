import React, { createContext, useState, useContext } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chat, setChat] = useState([]);

  const clearChat = () => setChat([]);

  return <ChatContext.Provider value={{ chat, setChat, clearChat }}>{children}</ChatContext.Provider>;
};

export const useChat = () => useContext(ChatContext);
