import React from "react";
import { render, screen } from "@testing-library/react";
import TileList from "../TileList";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("TileList", () => {
  it("renders correctly", async () => {
    render(<TileList />);
    screen.getByRole("heading", { name: "Featured Categories" });
    screen.getByAltText("original paintings");
    screen.getByText("Original Paintings");
    screen.getByAltText("prints");
    screen.getByText("Prints");
    screen.getByAltText("home decor");
    screen.getByText("Home Decor");
  });
});
