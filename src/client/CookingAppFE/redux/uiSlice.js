import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  input: "",
  isThinking: false,
  responseError: null,
  isInitial: true,
  isDarkTheme: false,
  photoUri: null,
  lang: "English",
  filteredRecipes: {
    page: 0,
    recipes: [],
    totalPages: 0,
  },
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
    loadMore(state, action) {
      state.filteredRecipes = {
        page: state.filteredRecipes.page + 1, // Increment page if not provided
        recipes: [...state.filteredRecipes.recipes, ...action.payload.recipes], // Append new results
        totalPages: action.payload.totalPages, // Update total results
      };
    },
    getFirstPage(state, action) {
      state.filteredRecipes = {
        page: 1,
        recipes: action.payload.recipes,
        totalPages: action.payload.totalPages,
      };
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
