import { createSlice } from "@reduxjs/toolkit";
const initialState = { selectedChat: null, isPremium: false };

const userSlice = createSlice({
  name: "userState",
  initialState: initialState,
  reducers: {
    selectChat(state, action) {
      state.selectedChat = action.payload;
    },
    clearChat(state) {
      state.selectedChat = null;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
