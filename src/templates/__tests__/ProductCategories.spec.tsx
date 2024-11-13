import React from "react";
import { render, screen } from "@testing-library/react";
import ProductCategories from "../ProductCategories";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("ProductCategories Template", () => {
  it("renders correctly", () => {
    const mockedPageContext = {
      title: "test title",
      content: "testing content",
      handle: "test-handle",
    };

    render(<ProductCategories pageContext={mockedPageContext} />);
    screen.getByRole("heading", { name: "test title" });
    screen.getByText("testing content");
    screen.getByRole("link", { name: /home/i });
    screen.getByRole("link", { name: /all categories/i });
    expect(screen.getByRole("link", { name: /test title/i })).toHaveAttribute(
      "href",
      "/collections/test-handle"
    );
    screen.getByText(/Learn more about test title/i);
    screen.getByRole("heading", { name: /test title/i });
    screen.getByText("testing content");
  });
});
