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
  it("renders correctly with default title", async () => {
    render(<TileList />);
    screen.getByRole("heading", { name: "Browse Brushella’s World" });
    screen.getByText("Commissions");
    screen.getByText("Original Paintings");
    screen.getByText("Prints");
    screen.getByText("Resin & Pigment Art");
    screen.getByText("Home Decor");
    screen.getByText("Wearable Art");
    screen.getByText("Stickers");
    screen.getByText("Murals & Sign Writing");
    screen.getByAltText("Products of Original Paintings category.");
  });
  it("renders correctly with custom title", async () => {
    render(<TileList title="my title" />);
    screen.getByRole("heading", { name: "my title" });
  });
});
