// uiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  input: null,
  isThinking: false,
  responseError: null,
  isDarkTheme: false,
  photoUri: null,
};

const uiSlice = createSlice({
  name: "uiState",
  initialState: initialState,
  reducers: {
    setInput(state, action) {
      state.input = action.payload;
    },
    setIsThinking(state, action) {
      state.isThinking = action.payload;
    },
    setResponseError(state, action) {
      state.responseError = action.payload;
    },
    toggleTheme(state) {
      state.isDarkTheme = !state.isDarkTheme;
    },
    setPhotoUri(state, action) {
      state.photoUri = action.payload;
    },
    clearPhotoUri(state) {
      state.photoUri = null;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
