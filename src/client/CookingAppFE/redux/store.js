import { configureStore } from "@reduxjs/toolkit";
import subscriptionReducer from "./subscriptionSlice";
import userSlice from "./userSlice";
const store = configureStore({
  reducer: {
    user: userSlice,
    subscription: subscriptionReducer,
  },
});

export default store;
