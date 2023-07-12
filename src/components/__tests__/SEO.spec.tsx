import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SEO from "../SEO";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("SEO", () => {
  it("render children correctly", async () => {
    const { asFragment } = render(
      <SEO>
        <div>Text for SEO</div>
      </SEO>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
