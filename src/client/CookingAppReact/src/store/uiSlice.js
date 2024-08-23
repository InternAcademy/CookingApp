import { setActive } from "@material-tailwind/react/components/Tabs/TabsContext";
import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
function getInitialTheme() {
  const theme = localStorage.getItem("theme");

  return theme !== null ? theme : "Light";
}
const initialState = {
  sidebarOpen: false,
  recipesOpen: false,
  dropdownOpen: false,
  isInitial: true,
  input: "",
  modal: {
    isOpen: false,
    cancelSub: false,
    removeRecipe: null,
  },
  isThinking: false,
  responseError: null,
  theme: getInitialTheme(),
  photoUri: null,
  toastMealId: null,
  isMessageWarningShowed: false,
  lang: "English",
  filteredRecipes: {
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
    closeRecipes(state) {
      if (window.innerWidth < 1300 && state.recipesOpen) {
        state.recipesOpen = false;
      }
    },
    toggleDropdown(state) {
      state.dropdownOpen = !state.dropdownOpen;
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
    openSubCancelModal(state, action) {
      state.modal = {
        isOpen: true,
        cancelSub: action.payload,
        removeRecipe: null,
      };
    },
    openRecipeRemovalModal(state, action) {
      state.modal = {
        isOpen: true,
        cancelSub: false,
        removeRecipe: action.payload,
      };
    },
    closeModal(state) {
      state.modal = {
        isOpen: false,
        cancelSub: null,
        removeRecipe: null,
      };
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
