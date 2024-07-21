import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import uiReducer from "./ui-slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer
  }
});

export default store;
