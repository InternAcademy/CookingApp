import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSubscriptions = createAsyncThunk('subscription/fetchSubscriptions', async () => {
  const response = await fetch('https://your-api-endpoint.com/subscriptions');
  const data = await response.json();
  return data;
});

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState: {
    monthlyPlans: [],
    annualPlans: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSubscriptions.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.monthlyPlans = action.payload.monthly;
        state.annualPlans = action.payload.annual;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default subscriptionSlice.reducer;
