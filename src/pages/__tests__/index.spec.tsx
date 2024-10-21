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
    screen.getByRole("heading", { name: "Browse Brushella’s World" });
    screen.getByText("Commissions");
    screen.getByText("Original Paintings");
    screen.getByText("Prints");
    screen.getByText("Resin & Pigment Art");
    screen.getByText("Home Decor");
    screen.getByText("Wearable Art");
    screen.getByText("Stickers");
    screen.getByText("Murals & Sign Writing");
    screen.getByAltText(
      "Collage depicting products of Original Paintings category"
    );
  });
});
