import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./uiSlice";
const store = configureStore({
  reducer: { ui: uiSlice },
});
export default store;
