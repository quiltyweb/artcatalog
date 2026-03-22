import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import {
  StoreApp,
  useLineItemsCount,
  useCheckoutLineItems,
  useCartTotals,
  useIsCartLoading,
  useHasResponseError,
  useCartLinesUpdate,
  useRemoveItemFromCart,
} from "../StoreContext";

// Getter defers lookup to call time so mockRequest can be configured per test
let mockRequest: jest.Mock;

jest.mock("@shopify/storefront-api-client", () => ({
  createStorefrontApiClient: () => ({
    get request() {
      return mockRequest;
    },
  }),
}));

const cartCreateSuccess = {
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
};

const TestConsumer = ({
  onUpdate,
  onRemove,
}: {
  onUpdate?: (fn: ReturnType<typeof useCartLinesUpdate>["updateItemsToCart"]) => void;
  onRemove?: (fn: ReturnType<typeof useRemoveItemFromCart>) => void;
}) => {
  const lineItemsCount = useLineItemsCount();
  const lineItems = useCheckoutLineItems();
  const cartTotals = useCartTotals();
  const isLoading = useIsCartLoading();
  const hasError = useHasResponseError();
  const { updateItemsToCart } = useCartLinesUpdate();
  const removeItemFromCart = useRemoveItemFromCart();

  onUpdate?.(updateItemsToCart);
  onRemove?.(removeItemFromCart);

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
  beforeEach(() => {
    mockRequest = jest.fn().mockResolvedValue(cartCreateSuccess);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

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

describe("useCartLinesUpdate .catch()", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("sets hasResponseError to true and stops loading when the request rejects", async () => {
    mockRequest = jest.fn()
      .mockResolvedValueOnce(cartCreateSuccess)
      .mockRejectedValueOnce(new Error("Network error"));

    let updateItemsToCart: ReturnType<typeof useCartLinesUpdate>["updateItemsToCart"];

    render(
      <StoreApp>
        <TestConsumer onUpdate={(fn) => (updateItemsToCart = fn)} />
      </StoreApp>
    );

    await waitFor(() =>
      expect(screen.getByTestId("loading").textContent).toBe("false")
    );

    await act(async () => {
      await updateItemsToCart({ lines: [{ id: "line-1", quantity: 2 }] });
    });

    expect(screen.getByTestId("error").textContent).toBe("true");
    expect(screen.getByTestId("loading").textContent).toBe("false");
  });
});

describe("useRemoveItemFromCart .catch()", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("sets hasResponseError to true and stops loading when the request rejects", async () => {
    mockRequest = jest.fn()
      .mockResolvedValueOnce(cartCreateSuccess)
      .mockRejectedValueOnce(new Error("Network error"));

    let removeItemFromCart: ReturnType<typeof useRemoveItemFromCart>;

    render(
      <StoreApp>
        <TestConsumer onRemove={(fn) => (removeItemFromCart = fn)} />
      </StoreApp>
    );

    await waitFor(() =>
      expect(screen.getByTestId("loading").textContent).toBe("false")
    );

    await act(async () => {
      await removeItemFromCart("line-1");
    });

    expect(screen.getByTestId("error").textContent).toBe("true");
    expect(screen.getByTestId("loading").textContent).toBe("false");
  });
});
