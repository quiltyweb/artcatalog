import React from "react";
import { render, screen } from "@testing-library/react";
import ProductCard from "../ProductCard";

const mockedImageURL =
  "https://cdn.fake-image-for-brushella.art/fake-image.jpg";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("ProductCard", () => {
  it("renders correctly", async () => {
    const mockedShopifyProductData = {
      product: {
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
          altText: "Alternative text of featured Image of product goes here...",
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
            height: 488.00000000000006,
          },
        },
        hasOnlyDefaultVariant: false,
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
            id: "7bda34b8-6c93-5035-aff2-f356eadb7a36",
            alt: "media alternative text goes here",
            mediaContentType: "IMAGE",
            preview: {
              status: "READY",
              image: {
                src: null,
                altText: "image media alternative text goes here",
                height: 568,
                width: 582,
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
      collectionHandle: "decor",
    };
    render(<ProductCard product={mockedShopifyProductData.product} />);

    screen.getByText("Test product name");
    screen.getByAltText(
      "Alternative text of featured Image of product goes here..."
    );
    screen.getByText("Product description goes here");
    screen.getByRole("heading", { name: "Variations:" });
    screen.getByAltText("this is Alternative text for variant image");
    screen.getByRole("heading", { name: "Details gallery:" });
    screen.getByAltText("image media alternative text goes here");
    screen.getByRole("button", { name: "Add to shopping bag" });
    screen.getByText(/from/i);
    screen.getByText(/AUD/i);
    screen.getByText(/\$10.00/i);
    const quantity = screen.getByLabelText(/quantity/i);
    expect(quantity).toHaveValue("1");
    screen.getByLabelText(/color/i);
    screen.getByRole("option", { name: /select a Color/i });
    screen.getByRole("option", { name: /red/i });
  });

  it("renders without variant select and variant images gallery when product has Only Default Variant", async () => {
    const mockedShopifyProductData = {
      product: {
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
          altText: "Alternative text of featured Image of product goes here...",
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
            height: 488.00000000000006,
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
                name: "Title",
                value: "Default Title",
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
            id: "7bda34b8-6c93-5035-aff2-f356eadb7a36",
            alt: "media alternative text goes here",
            mediaContentType: "IMAGE",
            preview: {
              status: "READY",
              image: {
                src: null,
                altText: "image media alternative text goes here",
                height: 568,
                width: 582,
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
            shopifyId: "gid://shopify/ProductOption/12345098884816",
            name: "Title",
            values: ["Default Title"],
          },
        ],
      },
      collectionHandle: "decor",
    };
    render(<ProductCard product={mockedShopifyProductData.product} />);

    expect(screen.queryByRole("select")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Variations:" })
    ).not.toBeInTheDocument();
  });

  it("renders without media images gallery when product has no media", async () => {
    const mockedShopifyProductData = {
      product: {
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
          altText: "Alternative text of featured Image of product goes here...",
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
            height: 488.00000000000006,
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
                name: "Title",
                value: "Default Title",
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
        mediaCount: 0,
        media: [],
        options: [
          {
            shopifyId: "gid://shopify/ProductOption/12345098884816",
            name: "Title",
            values: ["Default Title"],
          },
        ],
      },
      collectionHandle: "decor",
    };
    render(<ProductCard product={mockedShopifyProductData.product} />);
    expect(
      screen.queryByRole("heading", { name: "Details gallery:" })
    ).not.toBeInTheDocument();
  });

  it("renders product title as alt text to featured image when altText not provided", async () => {
    const mockedShopifyProductData = {
      product: {
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
            height: 488.00000000000006,
          },
        },
        hasOnlyDefaultVariant: false,
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
        media: [],
        options: [],
      },
      collectionHandle: "decor",
    };
    render(<ProductCard product={mockedShopifyProductData.product} />);
    screen.getByText("Test product name");
  });

  it("renders fallback image when featuredImage not provided", async () => {
    const mockedShopifyProductData = {
      product: {
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
        hasOnlyDefaultVariant: false,
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
            image: null,
          },
        ],
        mediaCount: 0,
        media: null,
        options: [
          {
            shopifyId: "gid://shopify/ProductOption/1234543212345",
            name: "Color",
            values: ["red"],
          },
        ],
      },
      collectionHandle: "decor",
    };
    render(
      <ProductCard
        product={mockedShopifyProductData.product}
        collectionHandle={mockedShopifyProductData.collectionHandle}
      />
    );
    const fallbackImage = screen.getByRole("img");
    expect(fallbackImage).toHaveAttribute("alt", "");
    expect(fallbackImage).toHaveAttribute("src", "../images/noimg.jpg");
  });
});
