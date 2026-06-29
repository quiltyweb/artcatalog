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
    alt_text: "body class 1",
    caption: "Body class caption one",
    category: "test",
    image: "gid://fake/MediaImage/1",
    reference: { image: { url: "https://example.invalid/a.jpg" } },
    link: { text: "link", url: "https://example.invalid/a" },
    collection: { handle: "alpha", title: "Alpha" },
    title: "alpha",
  },
];

describe("HomePageSlider — epic-mode-active body class", () => {
  it("adds epic-mode-active to body during animation and removes it on skip", () => {
    render(<HomePageSlider images={IMAGES} initialLoading={false} />);

    // Animation does not play by default — epic-mode-active is not set.
    expect(document.body.classList.contains("epic-mode-active")).toBe(false);

    // Start the animation via the play button.
    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: /play intro animation/i }),
      );
    });

    expect(document.body.classList.contains("epic-mode-active")).toBe(true);

    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: /skip intro animation/i }),
      );
    });

    expect(document.body.classList.contains("epic-mode-active")).toBe(false);
  });
});
