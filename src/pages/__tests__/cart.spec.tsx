import React from "react";
import { render, screen } from "@testing-library/react";
import * as Gatsby from "gatsby";
import CartPage from "../cart";
import CartContext, { CartProvider } from "../../context/CartContext";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("CartPage", () => {
  it("renders correctly with empty cart", () => {
    const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery");
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {
          title: "My Title",
        },
      },
    }));

    render(
      <CartProvider>
        <CartPage />
      </CartProvider>
    );
    screen.findByText("My Cart (0 item)");
    screen.getByText("Your cart is empty");
  });

  it("renders correctly with items in cart", () => {
    const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery");
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {
          title: "My Title",
        },
      },
    }));

    render(
      <CartContext.Provider
        value={{
          cart: [
            {
              id: "345e1ae7-3662-5fbd-a6d2-a3931a5fb862",
              title: "product a",
              quantity: 1,
            },
            {
              id: "345e1ae7-3662-5fbd-a6d2-a3931a5fb862",
              title: "product b",
              quantity: 1,
            },
            {
              id: "345e1ae7-3662-5fbd-a6d2-a3931a5fb862",
              title: "product c",
              quantity: 1,
            },
          ],
          addItemToCart: () => null,
          deleteItemFromCart: () => null,
        }}
      >
        <CartPage />
      </CartContext.Provider>
    );
    screen.findByText("My Cart (3 items)");
    screen.getByText("Your items:");
    screen.getByText("Quantity: 1 - Product: product a");
    screen.getByText("Quantity: 1 - Product: product b");
    screen.getByText("Quantity: 1 - Product: product c");
  });
});
