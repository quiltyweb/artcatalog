import React from "react";
import { render } from "@testing-library/react";
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
      <SEO
        pageTitle="pagetitle prop"
        siteTitle="Sitetitle prop"
        description="description prop"
        image="../../image.png"
      >
        <div>children div for SEO component</div>
      </SEO>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("render fallback values", async () => {
    const { asFragment } = render(<SEO pageTitle="page title from prop" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
