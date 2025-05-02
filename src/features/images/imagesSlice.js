import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchImages } from "../../services/unsplashAPI";

export const getImages = createAsyncThunk("images/getImages", async (query) => {
  const response = await fetchImages(query);
  return response;
});

const imageSlice = createSlice({
  name: "images",
  initialState: {
    images: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetImages(state) {
      state.images = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(getImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { resetImages } = imageSlice.actions;
export default imageSlice.reducer;
