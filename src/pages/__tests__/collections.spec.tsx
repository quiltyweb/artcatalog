import React from "react";
import { render, screen } from "@testing-library/react";
import CollectionsPage from "../collections";
import fetchMock from "jest-fetch-mock";
import { useCollectionToSlider } from "../../hooks/useCollectionToSlider";

jest.mock("../../hooks/useCollectionToSlider");
const mockedUseCollectionToSlider =
  useCollectionToSlider as jest.MockedFunction<typeof useCollectionToSlider>;

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

fetchMock.enableMocks();

beforeEach(() => {
  jest.clearAllMocks();
  fetchMock.resetMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Collections page", () => {
  it("renders correctly", () => {
    mockedUseCollectionToSlider.mockReturnValue([
      {
        id: "bd4e6e5b-a663-5e00-becb-b4a63d4c7ec6",
        title: "Prints",
        handle: "prints",
        images: [
          {
            productTitle: '"Prana" Print',
            src: {
              images: {
                sources: [
                  {
                    srcSet: "https://testing/0586/9892/4240/files/asset",
                    sizes: "(min-width: 500px) 500px, 100vw",
                    type: "image/webp",
                  },
                ],
                fallback: {
                  src: "https://testing/0586/9892/4240/files/asset",
                  srcSet: "https://testing/0586/9892/4240/files/asset",
                  sizes: "(min-width: 500px) 500px, 100vw",
                },
              },
              layout: "constrained",
              placeholder: {
                fallback: "data:image/png;base64/123",
              },
              width: 500,
              height: 500,
            },
            alt: "Artistic depiction of lungs with floral and nature elements on a green background",
            href: "/collections/prints/prana-print",
          },
        ],
      },
      {
        id: "ab94a31f-8fc3-5e3c-b0cf-5a16c873d647",
        title: "Original Paintings",
        handle: "original-paintings",
        images: [
          {
            productTitle: '"Nirvana Gardens" Original Acrylic Painting',
            src: {
              images: {
                sources: [
                  {
                    srcSet: "https://testing/0586/9892/4240/files/assetsasas",
                    sizes: "(min-width: 500px) 500px, 100vw",
                    type: "image/webp",
                  },
                ],
                fallback: {
                  src: "https://testing/0586/9892/4240/files/asset-homepage-gabby-ugalde-nirvana-gardens_500x500_crop_center.jpg?v=1755134089",
                  srcSet: "https://testing/0586/9892/4240/files/asset-hsasasas",
                  sizes: "(min-width: 500px) 500px, 100vw",
                },
              },
              layout: "constrained",
              placeholder: {
                fallback: "data:image/png;base64/123",
              },
              width: 500,
              height: 500,
            },
            alt: "Sacred figure in a garden with a lotus flower and rainbow elements",
            href: "/collections/original-paintings/nirvana-gardens-original-acrylic-painting",
          },
          {
            productTitle: '"Prana" Original Acrylic Painting',
            src: {
              images: {
                sources: [
                  {
                    srcSet:
                      "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/sasasas",
                    sizes: "(min-width: 500px) 500px, 100vw",
                    type: "image/webp",
                  },
                ],
                fallback: {
                  src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/saasas",
                  srcSet:
                    "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/Prasasas",
                  sizes: "(min-width: 500px) 500px, 100vw",
                },
              },
              layout: "constrained",
              placeholder: {
                fallback: "data:image/png;base64/123",
              },
              width: 500,
              height: 500,
            },
            alt: 'The framed painting titled "Prana" depicts a pair of realistic-looking lungs surrounded by colorful flowers, insects, and snakes. The background features a gradient that transitions from light to dark green. The artist, Brushella, is holding the painting with both hands and wearing a happy expression.',
            href: "/collections/original-paintings/prana-original-acrylic-painting",
          },
          {
            productTitle:
              '"A moment without thoughts" Original Acrylic Painting',
            src: {
              images: {
                sources: [
                  {
                    srcSet:
                      "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/A-moment",
                    sizes: "(min-width: 500px) 500px, 100vw",
                    type: "image/webp",
                  },
                ],
                fallback: {
                  src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/",
                  srcSet:
                    "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/A-",
                  sizes: "(min-width: 500px) 500px, 100vw",
                },
              },
              layout: "constrained",
              placeholder: {
                fallback: "data:image/png;base64/123",
              },
              width: 500,
              height: 500,
            },
            alt: "alt text testing",
            href: "/collections/original-paintings/a-moment-without-thoughts-original-acrylic-painting",
          },
          {
            productTitle: '"After Grief" Original Acrylic Painting',
            src: {
              images: {
                sources: [
                  {
                    srcSet:
                      "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Co",
                    sizes: "(min-width: 500px) 500px, 100vw",
                    type: "image/webp",
                  },
                ],
                fallback: {
                  src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_500x500_crop_center.jpg?v=1755860492",
                  srcSet:
                    "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_125x125_crop_center.jp",
                  sizes: "(min-width: 500px) 500px, 100vw",
                },
              },
              layout: "constrained",
              placeholder: {
                fallback: "data:image/png;base64/123",
              },
              width: 500,
              height: 500,
            },
            alt: 'The framed painting titled "After Grief," depicting a realistic-looking human heart surrounded by colourful birds, insects, and flowers, is displayed by the artist Brushella, who holds it with both hands and a happy expression.',
            href: "/collections/original-paintings/after-grief",
          },
        ],
      },
    ]);

    render(<CollectionsPage />);
    screen.getByRole("link", { name: "Home" });
    expect(screen.getAllByText(/All Categories/i)).toHaveLength(2);
    screen.getByRole("heading", { name: "All Categories" });
    screen.getByRole("article", { name: /Original Paintings slider/i });
    screen.getByRole("article", { name: /Prints slider/i });
  });
});
