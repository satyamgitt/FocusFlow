import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { saveTriggers, loadTriggers } from '../../services/storage';

export type TriggerType = 'text' | 'video';
export interface Trigger {
  type: TriggerType;
  value: string; // text or video URL
}

interface TriggersState {
  triggers: Record<string, Trigger>; // appId -> trigger
  loading: boolean;
  error: string | null;
}

const initialState: TriggersState = {
  triggers: {},
  loading: false,
  error: null,
};

export const loadTriggersThunk = createAsyncThunk('triggers/loadTriggers', async () => {
  return await loadTriggers();
});

const triggersSlice = createSlice({
  name: 'triggers',
  initialState,
  reducers: {
    setTrigger(state, action: PayloadAction<{ appId: string; trigger: Trigger }>) {
      state.triggers[action.payload.appId] = action.payload.trigger;
      saveTriggers(state.triggers); // persist
    },
    removeTrigger(state, action: PayloadAction<string>) {
      delete state.triggers[action.payload];
      saveTriggers(state.triggers); // persist
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadTriggersThunk.fulfilled, (state, action) => {
      state.triggers = action.payload;
    });
  },
});

export const { setTrigger, removeTrigger, setLoading, setError } = triggersSlice.actions;
export default triggersSlice.reducer;