import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uri: null,
};

const chatSlice = createSlice({
  name: "chatState",
  initialState: initialState,
  reducers: {
    setUri(state, action) {
      state.uri = action.payload;
    },
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
