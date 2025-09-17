import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TileSliderCategory } from "../TileSliderCategory";

jest.mock("swiper/react", () => ({
  Swiper: ({ children }: any) => <div data-testid="swiper">{children}</div>,
  SwiperSlide: ({ children }: any) => (
    <div data-testid="swiper-slide-testing">{children}</div>
  ),
}));
jest.mock("swiper/modules", () => ({
  Pagination: () => null,
  Navigation: () => null,
}));

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("TileSliderCategory", () => {
  it("renders correctly with no control buttons when there is only 1 image", async () => {
    const mockedTile = {
      id: "mini-slider-tile-1",
      title: "Original Paintings test title",
      handle: "original-paintings",
      images: [
        {
          src: "https://testing.test/asset.jpg?v=1755134217",
          alt: "alt text 1",
          href: "/collections/original-paintings/a-moment-without-thoughts-original-acrylic-painting",
        },
      ],
    };
    render(<TileSliderCategory tile={mockedTile} />);
    screen.getByAltText("alt text 1");
    expect(
      screen.queryByRole("button", { name: "Previous image" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Next image" })
    ).not.toBeInTheDocument();
  });

  it("renders correctly with control buttons", async () => {
    const mockedTile = {
      id: "mini-slider-tile-1",
      title: "Original Paintings test title",
      handle: "original-paintings",
      images: [
        {
          src: "https://testing.test/asset.jpg?v=1755134217",
          alt: "alt text 1",
          href: "/collections/original-paintings/a-moment-without-thoughts-original-acrylic-painting",
        },
        {
          src: "https://testing.test/asset.jpg?v=1223",
          alt: "alt text 2",
          href: "/collections/original-paintings/a-moment-without-thoughts-original-acrylic-painting",
        },
      ],
    };
    render(<TileSliderCategory tile={mockedTile} />);
    screen.getByAltText("alt text 1");
    screen.getByAltText("alt text 2");
    screen.getByRole("button", { name: "Previous image" });
    screen.getByRole("button", { name: "Next image" });
  });
});
