// store/userSlice.js
"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChat: null,
  isPremium: false,
  chatHistory: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    selectChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    clearChat: state => {
      state.selectedChat = null;
    },
    setChatHistory: (state, action) => {
      state.chatHistory = action.payload;
    }
  }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
