import { setProfilePicture } from "@/http/user";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  selectedChat: {
    id: null,
    content: [],
  },
  profilePicture: null,
  personal: {
    name: "",
    picture: "",
  },
  role: {
    type: null,
    limitations: {
      chatFromDate: null,
      chatGeneration: null,
      recipeGeneration: null,
    },
  },
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
      const { requests, responses, id } = action.payload.data;
      const minLength = Math.min(requests.length, responses.length);
      let combinedArray = [];
      for (let i = 0; i < minLength; i++) {
        combinedArray.push({
          type: requests[i].type,
          content: requests[i].content,
          role: "user",
        });
        combinedArray.push({
          type: responses[i].type,
          content: responses[i].content,
          role: "bot",
        });
      }

      for (let i = minLength; i < requests.length; i++) {
        combinedArray.push({
          type: requests[i].type,
          content: requests[i].content,
          role: "user",
        });
      }

      for (let i = minLength; i < responses.length; i++) {
        combinedArray.push({
          type: responses[i].type,
          content: responses[i].content,
          role: "bot",
        });
      }
      state.selectedChat = {
        id: id,
        content: combinedArray,
      };
    },
    continueChat(state, action) {
      state.selectedChat = action.payload;
    },
    emptyChat(state) {
      state.selectedChat = {
        id: null,
        content: [],
      };
    },
    setPersonal(state, action) {
      state.personal = action.payload;
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
    reduceChatGeneration(state) {
      state.role = {
        type: state.role.type,
        limitations: {
          chatFromDate: state.role.limitations.chatFromDate,
          chatGeneration: state.role.limitations.chatGeneration - 1,
          recipeGeneration: state.role.limitations.recipeGeneration,
        },
      };
    },
    reduceRecipeGeneration(state) {
      state.role = {
        type: state.role.type,
        limitations: {
          chatFromDate: state.role.limitations.chatFromDate,
          chatGeneration: state.role.limitations.chatGeneration,
          recipeGeneration: state.role.limitations.recipeGeneration - 1,
        },
      };
    },
    setProfilePicture(state, action) {
      state.profilePicture = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
