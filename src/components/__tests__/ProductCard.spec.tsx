import React from "react";
import { render, screen } from "@testing-library/react";
import ProductCard from "../ProductCard";
jest.mock("@shopify/storefront-api-client");
import fetchMock from "jest-fetch-mock";

const mockedImageURL =
  "https://cdn.fake-image-for-brushella.art/fake-image.jpg";

beforeEach(() => {
  jest.clearAllMocks();
  fetchMock.resetMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("ProductCard", () => {
  it("renders correctly", async () => {
    const mockedShopifyProductData = {
      product: {
        id: "f1ac9d71-4ace-5da4-b914-f2278aee6443",
        title: "Test product name",
        handle: "test-print-not-for-sale",
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
                  srcSet:
                    "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/black_panther_125x66_crop_center.jpg.webp?v=1749380160 125w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/black_panther_250x133_crop_center.jpg.webp?v=1749380160 250w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/black_panther_500x265_crop_center.jpg.webp?v=1749380160 500w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/black_panther_1000x530_crop_center.jpg.webp?v=1749380160 1000w",
                  sizes: "(min-width: 500px) 500px, 100vw",
                  type: "image/webp",
                },
              ],
              fallback: {
                src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/black_panther_500x265_crop_center.jpg?v=1749380160",
                srcSet:
                  "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/black_panther_125x66_crop_center.jpg?v=1749380160 125w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/black_panther_250x133_crop_center.jpg?v=1749380160 250w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/black_panther_500x265_crop_center.jpg?v=1749380160 500w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/black_panther_1000x530_crop_center.jpg?v=1749380160 1000w",
                sizes: "(min-width: 500px) 500px, 100vw",
              },
            },
            layout: "constrained",
            placeholder: {
              fallback:
                "data:image/png;base64,/9j/4QC8RXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAABIAAAAAQAAAEgAAAABAAAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAABQAAAADoAQAAQAAAAsAAAAAAAAA/+IBuElDQ19QUk9GSUxFAAEBAAABqGxjbXMCEAAAbW50clJHQiBYWVogB9wAAQAZAAMAKQA5YWNzcEFQUEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1sY21zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJZGVzYwAAAPAAAABfY3BydAAAAUwAAAAMd3RwdAAAAVgAAAAUclhZWgAAAWwAAAAUZ1hZWgAAAYAAAAAUYlhZWgAAAZQAAAAUclRSQwAAAQwAAABAZ1RSQwAAAQwAAABAYlRSQwAAAQwAAABAZGVzYwAAAAAAAAAFYzJjaQAAAAAAAAAAAAAAAGN1cnYAAAAAAAAAGgAAAMsByQNjBZIIawv2ED8VURs0IfEpkDIYO5JGBVF3Xe1rcHoFibGafKxpv33Tw+kw//90ZXh0AAAAAENDMABYWVogAAAAAAAA9tYAAQAAAADTLVhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z//bAEMABQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/bAEMBBQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/CABEIAAsAFAMBEQACEQEDEQH/xAAXAAADAQAAAAAAAAAAAAAAAAADBAYH/8QAFwEBAQEBAAAAAAAAAAAAAAAABAMFAv/aAAwDAQACEAMQAAAAwE73OswkIEa2oxbx+or/xAAjEAACAQMDBAMAAAAAAAAAAAABAgMABBEFEiETMVFxQUKx/9oACAEBAAE/ANWvpG6Mtu21LhmBC4C8AdwCSM/GasrcLAhZNrE7V3ZGM+6jZYl6aOoCkj2fPFaZZ2xtgTFnbbPIMknDKMg8+KsYo7nSL4zRq5iRHQkcqxHcGpnMcjKoUDJ+oP7X/8QAIBEAAgEEAwADAAAAAAAAAAAAAQIDABEhMQQSUTJBYf/aAAgBAgEBPwBVZm7SIvZdEbHtTF53Z1kB0DGo2fo+WocfkyAOkLMp0QL6rkoqwxkDLMwOfCK+EjFSQepFwbVBPNHGqpM6rYYViBkflf/EACERAAICAQQCAwAAAAAAAAAAAAECAwQRABIhgQWRMWFx/9oACAEDAQE/AC9lJWlKLmTDHbkruIx741fkEFiDbCVRoSS5OF3D5Ho6ksFGwZUX6Y889jXjrdiWxYheTMaAFRgcd6kijtV/NvNGrtAkZiJHKkrnjvVevXlRmlrxSNuI3OiscfpB1//Z",
            },
            width: 500,
            height: 265,
          },
        },
        hasOnlyDefaultVariant: false,
        totalVariants: 1,
        variants: [
          {
            shopifyId: "gid://shopify/ProductVariant/44600452972752",
            displayName: "test print (not for sale) - Plastic",
            title: "Red",
            price: 0,
            inventoryQuantity: 10,
            selectedOptions: [
              {
                name: "select a Color",
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
            id: "af34e9e8-ad0e-55ce-8f86-4a84ba152884",
            alt: "image media alternative text goes here",
            mediaContentType: "IMAGE",
            preview: {
              status: "READY",
              image: {
                src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/black_panther.jpg?v=1749380160",
                altText: "image media alternative text goes here",
                height: 1358,
                width: 2560,
                gatsbyImageData: {
                  images: {
                    sources: [
                      {
                        srcSet:
                          "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/black_panther_21x21_crop_center.jpg.webp?v=1749380160 21w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/black_panther_41x41_crop_center.jpg.webp?v=1749380160 41w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/black_panther_82x82_crop_center.jpg.webp?v=1749380160 82w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/black_panther_164x164_crop_center.jpg.webp?v=1749380160 164w",
                        sizes: "(min-width: 82px) 82px, 100vw",
                        type: "image/webp",
                      },
                    ],
                    fallback: {
                      src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/black_panther_82x82_crop_center.jpg?v=1749380160",
                      srcSet:
                        "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/black_panther_21x21_crop_center.jpg?v=1749380160 21w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/black_panther_41x41_crop_center.jpg?v=1749380160 41w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/black_panther_82x82_crop_center.jpg?v=1749380160 82w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/black_panther_164x164_crop_center.jpg?v=1749380160 164w",
                      sizes: "(min-width: 82px) 82px, 100vw",
                    },
                  },
                  layout: "constrained",
                  placeholder: {
                    fallback:
                      "data:image/png;base64,/9j/4QC8RXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAABIAAAAAQAAAEgAAAABAAAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAABQAAAADoAQAAQAAABQAAAAAAAAA/+IBuElDQ19QUk9GSUxFAAEBAAABqGxjbXMCEAAAbW50clJHQiBYWVogB9wAAQAZAAMAKQA5YWNzcEFQUEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1sY21zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJZGVzYwAAAPAAAABfY3BydAAAAUwAAAAMd3RwdAAAAVgAAAAUclhZWgAAAWwAAAAUZ1hZWgAAAYAAAAAUYlhZWgAAAZQAAAAUclRSQwAAAQwAAABAZ1RSQwAAAQwAAABAYlRSQwAAAQwAAABAZGVzYwAAAAAAAAAFYzJjaQAAAAAAAAAAAAAAAGN1cnYAAAAAAAAAGgAAAMsByQNjBZIIawv2ED8VURs0IfEpkDIYO5JGBVF3Xe1rcHoFibGafKxpv33Tw+kw//90ZXh0AAAAAENDMABYWVogAAAAAAAA9tYAAQAAAADTLVhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z//bAEMABQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/bAEMBBQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/CABEIABQAFAMBEQACEQEDEQH/xAAYAAEBAAMAAAAAAAAAAAAAAAAGBAIFCP/EABgBAAMBAQAAAAAAAAAAAAAAAAEDBQQG/9oADAMBAAIQAxAAAADm81NzjlUKUb1VGQiUDLivq105JNnO/wD/xAAmEAACAQMDAgcBAAAAAAAAAAABAgMEERIABSETMRQiQVFxgZGh/9oACAEBAAE/AJq87jIFll8zMS7H+D6A1TUySpmzEqhBya3I9D+6ndo3xj6zCwvgFIB9jc99bVR1FSyoYRnGcWuLKAOLk6jgmo6YvP02AY5heb3Hl57fWqGq26OAeKoxK7HINmVNrdiAPfVYkdONraGMRid3EirexIU2PzxrYl6/i6aU5whlXAgEWB+NbokcFbKkcaqt+1u3pr//xAAhEQACAgEDBQEAAAAAAAAAAAABAgMRAAQSIRMxQVFhIv/aAAgBAgEBPwDSCLTMo2Wig0PZzU6gxTqEUKZQwFHj6MoNyxW/OPIkY3Fu/jIdaS0sI6SnYWDN3FiuPeDSgRxMXX9ruottrkjyfmaiIK8yli21VIJq+c6atMGqmWwCPuSQhyGMj2QCec//xAAkEQACAgEEAgEFAAAAAAAAAAABAgMRBAASITEFFFEGImFxcv/aAAgBAwEBPwAyLkRpCWG4t9xPXGs+FIJoI06kFrfZI705SRrLLfAN2efxWo8eUlG2i1aq/nX1BjLLPDknLJZJEiaGq2qTZIPx86TJEjSiOGRlRyu5bo1zxWhkM8SybFBMmwgXRG275PevGP7mV5v2UWVYGVI1YWABryEYhy5lgYwx7mpE4UUa4v8AWv/Z",
                  },
                  width: 82,
                  height: 82,
                },
                originalSrc:
                  "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/black_panther.jpg?v=1749380160",
                transformedSrc:
                  "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/black_panther.jpg?v=1749380160",
              },
            },
          },
        ],
        options: [
          {
            shopifyId: "gid://shopify/ProductOption/10521378914512",
            name: "select a Color",
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
    const fallbackImage = screen.getByTestId("no-image-found");
    expect(fallbackImage).toHaveAttribute("alt", "");
  });

  it("renders add to cart button with a disabled state and a sold out Badge when stock is zero", async () => {
    const mockedShopifyProductSoldOutData = {
      product: {
        id: "5ab74d61-7854-5f4e-86fb-ae0e7b282efd",
        title: '"Prana" Original Acrylic Painting (SOLD)',
        handle: "prana-original-acrylic-painting",
        description: 'test description"',
        status: "ACTIVE",
        hasOutOfStockVariants: true,
        priceRangeV2: {
          minVariantPrice: {
            amount: 6000,
            currencyCode: "AUD",
          },
          maxVariantPrice: {
            amount: 6000,
            currencyCode: "AUD",
          },
        },
        featuredImage: null,
        hasOnlyDefaultVariant: true,
        totalVariants: 1,
        variants: [
          {
            shopifyId:
              "gid://shopdsdsify/PrdsdoductVariant/443dssdsdsdsd62595795152",
            displayName:
              '"Prana" Original Acrylic Painting (SOLD) - Default Title',
            title: "Default Title",
            price: 6000,
            inventoryQuantity: 0,
            availableForSale: false,
            selectedOptions: [
              {
                name: "Title",
                value: "Default Title",
              },
            ],
            image: null,
          },
        ],
        mediaCount: 0,
        media: [],
        options: [
          {
            shopifyId: "gid://shopdsdsify/ProducdsdstOption/104dsds26976043216",
            name: "Title",
            values: ["Default Title"],
          },
        ],
      },
      collectionHandle: "prints",
    };
    render(
      <ProductCard
        product={mockedShopifyProductSoldOutData.product}
        collectionHandle={mockedShopifyProductSoldOutData.collectionHandle}
      />
    );

    expect(screen.getAllByText("Sold out")).toHaveLength(1);

    expect(
      screen.getByRole("button", { name: "Add to shopping bag" })
    ).toBeDisabled();
  });

  it("renders add to cart button with a disabled state and an item unavailable Badge when product is rendered but not published", async () => {
    const mockedShopifyProductSoldOutData = {
      product: {
        id: "5ab74d61-7854-5f4e-86fb-ae0e7b282efd",
        title: '"Prana" Original Acrylic Painting (SOLD)',
        handle: "prana-original-acrylic-painting",
        description: 'test description"',
        status: "ACTIVE",
        hasOutOfStockVariants: true,
        priceRangeV2: {
          minVariantPrice: {
            amount: 6000,
            currencyCode: "AUD",
          },
          maxVariantPrice: {
            amount: 6000,
            currencyCode: "AUD",
          },
        },
        featuredImage: null,
        hasOnlyDefaultVariant: true,
        totalVariants: 1,
        variants: [
          {
            shopifyId:
              "gid://shopdsdsify/PrdsdoductVariant/443dssdsdsdsd62595795152",
            displayName:
              '"Prana" Original Acrylic Painting (SOLD) - Default Title',
            title: "Default Title",
            price: 6000,
            inventoryQuantity: 0,
            availableForSale: false,
            selectedOptions: [
              {
                name: "Title",
                value: "Default Title",
              },
            ],
            image: null,
          },
        ],
        mediaCount: 0,
        media: [],
        options: [
          {
            shopifyId: "gid://shopdsdsify/ProducdsdstOption/104dsds26976043216",
            name: "Title",
            values: ["Default Title"],
          },
        ],
        publishedAt: null,
      },
      collectionHandle: "prints",
    };
    render(
      <ProductCard
        product={mockedShopifyProductSoldOutData.product}
        collectionHandle={mockedShopifyProductSoldOutData.collectionHandle}
      />
    );
    expect(screen.getAllByText("Item unavailable")).toHaveLength(1);
    expect(
      screen.getByRole("button", { name: "Add to shopping bag" })
    ).toBeDisabled();
  });
});
