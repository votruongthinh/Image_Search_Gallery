import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ImageGrid from "../../features/images/ImageGrid";

// Tạo mock image data
const mockImages = [
  {
    id: "1",
    urls: {
      small: "https://via.placeholder.com/150",
      regular: "https://via.placeholder.com/600",
    },
    alt_description: "A test image",
    description: "Test image description",
    user: { name: "John Doe" },
    created_at: "2024-05-10T00:00:00Z",
    likes: 42,
    width: 4000,
    height: 3000,
    links: {
      html: "https://unsplash.com/test-image",
    },
  },
];

describe("ImageGrid", () => {
  it("hiển thị thông báo khi đang loading", () => {
    render(<ImageGrid images={[]} loading={true} error={null} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("hiển thị lỗi khi có error", () => {
    render(<ImageGrid images={[]} loading={false} error={"Error occurred"} />);
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  it("hiển thị thông báo không có kết quả", () => {
    render(<ImageGrid images={[]} loading={false} error={null} />);
    expect(screen.getByText(/no images found/i)).toBeInTheDocument();
  });

  it("hiển thị danh sách ảnh", () => {
    render(<ImageGrid images={mockImages} loading={false} error={null} />);
    expect(screen.getByAltText(/a test image/i)).toBeInTheDocument();
  });

  it("mở modal khi click vào ảnh", () => {
    render(<ImageGrid images={mockImages} loading={false} error={null} />);
    const img = screen.getByAltText(/a test image/i);
    fireEvent.click(img);
    expect(screen.getByText(/test image description/i)).toBeInTheDocument();
  });

  it("đóng modal khi nhấn Escape", () => {
    render(<ImageGrid images={mockImages} loading={false} error={null} />);
    const img = screen.getByAltText(/a test image/i);
    fireEvent.click(img);

    fireEvent.keyDown(window, { key: "Escape", code: "Escape" });
    expect(
      screen.queryByText(/test image description/i)
    ).not.toBeInTheDocument();
  });
});
