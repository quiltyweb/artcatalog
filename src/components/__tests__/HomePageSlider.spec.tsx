import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { HomePageSlider } from "../HomePageSlider";

// Mock Swiper dependencies
jest.mock("swiper/react", () => ({
  Swiper: ({ children }: any) => <div data-testid="swiper">{children}</div>,
  SwiperSlide: ({ children }: any) => (
    <div data-testid="swiper-slide">{children}</div>
  ),
}));
jest.mock("swiper/modules", () => ({
  Pagination: () => null,
  Navigation: () => null,
}));

// const images = ["img1.jpg", "img2.jpg", "img3.jpg"];
const images = [
  {
    src: "img1.jpg",
    altText: "testing 1",
  },
  {
    src: "img2.jpg",
    altText: "testing 2",
  },
  {
    src: "img3.jpg",
    altText: "testing 3",
  },
  {
    src: "img4.jpg",
    altText: "testing 4",
  },
  {
    src: "img5.jpg",
    altText: "testing 5",
  },
  {
    src: "img6.jpg",
    altText: "testing 6",
  },
];

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("HomePageSlider", () => {
  it("renders Swiper with correct number of slides", () => {
    render(<HomePageSlider images={images} />);

    const slides = screen.getAllByRole("img");
    expect(slides).toHaveLength(images.length);
  });

  it("renders next and previous navigation buttons", () => {
    render(<HomePageSlider images={images} />);

    expect(
      screen.getByRole("button", { name: "Previous slide" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Next slide" })
    ).toBeInTheDocument();
  });
  it("renders all images with alt text", () => {
    render(<HomePageSlider images={images} />);

    images.forEach((_, index) => {
      expect(screen.getByAltText(`testing ${index + 1}`)).toBeInTheDocument();
    });
  });
});
