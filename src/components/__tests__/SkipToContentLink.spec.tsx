import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SkipToContentLink } from "../SkipToContentLink";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("SkipToContentLink", () => {
  it("renders correctly", async () => {
    render(<SkipToContentLink />);
    screen.getByRole("link", { name: "Skip to main content" });
  });
});
