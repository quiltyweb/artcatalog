import React from "react";
import { render, screen } from "@testing-library/react";
import BasketPage from "../basket";
import { StoreContext } from "../../context/StoreContext";
import Client from "shopify-buy";

const client = Client.buildClient({
  apiVersion: "123",
  domain: "testing",
  storefrontAccessToken: "123",
});

describe("BasketPage", () => {
  it("renders empty Basket Page correctly", () => {
    render(<BasketPage />);
    screen.getByRole("heading", { name: "My Shopping Bag" });
    screen.getByRole("table", { name: "There are no items in your bag" });
    screen.getByRole("columnheader", { name: "Image" });
    screen.getByRole("columnheader", { name: "Item" });
  });

  it("renders default image if not provided", () => {
    render(
      <StoreContext.Provider
        value={{
          store: {
            client: client,
            isAdding: false,
            checkout: {
              id: "gid://shopify/Checkout/testing123123abcabc",
              lineItems: [
                {
                  id: "gid://shopify/CheckoutLineItem/test?checkout=testing123123abcabc",
                  customAttributes: [],
                  discountAllocations: [],
                  quantity: 1,
                  title: "item with no image",
                },
              ],
            },
          },
          setStore: () => null,
        }}
      >
        <BasketPage />
      </StoreContext.Provider>
    );
    screen.getByRole("heading", { name: "My Shopping Bag" });
    screen.getByAltText("item with no image");
  });

  it("renders default title if alt text is not provided in the product image", () => {
    render(
      <StoreContext.Provider
        value={{
          store: {
            client: client,
            isAdding: false,
            checkout: {
              id: "gid://shopify/Checkout/testing123123abcabc",
              lineItems: [
                {
                  id: "gid://shopify/CheckoutLineItem/test?checkout=testing123123abcabc",
                  customAttributes: [],
                  discountAllocations: [],
                  quantity: 1,
                  title: "item with no alt text",
                  variant: {
                    image: { src: "123" },
                  },
                },
              ],
            },
          },
          setStore: () => null,
        }}
      >
        <BasketPage />
      </StoreContext.Provider>
    );
    screen.getByRole("heading", { name: "My Shopping Bag" });
    screen.getByAltText("item with no alt text");
  });
});
