import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Footer", () => {
  const legalContentMockedData = [
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
  ];

  it("renders correctly", async () => {
    render(<Footer legalContentItems={legalContentMockedData} />);
    // legal content policies links:
    screen.getByRole("link", { name: "Return and Refund Policy" });
    screen.getByRole("link", { name: "Hand Made Policy" });
    screen.getByRole("link", { name: "Shipping Policy" });
    screen.getByRole("link", { name: "Privacy Policy" });
    screen.getByRole("link", { name: "Terms of Service" });

    screen.getByTestId("facebook");
    screen.getByTestId("instagram");
    screen.getByTestId("whatsApp");
    screen.getByText(/© 2023, Brushella Art & Decor/);
  });
});
