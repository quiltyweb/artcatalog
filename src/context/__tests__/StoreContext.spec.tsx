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

const CHECKOUT_ID_KEY = "shopify_checkout_id";
const TIMESTAMP_KEY = "shopify_checkout_timestamp";

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

const cartQuerySuccessWithItems = {
  data: {
    cart: {
      id: "gid://shopify/Cart/existing-cart-id",
      createdAt: "2026-04-01T00:00:00Z",
      updatedAt: "2026-04-01T00:00:00Z",
      checkoutUrl: "https://brushellashop.myshopify.com/checkouts/existing",
      cost: {
        subtotalAmount: { amount: "25.00", currencyCode: "AUD" },
        subtotalAmountEstimated: false,
        totalAmount: { amount: "25.00", currencyCode: "AUD" },
        totalAmountEstimated: false,
      },
      totalQuantity: 1,
      lines: {
        nodes: [
          {
            id: "gid://shopify/CartLine/1",
            quantity: 1,
            merchandise: {
              __typename: "ProductVariant",
              id: "gid://shopify/ProductVariant/1",
              title: "Default",
              product: { availableForSale: true, title: "Test Print" },
              image: null,
              price: { amount: "25.00", currencyCode: "AUD" },
              unitPrice: null,
            },
          },
        ],
      },
    },
  },
};

const cartQueryNotFound = {
  data: {
    cart: null,
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

function seedLocalStorage(cartId: string) {
  localStorage.setItem(CHECKOUT_ID_KEY, cartId);
  localStorage.setItem(TIMESTAMP_KEY, Date.now().toString());
}

describe("StoreApp", () => {
  beforeEach(() => {
    localStorage.clear();
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

describe("Cart restoration from localStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("restores an existing valid cart and shows correct item count", async () => {
    seedLocalStorage("gid://shopify/Cart/existing-cart-id");
    mockRequest = jest.fn().mockResolvedValueOnce(cartQuerySuccessWithItems);

    render(
      <StoreApp>
        <TestConsumer />
      </StoreApp>
    );

    await waitFor(() =>
      expect(screen.getByTestId("loading").textContent).toBe("false")
    );

    expect(screen.getByTestId("count").textContent).toBe("1");
    expect(screen.getByTestId("items").textContent).toBe("1");
    expect(screen.getByTestId("totals").textContent).toBe("has-totals");
    expect(localStorage.getItem(CHECKOUT_ID_KEY)).toBe(
      "gid://shopify/Cart/existing-cart-id"
    );
  });

  it("creates a new cart when Shopify returns null for stored cart ID", async () => {
    seedLocalStorage("gid://shopify/Cart/deleted-cart-id");
    mockRequest = jest.fn()
      .mockResolvedValueOnce(cartQueryNotFound)
      .mockResolvedValueOnce(cartCreateSuccess);

    render(
      <StoreApp>
        <TestConsumer />
      </StoreApp>
    );

    await waitFor(() =>
      expect(screen.getByTestId("loading").textContent).toBe("false")
    );

    expect(screen.getByTestId("count").textContent).toBe("0");
    expect(localStorage.getItem(CHECKOUT_ID_KEY)).toBe(
      "gid://shopify/Cart/test-cart-id"
    );
  });

  it("clears expired cart from localStorage and creates a new one", async () => {
    localStorage.setItem(CHECKOUT_ID_KEY, "gid://shopify/Cart/old-cart-id");
    const thirtyOneDaysAgo = Date.now() - 31 * 24 * 60 * 60 * 1000;
    localStorage.setItem(TIMESTAMP_KEY, thirtyOneDaysAgo.toString());

    mockRequest = jest.fn().mockResolvedValueOnce(cartCreateSuccess);

    render(
      <StoreApp>
        <TestConsumer />
      </StoreApp>
    );

    await waitFor(() =>
      expect(screen.getByTestId("loading").textContent).toBe("false")
    );

    expect(mockRequest).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem(CHECKOUT_ID_KEY)).toBe(
      "gid://shopify/Cart/test-cart-id"
    );
  });

  it("sets hasResponseError when cart fetch fails with network error", async () => {
    seedLocalStorage("gid://shopify/Cart/existing-cart-id");
    mockRequest = jest.fn().mockRejectedValueOnce(new Error("Network error"));

    render(
      <StoreApp>
        <TestConsumer />
      </StoreApp>
    );

    await waitFor(() =>
      expect(screen.getByTestId("loading").textContent).toBe("false")
    );

    expect(screen.getByTestId("error").textContent).toBe("true");
    expect(screen.getByTestId("count").textContent).toBe("0");
  });

  it("sets hasResponseError when cart creation fails with network error", async () => {
    mockRequest = jest.fn().mockRejectedValueOnce(new Error("Network error"));

    render(
      <StoreApp>
        <TestConsumer />
      </StoreApp>
    );

    await waitFor(() =>
      expect(screen.getByTestId("loading").textContent).toBe("false")
    );

    expect(screen.getByTestId("error").textContent).toBe("true");
  });
});

describe("useCartLinesUpdate .catch()", () => {
  beforeEach(() => {
    localStorage.clear();
  });

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
  beforeEach(() => {
    localStorage.clear();
  });

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
