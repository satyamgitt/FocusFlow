import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MotivationVideo {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
}

interface MotivationState {
  videos: MotivationVideo[];
  selectedVideo: string | null; // id
  loading: boolean;
  error: string | null;
}

const initialState: MotivationState = {
  videos: [],
  selectedVideo: null,
  loading: false,
  error: null,
};

const motivationSlice = createSlice({
  name: 'motivation',
  initialState,
  reducers: {
    setVideos(state, action: PayloadAction<MotivationVideo[]>) {
      state.videos = action.payload;
    },
    selectVideo(state, action: PayloadAction<string | null>) {
      state.selectedVideo = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setVideos, selectVideo, setLoading, setError } = motivationSlice.actions;
export default motivationSlice.reducer;