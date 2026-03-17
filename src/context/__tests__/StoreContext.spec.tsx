import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import {
  StoreApp,
  useLineItemsCount,
  useCheckoutLineItems,
  useCartTotals,
  useIsCartLoading,
  useHasResponseError,
} from "../StoreContext";

jest.mock("@shopify/storefront-api-client", () => ({
  createStorefrontApiClient: () => ({
    request: jest.fn().mockResolvedValue({
      data: {
        cartCreate: {
          cart: {
            id: "gid://shopify/Cart/test-cart-id",
            lines: { nodes: [] },
            totalQuantity: 0,
            cost: null,
            checkoutUrl: "https://brushellashop.myshopify.com/checkouts/test",
          },
          userErrors: [],
          warnings: [],
        },
      },
    }),
  }),
}));

const TestConsumer = () => {
  const lineItemsCount = useLineItemsCount();
  const lineItems = useCheckoutLineItems();
  const cartTotals = useCartTotals();
  const isLoading = useIsCartLoading();
  const hasError = useHasResponseError();

  return (
    <div>
      <span data-testid="count">{lineItemsCount}</span>
      <span data-testid="items">{lineItems.length}</span>
      <span data-testid="totals">{cartTotals ? "has-totals" : "no-totals"}</span>
      <span data-testid="loading">{String(isLoading)}</span>
      <span data-testid="error">{String(hasError)}</span>
    </div>
  );
};

describe("StoreApp", () => {
  it("renders children", () => {
    render(
      <StoreApp>
        <div data-testid="child">content</div>
      </StoreApp>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("provides default values before cart is loaded", async () => {
    render(
      <StoreApp>
        <TestConsumer />
      </StoreApp>
    );

    await waitFor(() =>
      expect(screen.getByTestId("loading").textContent).toBe("false")
    );

    expect(screen.getByTestId("count").textContent).toBe("0");
    expect(screen.getByTestId("items").textContent).toBe("0");
    expect(screen.getByTestId("totals").textContent).toBe("no-totals");
    expect(screen.getByTestId("error").textContent).toBe("false");
  });
});
