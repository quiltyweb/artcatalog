import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConsentBanner from "../ConsentBanner";

const STORAGE_KEY = "brushella_analytics_consent";
const HERO_EVENT = "brushella:hero-animation-complete";

const originalLocation = window.location;

const setPathname = (path: string) => {
  delete (window as unknown as { location?: Location }).location;
  (window as unknown as { location: { pathname: string; href: string } }).location = {
    pathname: path,
    href: `http://localhost${path}`,
  };
};

afterAll(() => {
  (window as unknown as { location: Location }).location = originalLocation;
});

const fireHeroAnimationComplete = () => {
  act(() => {
    window.dispatchEvent(new Event(HERO_EVENT));
  });
};

beforeEach(() => {
  window.localStorage.clear();
  setPathname("/");
});

describe("ConsentBanner", () => {
  it("does not render when consent is already 'granted'", () => {
    window.localStorage.setItem(STORAGE_KEY, "granted");
    render(<ConsentBanner />);
    fireHeroAnimationComplete();
    expect(screen.queryByTestId("consent-banner")).not.toBeInTheDocument();
  });

  it("does not render when consent is already 'denied'", () => {
    window.localStorage.setItem(STORAGE_KEY, "denied");
    render(<ConsentBanner />);
    fireHeroAnimationComplete();
    expect(screen.queryByTestId("consent-banner")).not.toBeInTheDocument();
  });

  it("does not render on '/' until the hero animation event fires", () => {
    render(<ConsentBanner />);
    expect(screen.queryByTestId("consent-banner")).not.toBeInTheDocument();
    fireHeroAnimationComplete();
    expect(screen.getByTestId("consent-banner")).toBeInTheDocument();
  });

  it("renders immediately on a non-homepage route", () => {
    setPathname("/collections");
    render(<ConsentBanner />);
    expect(screen.getByTestId("consent-banner")).toBeInTheDocument();
  });

  it("Accept button writes 'granted' to localStorage and hides the banner", async () => {
    const user = userEvent.setup();
    setPathname("/collections");
    render(<ConsentBanner />);
    await user.click(screen.getByRole("button", { name: /accept/i }));
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("granted");
    expect(screen.queryByTestId("consent-banner")).not.toBeInTheDocument();
  });

  it("Decline button writes 'denied' to localStorage and hides the banner", async () => {
    const user = userEvent.setup();
    setPathname("/collections");
    render(<ConsentBanner />);
    await user.click(screen.getByRole("button", { name: /decline/i }));
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("denied");
    expect(screen.queryByTestId("consent-banner")).not.toBeInTheDocument();
  });

  it("links to the privacy policy page", () => {
    setPathname("/collections");
    render(<ConsentBanner />);
    const link = screen.getByRole("link", { name: /privacy policy/i });
    expect(link).toHaveAttribute("href", "/legal-content/privacy-policy");
  });
});
