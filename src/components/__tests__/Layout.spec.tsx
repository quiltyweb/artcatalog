import React from "react";
import { within } from "@testing-library/dom";
import { render, screen } from "@testing-library/react";
import Layout from "../Layout";
import userEvent from "@testing-library/user-event";
import * as Gatsby from "gatsby";

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

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Layout", () => {
  it("renders correctly mobile first layout", async () => {
    const useStaticQuery = jest.spyOn(Gatsby, `useStaticQuery`);
    useStaticQuery.mockImplementation(() => mockUseStaticQuery);
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => ({
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });

    render(<Layout>{<p>some content children</p>}</Layout>);

    const Nav = await screen.findByRole("navigation");
    within(Nav).getByRole("button", { name: "menu" });
    within(Nav).getByAltText("Site Title");
    expect(
      within(Nav).queryByRole("link", { name: "about" })
    ).not.toBeInTheDocument();

    screen.getByText("some content children");

    const Footer = await screen.findByRole("contentinfo");

    within(Footer).getByRole("link", { name: "Return and Refund Policy" });
    within(Footer).getByRole("link", { name: "Hand Made Policy" });
    within(Footer).getByRole("link", { name: "Shipping Policy" });
    within(Footer).getByRole("link", { name: "Privacy Policy" });
    within(Footer).getByRole("link", { name: "Terms of Service" });
  });

  it("trigger mobile dialog when clicking the menu button", async () => {
    const useStaticQuery = jest.spyOn(Gatsby, `useStaticQuery`);
    useStaticQuery.mockImplementation(() => mockUseStaticQuery);
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => ({
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
    const user = userEvent.setup();
    render(
      <Layout>
        <p>some content children</p>
      </Layout>
    );
    await screen.findByRole("button", { name: "menu" });

    const mobileButton = screen.getByRole("button", { name: "menu" });
    user.click(mobileButton);
    const mobileMenu = await screen.findByTestId("mobile-menu");

    within(mobileMenu).getByText("about");
    within(mobileMenu).getByRole("link", { name: "commissions" });
    within(mobileMenu).getByRole("link", { name: "originals" });
    within(mobileMenu).getByRole("link", { name: "prints" });
    within(mobileMenu).getByRole("link", { name: "resin and pigment art" });
    within(mobileMenu).getByRole("link", { name: "decor" });
    within(mobileMenu).getByRole("link", { name: "wearable art" });
    within(mobileMenu).getByRole("link", { name: "stickers" });
    within(mobileMenu).getByRole("link", { name: "murals" });
    expect(screen.getAllByLabelText("facebook")).toHaveLength(2);
    expect(screen.getAllByLabelText("instagram")).toHaveLength(2);
    expect(screen.getAllByLabelText("whatsApp")).toHaveLength(2);
  });
});

it("loads desktop layout", async () => {
  const useStaticQuery = jest.spyOn(Gatsby, `useStaticQuery`);
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
  expect(screen.queryByLabelText("send a message")).not.toBeInTheDocument();
  screen.getByAltText("Site Title");
  const desktopMenu = await screen.findByRole("navigation");

  within(desktopMenu).getByText("about");
  within(desktopMenu).getByRole("link", { name: "commissions" });
  within(desktopMenu).getByRole("link", { name: "originals" });
  within(desktopMenu).getByRole("link", { name: "prints" });
  within(desktopMenu).getByRole("link", { name: "resin and pigment art" });
  within(desktopMenu).getByRole("link", { name: "decor" });
  within(desktopMenu).getByRole("link", { name: "wearable art" });
  within(desktopMenu).getByRole("link", { name: "stickers" });
  within(desktopMenu).getByRole("link", { name: "murals" });

  const Footer = await screen.findByRole("contentinfo");

  within(Footer).getByRole("link", { name: "Return and Refund Policy" });
  within(Footer).getByRole("link", { name: "Hand Made Policy" });
  within(Footer).getByRole("link", { name: "Shipping Policy" });
  within(Footer).getByRole("link", { name: "Privacy Policy" });
  within(Footer).getByRole("link", { name: "Terms of Service" });

  expect(screen.getAllByLabelText("facebook")).toHaveLength(1);
  expect(screen.getAllByLabelText("instagram")).toHaveLength(1);
  expect(screen.getAllByLabelText("whatsApp")).toHaveLength(1);
});
