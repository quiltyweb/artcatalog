import React from "react";
import { render, screen, within } from "@testing-library/react";
import CollectionsPage from "../collections";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeEach(() => {
  jest.clearAllMocks();
  fetchMock.resetMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("ContactPage", () => {
  it("renders correctly", () => {
    render(<CollectionsPage />);
    screen.getByRole("link", { name: "Home" });
    expect(screen.getAllByText(/All Categories/i)).toHaveLength(2);
    screen.getByRole("heading", { name: "All Categories" });
    screen.getByText("Original Paintings");
    expect(
      within(
        screen.getByRole("list", { name: "browse categories" })
      ).queryAllByRole("link")
    ).toHaveLength(8);
  });
});
