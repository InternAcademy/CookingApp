import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import subscriptionReducer from './subscriptionSlice';

const store = configureStore({
  reducer: {
    subscription: subscriptionReducer
  },
  middleware: [thunk]
});

export default store;
