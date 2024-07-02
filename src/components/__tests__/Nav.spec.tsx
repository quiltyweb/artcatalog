import React from "react";
import { render, screen } from "@testing-library/react";
import Nav from "../Nav";
import CartContext from "../../context/CartContext";
import StoreContextProvider from "../../context/StoreContext";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Nav", () => {
  const mockedData = {
    title: "Brushella title",
    allShopifyCollectionItems: [
      {
        id: "4179b182-b572-5609-a8a2-05083671479a",
        title: "murals",
        handle: "murals",
      },
      {
        id: "f824e7dd-2243-5286-a2aa-162cbc0f42cd",
        title: "stickers",
        handle: "stickers",
      },
      {
        id: "a1f141d4-942b-51bc-9ab2-a2f4a48d1755",
        title: "wearable art",
        handle: "wearable-art",
      },
      {
        id: "1f50e1f9-d3a0-54cc-b961-652870d93340",
        title: "resin and pigment art",
        handle: "resin-and-pigment-art",
      },
      {
        id: "62470692-0598-57cc-bc0a-1ea60791c995",
        title: "commissions",
        handle: "commissions",
      },
      {
        id: "bd4e6e5b-a663-5e00-becb-b4a63d4c7ec6",
        title: "prints",
        handle: "prints",
      },
      {
        id: "ab94a31f-8fc3-5e3c-b0cf-5a16c873d647",
        title: "originals",
        handle: "originals",
      },
      {
        id: "384d31c2-36b3-5bc7-a4eb-1dc34dea1ab1",
        title: "decor",
        handle: "decor",
      },
    ],
  };

  it("renders cart counter with 1 item correctly for mobile view", async () => {
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => ({
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });

    render(
      <CartContext.Provider
        value={{
          cart: [
            {
              id: "84ffc6ea-5fa7-5a0a-bc33-5062ea5ec4f8",
              product: {
                id: "84ffc6ea-5fa7-5a0a-bc33-5062ea5ec4f8",
                title: "Tiger Sticker",
                handle: "tiger-sticker",
                description: 'Sticker from "Jungle" print',
                priceRangeV2: {
                  maxVariantPrice: {
                    amount: 0,
                    currencyCode: "AUD",
                  },
                },
                featuredImage: null,
              },
              quantity: 1,
            },
          ],
        }}
      >
        <Nav
          title={mockedData.title}
          allShopifyCollectionItems={mockedData.allShopifyCollectionItems}
        />
      </CartContext.Provider>
    );

    screen.getByLabelText("view shopping basket");
    screen.getByText("1");
  });

  it("renders cart counter with 1 item correctly for desktop view", async () => {
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => ({
        matches: true,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });

    render(
      <CartContext.Provider
        value={{
          cart: [
            {
              id: "84ffc6ea-5fa7-5a0a-bc33-5062ea5ec4f8",
              product: {
                id: "84ffc6ea-5fa7-5a0a-bc33-5062ea5ec4f8",
                title: "Tiger Sticker",
                handle: "tiger-sticker",
                description: 'Sticker from "Jungle" print',
                priceRangeV2: {
                  maxVariantPrice: {
                    amount: 0,
                    currencyCode: "AUD",
                  },
                },
                featuredImage: null,
              },
              quantity: 1,
            },
          ],
        }}
      >
        <Nav
          title={mockedData.title}
          allShopifyCollectionItems={mockedData.allShopifyCollectionItems}
        />
      </CartContext.Provider>
    );

    screen.getByLabelText("view shopping basket");
    screen.getByRole("link", { name: /My basket/i });
    screen.getByRole("link", { name: /(1 item)/i });
  });

  it("renders mobile version correctly ", async () => {
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => ({
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });

    render(
      <Nav
        title={mockedData.title}
        allShopifyCollectionItems={mockedData.allShopifyCollectionItems}
      />
    );

    screen.getByAltText(/Brushella title/);
    screen.getByLabelText("send a message");
    screen.getByLabelText("view shopping basket");
    screen.getByRole("button", { name: "menu" });

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
      <Nav
        title={mockedData.title}
        allShopifyCollectionItems={mockedData.allShopifyCollectionItems}
      />
    );
    expect(
      screen.queryByRole("button", { name: "menu" })
    ).not.toBeInTheDocument();
    screen.getByTitle("send a message");
    screen.getByRole("link", { name: /Contact me/i });
    screen.getByAltText(/Brushella title/);
    screen.getByLabelText("view shopping basket");
    screen.getByRole("link", { name: "commissions" });
    screen.getByRole("link", { name: "originals" });
    screen.getByRole("link", { name: "prints" });
    screen.getByRole("link", { name: "resin and pigment art" });
    screen.getByRole("link", { name: "decor" });
    screen.getByRole("link", { name: "wearable art" });
    screen.getByRole("link", { name: "stickers" });
    screen.getByRole("link", { name: "murals" });
  });

  it("renders desktop nav with no categories when they are not provided", async () => {
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => ({
        matches: true,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
    render(<Nav title={mockedData.title} allShopifyCollectionItems={[]} />);
    screen.getByTitle("send a message");
    screen.getByAltText(/Brushella title/);
    screen.getByLabelText("view shopping basket");

    expect(
      screen.queryByRole("link", { name: "commissions" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "originals" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "prints" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "resin and pigment art" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "decor" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "wearable art" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "stickers" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "murals" })
    ).not.toBeInTheDocument();
  });
});
