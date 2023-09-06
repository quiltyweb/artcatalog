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
    screen.getByRole("heading", { name: "featured collections" });
    screen.getByAltText("home decor");
    screen.getByAltText("prints");
    screen.getByAltText("original paintings");
    screen.getByText("home decor");
    screen.getByText("prints");
    screen.getByText("original paintings");
  });
});
