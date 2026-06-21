import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HeroSection from "../HeroSection";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("HeroSection", () => {
  it("renders correctly on mobile", async () => {
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => ({
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
    render(<HeroSection />);
    screen.getByAltText(
      "Black and white portrait of Gabriela Ugalde, author of Brushella's art store, holding a brush and painting a colorful stroke across her face."
    );
    screen.getByRole("heading", { name: /Welcome to Brushella's Art Store/i });
    screen.getByText("Where craftsmanship meets creativity!");
    screen.getByText(
      /Embrace the beauty of handmade artistry with Brushella, where every piece tells a story!/i
    );
  });
  it("shows Read more button and toggles expanded state when description overflows", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn(() => ({
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });

    const originalScrollHeight = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      "scrollHeight"
    );
    Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
      configurable: true,
      get() {
        return 200;
      },
    });

    render(<HeroSection />);

    const readMoreButton = screen.getByRole("button", { name: /read more/i });
    expect(readMoreButton).toBeInTheDocument();
    expect(readMoreButton).toHaveAttribute("aria-expanded", "false");
    expect(readMoreButton).toHaveAttribute("aria-controls", "hero-description");

    fireEvent.click(readMoreButton);
    expect(screen.getByRole("button", { name: /read less/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /read less/i })).toHaveAttribute("aria-expanded", "true");

    if (originalScrollHeight) {
      Object.defineProperty(HTMLElement.prototype, "scrollHeight", originalScrollHeight);
    } else {
      delete (HTMLElement.prototype as unknown as Record<string, unknown>).scrollHeight;
    }
  });

  it("renders correctly on desktop", async () => {
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => ({
        matches: true,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
    render(<HeroSection />);
    screen.getByAltText(
      "Black and white portrait of Gabriela Ugalde, author of Brushella's art store, holding a brush and painting a colorful stroke across her face."
    );
    screen.getByRole("heading", { name: /Welcome to Brushella's Art Store/i });
    expect(screen.getByRole("link", { name: "Explore the Collection" })).toHaveAttribute("href", "/collections/");
    screen.getByText("Where craftsmanship meets creativity!");
    screen.getByText(
      /Embrace the beauty of handmade artistry with Brushella, where every piece tells a story!/i
    );
  });
});
