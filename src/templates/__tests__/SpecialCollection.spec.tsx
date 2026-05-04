import React from "react";
import { render, screen } from "@testing-library/react";
import SpecialCollection from "../SpecialCollection";

const mockedImageURL =
  "https://cdn.fake-image-for-brushella.art/fake-image.jpg";

const mockedGatsbyImageData = {
  images: {
    sources: [
      {
        srcSet: mockedImageURL,
        sizes: "(min-width: 500px) 500px, 100vw",
        type: "image/webp",
      },
    ],
    fallback: {
      src: mockedImageURL,
      srcSet: mockedImageURL,
      sizes: "(min-width: 500px) 500px, 100vw",
    },
  },
  layout: "constrained",
  width: 500,
  height: 500,
};

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

const baseProduct = {
  id: "123e4ae6-3662-5fbd-a6d2-a3931a5fb862",
  title: "Test product name",
  handle: "test-product-handle",
  description: "Product description goes here",
  priceRangeV2: {
    minVariantPrice: { amount: 10.0, currencyCode: "AUD" },
    maxVariantPrice: { amount: 20.0, currencyCode: "AUD" },
  },
  featuredImage: {
    altText: null,
    originalSrc: mockedImageURL,
    grid: {
      ...mockedGatsbyImageData,
      width: 500,
      height: 800,
    },
  },
  hasOnlyDefaultVariant: true,
  totalVariants: 1,
  variants: [],
  mediaCount: 0,
  media: [],
  options: [],
};

describe("SpecialCollection page Template", () => {
  it("renders breadcrumb, hero, and product grid below the hero", () => {
    const mockedPageContext = {
      title: "Human Nature",
      description: "A collection inspired by the human condition.",
      collectionHandle: "human-nature",
      image: {
        altText: "Human Nature hero",
        gatsbyImageData: mockedGatsbyImageData,
        originalSrc: mockedImageURL,
      },
      products: [baseProduct],
    };

    render(<SpecialCollection pageContext={mockedPageContext as any} />);

    // Breadcrumb
    screen.getByRole("link", { name: "Home" });
    screen.getByRole("link", { name: "All Categories" });

    // Hero section content
    screen.getByRole("heading", { name: "Human Nature Collection" });
    screen.getByText("A collection inspired by the human condition.");
    screen.getByAltText("Human Nature hero");

    // No "Read more" link
    expect(
      screen.queryByRole("link", { name: /Read more/i })
    ).not.toBeInTheDocument();

    // Full product card renders below the hero
    screen.getByRole("heading", { name: "Test product name" });
    screen.getByText(/AUD/i);
    screen.getByText(/\$10/i);
    expect(
      screen.getByRole("link", { name: "Test product name" })
    ).toHaveAttribute("href", "/collections/human-nature/test-product-handle");

    // AR badge with placeholder Google Scene Viewer deep link
    const arLink = screen.getByRole("link", {
      name: /View Test product name in augmented reality/i,
    });
    expect(arLink).toHaveAttribute(
      "href",
      "https://arvr.google.com/scene-viewer/1.0?file=PLACEHOLDER_test-product-handle"
    );
    expect(arLink).toHaveAttribute("target", "_blank");
    expect(arLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(arLink.querySelector("svg")).toBeInTheDocument();
  });

  it("renders the human-nature fallback description when none is provided", () => {
    const mockedPageContext = {
      title: "Human Nature",
      collectionHandle: "human-nature",
      image: {
        altText: "Human Nature hero",
        gatsbyImageData: mockedGatsbyImageData,
        originalSrc: mockedImageURL,
      },
      products: [baseProduct],
    };

    render(<SpecialCollection pageContext={mockedPageContext as any} />);

    expect(
      screen.getByText(/meditation on the body's quiet wonders/i)
    ).toBeInTheDocument();
  });

  it("renders empty state when there are no products", () => {
    const mockedPageContext = {
      title: "Bloom",
      description: "A floral collection.",
      collectionHandle: "bloom",
      image: {
        altText: "Bloom hero",
        gatsbyImageData: mockedGatsbyImageData,
        originalSrc: mockedImageURL,
      },
      products: [],
    };

    render(<SpecialCollection pageContext={mockedPageContext as any} />);
    screen.getByText("There are no products available.");
    screen.getByRole("heading", { name: "Bloom Collection" });
  });
});
