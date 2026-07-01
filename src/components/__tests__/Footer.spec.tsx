import React from "react";
import * as MarketContext from "../../context/MarketContext";
import { render, screen, within, fireEvent } from "@testing-library/react";
import Footer from "../Footer";
const useMarket = jest.spyOn(MarketContext, "useMarket");

let MOCKED_PROPS: Queries.LayoutGlobalDataQuery["adminshopify"]["legalContent"];

beforeEach(() => {
  jest.clearAllMocks();
  useMarket.mockImplementation(() => ({ countryCode: "AU", setCountryCode: jest.fn() }));
  MOCKED_PROPS = {
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
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Footer", () => {
  it("renders correctly", () => {
    render(<Footer legalContent={MOCKED_PROPS} />);
    screen.getByText(/Quick Links/i);
    screen.getByRole("link", { name: "Return and Refund Policy" });
    screen.getByRole("link", { name: "Hand Made Policy" });
    screen.getByRole("link", { name: "Shipping Policy" });
    screen.getByRole("link", { name: "Privacy Policy" });
    screen.getByRole("link", { name: "Terms of Service" });
    screen.getByRole("link", { name: /contact/i });
    screen.getByRole("link", { name: /About Me/i });
    screen.getByRole("link", { name: /All Categories/i });
    screen.getByTestId("facebook");
    screen.getByTestId("instagram");
    screen.getByTestId("whatsApp");
    screen.getByText(/Brushella Art & Home décor. All rights reserved/);
    screen.getByText(/© 202/);
    screen.getByRole("link", { name: /go to top/i });
  });

  describe("currency selector", () => {
    const twoMarkets = [
      {
        name: "Australia",
        status: "ACTIVE",
        type: "REGION",
        conditions: {
          regionsCondition: {
            regions: { nodes: [{ code: "AU", currency: { currencyCode: "AUD" } }] },
          },
        },
      },
      {
        name: "New Zealand",
        status: "ACTIVE",
        type: "REGION",
        conditions: {
          regionsCondition: {
            regions: { nodes: [{ code: "NZ", currency: { currencyCode: "NZD" } }] },
          },
        },
      },
    ];

    it("does not render when markets prop is omitted", () => {
      render(<Footer legalContent={MOCKED_PROPS} />);
      expect(screen.queryByLabelText("Select currency")).not.toBeInTheDocument();
    });

    it("does not render when only one market is active", () => {
      render(<Footer legalContent={MOCKED_PROPS} markets={[twoMarkets[0]]} />);
      expect(screen.queryByLabelText("Select currency")).not.toBeInTheDocument();
    });

    it("renders with an option per market when multiple markets are provided", () => {
      render(<Footer legalContent={MOCKED_PROPS} markets={twoMarkets} />);
      const selector = screen.getByLabelText("Select currency");
      expect(within(selector).getByRole("option", { name: /AUD/ })).toBeInTheDocument();
      expect(within(selector).getByRole("option", { name: /NZD/ })).toBeInTheDocument();
    });

    it("calls setCountryCode with the selected country code when the selection changes", () => {
      const mockSetCountryCode = jest.fn();
      useMarket.mockImplementation(() => ({ countryCode: "AU", setCountryCode: mockSetCountryCode }));
      render(<Footer legalContent={MOCKED_PROPS} markets={twoMarkets} />);
      fireEvent.change(screen.getByLabelText("Select currency"), { target: { value: "NZ" } });
      expect(mockSetCountryCode).toHaveBeenCalledWith("NZ");
    });
  });

  it("renders no links correctly", async () => {
    render(<Footer />);

    const footer = await screen.findByTestId("footer");

    within(footer).getByText(/Quick Links/i);

    expect(
      within(footer).queryByRole("link", { name: "Return and Refund Policy" })
    ).not.toBeInTheDocument();
    expect(
      within(footer).queryByRole("link", { name: "Hand Made Policy" })
    ).not.toBeInTheDocument();
    expect(
      within(footer).queryByRole("link", { name: "Shipping Policy" })
    ).not.toBeInTheDocument();
    expect(
      within(footer).queryByRole("link", { name: "Privacy Policy" })
    ).not.toBeInTheDocument();
    expect(
      within(footer).queryByRole("link", { name: "Terms of Service" })
    ).not.toBeInTheDocument();
    within(footer).getByRole("link", { name: /contact/i });
    within(footer).getByRole("link", { name: /About Me/i });
    const year = new Date().getFullYear();
    within(footer).getByText(
      `© ${year}, Brushella Art & Home décor. All rights reserved.`
    );
    within(footer).getByRole("link", { name: /Go to top/i });
    within(footer).getByLabelText("facebook");
    within(footer).getByLabelText("instagram");
    within(footer).getByLabelText("whatsApp");
  });
});
