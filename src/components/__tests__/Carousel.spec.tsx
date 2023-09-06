import React from "react";
import { render, screen } from "@testing-library/react";
import Carousel from "../Carousel";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Carousel", () => {
  it("renders correctly", async () => {
    render(<Carousel title="test title" />);
    screen.getByRole("link", { name: "explore all collections" });
    screen.getByAltText("test title");
  });
});
