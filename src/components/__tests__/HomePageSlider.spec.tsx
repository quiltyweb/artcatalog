import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { HomePageSlider } from "../HomePageSlider";

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

const MOCKED_IMAGES_PROPS = [
  {
    alt_text: "testing 1",
    caption: '"After Grief" from the Human Nature collection.',
    category: "original-paintings",
    image: "gid://fake/MediaImage/34402911879376",
    reference: {
      image: {
        url: "https://fake.images.fake/s/files/1/0586/9892/4240/files/asset-homepage-gabby-ugalde-animal-heart-human-nature-collection.jpg?v=1751518520",
      },
    },
    link: {
      text: " Human Nature collection.",
      url: "https://www.brushella.art/",
    },
    title: "After Grief human nature collection",
  },
  {
    alt_text: "testing 2",
    caption: '"A moment without thoughts" from the Human Nature collection.',
    category: "original-paintings",
    image: "gid://fake/MediaImage/34402911813840",
    reference: {
      image: {
        url: "https://fake.images.fake/s/files/1/0586/9892/4240/files/asset-homepage-gabby-ugalde-brain-human-nature-collection.jpg?v=1751518519",
      },
    },
    link: {
      text: " Human Nature collection",
      url: "https://www.brushella.art/",
    },
    title: "A moment without thoughts human nature collection",
  },
  {
    alt_text: "testing 3",
    caption: '"Prana" from the Human Nature collection.',
    category: "original-paintings",
    image: "gid://fake/MediaImage/34402911846608",
    reference: {
      image: {
        url: "https://fake.images.fake/s/files/1/0586/9892/4240/files/asset-homepage-gabby-ugalde-lungs-human-nature-collection.jpg?v=1751518520",
      },
    },
    link: {
      text: " Human Nature collection.",
      url: "https://www.brushella.art/",
    },
    title: "Prana human nature collection",
  },
  {
    alt_text: "testing 4",
    caption: "Leopard, Brushella.",
    category: "prints",
    image: "gid://fake/MediaImage/34432899055824",
    reference: {
      image: {
        url: "https://fake.images.fake/s/files/1/0586/9892/4240/files/Print_2_A3.jpg?v=1751945403",
      },
    },
    link: {
      text: "Jungle collection.",
      url: "https://www.brushella.art/",
    },
    title: "Leopard",
  },
  {
    alt_text: "testing 5",
    caption: "Tucan, Brushella.",
    category: "prints",
    image: "gid://fake/MediaImage/34432899023056",
    reference: {
      image: {
        url: "https://fake.images.fake/s/files/1/0586/9892/4240/files/Print_3_A3.jpg?v=1751945403",
      },
    },
    link: {
      text: "Jungle collection",
      url: "https://www.brushella.art/",
    },
    title: "Tucan",
  },
  {
    alt_text: "testing 6",
    caption: "Parrot, Brushella.",
    category: "prints",
    image: "gid://fake/MediaImage/34432890437840",
    reference: {
      image: {
        url: "https://fake.images.fake/s/files/1/0586/9892/4240/files/print_1_A3.jpg?v=1751945325",
      },
    },
    link: {
      text: "Jungle collection",
      url: "https://www.brushella.art/",
    },
    title: "Parrot",
  },
];
// TODO: update mock

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("HomePageSlider", () => {
  it("renders Swiper with correct number of slides", () => {
    render(<HomePageSlider images={MOCKED_IMAGES_PROPS} />);

    const slides = screen.getAllByRole("img");
    expect(slides).toHaveLength(MOCKED_IMAGES_PROPS.length);
  });

  it("renders all images with alt text", () => {
    render(<HomePageSlider images={MOCKED_IMAGES_PROPS} />);

    MOCKED_IMAGES_PROPS.forEach((_, index) => {
      expect(screen.getByAltText(`testing ${index + 1}`)).toBeInTheDocument();
    });
  });
});
