import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorBoundary from "../ErrorBoundary";

const ThrowError = () => {
  throw new Error("Test error");
};

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("ErrorBoundary", () => {
  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <p>Hello</p>
      </ErrorBoundary>
    );
    screen.getByText("Hello");
  });

  it("renders fallback UI when a child throws", () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    screen.getByRole("main");
    screen.getByText("Something went wrong.");
    screen.getByText("Please try refreshing the page.");
  });
});
