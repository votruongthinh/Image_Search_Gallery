import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "../features/images/imagesSlice.js";

const store = configureStore({
  reducer: {
    images: imageReducer,
  },
});
export default store;
