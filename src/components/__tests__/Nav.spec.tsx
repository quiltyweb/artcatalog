import React from "react";
import { render, screen } from "@testing-library/react";
import Nav from "../Nav";
import { CartProvider } from "../../context/CartContext";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Nav", () => {
  const productCategoriesItemsMockedData = [
    {
      key: "commissions",
      definition: {
        name: "commissions",
      },
    },
    {
      key: "originals",
      definition: {
        name: "originals",
      },
    },
    {
      key: "prints",
      definition: {
        name: "prints",
      },
    },
    {
      key: "resin_and_pigment_art",
      definition: {
        name: "resin and pigment art",
      },
    },
    {
      key: "decor",
      definition: {
        name: "decor",
      },
    },
    {
      key: "wearable_art",
      definition: {
        name: "wearable art",
      },
    },
    {
      key: "stickers",
      definition: {
        name: "stickers",
      },
    },
    {
      key: "murals",
      definition: {
        name: "murals",
      },
    },
  ];
  it("renders mobile version correctly ", async () => {
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => ({
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
    render(
      <CartProvider>
        <Nav
          title="test title"
          productCategoriesItems={productCategoriesItemsMockedData}
        />
      </CartProvider>
    );
    screen.getByRole("button", { name: "menu" });
    screen.getByAltText(/test title/);
    screen.getByTitle("send a message");
    expect(
      screen.queryByRole("link", { name: "commissions" })
    ).not.toBeInTheDocument();
  });

  it("renders desktop version correctly", async () => {
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => ({
        matches: true,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
    render(
      <CartProvider>
        <Nav
          title="test title"
          productCategoriesItems={productCategoriesItemsMockedData}
        />
      </CartProvider>
    );
    expect(
      screen.queryByRole("button", { name: "menu" })
    ).not.toBeInTheDocument();
    expect(screen.queryByTitle("send a message")).not.toBeInTheDocument();

    screen.getByAltText(/test title/);
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
});
