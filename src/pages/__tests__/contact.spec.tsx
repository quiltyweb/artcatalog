import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactPage from "../contact";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeEach(() => {
  jest.clearAllMocks();
  fetchMock.resetMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("ContactPage", () => {
  it("shows an error message when the fetch throws a network error", async () => {
    fetchMock.mockRejectOnce(new Error("Network error"));

    render(<ContactPage />);

    await userEvent.type(screen.getByLabelText("Full Name"), "Jane Doe");
    await userEvent.type(
      screen.getByLabelText("Email address"),
      "jane@example.com"
    );
    await userEvent.type(screen.getByLabelText("Message"), "Hello there");
    await userEvent.click(screen.getByRole("button", { name: "Send Enquiry" }));

    await waitFor(() =>
      screen.getByText(
        "There was an error sending your message. Please try again later."
      )
    );
  });

  it("renders correctly", () => {
    render(<ContactPage />);
    screen.getByRole("heading", { name: "Contact me" });
    expect(screen.getByTestId("contact-form-description").textContent).toBe(
      "If you have questions that you cannot find answers in the About Me page or quick links section, do not hesitate to contact me via the contact form below. Please allow 3 to 5 bussiness days to answer."
    );
    screen.getByLabelText("Full Name");
    screen.getByLabelText("Email address");
    screen.getByLabelText("Message");
    screen.getByRole("button", { name: "Send Enquiry" });
    screen.getByRole("link", { name: "Home" });
  });
});
