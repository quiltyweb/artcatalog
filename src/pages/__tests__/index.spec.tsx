import React from "react";
import { render, screen } from "@testing-library/react";
import * as Gatsby from "gatsby";
import IndexPage from "../index";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("IndexPage", () => {
  it("renders correctly", () => {
    const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery");
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {
          title: "My Title",
        },
      },
    }));
    render(<IndexPage />);
    screen.getByRole("button", { name: "explore my collections" });
    screen.getByAltText("brushella collection heart");
    screen.getByRole("heading", { name: "Featured Works" });
    screen.getByText("placeholder text for featured image 1");
    screen.getByText("placeholder text for featured image 2");
    screen.getByText("placeholder text for featured image 3");
  });
});
