import React from "react";
import { render, screen } from "@testing-library/react";
import IndexPage from "../index";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("IndexPage", () => {
  it("renders basic index correctly", () => {
    render(<IndexPage />);
    screen.getAllByAltText("Macumba original painting");
    screen.getByTestId("brushella-slider-index");
    screen.getByRole("button", { name: "1" });
    screen.getByRole("button", { name: "2" });
    screen.getByRole("button", { name: "3" });
    screen.getByLabelText("next");
    screen.getByLabelText("previous");
    screen.getByRole("heading", { name: "Featured Categories" });
    screen.getByRole("link", { name: /Home Decor/ });
    screen.getByAltText("home decor");
    screen.getByRole("link", { name: /Original Paintings/ });
    screen.getByAltText("original paintings");
    screen.getByRole("link", { name: /Prints/ });
    screen.getByAltText("prints");
  });
});
