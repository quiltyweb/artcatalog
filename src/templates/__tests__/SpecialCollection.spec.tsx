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
  Object.defineProperty(navigator, "userAgent", {
    value: "",
    configurable: true,
  });
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
      screen.queryByRole("link", { name: /Read more/i }),
    ).not.toBeInTheDocument();

    // Full product card renders below the hero
    screen.getByRole("heading", { name: "Test product name" });
    screen.getByText(/AUD/i);
    screen.getByText(/\$10/i);
    expect(
      screen.getByRole("link", { name: "Test product name" }),
    ).toHaveAttribute("href", "/collections/human-nature/test-product-handle");
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
      screen.getByText(/meditation on the body's quiet wonders/i),
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

  it("does not render the AR button on non-Android (desktop) devices", () => {
    const productWithGlb = {
      ...baseProduct,
      media: [
        {
          mediaContentType: "MODEL_3D",
          sources: [
            { format: "glb", url: "https://cdn.example.com/model.glb" },
          ],
        },
      ],
    };

    const mockedPageContext = {
      title: "Human Nature",
      description: "A collection inspired by the human condition.",
      collectionHandle: "human-nature",
      image: null,
      products: [productWithGlb],
    };

    render(<SpecialCollection pageContext={mockedPageContext as any} />);

    expect(
      screen.queryByRole("link", { name: /View AR/i }),
    ).not.toBeInTheDocument();
  });

  it("renders the AR button on Android devices when a GLB model is available", () => {
    Object.defineProperty(navigator, "userAgent", {
      value:
        "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
      configurable: true,
    });

    const productWithGlb = {
      ...baseProduct,
      media: [
        {
          mediaContentType: "MODEL_3D",
          sources: [
            { format: "glb", url: "https://cdn.example.com/model.glb" },
          ],
        },
      ],
    };

    const mockedPageContext = {
      title: "Human Nature",
      description: "A collection inspired by the human condition.",
      collectionHandle: "human-nature",
      image: null,
      products: [productWithGlb],
    };

    render(<SpecialCollection pageContext={mockedPageContext as any} />);

    const arLink = screen.getByRole("link", { name: /View AR/i });
    expect(arLink).toBeInTheDocument();
    expect(arLink).toHaveAttribute(
      "href",
      expect.stringContaining("arvr.google.com/scene-viewer"),
    );

    expect(arLink).toHaveAttribute(
      "href",
      expect.stringContaining("cdn.example.com%2Fmodel.glb"),
    );
  });
});
