import React from "react";
import { render, screen } from "@testing-library/react";
import NotFoundPage from "../404";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("NotFoundPage", () => {
  it("renders correctly", () => {
    render(<NotFoundPage />);
    screen.getByRole("heading", { name: "Page not found" });
  });
});
