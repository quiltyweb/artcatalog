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
    screen.getByRole("link", { name: "Bad News Gallery" });
    screen.getByAltText(
      /original artwork called After Grief from Human Nature Collection by Brushella/
    );
    screen.getByText(/"After Grief" from Human Nature Collection/);
    screen.getByText("test title");

    screen.getByRole("heading", { name: "Featured Categories" });
    screen.getByRole("link", { name: /Home Decor/ });
    screen.getByAltText("home decor");
    screen.getByRole("link", { name: /Original Paintings/ });
    screen.getByAltText("original paintings");
    screen.getByRole("link", { name: /Prints/ });
    screen.getByAltText("prints");
  });
});
