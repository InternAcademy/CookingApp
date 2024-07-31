import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarOpen: true,
  recipesOpen: false
};

const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    openSidebar(state) {
      state.sidebarOpen = true;
    },
    closeSidebar(state) {
      state.sidebarOpen = false;
    },
    toggleRecipes(state){
      state.recipesOpen = !state.recipesOpen;
    },
    
  }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
