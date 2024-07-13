import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import uiSlice from "./uiSlice.js";
const store = configureStore({
  reducer: {
    user: userSlice,
    ui: uiSlice,
  },
});

export default store;
