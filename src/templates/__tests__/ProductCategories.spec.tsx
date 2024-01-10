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
    };

    render(<ProductCategories pageContext={mockedPageContext} />);
    screen.getByRole("heading", { name: "test title" });
    screen.getByText("testing content");
    screen.getByRole("link", { name: /home/i });
    screen.getByRole("link", { name: /about/i });
    expect(screen.getAllByText("test title")).toHaveLength(2);
    expect(screen.getByRole("link", { name: /about/i })).toHaveAttribute(
      "href",
      "/about"
    );
  });
});
