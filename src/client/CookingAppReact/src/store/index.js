import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./uiSlice";
import userSlice from "./userSlice";
const store = configureStore({
  reducer: { ui: uiSlice, user: userSlice },
});
export default store;
