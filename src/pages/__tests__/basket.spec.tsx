import React from "react";
import { within } from "@testing-library/dom";
import { render, screen } from "@testing-library/react";
import BasketPage from "../basket";
import * as StoreContext from "../../context/StoreContext";
const useLineItemsCount = jest.spyOn(StoreContext, "useLineItemsCount");
const useCheckoutLineItems = jest.spyOn(StoreContext, "useCheckoutLineItems");
const useIsCartLoading = jest.spyOn(StoreContext, "useIsCartLoading");
import fetchMock from "jest-fetch-mock";

describe("BasketPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetchMock.resetMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders Basket page layout correctly with 1 item", () => {
    useIsCartLoading.mockImplementation(() => false);
    useLineItemsCount.mockImplementation(() => 1);
    useCheckoutLineItems.mockImplementation((): any => [
      {
        id: "gid://shopify/CheckoutLineItem/12345?checkout=123456",
        title: "Product Title",
        variant: {
          id: "gid://shopify/ProductVariant/44161708556496",
          title: "Variant Title",
          price: {
            amount: "0.0",
            currencyCode: "AUD",
          },
          priceV2: {
            amount: "0.0",
            currencyCode: "AUD",
          },
          weight: 500,
          available: true,
          sku: "",
          compareAtPrice: null,
          compareAtPriceV2: null,
          image: {
            id: "gid://shopify/ProductImage/12344556677",
            src: "https://fake.shopify.com/s/files/fake/1/fake.jpg",
            altText: null,
            width: 715,
            height: 1077,
          },
          selectedOptions: [
            {
              name: "Color",
              value: "Original",
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
            id: "gid://shopify/Product/123123123",
            handle: "beach-towel",
          },
        },
        quantity: 1,
        customAttributes: [],
        discountAllocations: [],
      },
    ]);

    render(<BasketPage />);

    within(screen.getByRole("navigation", { name: "breadcrumb" })).getByRole(
      "link",
      { name: "Home" }
    );
    within(screen.getByRole("navigation", { name: "breadcrumb" })).getByText(
      "Cart"
    );
    screen.getByRole("heading", { name: "Shopping Cart" });
    screen.getByRole("table");
    screen.getByRole("heading", { name: "Quotation form" });
  });

  it("renders all visible table headers with its values on each table cell", () => {
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => ({
        matches: true, //desktop
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
    useIsCartLoading.mockImplementation(() => false);
    useLineItemsCount.mockImplementation(() => 1);
    useCheckoutLineItems.mockImplementation((): any => [
      {
        id: "gid://shopify/CheckoutLineItem/12345?checkout=123456",
        title: "Product Title",
        variant: {
          id: "gid://shopify/ProductVariant/44161708556496",
          title: "Variant Title",
          price: {
            amount: "0.0",
            currencyCode: "AUD",
          },
          priceV2: {
            amount: "0.0",
            currencyCode: "AUD",
          },
          weight: 500,
          available: true,
          sku: "",
          compareAtPrice: null,
          compareAtPriceV2: null,
          image: {
            id: "gid://shopify/ProductImage/12344556677",
            src: "https://fake.shopify.com/s/files/fake/1/fake.jpg",
            altText: "alt text for variant image",
            width: 715,
            height: 1077,
          },
          selectedOptions: [
            {
              name: "Color",
              value: "Original",
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
            id: "gid://shopify/Product/123123123",
            handle: "product-title",
          },
        },
        quantity: 30,
        customAttributes: [],
        discountAllocations: [],
      },
    ]);

    render(<BasketPage />);
    screen.getByRole("columnheader", { name: /thumbnail/i });
    screen.getByAltText("alt text for variant image");
    screen.getByRole("columnheader", { name: /product/i });
    screen.getByText("Product Title - Variant Title");
    screen.getByRole("columnheader", { name: /quantity/i });
    screen.findByRole("cell", { name: "30" });
    screen.getByRole("columnheader", { name: /remove/i });
    screen.getByRole("button", {
      name: "remove Product Title - Variant Title",
    });
    // TODO: add cell values to these headers:
    screen.getByRole("columnheader", { name: /unit price/i });
    screen.getByRole("columnheader", { name: /total/i });
  });

  it("renders cart table with loading caption", () => {
    useIsCartLoading.mockImplementation(() => true);
    render(<BasketPage />);
    screen.getByRole("table", { name: "Shoping cart is loading..." });
  });

  it("renders page with empty cart message", () => {
    useLineItemsCount.mockImplementation(() => 0);
    useIsCartLoading.mockImplementation(() => false);
    render(<BasketPage />);
    screen.getByRole("heading", { name: "Your cart is empty." });
    screen.getByRole("link", { name: "Shop now" });
  });

  it("renders table with correct caption title for one item", () => {
    useIsCartLoading.mockImplementation(() => false);
    useLineItemsCount.mockImplementation(() => 1);
    render(<BasketPage />);
    screen.getAllByRole("table", { name: "1 item in your cart." });
  });

  it("renders table with correct caption title with more than 1 item", () => {
    useIsCartLoading.mockImplementation(() => false);
    useLineItemsCount.mockImplementation(() => 2);
    render(<BasketPage />);
    screen.getAllByRole("table", { name: "2 items in your cart." });
  });

  it("renders product variant image", () => {
    useIsCartLoading.mockImplementation(() => false);
    useLineItemsCount.mockImplementation(() => 1);
    useCheckoutLineItems.mockImplementation((): any => [
      {
        id: "gid://shopify/CheckoutLineItem/12345?checkout=123456",
        title: "Cotton Beach towel",
        variant: {
          id: "gid://shopify/ProductVariant/44161708556496",
          title: "Original",
          price: {
            amount: "0.0",
            currencyCode: "AUD",
          },
          priceV2: {
            amount: "0.0",
            currencyCode: "AUD",
          },
          weight: 500,
          available: true,
          sku: "",
          compareAtPrice: null,
          compareAtPriceV2: null,
          image: {
            id: "gid://shopify/ProductImage/12344556677",
            src: "https://fake.shopify.com/s/files/fake/1/fake.jpg",
            altText: "this is alt text for product variant item",
            width: 715,
            height: 1077,
          },
          selectedOptions: [
            {
              name: "Color",
              value: "Original",
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
            id: "gid://shopify/Product/123123123",
            handle: "beach-towel",
          },
        },
        quantity: 1,
        customAttributes: [],
        discountAllocations: [],
      },
    ]);
    render(<BasketPage />);
    screen.getByAltText("this is alt text for product variant item");
  });

  it("renders static decorative no image", () => {
    useIsCartLoading.mockImplementation(() => false);
    useLineItemsCount.mockImplementation(() => 1);
    useCheckoutLineItems.mockImplementation((): any => [
      {
        id: "gid://shopify/CheckoutLineItem/12345?checkout=123456",
        title: "Cotton Beach towel",
        variant: {
          id: "gid://shopify/ProductVariant/44161708556496",
          title: "Original",
          price: {
            amount: "0.0",
            currencyCode: "AUD",
          },
          priceV2: {
            amount: "0.0",
            currencyCode: "AUD",
          },
          weight: 500,
          available: true,
          sku: "",
          compareAtPrice: null,
          compareAtPriceV2: null,
          image: null,
          selectedOptions: [
            {
              name: "Color",
              value: "Original",
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
            id: "gid://shopify/Product/123123123",
            handle: "beach-towel",
          },
        },
        quantity: 1,
        customAttributes: [],
        discountAllocations: [],
      },
    ]);
    render(<BasketPage />);
    expect(screen.queryByTestId("no-image")).toHaveAttribute(
      "src",
      "../images/web-asset-noimg.jpg"
    );
  });

  it("renders product title and variant title", () => {
    useIsCartLoading.mockImplementation(() => false);
    useLineItemsCount.mockImplementation(() => 1);
    useCheckoutLineItems.mockImplementation((): any => [
      {
        id: "gid://shopify/CheckoutLineItem/12345?checkout=123456",
        title: "product title",
        variant: {
          id: "gid://shopify/ProductVariant/44161708556496",
          title: "variant title",
          price: {
            amount: "0.0",
            currencyCode: "AUD",
          },
          priceV2: {
            amount: "0.0",
            currencyCode: "AUD",
          },
          weight: 500,
          available: true,
          sku: "",
          compareAtPrice: null,
          compareAtPriceV2: null,
          image: null,
          selectedOptions: [
            {
              name: "Color",
              value: "Original",
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
            id: "gid://shopify/Product/123123123",
            handle: "beach-towel",
          },
        },
        quantity: 1,
        customAttributes: [],
        discountAllocations: [],
      },
    ]);
    render(<BasketPage />);
    screen.findByRole("cell", { name: "product title - variant title" });
  });

  it("renders only product title when variant title has 'Default Title'", () => {
    useIsCartLoading.mockImplementation(() => false);
    useLineItemsCount.mockImplementation(() => 1);
    useCheckoutLineItems.mockImplementation((): any => [
      {
        id: "gid://shopify/CheckoutLineItem/12345?checkout=123456",
        title: "product title",
        variant: {
          id: "gid://shopify/ProductVariant/44161708556496",
          title: "Default Title",
          price: {
            amount: "0.0",
            currencyCode: "AUD",
          },
          priceV2: {
            amount: "0.0",
            currencyCode: "AUD",
          },
          weight: 500,
          available: true,
          sku: "",
          compareAtPrice: null,
          compareAtPriceV2: null,
          image: null,
          selectedOptions: [
            {
              name: "Color",
              value: "Original",
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
            id: "gid://shopify/Product/123123123",
            handle: "beach-towel",
          },
        },
        quantity: 1,
        customAttributes: [],
        discountAllocations: [],
      },
    ]);
    render(<BasketPage />);
    screen.findByRole("cell", { name: "product title" });
  });

  it("renders aria labellyby for icon button remove", () => {
    useIsCartLoading.mockImplementation(() => false);
    useLineItemsCount.mockImplementation(() => 1);
    useCheckoutLineItems.mockImplementation((): any => [
      {
        id: "gid://shopify/CheckoutLineItem/12345?checkout=123456",
        title: "product title",
        variant: {
          id: "gid://shopify/ProductVariant/44161708556496",
          title: "variant title",
          price: {
            amount: "0.0",
            currencyCode: "AUD",
          },
          priceV2: {
            amount: "0.0",
            currencyCode: "AUD",
          },
          weight: 500,
          available: true,
          sku: "",
          compareAtPrice: null,
          compareAtPriceV2: null,
          image: null,
          selectedOptions: [
            {
              name: "Color",
              value: "Original",
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
            id: "gid://shopify/Product/123123123",
            handle: "beach-towel",
          },
        },
        quantity: 1,
        customAttributes: [],
        discountAllocations: [],
      },
    ]);
    render(<BasketPage />);
    screen.getByRole("button", {
      name: "remove product title - variant title",
    });
  });

  it("renders quote form when cart count is greater than zero items", () => {
    useIsCartLoading.mockImplementation(() => false);
    useLineItemsCount.mockImplementation(() => 1);
    render(<BasketPage />);
    screen.getByRole("heading", { name: "Quotation form" });
    screen.getByLabelText("Full Name");
    screen.getByLabelText("Email address");
    screen.getByRole("button", { name: "Get a Quote" });
  });
});
