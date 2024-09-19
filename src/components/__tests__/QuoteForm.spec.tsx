import React from "react";
import { render, screen } from "@testing-library/react";
import QuoteForm from "../QuoteForm";

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
          id: "gid://shopify/CheckoutLineItem/123452598842400?checkout=12345e9ea3bd1b87c3b785542ee6a6d4",
          title: "Macumba",
          variant: {
            id: "gid://shopify/ProductVariant/12345259884240",
            title: "Default Variant Title",
            price: {
              amount: "0.0",
              currencyCode: "AUD",
            },
            priceV2: {
              amount: "0.0",
              currencyCode: "AUD",
            },
            weight: 100,
            available: true,
            sku: "",
            compareAtPrice: null,
            compareAtPriceV2: null,
            image: {
              id: "gid://shopify/ProductImage/39268632559824",
              src: mockedImageURL,
              altText: null,
              width: 1016,
              height: 1355,
            },
            selectedOptions: [
              {
                name: "Title",
                value: "Default Title",
              },
            ],
            unitPrice: null,
            unitPriceMeasurement: {
              measuredType: null,
              quantityUnit: null,
              quantityValue: 0,
              referenceUnit: null,
              referenceValue: 0,
            },
            product: {
              id: "gid://shopify/Product/1234597788880",
              handle: "macumba",
            },
          },
          quantity: 1,
          customAttributes: [],
          discountAllocations: [],
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
