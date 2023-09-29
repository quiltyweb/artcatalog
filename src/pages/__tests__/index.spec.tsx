// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
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
    const mockDataProp = { site: { siteMetadata: { title: "test title" } } };
    render(<IndexPage data={mockDataProp} />);
    screen.getByText("Featuring: Human Nature at");
    screen.getByRole("link", "Bad News Gallery");
    screen.getByAltText(/"After Grief" from Human Nature Collection/);
    screen.getByText(/"After Grief" from Human Nature Collection/);
    screen.getByText("test title");

    // future sections:
    // screen.getByRole("link", { name: "explore all collections" });
    // screen.getByAltText("ArtCatalog1.0 collection heart");
    // screen.getByAltText("ArtCatalog1.0 collection heart");
    // screen.getByRole("heading", { name: "featured collections" });
    // screen.getByAltText("home decor");
    // screen.getByAltText("prints");
    // screen.getByAltText("original paintings");
    // screen.getByText("home decor");
    // screen.getByText("prints");
    // screen.getByText("original paintings");
  });
});
