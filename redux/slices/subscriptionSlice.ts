import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SubscriptionState {
  isPremium: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  isPremium: false,
  loading: false,
  error: null,
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setPremium(state, action: PayloadAction<boolean>) {
      state.isPremium = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setPremium, setLoading, setError } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;