import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import uiSlice from "./uiSlice.js";
import chatSlice from "./chatSlice.js";
const store = configureStore({
  reducer: {
    user: userSlice,
    ui: uiSlice,
    chat: chatSlice,
  },
});

export default store;
