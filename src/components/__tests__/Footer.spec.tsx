import React from "react";
import { render, screen, within } from "@testing-library/react";
import Footer from "../Footer";

let MOCKED_PROPS: Queries.LayoutGlobalDataQuery["adminshopify"]["legalContent"];

beforeEach(() => {
  jest.clearAllMocks();
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
