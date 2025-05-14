import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StatusMessage from "../components/StatusMessage";

describe("StatusMessage", () => {
  it("hiển thị thông báo loading", () => {
    render(<StatusMessage loading={true} error={null} noResult={false} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("hiển thị thông báo lỗi nếu có error", () => {
    render(
      <StatusMessage loading={false} error="Failed to fetch" noResult={false} />
    );
    expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
  });

  it("hiển thị thông báo không có kết quả", () => {
    render(<StatusMessage loading={false} error={null} noResult={true} />);
    expect(screen.getByText(/no images found/i)).toBeInTheDocument();
    expect(screen.getByText(/try another search/i)).toBeInTheDocument();
  });

  it("trả về null nếu không có trạng thái nào", () => {
    const { container } = render(
      <StatusMessage loading={false} error={null} noResult={false} />
    );
    expect(container.firstChild).toBeNull();
  });
});
