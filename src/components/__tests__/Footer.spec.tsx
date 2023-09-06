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
  it("renders correctly", async () => {
    render(<Footer />);
    // screen.getByRole("heading", { name: "quick links" });
    // screen.getByRole("link", { name: "Refunds & Returns" });
    // screen.getByRole("link", { name: "Privacy Policy" });
    // screen.getByRole("link", { name: "Terms Of Service" });
    // screen.getByRole("link", { name: "FAQs" });
    screen.getByLabelText("facebook");
    screen.getByLabelText("instagram");
    screen.getByLabelText("whatsApp");
    screen.getByText(/© 2023, Brushella Art & Decor/);
  });
});
