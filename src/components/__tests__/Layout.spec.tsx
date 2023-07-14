import React from "react";
import * as Gatsby from "gatsby";
import { render, screen } from "@testing-library/react";
import Layout from "../Layout";
import userEvent from "@testing-library/user-event";
import { CartProvider } from "../../context/CartContext";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Layout", () => {
  it("renders correctly", async () => {
    const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery");
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {
          title: "Site Title",
        },
      },
    }));
    render(
      <CartProvider>
        <Layout>
          <p>some content children</p>
        </Layout>
      </CartProvider>
    );

    screen.getByRole("button", { name: "menu" });
    screen.getByLabelText("cart");
    screen.getByText("(0)");
    const logos = screen.getAllByAltText("Site Title logo");
    expect(logos.length).toBe(1);
    screen.getByText("some content children");
    screen.getByRole("heading", { name: "quick links" });
  });

  it("trigger mobile menu when clicking the menu button", async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <Layout>
          <p>some content children</p>
        </Layout>
      </CartProvider>
    );
    await user.click(screen.getByRole("button", { name: "menu" }));

    const logos = screen.getAllByAltText("Site Title logo");
    expect(logos.length).toBe(2);

    screen.getByRole("link", { name: "home" });
    screen.getByRole("link", { name: "about" });
    screen.getByRole("link", { name: "products" });
    screen.getByText("my cart (0 item)");
  });
});
