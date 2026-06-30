import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConsentBanner from "../ConsentBanner";

const STORAGE_KEY = "brushella_analytics_consent";

beforeEach(() => {
  window.localStorage.clear();
});

describe("ConsentBanner", () => {
  it("does not render when consent is already 'granted'", () => {
    window.localStorage.setItem(STORAGE_KEY, "granted");
    render(<ConsentBanner />);
    expect(screen.queryByTestId("consent-banner")).not.toBeInTheDocument();
  });

  it("does not render when consent is already 'denied'", () => {
    window.localStorage.setItem(STORAGE_KEY, "denied");
    render(<ConsentBanner />);
    expect(screen.queryByTestId("consent-banner")).not.toBeInTheDocument();
  });

  it("renders on landing when consent has not been set", () => {
    render(<ConsentBanner />);
    expect(screen.getByTestId("consent-banner")).toBeInTheDocument();
  });

  it("Accept button writes 'granted' to localStorage and hides the banner", async () => {
    const user = userEvent.setup();
    render(<ConsentBanner />);
    await user.click(screen.getByRole("button", { name: /accept/i }));
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("granted");
    expect(screen.queryByTestId("consent-banner")).not.toBeInTheDocument();
  });

  it("Decline button writes 'denied' to localStorage and hides the banner", async () => {
    const user = userEvent.setup();
    render(<ConsentBanner />);
    await user.click(screen.getByRole("button", { name: /decline/i }));
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("denied");
    expect(screen.queryByTestId("consent-banner")).not.toBeInTheDocument();
  });

  it("links to the privacy policy page", () => {
    render(<ConsentBanner />);
    const link = screen.getByRole("link", { name: /privacy policy/i });
    expect(link).toHaveAttribute("href", "/legal-content/privacy-policy");
  });
});
