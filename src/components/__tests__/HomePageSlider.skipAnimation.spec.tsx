import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("motion/react", () => {
  const actual = jest.requireActual("motion/react");
  return {
    ...actual,
    useReducedMotion: () => false,
  };
});

jest.mock("swiper/react", () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="swiper">{children}</div>
  ),
  SwiperSlide: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="swiper-slide-testing">{children}</div>
  ),
}));

jest.mock("swiper/modules", () => ({
  Pagination: () => null,
  Navigation: () => null,
  A11y: () => null,
}));

import { HomePageSlider } from "../HomePageSlider";

const IMAGES = [
  {
    alt_text: "skip 1",
    caption: "Skip caption one",
    category: "test",
    image: "gid://fake/MediaImage/1",
    reference: { image: { url: "https://example.invalid/a.jpg" } },
    link: { text: "link", url: "https://example.invalid/a" },
    collection: { handle: "alpha", title: "Alpha" },
    title: "alpha",
  },
  {
    alt_text: "skip 2",
    caption: "Skip caption two",
    category: "test",
    image: "gid://fake/MediaImage/2",
    reference: { image: { url: "https://example.invalid/b.jpg" } },
    link: { text: "link", url: "https://example.invalid/b" },
    collection: { handle: "beta", title: "Beta" },
    title: "beta",
  },
];

describe("HomePageSlider — skip animation button", () => {
  it("shows the skip button during the intro and dismisses the loader and captions on click", () => {
    jest.useFakeTimers();
    render(<HomePageSlider images={IMAGES} initialLoading={false} />);

    // Animation does not play by default — only the play button is present.
    expect(screen.queryByLabelText("Brushella")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /skip intro animation/i }),
    ).not.toBeInTheDocument();

    const playButton = screen.getByRole("button", { name: /play intro animation/i });
    expect(playButton).toBeInTheDocument();

    // Start the animation.
    act(() => {
      fireEvent.click(playButton);
    });

    // The logo-intro loader and skip button are now visible during the intro.
    expect(screen.getByLabelText("Brushella")).toBeInTheDocument();
    const skipButton = screen.getByRole("button", {
      name: /skip intro animation/i,
    });
    expect(skipButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(skipButton);
    });

    // Loader is gone immediately after clicking skip.
    expect(screen.queryByLabelText("Brushella")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Featured work slider is loading"),
    ).not.toBeInTheDocument();

    // Captions are revealed straight away (no 1.5s wait).
    IMAGES.forEach((item) => {
      expect(
        screen.getByRole("link", { name: item.caption }),
      ).toBeInTheDocument();
    });

    // Skip button is no longer rendered once the animation is complete.
    expect(
      screen.queryByRole("button", { name: /skip intro animation/i }),
    ).not.toBeInTheDocument();

    jest.useRealTimers();
  });
});
