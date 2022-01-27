import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";

interface AppState {
  status: "idle" | "loading" | "succeeded" | "failed";
  videos: any[];
  error: string | null | undefined;
}

const initialState: AppState = {
  status: "idle",
  error: null,
  videos: [],
};

export const fetchVideos = createAsyncThunk("app/fetchVideos", async () => {
  const response = await fetch(
    "http://api.aparat.com/fa/v1/video/video/mostViewedVideos",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => {
    return res.json();
  });

  return response.data;
});

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.videos = state.videos.concat(action.payload);
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export default store;
