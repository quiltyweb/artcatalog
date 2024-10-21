import React from "react";
import { render, screen } from "@testing-library/react";
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
    screen.getByText(
      "Your one-stop online shop where craftsmanship meets creativity!"
    );
    screen.getByText(
      /Embrace the beauty of handmade artistry with Brushella, where every piece tells a story!/i
    );
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
    screen.getByText(
      "Your one-stop online shop where craftsmanship meets creativity!"
    );
    screen.getByText(
      /Embrace the beauty of handmade artistry with Brushella, where every piece tells a story!/i
    );
  });
});
