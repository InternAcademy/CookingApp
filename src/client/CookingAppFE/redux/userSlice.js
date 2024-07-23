import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  selectedChat: null,
  role: null,
  chatHistory: null,
};

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
    setChatHistory(state, action) {
      state.chatHistory = action.payload;
    },
    setRole(state, action) {
      state.role = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
