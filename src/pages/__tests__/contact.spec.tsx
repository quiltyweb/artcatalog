import React from "react";
import { render, screen } from "@testing-library/react";
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
  it("renders correctly", () => {
    render(<ContactPage />);
    screen.getByRole("heading", { name: "Send me your questions" });
    expect(screen.getByTestId("contact-form-description").textContent).toBe(
      "If you have questions that you cannot find answers in the about me page or quick links section, do not hesitate to contact me via the contact form below. Please allow 3 to 5 bussiness days to answer."
    );
    screen.getByLabelText("Full Name");
    screen.getByLabelText("Email address");
    screen.getByLabelText("Message");
    screen.getByRole("button", { name: "Send Message" });
  });
});
