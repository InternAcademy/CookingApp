import { createSlice } from "@reduxjs/toolkit";
const initialState = { token: null, isPremium: false };

const userSlice = createSlice({
  name: "userState",
  initialState: initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
