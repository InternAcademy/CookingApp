// uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  input: '',
  isThinking: false,
  isDarkTheme: false,
  photoUri: null // Добавяме photoUri в началното състояние
};

const uiSlice = createSlice({
  name: 'uiState',
  initialState: initialState,
  reducers: {
    setInput(state, action) {
      state.input = action.payload;
    },
    setIsThinking(state, action) {
      state.isThinking = action.payload;
    },
    toggleTheme(state) {
      state.isDarkTheme = !state.isDarkTheme;
    },
    setPhotoUri(state, action) {
      // Добавяме нова действие за задаване на photoUri
      state.photoUri = action.payload;
    }
  }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
