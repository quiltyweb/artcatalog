import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";

// Force the reduce-motion path. Because hasPlayedEntrance is module-level
// inside HomePageSlider, this dedicated test file gets a fresh module
// registry and a guaranteed shouldAnimate = false on first render.
jest.mock("motion/react", () => {
  const actual = jest.requireActual("motion/react");
  return {
    ...actual,
    useReducedMotion: () => true,
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
}));

import { HomePageSlider } from "../HomePageSlider";

const IMAGES = [
  {
    alt_text: "reduce motion 1",
    caption: "Reduce-motion caption one",
    category: "test",
    image: "gid://fake/MediaImage/1",
    reference: { image: { url: "https://example.invalid/a.jpg" } },
    link: { text: "link", url: "https://example.invalid/a" },
    collection: { handle: "alpha", title: "Alpha" },
    title: "alpha",
  },
  {
    alt_text: "reduce motion 2",
    caption: "Reduce-motion caption two",
    category: "test",
    image: "gid://fake/MediaImage/2",
    reference: { image: { url: "https://example.invalid/b.jpg" } },
    link: { text: "link", url: "https://example.invalid/b" },
    collection: { handle: "beta", title: "Beta" },
    title: "beta",
  },
];

describe("HomePageSlider — reduced motion", () => {
  it("renders captions and chrome immediately, with no logo intro and the loader dismissing without an entrance animation", () => {
    jest.useFakeTimers();
    render(<HomePageSlider images={IMAGES} initialLoading={false} />);

    // Mark images as loaded so the load-gate is satisfied.
    screen.getAllByRole("img").forEach((img) => fireEvent.load(img));

    // Captions render straight away — entrance animation is skipped
    // (no waiting on motion controls / setEpicMode).
    IMAGES.forEach((item) => {
      expect(
        screen.getByRole("link", { name: item.caption }),
      ).toBeInTheDocument();
    });

    // No logo-intro element ever mounts under reduced motion.
    expect(screen.queryByLabelText("Brushella")).not.toBeInTheDocument();

    // Step past the loader's minimum-display window (700ms). With
    // shouldAnimate=false there's no logo-intro timer to wait on, so the
    // loader should dismiss as soon as that window passes.
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(
      screen.queryByText("Featured work slider is loading"),
    ).not.toBeInTheDocument();

    // Prev/Next buttons are present and reachable.
    expect(
      screen.getByRole("button", { name: /previous image/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /next image/i }),
    ).toBeInTheDocument();

    jest.useRealTimers();
  });

  it("does not add epic-mode-active to body when reduced motion is enabled", () => {
    render(<HomePageSlider images={IMAGES} initialLoading={false} />);
    expect(document.body.classList.contains("epic-mode-active")).toBe(false);
  });
});
