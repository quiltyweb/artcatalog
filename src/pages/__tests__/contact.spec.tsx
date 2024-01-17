import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import ContactPage from "../contact";
import userEvent from "@testing-library/user-event";
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

  it("validates form correctly", async () => {
    const user = userEvent.setup();
    render(<ContactPage />);
    await act(async () => {
      await user.click(screen.getByRole("button", { name: "Send Message" }));
    });

    screen.findByText("Name is Required");
    screen.findByText("Email is Required");
    screen.findByText("Message is Required");
  });

  it("submits form correctly", async () => {
    const user = userEvent.setup();
    fetchMock.mockResponseOnce(
      JSON.stringify({
        success: true,
        formValues: {
          fullname: "abc",
          email: "def@gmail.com",
          message: "ghijk",
        },
      })
    );
    render(<ContactPage />);
    expect(screen.queryByTestId("contact-form")).toBeInTheDocument();

    await act(async () => {
      await user.type(screen.getByLabelText("Full Name"), "name testing");
      await user.type(
        screen.getByLabelText("Email address"),
        "email@email.com"
      );
      await user.type(screen.getByLabelText("Message"), "message testing");
    });
    await act(async () => {
      await user.click(screen.getByRole("button", { name: "Send Message" }));
    });

    await screen.findByText(/You message was sent succesfully!/);
    await waitFor(() => {
      expect(screen.queryByTestId("contact-form")).toBeNull();
    });
  });

  it("renders arror message when gets error response back ", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        success: false,
        formValues: {
          fullname: "aaa",
          email: "bbb@bbb.com",
          message: "cccccccc",
        },
      }),
      { status: 404 }
    );
    const user = userEvent.setup();
    render(<ContactPage />);
    expect(screen.queryByTestId("contact-form")).toBeInTheDocument();
    await act(async () => {
      await user.type(screen.getByLabelText("Full Name"), "aaa");
      await user.type(screen.getByLabelText("Email address"), "bbb@bbb.com");
      await user.type(screen.getByLabelText("Message"), "cccccccc");
    });
    await act(async () => {
      await user.click(screen.getByRole("button", { name: "Send Message" }));
    });

    await screen.findByText(
      /There was an error sending your message. Please try again later./
    );
    await waitFor(() => {
      expect(screen.queryByTestId("contact-form")).toBeNull();
    });
  });
});
