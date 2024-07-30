import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarOpen: false,
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
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
