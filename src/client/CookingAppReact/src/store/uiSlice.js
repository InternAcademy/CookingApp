import { setActive } from "@material-tailwind/react/components/Tabs/TabsContext";
import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  sidebarOpen: true,
  recipesOpen: false,
  isInitial: true,
  input: "",
  isThinking: false,
  responseError: null,
  theme: "Light",
  photoUri: null,
  toastMealId: null,
  isMessageWarningShowed: false,
  lang: "English",
  filteredRecipes: {
    page: 0,
    recipes: [],
    totalPages: 0,
  },
  activeChat: null,
};

const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    openSidebar(state) {
      state.sidebarOpen = true;
      if (window.innerWidth < 1300) {
        state.recipesOpen = false;
      }
    },
    setIsShown(state) {
      state.isMessageWarningShowed = true;
    },
    closeSidebar(state) {
      state.sidebarOpen = false;
    },
    toggleRecipes(state) {
      state.recipesOpen = !state.recipesOpen;
      if (window.innerWidth < 1300 && state.recipesOpen) {
        state.sidebarOpen = false;
      }
    },
    setInput(state, action) {
      state.input = action.payload;
    },
    showToast(state, action) {
      state.toastMealId = action.payload;
    },
    hideToast(state) {
      state.toastMealId = null;
    },
    setActive(state, action) {
      state.activeChat = action.payload;
    },
    clearActive(state) {
      state.activeChat = null;
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
      state.theme = action.payload;
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
