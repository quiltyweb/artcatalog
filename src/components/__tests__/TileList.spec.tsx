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
    screen.getByRole("heading", { name: "Browse Brushella’s World" });
    screen.getByText("Commissions");
    screen.getByText("Original Paintings");
    screen.getByText("Prints");
    screen.getByText("Resin & Pigment Art");
    screen.getByText("Home Decor");
    screen.getByText("Wearable Art");
    screen.getByText("Stickers");
    screen.getByText("Murals & Sign Writing");
    screen.getByAltText(
      "Collage depicting products of Original Paintings category"
    );
  });
});
