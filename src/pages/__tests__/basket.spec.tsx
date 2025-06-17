import React from "react";
import { within } from "@testing-library/dom";
import { render, screen } from "@testing-library/react";
import BasketPage from "../basket";
import * as StoreContext from "../../context/StoreContext";
const useLineItemsCount = jest.spyOn(StoreContext, "useLineItemsCount");
const useCheckoutLineItems = jest.spyOn(StoreContext, "useCheckoutLineItems");
const useCartTotals = jest.spyOn(StoreContext, "useCartTotals");
const useIsCartLoading = jest.spyOn(StoreContext, "useIsCartLoading");
import fetchMock from "jest-fetch-mock";
jest.mock("@shopify/storefront-api-client");

describe("BasketPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetchMock.resetMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders Basket page layout correctly with 1 item", () => {
    useLineItemsCount.mockImplementation(() => 1);
    useIsCartLoading.mockImplementation(() => false);
    useCartTotals.mockImplementation(() => ({
      currencyCode: "AUD",
      cartSubtotalPriceWithFormat: "$0.00",
    }));
    useCheckoutLineItems.mockImplementation((): any => [
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
          unitPrice: null,
        },
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

    useLineItemsCount.mockImplementation(() => 3);
    useCheckoutLineItems.mockImplementation((): any => [
      {
        id: "gid://shopify/CartLine/d624dsdsdsdsd2f90-d068-4833-b6f5-557e99c4dab2?cart=Z2NwLWFzaWEfake-cart",
        quantity: 3,
        merchandise: {
          __typename: "ProductVariant",
          id: "gid://shopify/ProductVadsdsdsdriant/44600452972752",
          title: "Variant Title",
          product: {
            title: "Product Title",
          },
          image: {
            id: "gid://shopify/ProductImage/41952637255888",
            url: "https://cdn.fafsdasfake23233fsdf.com/s/files/1/0586/9892/4240/files/test.jpg?v=1749380160",
            altText: "alt text for variant image",
            height: 1358,
            width: 2560,
          },
          price: {
            amount: "5.0",
            currencyCode: "AUD",
          },
          unitPrice: null,
        },
      },
    ]);

    render(<BasketPage />);
    screen.getByRole("columnheader", { name: /thumbnail/i });
    screen.getByAltText("alt text for variant image");
    screen.getByRole("columnheader", { name: /product/i });
    screen.getByText("Product Title - Variant Title");
    screen.getByRole("columnheader", { name: /quantity/i });
    screen.getByRole("cell", { name: "3" });
    screen.getByRole("columnheader", { name: /remove/i });
    screen.getByRole("button", {
      name: "remove Product Title - Variant Title",
    });
    // TODO: add cell values to these headers:
    screen.getByRole("columnheader", { name: /price/i });
    screen.getByRole("cell", { name: "$5.00" });
    screen.getByRole("columnheader", { name: /total/i });
    screen.getByRole("cell", { name: "$15.00" });
  });

  it("renders cart table with loading caption", () => {
    useIsCartLoading.mockImplementation(() => true);
    render(<BasketPage />);
    screen.getByRole("table", { name: "Shoping cart is loading..." });
  });

  it("renders page with empty cart message", () => {
    useLineItemsCount.mockImplementation(() => 0);
    render(<BasketPage />);
    screen.getByRole("heading", { name: "Your cart is empty." });
    screen.getByRole("link", { name: "Shop now" });
  });

  it("renders table with correct caption title for one item", () => {
    useLineItemsCount.mockImplementation(() => 1);
    useCartTotals.mockImplementation(() => ({
      currencyCode: "AUD",
      cartSubtotalPriceWithFormat: "$30.00",
    }));
    render(<BasketPage />);
    screen.getByRole("table", {
      name: "1 item in your cart. Subtotal is $30.00 AUD.",
    });
  });

  it("renders table with correct caption title with more than 1 item", () => {
    useLineItemsCount.mockImplementation(() => 2);
    useCartTotals.mockImplementation(() => ({
      currencyCode: "AUD",
      cartSubtotalPriceWithFormat: "$40.00",
    }));
    render(<BasketPage />);
    screen.getByRole("table", {
      name: "2 items in your cart. Subtotal is $40.00 AUD.",
    });
  });

  it("renders product variant image", () => {
    useLineItemsCount.mockImplementation(() => 1);
    useCheckoutLineItems.mockImplementation((): any => [
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
            altText: "this is alt text for product variant item (merchandise)",
            height: 1358,
            width: 2560,
          },
          price: {
            amount: "0.0",
            currencyCode: "AUD",
          },
          unitPrice: null,
        },
      },
    ]);
    render(<BasketPage />);
    screen.getByAltText(
      "this is alt text for product variant item (merchandise)"
    );
  });

  it("renders placeholder fallback image when variant alt text is not provided", () => {
    useLineItemsCount.mockImplementation(() => 1);
    useCheckoutLineItems.mockImplementation((): any => [
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
          unitPrice: null,
        },
      },
    ]);
    render(<BasketPage />);
    expect(screen.queryByTestId("no-image")).toHaveAttribute(
      "src",
      "../images/web-asset-noimg.jpg"
    );
  });

  it("renders static decorative no image", () => {
    useLineItemsCount.mockImplementation(() => 1);
    useCheckoutLineItems.mockImplementation((): any => [
      {
        id: "gid://shopify/CheckoutLineItem/12345?checkout=123456",
        title: "Cotton Beach towel",
        variant: {
          image: null,
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

  it("renders summary", () => {
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => ({
        matches: true, //desktop
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });

    useLineItemsCount.mockImplementation(() => 1);
    useCheckoutLineItems.mockImplementation((): any => [
      {
        id: "gid://shopify/CheckoutLineItem/12345?checkout=123456",
        title: "Product Title",
        variant: {
          id: "gid://shopify/ProductVariant/44161708556496",
          title: "Variant Title",
          price: {
            amount: "5.0",
            currencyCode: "AUD",
          },
          priceV2: {
            amount: "5.0",
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
        quantity: 3,
        customAttributes: [],
        discountAllocations: [],
      },
    ]);

    render(<BasketPage />);
    screen.getByRole("heading", { name: /summary/i });
    screen.getByText("Subtotal:");
    screen.getByText("$30.00 AUD");
    screen.getByText(/taxes and/i);
    screen.getByRole("link", { name: /shipping/i });
    screen.getByText(/calculated at check out/i);
    screen.getByRole("button", { name: /check out/i });
  });

  it("renders quote form when cart count is greater than zero items", () => {
    useLineItemsCount.mockImplementation(() => 1);
    render(<BasketPage />);
    screen.getByRole("heading", { name: "Quotation form" });
    screen.getByLabelText("Full Name");
    screen.getByLabelText("Email address");
    screen.getByRole("button", { name: "Get a Quote" });
  });

  // TODO:
  // it("renders loading table before creating a new cart", () => {})
  // it("renders loading table when fetching a cart", () => {})
  // it("renders loading table when removing an item", () => {})
});
