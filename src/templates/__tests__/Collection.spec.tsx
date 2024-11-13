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
    screen.getByText("This is the Collection description text");
    screen.getByText(/from/i);
    screen.getByText(/AUD/i);
    screen.getByText(/\$10/i);
    screen.getByText(/view details/i);
    screen.getByRole("heading", { name: "Test product name" });
    screen.getByRole("link", { name: "Home" });
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
    screen.getByText(/view details/i);
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
    screen.getByText("This is the Collection description text");
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
    const fallbackImage = screen.getByRole("img");
    expect(fallbackImage).toHaveAttribute("alt", "");
    expect(fallbackImage).toHaveAttribute(
      "src",
      "../images/web-asset-noimg.jpg"
    );
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
    expect(screen.queryByRole("img")).toHaveAttribute(
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
    screen.getByRole("link", { name: "Learn more about Collection title" });
  });
});
