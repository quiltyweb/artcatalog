import React from "react";
import * as Gatsby from "gatsby";
import { render, screen } from "@testing-library/react";
import Layout from "../Layout";
import userEvent from "@testing-library/user-event";
import { CartProvider } from "../../context/CartContext";

beforeEach(() => {
  jest.clearAllMocks();
  const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery");
  useStaticQuery.mockImplementation(() => ({
    site: {
      siteMetadata: {
        title: "Site Title",
      },
    },
  }));
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Layout", () => {
  it("renders correctly mobile layout", async () => {
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => ({
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
    render(
      <CartProvider>
        <Layout>
          <p>some content children</p>
        </Layout>
      </CartProvider>
    );
    screen.getByRole("button", { name: "menu" });
    screen.getByAltText("Site Title logo");
    screen.getByTitle("send a message");
    screen.getByText("some content children");
    expect(
      screen.queryByRole("link", { name: "Home" })
    ).not.toBeInTheDocument();
  });

  it("trigger mobile slide menu when clicking the menu button", async () => {
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => ({
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
    const user = userEvent.setup();
    render(
      <CartProvider>
        <Layout>
          <p>some content children</p>
        </Layout>
      </CartProvider>
    );
    await user.click(screen.getByRole("button", { name: "menu" }));

    screen.getByRole("link", { name: "Home" });
    screen.getByRole("link", { name: "About" });
    screen.getByRole("link", { name: "Prints" });

    screen.getByTitle("facebook");
    screen.getByTitle("instagram");
    screen.getByTitle("whatsApp");
  });
});

it("loads desktop menu", async () => {
  Object.defineProperty(window, "matchMedia", {
    value: jest.fn(() => ({
      matches: true,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    })),
  });

  render(
    <CartProvider>
      <Layout>
        <p>some content children</p>
      </Layout>
    </CartProvider>
  );

  expect(
    screen.queryByRole("button", { name: "menu" })
  ).not.toBeInTheDocument();
  expect(screen.queryByTitle("send a message")).not.toBeInTheDocument();
  screen.getByAltText("Site Title logo");
  screen.getByRole("link", { name: "Home" });
  screen.getByRole("link", { name: "About" });
  screen.getByRole("link", { name: "Prints" });
});
