import React from "react";
import { render, screen } from "@testing-library/react";
import Collection from "../Collection";

const mockedImageURL =
  "https://cdn.fake-image-for-brushella.art/fake-image.jpg";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Collection page Template", () => {
  it("renders correctly", () => {
    const mockedPageContext = {
      title: "This is the collection title",
      products: [
        {
          id: "123e4ae6-3662-5fbd-a6d2-a3931a5fb862",
          title: "Test product name",
          handle: "test-product-handle",
          description: "Product description goes here",
          priceRangeV2: {
            minVariantPrice: {
              amount: 10.0,
              currencyCode: "AUD",
            },
            maxVariantPrice: {
              amount: 20.0,
              currencyCode: "AUD",
            },
          },
          featuredImage: {
            altText: null,
            gatsbyImageData: {
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
              height: 1111,
            },
          },
          hasOnlyDefaultVariant: true,
          totalVariants: 1,
          variants: [
            {
              shopifyId: "gid://shopify/ProductVariant/12345678987654",
              displayName: "Test product name - Default Title",
              title: "Default Title",
              price: 12.0,
              inventoryQuantity: 1,
              selectedOptions: [
                {
                  name: "Color",
                  value: "red",
                },
              ],
              image: {
                src: mockedImageURL,
                altText: "this is Alternative text for variant image",
                height: 1077,
                width: 715,
                gatsbyImageData: {
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
                  height: 753,
                },
                originalSrc: mockedImageURL,
                transformedSrc: mockedImageURL,
              },
            },
          ],
          mediaCount: 1,
          media: [
            {
              id: "ae07d0de-2224-5b15-959f-437c57fd9c0f",
              alt: "",
              mediaContentType: "IMAGE",
              preview: {
                status: "READY",
                image: {
                  src: mockedImageURL,
                  altText: "",
                  height: 1600,
                  width: 720,
                  gatsbyImageData: {
                    images: {
                      sources: [
                        {
                          srcSet: mockedImageURL,
                          sizes: "(min-width: 82px) 82px, 100vw",
                          type: "image/webp",
                        },
                      ],
                      fallback: {
                        src: mockedImageURL,
                        srcSet: mockedImageURL,
                        sizes: "(min-width: 82px) 82px, 100vw",
                      },
                    },
                    layout: "constrained",
                    width: 82,
                    height: 82,
                  },
                  originalSrc: mockedImageURL,
                  transformedSrc: mockedImageURL,
                },
              },
            },
          ],
          options: [
            {
              shopifyId: "gid://shopify/ProductOption/1234543212345",
              name: "Color",
              values: ["red"],
            },
          ],
        },
      ],
      description: "This is the Collection description text",
      collectionHandle: "this-is-the-collection-handle",
    };

    render(<Collection pageContext={mockedPageContext} />);
    screen.getByRole("heading", { name: "This is the collection title" });
    screen.getByTestId("collection-description");
    screen.getByText(/\$10\.00/i);
    screen.getByText(/more details/i);
    screen.getByRole("heading", { name: "Test product name" });
    expect(screen.queryByText("From")).not.toBeInTheDocument();
    screen.getByRole("link", { name: "Home" });
  });

  it("renders 'From' label when product has multiple variants", () => {
    const mockedPageContext = {
      title: "This is the collection title",
      products: [
        {
          id: "123e4ae6-3662-5fbd-a6d2-a3931a5fb862",
          title: "Test product with variants",
          handle: "test-product-handle",
          description: "Product description goes here",
          priceRangeV2: {
            minVariantPrice: {
              amount: 10.0,
              currencyCode: "AUD",
            },
            maxVariantPrice: {
              amount: 20.0,
              currencyCode: "AUD",
            },
          },
          featuredImage: {
            altText: null,
            gatsbyImageData: {
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
              height: 1111,
            },
          },
          hasOnlyDefaultVariant: false,
          totalVariants: 2,
          variants: [
            {
              shopifyId: "gid://shopify/ProductVariant/111",
              displayName: "Test product - Small",
              title: "Small",
              price: 10.0,
              inventoryQuantity: 1,
              selectedOptions: [{ name: "Size", value: "Small" }],
              image: null,
            },
            {
              shopifyId: "gid://shopify/ProductVariant/222",
              displayName: "Test product - Large",
              title: "Large",
              price: 20.0,
              inventoryQuantity: 1,
              selectedOptions: [{ name: "Size", value: "Large" }],
              image: null,
            },
          ],
          mediaCount: 1,
          media: [],
          options: [
            {
              shopifyId: "gid://shopify/ProductOption/1234543212345",
              name: "Size",
              values: ["Small", "Large"],
            },
          ],
        },
      ],
      description: "This is the Collection description text",
      collectionHandle: "this-is-the-collection-handle",
    };

    render(<Collection pageContext={mockedPageContext} />);
    screen.getByText("From");
    screen.getByText(/\$10/i);
  });

  it("renders no price when price is 0", () => {
    const mockedPageContext = {
      title: "This is the collection title",
      products: [
        {
          id: "123e4ae6-3662-5fbd-a6d2-a3931a5fb862",
          title: "Test product name",
          handle: "test-product-handle",
          description: "Product description goes here",
          priceRangeV2: {
            minVariantPrice: {
              amount: 0,
              currencyCode: "AUD",
            },
            maxVariantPrice: {
              amount: 0,
              currencyCode: "AUD",
            },
          },
          featuredImage: {
            altText: null,
            gatsbyImageData: {
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
              height: 1111,
            },
          },
          hasOnlyDefaultVariant: true,
          totalVariants: 1,
          variants: [
            {
              shopifyId: "gid://shopify/ProductVariant/12345678987654",
              displayName: "Test product name - Default Title",
              title: "Default Title",
              price: 0,
              inventoryQuantity: 1,
              selectedOptions: [
                {
                  name: "Color",
                  value: "red",
                },
              ],
              image: {
                src: mockedImageURL,
                altText: "this is Alternative text for variant image",
                height: 1077,
                width: 715,
                gatsbyImageData: {
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
                  height: 753,
                },
                originalSrc: mockedImageURL,
                transformedSrc: mockedImageURL,
              },
            },
          ],
          mediaCount: 1,
          media: [
            {
              id: "ae07d0de-2224-5b15-959f-437c57fd9c0f",
              alt: "",
              mediaContentType: "IMAGE",
              preview: {
                status: "READY",
                image: {
                  src: mockedImageURL,
                  altText: "",
                  height: 1600,
                  width: 720,
                  gatsbyImageData: {
                    images: {
                      sources: [
                        {
                          srcSet: mockedImageURL,
                          sizes: "(min-width: 82px) 82px, 100vw",
                          type: "image/webp",
                        },
                      ],
                      fallback: {
                        src: mockedImageURL,
                        srcSet: mockedImageURL,
                        sizes: "(min-width: 82px) 82px, 100vw",
                      },
                    },
                    layout: "constrained",
                    width: 82,
                    height: 82,
                  },
                  originalSrc: mockedImageURL,
                  transformedSrc: mockedImageURL,
                },
              },
            },
          ],
          options: [
            {
              shopifyId: "gid://shopify/ProductOption/1234543212345",
              name: "Color",
              values: ["red"],
            },
          ],
        },
      ],
      description: "This is the Collection description text",
      collectionHandle: "this-is-the-collection-handle",
    };
    render(<Collection pageContext={mockedPageContext} />);
    expect(screen.queryByTestId("item-price-from")).toBeNull();
    screen.getByText(/more details/i);
  });

  it("renders correctly when there are no products", () => {
    const mockedPageContext = {
      title: "This is the collection title",
      products: [],
      description: "This is the Collection description text",
      collectionHandle: "this-is-the-collection-handle",
    };
    render(<Collection pageContext={mockedPageContext} />);
    screen.getByRole("heading", { name: "This is the collection title" });
    screen.getByTestId("collection-description");
    screen.getByText("There are no products available.");
    screen.getByRole("link", { name: "Home" });
    screen.getByRole("link", { name: "All Categories" });
  });

  it("renders placeholder image when featured image is not provided", () => {
    const mockedPageContext = {
      title: "This is the collection title",
      products: [
        {
          id: "123e4ae6-3662-5fbd-a6d2-a3931a5fb862",
          title: "Test product name",
          handle: "test-product-handle",
          description: "Product description goes here",
          priceRangeV2: {
            minVariantPrice: {
              amount: 10.0,
              currencyCode: "AUD",
            },
            maxVariantPrice: {
              amount: 20.0,
              currencyCode: "AUD",
            },
          },
          featuredImage: null,
          hasOnlyDefaultVariant: true,
          totalVariants: 1,
          variants: [],
          mediaCount: 1,
          media: [],
          options: [
            {
              shopifyId: "gid://shopify/ProductOption/1234543212345",
              name: "Color",
              values: ["red"],
            },
          ],
        },
      ],
      description: "This is the Collection description text",
      collectionHandle: "this-is-the-collection-handle",
    };
    render(<Collection pageContext={mockedPageContext} />);
    screen.getByAltText("No image available");
    screen.getByRole("heading", { name: "Test product name" });
  });

  it("renders placeholder image when featured image has no alt text", () => {
    const mockedPageContext = {
      title: "This is the collection title",
      products: [
        {
          id: "123e4ae6-3662-5fbd-a6d2-a3931a5fb862",
          title: "Test product name",
          handle: "test-product-handle",
          description: "Product description goes here",
          priceRangeV2: {
            minVariantPrice: {
              amount: 10.0,
              currencyCode: "AUD",
            },
            maxVariantPrice: {
              amount: 20.0,
              currencyCode: "AUD",
            },
          },
          featuredImage: {
            altText: null,
            gatsbyImageData: {
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
              height: 1111,
            },
          },
          hasOnlyDefaultVariant: true,
          totalVariants: 1,
          variants: [],
          mediaCount: 1,
          media: [],
          options: [
            {
              shopifyId: "gid://shopify/ProductOption/1234543212345",
              name: "Color",
              values: ["red"],
            },
          ],
        },
      ],
      description: "This is the Collection description text",
      collectionHandle: "this-is-the-collection-handle",
    };
    render(<Collection pageContext={mockedPageContext} />);
    expect(screen.queryByAltText("No image available")).toHaveAttribute(
      "src",
      "../images/web-asset-noimg.jpg"
    );
  });

  it("renders link to learn more about the category", () => {
    const mockedPageContext = {
      title: "Collection title",
      products: [
        {
          id: "123e4ae6-3662-5fbd-a6d2-a3931a5fb862",
          title: "Test product name",
          handle: "test-product-handle",
          description: "Product description goes here",
          priceRangeV2: {
            minVariantPrice: {
              amount: 10.0,
              currencyCode: "AUD",
            },
            maxVariantPrice: {
              amount: 20.0,
              currencyCode: "AUD",
            },
          },
          featuredImage: null,
          hasOnlyDefaultVariant: true,
          totalVariants: 1,
          variants: [],
          mediaCount: 1,
          media: [],
          options: [
            {
              shopifyId: "gid://shopify/ProductOption/1234543212345",
              name: "Color",
              values: ["red"],
            },
          ],
        },
      ],
      description: "This is the Collection description text",
      collectionHandle: "this-is-the-collection-handle",
    };
    render(<Collection pageContext={mockedPageContext} />);
    screen.getByRole("link", { name: "About the Collection title Collection" });
  });

  it("renders sold items with strikethrough price and 'buy print' button", () => {
    const mockedPageContext = {
      title: "Original Paintings",
      collectionHandle: "original-paintings",
      description: undefined,
      printVersionHandles: {
        "gid://shopify/Product/sold-original-id": "after-grief-print",
      },
      products: [
        {
          id: "sold-product-id",
          shopifyId: "gid://shopify/Product/sold-original-id",
          title: "After Grief - Original Acrylic Painting (Sold)",
          handle: "after-grief-original",
          description: "",
          priceRangeV2: {
            minVariantPrice: { amount: 5950, currencyCode: "AUD" },
            maxVariantPrice: { amount: 5950, currencyCode: "AUD" },
          },
          featuredImage: {
            altText: null,
            originalSrc: mockedImageURL,
            grid: {
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
              height: 750,
            },
          },
          hasOnlyDefaultVariant: true,
          totalVariants: 1,
          variants: [
            {
              shopifyId: "gid://shopify/ProductVariant/sold-variant",
              displayName: "After Grief - Default Title",
              title: "Default Title",
              price: 5950,
              inventoryQuantity: 0,
              availableForSale: false,
              selectedOptions: [{ name: "Title", value: "Default Title" }],
              image: null,
            },
          ],
          mediaCount: 0,
          media: [],
          options: [],
        },
      ],
    };

    render(<Collection pageContext={mockedPageContext as any} />);

    const priceEl = screen.getByTestId("item-price");
    expect(priceEl).toHaveStyle({ textDecoration: "line-through" });
    expect(screen.queryByText(/more details/i)).not.toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: "After Grief - Original Acrylic Painting (Sold)",
      }),
    ).toHaveAttribute(
      "href",
      "/collections/original-paintings/after-grief-original",
    );
    expect(
      screen.getByRole("link", { name: /buy print/i }),
    ).toHaveAttribute("href", "/collections/prints/after-grief-print");
  });

  it("renders sold items without a print version with no CTA button", () => {
    const mockedPageContext = {
      title: "Original Paintings",
      collectionHandle: "original-paintings",
      description: undefined,
      printVersionHandles: {},
      products: [
        {
          id: "sold-product-id",
          shopifyId: "gid://shopify/Product/sold-no-print-id",
          title: "Sold Painting Without Print",
          handle: "sold-painting-without-print",
          description: "",
          priceRangeV2: {
            minVariantPrice: { amount: 3000, currencyCode: "AUD" },
            maxVariantPrice: { amount: 3000, currencyCode: "AUD" },
          },
          featuredImage: null,
          hasOnlyDefaultVariant: true,
          totalVariants: 1,
          variants: [
            {
              shopifyId: "gid://shopify/ProductVariant/sold-variant-2",
              displayName: "Sold Painting Without Print - Default Title",
              title: "Default Title",
              price: 3000,
              inventoryQuantity: 0,
              availableForSale: false,
              selectedOptions: [{ name: "Title", value: "Default Title" }],
              image: null,
            },
          ],
          mediaCount: 0,
          media: [],
          options: [],
        },
      ],
    };

    render(<Collection pageContext={mockedPageContext as any} />);

    expect(screen.queryByText(/buy print/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/more details/i)).not.toBeInTheDocument();
  });

  it("renders sold items after available items", () => {
    const mockedPageContext = {
      title: "Original Paintings",
      collectionHandle: "original-paintings",
      description: undefined,
      products: [
        {
          id: "sold-first",
          shopifyId: "gid://shopify/Product/sold-first",
          title: "Sold Painting",
          handle: "sold-painting",
          description: "",
          priceRangeV2: {
            minVariantPrice: { amount: 5000, currencyCode: "AUD" },
            maxVariantPrice: { amount: 5000, currencyCode: "AUD" },
          },
          featuredImage: null,
          hasOnlyDefaultVariant: true,
          totalVariants: 1,
          variants: [
            {
              shopifyId: "gid://shopify/ProductVariant/sold",
              displayName: "Sold Painting - Default Title",
              title: "Default Title",
              price: 5000,
              inventoryQuantity: 0,
              availableForSale: false,
              selectedOptions: [],
              image: null,
            },
          ],
          mediaCount: 0,
          media: [],
          options: [],
        },
        {
          id: "available-second",
          shopifyId: "gid://shopify/Product/available-second",
          title: "Available Painting",
          handle: "available-painting",
          description: "",
          priceRangeV2: {
            minVariantPrice: { amount: 4000, currencyCode: "AUD" },
            maxVariantPrice: { amount: 4000, currencyCode: "AUD" },
          },
          featuredImage: null,
          hasOnlyDefaultVariant: true,
          totalVariants: 1,
          variants: [
            {
              shopifyId: "gid://shopify/ProductVariant/available",
              displayName: "Available Painting - Default Title",
              title: "Default Title",
              price: 4000,
              inventoryQuantity: 1,
              availableForSale: true,
              selectedOptions: [],
              image: null,
            },
          ],
          mediaCount: 0,
          media: [],
          options: [],
        },
      ],
    };

    render(<Collection pageContext={mockedPageContext as any} />);

    const headings = screen
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);
    expect(headings.indexOf("Available Painting")).toBeLessThan(
      headings.indexOf("Sold Painting"),
    );
  });
});
