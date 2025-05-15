import { describe, expect, it, vi, beforeEach } from "vitest";
import reducer, {
  resetImages,
  getImages,
} from "../../features/images/imagesSlice.js";
import * as unsplashAPI from "../../services/unsplashAPI.js";

describe("imageSlice", () => {
  const initialState = {
    images: [],
    loading: false,
    error: null,
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle resetImages", () => {
    const prevState = {
      images: [{ id: 1, url: "..." }],
      loading: true,
      error: "Something went wrong",
    };
    expect(reducer(prevState, resetImages())).toEqual(initialState);
  });

  it("should handle getImages.pending", () => {
    const action = { type: getImages.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it("should handle getImages.fulfilled", () => {
    const images = [{ id: 1, url: "img.jpg" }];
    const action = { type: getImages.fulfilled.type, payload: images };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.images).toEqual(images);
  });

  it("should handle getImages.rejected", () => {
    const errorMessage = "API error";
    const action = {
      type: getImages.rejected.type,
      error: { message: errorMessage },
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it("should call fetchImages when dispatching getImages thunk", async () => {
    const mockResponse = [{ id: "123", url: "abc.jpg" }];
    vi.spyOn(unsplashAPI, "fetchImages").mockResolvedValue(mockResponse);

    const thunk = getImages("nature");
    const dispatch = vi.fn();
    const getState = vi.fn();

    await thunk(dispatch, getState, undefined);

    expect(unsplashAPI.fetchImages).toHaveBeenCalledWith("nature");
  });
});
