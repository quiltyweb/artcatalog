import React from "react";
import * as Gatsby from "gatsby";
import { render, screen } from "@testing-library/react";
import Nav from "../Nav";

const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery");

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Nav", () => {
  it("renders mobile version correctly ", async () => {
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {
          title: "Brushella title",
        },
      },
      allShopifyCollection: {
        nodes: [
          {
            id: "4179b182-b572-5609-a8a2-05083671479a",
            title: "Murals & Sign Writing",
            handle: "murals",
          },
          {
            id: "f824e7dd-2243-5286-a2aa-162cbc0f42cd",
            title: "Stickers",
            handle: "stickers",
          },
          {
            id: "a1f141d4-942b-51bc-9ab2-a2f4a48d1755",
            title: "Wearable Art",
            handle: "wearable-art",
          },
          {
            id: "1f50e1f9-d3a0-54cc-b961-652870d93340",
            title: "Resin & Pigment Art",
            handle: "resin-and-pigment-art",
          },
          {
            id: "62470692-0598-57cc-bc0a-1ea60791c995",
            title: "Commissions",
            handle: "commissions",
          },
          {
            id: "bd4e6e5b-a663-5e00-becb-b4a63d4c7ec6",
            title: "Prints",
            handle: "prints",
          },
          {
            id: "ab94a31f-8fc3-5e3c-b0cf-5a16c873d647",
            title: "Original Paintings",
            handle: "originals",
          },
          {
            id: "384d31c2-36b3-5bc7-a4eb-1dc34dea1ab1",
            title: "Home Decor",
            handle: "decor",
          },
        ],
      },
    }));
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => ({
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });

    render(<Nav />);

    screen.getByAltText(/Brushella title/);
    screen.getByLabelText("send a message");
    screen.getByRole("link", { name: "Shopping cart 0 items" });
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
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {
          title: "Brushella title",
        },
      },
      allShopifyCollection: {
        nodes: [
          {
            id: "4179b182-b572-5609-a8a2-05083671479a",
            title: "Murals & Sign Writing",
            handle: "murals",
          },
          {
            id: "f824e7dd-2243-5286-a2aa-162cbc0f42cd",
            title: "Stickers",
            handle: "stickers",
          },
          {
            id: "a1f141d4-942b-51bc-9ab2-a2f4a48d1755",
            title: "Wearable Art",
            handle: "wearable-art",
          },
          {
            id: "1f50e1f9-d3a0-54cc-b961-652870d93340",
            title: "Resin & Pigment Art",
            handle: "resin-and-pigment-art",
          },
          {
            id: "62470692-0598-57cc-bc0a-1ea60791c995",
            title: "Commissions",
            handle: "commissions",
          },
          {
            id: "bd4e6e5b-a663-5e00-becb-b4a63d4c7ec6",
            title: "Prints",
            handle: "prints",
          },
          {
            id: "ab94a31f-8fc3-5e3c-b0cf-5a16c873d647",
            title: "Original Paintings",
            handle: "originals",
          },
          {
            id: "384d31c2-36b3-5bc7-a4eb-1dc34dea1ab1",
            title: "Home Decor",
            handle: "decor",
          },
        ],
      },
    }));

    render(<Nav />);
    screen.debug();
    expect(
      screen.queryByRole("button", { name: "menu" })
    ).not.toBeInTheDocument();
    screen.getByAltText(/Brushella title/);
    screen.getByRole("link", { name: "Shopping cart 0 items" });
    screen.getByRole("link", { name: "Commissions" });
    screen.getByRole("link", { name: "Original Paintings" });
    screen.getByRole("link", { name: "Prints" });
    screen.getByRole("link", { name: "Resin & Pigment Art" });
    screen.getByRole("link", { name: "Home Decor" });
    screen.getByRole("link", { name: "Wearable Art" });
    screen.getByRole("link", { name: "Stickers" });
    screen.getByRole("link", { name: "Murals & Sign Writing" });
  });

  it("renders desktop nav with no categories when they are not provided", async () => {
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {
          title: null,
        },
      },
      allShopifyCollection: {
        nodes: [],
      },
    }));
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => ({
        matches: true,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
    render(<Nav />);
    screen.getByAltText("Brushella");
    screen.getByRole("link", { name: "Shopping cart 0 items" });
    expect(
      screen.queryByRole("link", { name: "Original Paintings" })
    ).not.toBeInTheDocument();
  });

  it("renders counter text with correct label for 1 item", async () => {
    // TODO: add 1 item to cart to recreate the shopping cart counter label
  });
});
