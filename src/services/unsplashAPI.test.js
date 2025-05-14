import { vi, describe, it, expect, beforeEach } from "vitest";
import { fetchImages } from "./unsplashAPI.js";

// Mô phỏng giá trị ENV
vi.stubEnv("VITE_UNSPLASH_ACCESS_KEY", "test_access_key");

describe("fetchImages", () => {
  const mockResponse = {
    results: [
      { id: "1", urls: { small: "url1" } },
      { id: "2", urls: { small: "url2" } },
    ],
  };

  beforeEach(() => {
    // Mock global fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      })
    );
  });

  it("gọi API đúng và trả về danh sách ảnh", async () => {
    const result = await fetchImages("nature");

    expect(fetch).toHaveBeenCalledOnce();
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("https://api.unsplash.com/search/photos")
    );

    expect(result).toEqual(mockResponse.results);
  });

  it("xử lý khi API trả về mảng rỗng", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve({ results: [] }) })
    );
    const result = await fetchImages("empty");
    expect(result).toEqual([]);
  });
});
