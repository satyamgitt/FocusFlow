import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { saveRestrictedApps, loadRestrictedApps } from '../../services/storage';

export interface AppItem {
  id: string;
  name: string;
  icon: string; // path or url
}

interface AppListState {
  apps: AppItem[];
  restricted: string[]; // ids of restricted apps
  loading: boolean;
  error: string | null;
}

const initialState: AppListState = {
  apps: [],
  restricted: [],
  loading: false,
  error: null,
};

export const loadRestrictedAppsThunk = createAsyncThunk('appList/loadRestrictedApps', async () => {
  return await loadRestrictedApps();
});

const appListSlice = createSlice({
  name: 'appList',
  initialState,
  reducers: {
    setApps(state, action: PayloadAction<AppItem[]>) {
      state.apps = action.payload;
    },
    setRestricted(state, action: PayloadAction<string[]>) {
      state.restricted = action.payload;
    },
    toggleRestricted(state, action: PayloadAction<string>) {
      if (state.restricted.includes(action.payload)) {
        state.restricted = state.restricted.filter(id => id !== action.payload);
      } else {
        state.restricted.push(action.payload);
      }
      saveRestrictedApps(state.restricted); // persist
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadRestrictedAppsThunk.fulfilled, (state, action) => {
      state.restricted = action.payload;
    });
  },
});

export const { setApps, setRestricted, toggleRestricted, setLoading, setError } = appListSlice.actions;
export default appListSlice.reducer;