import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TileGridGallery } from "../TileGridGallery";

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

describe("TileGridGallery", () => {
  it("renders correctly with tiles", async () => {
    const mockedTiles = [
      {
        id: "mini-slider-tile-1",
        title: "Original Paintings test title",
        handle: "original-paintings",
        images: [
          {
            src: "https://testing.test/asset-moment-without-thoughts-human-nature-collection.jpg?v=1755134217",
            alt: "'A moment without thoughts' by Brushella from the Human Nature Collection.",
            href: "/collections/original-paintings/a-moment-without-thoughts-original-acrylic-painting",
          },
        ],
      },
      {
        id: "mini-slider-tile-2",
        title: "Prints test title",
        handle: "prints",
        images: [
          {
            src: "https://testing.test/asset-rana-human-nature-collection.jpg?v=1757292553",
            alt: "'Prana' print by Brushella from the Human Nature Collection.",
            href: "/collections/prints/prana-print",
          },
        ],
      },
    ];
    render(<TileGridGallery tiles={mockedTiles} />);
    screen.getByRole("heading", { name: "Browse Brushella’s World" });
    screen.getByRole("region", { name: "Browse Brushella’s World" });

    screen.getByRole("article", {
      name: "Original Paintings test title slider",
    });
    screen.getByRole("article", { name: "Prints test title slider" });

    expect(
      screen.getByRole("link", {
        name: "go to Original Paintings test title category",
      })
    ).toHaveAttribute("href", "/collections/original-paintings/");
    expect(
      screen.getByRole("link", { name: "go to Prints test title category" })
    ).toHaveAttribute("href", "/collections/prints/");
  });

  it("renders title prop", async () => {
    render(<TileGridGallery title="testing title prop" />);
    screen.getByRole("heading", { name: "testing title prop" });
    screen.getByRole("region", { name: "testing title prop" });
  });

  it("renders tiles prop", async () => {
    render(<TileGridGallery />);
    screen.getByText("No categories available at the moment.");
  });
});
