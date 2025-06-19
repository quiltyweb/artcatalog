import React from "react";
import { render, screen } from "@testing-library/react";
import QuoteForm from "../QuoteForm";
jest.mock("@shopify/storefront-api-client");

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("QuoteForm", () => {
  it("renders mobile version correctly ", async () => {
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => ({
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
    const mockedImageURL =
      "https://cdn.fake-image-for-brushella.art/fake-image.jpg";
    const mockedQuoteFormProps = {
      checkoutLineItems: [
        {
          id: "gid://shopify/CartLine/daa3b170-7d6e-4297-b74a-d452609b00e7?cart=Z2NwLWFzaWEtc291dGhlYXN0MTowMUpYWFJEREdLOE1OQlYyUzVWRkdaSERGWQ",
          quantity: 1,
          merchandise: {
            __typename: "ProductVariant",
            id: "gid://shopify/ProductVariant/44600452972752",
            title: "Variant Title",
            product: {
              title: "Product Title",
            },
            image: {
              id: "gid://shopify/ProductImage/41952637255888",
              url: "https://cdn.shopsdsdsdsdify.com/s/files/1/0586/9892/4240/files/test.jpg?v=1dsdsdsdsdds749380160",
              altText: null,
              height: 1358,
              width: 2560,
            },
            price: {
              amount: "0.0",
              currencyCode: "AUD",
            },
            unitPrice: {
              amount: "0.0",
              currencyCode: "AUD",
            },
          },
        },
      ],
      cartCount: 1,
    };

    render(
      <QuoteForm
        checkoutLineItems={mockedQuoteFormProps.checkoutLineItems}
        cartCount={mockedQuoteFormProps.cartCount}
      />
    );
    screen.getByRole("heading", { name: "Quotation form" });
    screen.getByLabelText("Full Name");
    screen.getByLabelText("Email address");
    screen.getByRole("button", { name: "Get a Quote" });
  });
});
