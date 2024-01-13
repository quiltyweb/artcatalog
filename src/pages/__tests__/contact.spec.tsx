import React from "react";
import { render, screen } from "@testing-library/react";
import ContactPage from "../contact";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("ContactPage", () => {
  it("renders correctly", () => {
    render(<ContactPage />);
    screen.getByRole("heading", { name: "Send me your questions" });
    screen.getByText(
      "If you have questions that you cannot find answers to in the FAQ section, do not hesitate to contact me."
    );
    screen.getByLabelText("Name");
    screen.getByLabelText("Email address");
    screen.getByText("We'll never share your email.");
    screen.getByLabelText("Message");
    screen.getByRole("button", { name: "Send Message" });
  });
});
