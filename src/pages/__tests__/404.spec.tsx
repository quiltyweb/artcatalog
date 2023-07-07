import React from "react";
import { render, screen } from "@testing-library/react";
import * as Gatsby from "gatsby";
import NotFoundPage from "../404";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("NotFoundPage", () => {
  it("renders correctly", () => {
    const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery");
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {
          title: "My Title",
        },
      },
    }));
    render(<NotFoundPage />);
    screen.getByRole("heading", { name: "Page not found" });
  });
});
