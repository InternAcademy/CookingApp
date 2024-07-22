"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  input: "",
  isThinking: false,
  responseError: null,
  isDarkTheme: false,
  photoUri: typeof window !== "undefined" ? localStorage.getItem("photoUri") : null
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
      if (typeof window !== "undefined") {
        localStorage.setItem("photoUri", action.payload);
      }
    },
    clearPhotoUri: state => {
      state.photoUri = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("photoUri");
      }
    }
  }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
