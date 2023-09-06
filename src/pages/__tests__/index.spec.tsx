// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
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
  it.skip("renders correctly", () => {
    const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery");
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {
          title: "My Title",
        },
      },
    }));

    const mockDataProp = { site: { siteMetadata: { title: "ArtCatalog1.0" } } };
    render(<IndexPage data={mockDataProp} />);
    screen.getByRole("link", { name: "explore all collections" });
    screen.getByAltText("ArtCatalog1.0 collection heart");
    screen.getByAltText("ArtCatalog1.0 collection heart");
    screen.getByRole("heading", { name: "featured collections" });
    screen.getByAltText("home decor");
    screen.getByAltText("prints");
    screen.getByAltText("original paintings");
    screen.getByText("home decor");
    screen.getByText("prints");
    screen.getByText("original paintings");
  });

  it("renders basic index correctly", () => {
    const mockDataProp = { site: { siteMetadata: { title: "test title" } } };
    render(<IndexPage data={mockDataProp} />);
    screen.getByText("Featuring: Human Nature at");
    screen.getByRole("link", "Bad News Gallery");
    screen.getByAltText("Heart from Human Nature collection");
    screen.getByText("Heart from Human Nature collection");
    screen.getByText("test title");
  });
});
