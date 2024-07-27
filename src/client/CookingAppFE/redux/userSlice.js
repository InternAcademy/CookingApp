import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  selectedChat: null,
  role: null,
  chatHistory: {
    page: 1,
    chats: [],
    totalPages: null,
  },
  dietaryPreferences: {
    allergies: [],
    avoidedFoods: [],
    dietaryPreference: null,
  },
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
      state.chatHistory = {
        page: action.payload.page,
        chats: [...state.chatHistory.chats, ...action.payload.chats],
        totalPages: action.payload.totalPages,
      };
    },
    firstPageChatHistory(state, action) {
      state.chatHistory = {
        page: action.payload.page,
        chats: action.payload.chats,
        totalPages: action.payload.totalPages,
      };
    },
    setRole(state, action) {
      state.role = action.payload;
    },
    setDietaryPreferences(state, action) {
      state.dietaryPreferences = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
