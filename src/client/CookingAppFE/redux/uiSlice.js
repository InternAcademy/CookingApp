import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  input: "",
  isThinking: false,
  responseError: null,
  isInitial: true,
  isDarkTheme: false,
  photoUri: null,
  lang: "English",
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
    setTheme(state, action) {
      state.isDarkTheme = action.payload;
    },
    setPhotoUri(state, action) {
      state.photoUri = action.payload;
    },
    clearPhotoUri(state) {
      state.photoUri = null;
    },
    setLanguage(state, action) {
      state.lang = action.payload;
    },
    setIsInitial(state, action) {
      state.isInitial = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
