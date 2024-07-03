// uiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  input: "",
  isThinking: false,
  isDarkTheme: false,
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
    toggleTheme(state) {
      if (state.isDarkTheme) {
        state.isDarkTheme = false;
      } else {
        state.isDarkTheme = true;
      }
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
