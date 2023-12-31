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
    adminshopify: {
      legalContent: {
        nodes: [
          {
            fields: [
              {
                key: "return_and_refund_policy",
                definition: {
                  name: "Return and Refund Policy",
                },
              },
              {
                key: "hand_made_policy",
                definition: {
                  name: "Hand Made Policy",
                },
              },
              {
                key: "shipping_policy",
                definition: {
                  name: "Shipping Policy",
                },
              },
              {
                key: "privacy_policy",
                definition: {
                  name: "Privacy Policy",
                },
              },
              {
                key: "terms_of_service",
                definition: {
                  name: "Terms of Service",
                },
              },
            ],
          },
        ],
      },
      productCategories: {
        nodes: [
          {
            fields: [
              {
                definition: {
                  name: "commissions",
                },
                key: "commissions",
              },
              {
                definition: {
                  name: "originals",
                },
                key: "originals",
              },
              {
                definition: {
                  name: "prints",
                },
                key: "prints",
              },
              {
                definition: {
                  name: "resin and pigment art",
                },
                key: "resin_and_pigment_art",
              },
              {
                definition: {
                  name: "decor",
                },
                key: "decor",
              },
              {
                definition: {
                  name: "wearable art",
                },
                key: "wearable_art",
              },
              {
                definition: {
                  name: "stickers",
                },
                key: "stickers",
              },
              {
                definition: {
                  name: "murals",
                },
                key: "murals",
              },
            ],
          },
        ],
      },
    },
  }));
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Layout", () => {
  it("renders correctly mobile first layout", async () => {
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

    screen.getByTitle("facebook");
    screen.getByTitle("instagram");
    screen.getByTitle("whatsApp");

    // legal content policies links:
    screen.getByRole("link", { name: "Return and Refund Policy" });
    screen.getByRole("link", { name: "Hand Made Policy" });
    screen.getByRole("link", { name: "Shipping Policy" });
    screen.getByRole("link", { name: "Privacy Policy" });
    screen.getByRole("link", { name: "Terms of Service" });
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

    screen.getByRole("link", { name: "commissions" });
    screen.getByRole("link", { name: "originals" });
    screen.getByRole("link", { name: "prints" });
    screen.getByRole("link", { name: "resin and pigment art" });
    screen.getByRole("link", { name: "decor" });
    screen.getByRole("link", { name: "wearable art" });
    screen.getByRole("link", { name: "stickers" });
    screen.getByRole("link", { name: "murals" });
    screen.getByRole("link", { name: "about" });

    screen.getByTestId("facebook");
    screen.getByTestId("instagram");
    screen.getByTestId("whatsApp");
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
  screen.getByRole("link", { name: "commissions" });
  screen.getByRole("link", { name: "originals" });
  screen.getByRole("link", { name: "prints" });
  screen.getByRole("link", { name: "resin and pigment art" });
  screen.getByRole("link", { name: "decor" });
  screen.getByRole("link", { name: "wearable art" });
  screen.getByRole("link", { name: "stickers" });
  screen.getByRole("link", { name: "murals" });
  screen.getByRole("link", { name: "about" });
});
