import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarOpen: true,
  recipesOpen: false,
  isInitial: true,
  input: "",
  isThinking: false,
  responseError: null,
  isDarkTheme: false,
  photoUri: null,
  toastMealId: null,
  lang: "English",
  filteredRecipes: {
    page: 0,
    recipes: [],
    totalPages: 0,
  },
};

const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    openSidebar(state) {
      state.sidebarOpen = true;
    },
    setInput(state, action) {
      state.input = action.payload;
    },
    closeSidebar(state) {
      state.sidebarOpen = false;
    },
    showToast(state, action) {
      state.toastMealId = action.payload;
    },
    hideToast(state) {
      state.toastMealId = null;
    },
    toggleRecipes(state) {
      state.recipesOpen = !state.recipesOpen;
    },
    setIsInitial(state, action) {
      state.isInitial = action.payload;
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
        page: state.filteredRecipes.page + 1,
        recipes: [...state.filteredRecipes.recipes, ...action.payload.recipes],
        totalPages: action.payload.totalPages,
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
