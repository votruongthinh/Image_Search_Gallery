import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SearchBar from "../../features/images/SearchBar";

describe("SearchBar", () => {
  it("gọi onSearch khi submit với từ khoá hợp lệ", () => {
    const onSearchMock = vi.fn();
    const onResetMock = vi.fn();

    render(
      <SearchBar onSearch={onSearchMock} onReset={onResetMock} images={[]} />
    );
    const input = screen.getByPlaceholderText(/search images/i);
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "nature" } });
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledWith("nature");
  });

  it("hiển thị lỗi khi submit với từ khoá rỗng", () => {
    const onSearchMock = vi.fn();
    const onResetMock = vi.fn();

    render(
      <SearchBar onSearch={onSearchMock} onReset={onResetMock} images={[]} />
    );
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.click(button);

    expect(
      screen.getByText(/please enter keywords to search/i)
    ).toBeInTheDocument();
    expect(onSearchMock).not.toHaveBeenCalled();
    expect(onResetMock).toHaveBeenCalled();
  });

  it("hiển thị lỗi khi từ khoá có ký tự đặc biệt", () => {
    const onSearchMock = vi.fn();
    const onResetMock = vi.fn();

    render(
      <SearchBar onSearch={onSearchMock} onReset={onResetMock} images={[]} />
    );
    const input = screen.getByPlaceholderText(/search images/i);
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "hello!" } });
    fireEvent.click(button);

    expect(
      screen.getByText(/cannot contain special characters/i)
    ).toBeInTheDocument();
    expect(onSearchMock).not.toHaveBeenCalled();
    expect(onResetMock).toHaveBeenCalled();
  });

  it("hiển thị gợi ý từ khoá và gọi onSearch khi click", () => {
    const onSearchMock = vi.fn();
    const onResetMock = vi.fn();

    render(
      <SearchBar onSearch={onSearchMock} onReset={onResetMock} images={[]} />
    );
    const suggestButton = screen.getByText("nature");
    fireEvent.click(suggestButton);

    expect(onSearchMock).toHaveBeenCalledWith("nature");
  });

  it("hiển thị thông báo không có kết quả khi images rỗng", () => {
    const onSearchMock = vi.fn();
    const onResetMock = vi.fn();

    render(
      <SearchBar onSearch={onSearchMock} onReset={onResetMock} images={[]} />
    );
    const input = screen.getByPlaceholderText(/search images/i);
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "noresultkeyword" } });
    fireEvent.click(button);

    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });
});
