import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sidebar from "./Sidebar";

describe("Sidebar Component", () => {
  afterEach(() => {
    document.body.classList.remove("no-scroll");
  });

  test("should start closed", () => {
    render(<Sidebar />);
    const sidebar = screen.getByRole("navigation");
    expect(sidebar).toHaveClass("closed");
  });

  test("toggles open and close on menu button click", () => {
    render(<Sidebar />);
    const button = screen.getByRole("button", { name: /menu/i });
    fireEvent.click(button);
    expect(screen.getByRole("navigation")).toHaveClass("open");
    fireEvent.click(button);
    expect(screen.getByRole("navigation")).toHaveClass("closed");
  });

  test("closes when overlay is clicked", () => {
    render(<Sidebar />);
    const button = screen.getByRole("button", { name: /menu/i });
    fireEvent.click(button);
    fireEvent.click(screen.getByText(/overlay/));
    expect(screen.getByRole("navigation")).toHaveClass("closed");
  });

  test("closes when close button is clicked", () => {
    render(<Sidebar />);
    const button = screen.getByRole("button", { name: /menu/i });
    fireEvent.click(button);
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);
    expect(screen.getByRole("navigation")).toHaveClass("closed");
  });

  test("body has no-scroll when sidebar is open", () => {
    render(<Sidebar />);
    const button = screen.getByRole("button", { name: /menu/i });
    fireEvent.click(button);
    expect(document.body).toHaveClass("no-scroll");
    fireEvent.click(button);
    expect(document.body).not.toHaveClass("no-scroll");
  });

  test("removes no-scroll on unmount", () => {
    const { unmount } = render(<Sidebar />);
    const button = screen.getByRole("button", { name: /menu/i });
    fireEvent.click(button);
    unmount();
    expect(document.body).not.toHaveClass("no-scroll");
  });
});
