import React from "react";
import { render, screen } from "@testing-library/react";
import IndexPage from "../index";

jest.mock("swiper/react", () => ({
  Swiper: ({
    children,
    onSlideChange,
  }: {
    children: React.ReactNode;
    onSlideChange: () => void;
  }) => (
    <div data-testid="swiper" onClick={onSlideChange}>
      {children}
    </div>
  ),
  SwiperSlide: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="swiper-slide">{children}</div>
  ),
}));

jest.mock("swiper/modules", () => ({}));

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("IndexPage", () => {
  it("renders basic index correctly", () => {
    render(<IndexPage />);
    screen.getAllByAltText(
      "partial area of the print canvas called Jungle, showing one white tiger resting on a rock in a colourful jungle with trees and river in the background"
    );
    screen.getByTestId("swiper");
    screen.getAllByTestId("swiper-slide");
    screen.getByRole("heading", { name: "Featured Categories" });
    screen.getByRole("link", { name: /Home Decor/ });
    screen.getByAltText("home decor");
    screen.getByRole("link", { name: /Original Paintings/ });
    screen.getByAltText("original paintings");
    screen.getByRole("link", { name: /Prints/ });
    screen.getByAltText("prints");
  });
});
