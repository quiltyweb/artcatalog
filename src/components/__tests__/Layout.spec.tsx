import React from "react";
import { within } from "@testing-library/dom";
import { render, screen } from "@testing-library/react";
import Layout from "../Layout";
import * as Gatsby from "gatsby";
import * as StoreContext from "../../context/StoreContext";
const useStaticQuery = jest.spyOn(Gatsby, `useStaticQuery`);
const useLineItemsCount = jest.spyOn(StoreContext, `useLineItemsCount`);
jest.mock("@shopify/storefront-api-client");

beforeEach(() => {
  jest.clearAllMocks();
  useLineItemsCount.mockImplementation(() => 0);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Layout", () => {
  const mockUseStaticQuery = {
    site: {
      siteMetadata: {
        title: "Site Title",
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
    adminshopify: {
      legalContent: {
        nodes: [
          {
            fields: [
              {
                key: "return_and_refund_policy",
                definition: {
                  name: "Return and Refund Policy",
                },
              },
              {
                key: "hand_made_policy",
                definition: {
                  name: "Hand Made Policy",
                },
              },
              {
                key: "shipping_policy",
                definition: {
                  name: "Shipping Policy",
                },
              },
              {
                key: "privacy_policy",
                definition: {
                  name: "Privacy Policy",
                },
              },
              {
                key: "terms_of_service",
                definition: {
                  name: "Terms of Service",
                },
              },
            ],
          },
        ],
      },
    },
  };

  it("renders mobile layout correctly", async () => {
    useStaticQuery.mockImplementation(() => mockUseStaticQuery);
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => ({
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });

    render(<Layout>{<p>some content children</p>}</Layout>);

    within(screen.getByRole("alert")).getByText(
      /Brushella.art is under construction./i
    );
    within(screen.getByRole("alert")).getByText(
      /This store can’t accept payments right now./i
    );

    const Nav = await screen.findByRole("navigation");
    within(Nav).getByRole("link", { name: "Shopping cart 0 items" });
    within(Nav).getByLabelText("Site Title home");
    within(Nav).getByRole("button", { name: "menu" });
    screen.getByText("some content children");
    const Footer = await screen.findByRole("contentinfo");
    within(Footer).getByRole("link", { name: "Return and Refund Policy" });
    within(Footer).getByRole("link", { name: "Hand Made Policy" });
    within(Footer).getByRole("link", { name: "Shipping Policy" });
    within(Footer).getByRole("link", { name: "Privacy Policy" });
    within(Footer).getByRole("link", { name: "Terms of Service" });
  });

  it("loads desktop layout", async () => {
    useStaticQuery.mockImplementation(() => mockUseStaticQuery);
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => ({
        matches: true,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });

    render(
      <Layout>
        <p>some content children</p>
      </Layout>
    );

    expect(
      screen.queryByRole("button", { name: "menu" })
    ).not.toBeInTheDocument();
    screen.getByRole("link", { name: "Shopping cart 0 items" });
    screen.getByLabelText("Site Title home");
    const desktopMenu = await screen.findByRole("navigation");
    within(desktopMenu).getByRole("link", { name: "Commissions" });
    within(desktopMenu).getByRole("link", { name: "Original Paintings" });
    within(desktopMenu).getByRole("link", { name: "Prints" });
    within(desktopMenu).getByRole("link", { name: "Resin & Pigment Art" });
    within(desktopMenu).getByRole("link", { name: "Home Decor" });
    within(desktopMenu).getByRole("link", { name: "Wearable Art" });
    within(desktopMenu).getByRole("link", { name: "Stickers" });
    within(desktopMenu).getByRole("link", { name: "Murals & Sign Writing" });
    const Footer = await screen.findByRole("contentinfo");
    within(Footer).getByRole("link", { name: "Return and Refund Policy" });
    within(Footer).getByRole("link", { name: "Hand Made Policy" });
    within(Footer).getByRole("link", { name: "Shipping Policy" });
    within(Footer).getByRole("link", { name: "Privacy Policy" });
    within(Footer).getByRole("link", { name: "Terms of Service" });
    within(Footer).getByRole("link", { name: /about me/i });
    within(Footer).getByRole("link", { name: /contact/i });
    within(Footer).getByRole("link", { name: /go to top/i });
    expect(screen.getAllByLabelText("facebook")).toHaveLength(1);
    expect(screen.getAllByLabelText("instagram")).toHaveLength(1);
    expect(screen.getAllByLabelText("whatsApp")).toHaveLength(1);
  });
});
