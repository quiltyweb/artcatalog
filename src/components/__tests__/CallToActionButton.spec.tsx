import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CallToActionButton from "../CallToActionButton";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("CallToActionButton", () => {
  it("renders correctly", async () => {
    render(<CallToActionButton title="Shop now" link="/link" />);
    screen.getByRole("link", { name: "Shop now" });
    expect(screen.getByRole("link", { name: "Shop now" })).toHaveAttribute(
      "href",
      "/link"
    );
  });
});
