// store/ui-slice.js
"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  input: "",
  isThinking: false,
  responseError: null,
  isDarkTheme: false,
  photoUri: null // Премахнахме логиката за LocalStorage от тук
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setInput: (state, action) => {
      state.input = action.payload;
    },
    setIsThinking: (state, action) => {
      state.isThinking = action.payload;
    },
    setResponseError: (state, action) => {
      state.responseError = action.payload;
    },
    setTheme: (state, action) => {
      state.isDarkTheme = action.payload;
    },
    setPhotoUri: (state, action) => {
      state.photoUri = action.payload;
    },
    clearPhotoUri: state => {
      state.photoUri = null;
    }
  }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
