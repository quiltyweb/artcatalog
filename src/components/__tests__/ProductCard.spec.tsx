import React from "react";
import { render, screen } from "@testing-library/react";
import ProductCard from "../ProductCard";
jest.mock("@shopify/storefront-api-client");
import fetchMock from "jest-fetch-mock";
import * as StoreContext from "../../context/StoreContext";
import fireEvent from "@testing-library/user-event";

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
  it("renders product main title line 1 and subtitle line 2", () => {
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
            placeholder: {
              fallback: "data:image/png;base64,/9j/4QC8RXDSDSDDS",
            },
            width: 500,
            height: 265,
          },
        },
        hasOnlyDefaultVariant: false,
        totalVariants: 1,
        variants: [],
        mediaCount: 1,
        media: [],
        options: [],
        metafields: [
          {
            id: "c13fd219-3416-504e-9e04-31afcaf13120",
            key: "title_line_1",
            value: "Prana testing Title Line 1",
          },
          {
            id: "428c1c2e-3760-5285-8170-d4a299290d98",
            key: "title_line_2",
            value: "Original Acrylic Painting (SOLD) testing Title Line 2",
          },
        ],
      },
      collectionHandle: "decor",
    };
    render(<ProductCard product={mockedShopifyProductData.product} />);
    screen.getByRole("heading", { name: "'Prana testing Title Line 1'" });
    screen.getByRole("heading", {
      name: "Original Acrylic Painting (SOLD) testing Title Line 2",
    });
    expect(
      screen.queryByRole("heading", { name: "Test product name" })
    ).not.toBeInTheDocument();
  });

  it("renders product title as fallback", () => {
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
            placeholder: {
              fallback: "data:image/png;base64,/9j/4QC8RXDSDSDDS",
            },
            width: 500,
            height: 265,
          },
        },
        hasOnlyDefaultVariant: false,
        totalVariants: 1,
        variants: [],
        mediaCount: 1,
        media: [],
        options: [],
        metafields: [],
      },
      collectionHandle: "decor",
    };
    render(<ProductCard product={mockedShopifyProductData.product} />);
    screen.getByRole("heading", { name: "'Test product name'" });
    expect(
      screen.queryByRole("heading", {
        name: "Original Acrylic Painting (SOLD) testing Title Line 2",
      })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "'Prana testing Title Line 1'" })
    ).not.toBeInTheDocument();
  });

  it("renders correctly with default values", async () => {
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
            placeholder: {
              fallback: "data:image/png;base64,/9j/4QC8RXDSDSDDS",
            },
            width: 500,
            height: 265,
          },
        },
        hasOnlyDefaultVariant: false,
        totalVariants: 1,
        variants: [
          {
            shopifyId: "gid://shopify/ProductVariant/4460DSDSSDSDDS",
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
                src: mockedImageURL,
                altText: "image media alternative text goes here",
                height: 1358,
                width: 2560,
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
                  placeholder: {
                    fallback: "data:image/png;base64,/9j/4QDDSDSD",
                  },
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
            shopifyId: "gid://shopify/ProductOption/105DSDSDSD",
            name: "select a Color",
            values: ["red"],
          },
        ],
        metafields: [],
      },
      collectionHandle: "decor",
    };
    render(<ProductCard product={mockedShopifyProductData.product} />);
    screen.getByText("'Test product name'");
    // TODO: CHECK HOW TO TEST ALT TEXT WITH INNERIMAGEZOOM WHEN IS MOCKED
    // screen.getByAltText(
    //   "Alternative text of featured Image of product goes here..."
    // );
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
            shopifyId: "gid://shopify/ProductVariant/SASASSA",
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
            shopifyId: "gid://shopify/ProductOption/SASASAS",
            name: "Title",
            values: ["Default Title"],
          },
        ],
        metafields: [],
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
        metafields: [],
      },
      collectionHandle: "decor",
    };
    render(<ProductCard product={mockedShopifyProductData.product} />);
    expect(
      screen.queryByRole("heading", { name: "Details gallery:" })
    ).not.toBeInTheDocument();
  });

  it.skip("renders product title as alt text to featured image when altText not provided", async () => {
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
          originalSrc: mockedImageURL,

          detail: {
            images: {
              sources: [
                {
                  srcSet: mockedImageURL,
                  sizes: "(min-width: 800px) 800px, 100vw",
                  type: "image/webp",
                },
              ],
              fallback: {
                src: mockedImageURL,
                srcSet: mockedImageURL,
                sizes: "(min-width: 800px) 800px, 100vw",
              },
            },
            layout: "constrained",
            placeholder: {
              fallback: "data:image/png;base64,/9j/4QC8RXdsdsdZ",
            },
            width: 800,
            height: 1201,
          },
        },
        hasOnlyDefaultVariant: false,
        totalVariants: 1,
        variants: [
          {
            shopifyId: "gid://shopify/ProductVariant/SASASAS",
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
        metafields: [],
      },
      collectionHandle: "decor",
    };
    render(<ProductCard product={mockedShopifyProductData.product} />);
    screen.getByAltText("Test product name");
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
            shopifyId: "gid://shopify/ProductVariant/SASASAS",
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
        metafields: [],
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
            shopifyId: "gid://shopdsdsify/ProducdsdstOption/SASASAS",
            name: "Title",
            values: ["Default Title"],
          },
        ],
        metafields: [],
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
            shopifyId: "gid://shopdsdsify/PrdsdoductVariant/SASASAS",
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
            shopifyId:
              "gid://shopdsdsify/ProducdsdstOption/104dsSASASSAds26976043216",
            name: "Title",
            values: ["Default Title"],
          },
        ],
        publishedAt: null,
        metafields: [],
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

  it("renders a Loading text below to Add to shopping bag button when item is adding", async () => {
    jest.spyOn(StoreContext, "useAddItemToCart").mockReturnValue({
      addItemToCart: jest.fn(),
      addItemToCartLoading: true,
      addItemToCartWarnings: [],
      setAddItemToCartWarnings: jest.fn(),
    });
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
            shopifyId: "gid://shopdsdsify/ProducdsdstOption/SASASAS",
            name: "Title",
            values: ["Default Title"],
          },
        ],
        metafields: [],
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
    screen.getByText("Adding item to cart...");
  });

  it("renders a Loading text below to Add to shopping bag button when item is updating", async () => {
    jest.spyOn(StoreContext, "useCartLinesUpdate").mockReturnValue({
      updateItemsToCart: jest.fn(),
      updateItemsToCartLoading: true,
      updateItemsToCartWarnings: [],
      setUpdateItemsToCartWarnings: jest.fn(),
    });
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
        metafields: [],
      },
      collectionHandle: "prints",
    };

    render(
      <ProductCard
        product={mockedShopifyProductSoldOutData.product}
        collectionHandle={mockedShopifyProductSoldOutData.collectionHandle}
      />
    );
    screen.getByText("Updating item to cart...");
  });

  it("renders a message notifying the user about a warning in the response of adding item to cart", async () => {
    jest.spyOn(StoreContext, "useAddItemToCart").mockReturnValue({
      addItemToCart: jest.fn(),
      addItemToCartLoading: false,
      addItemToCartWarnings: [
        {
          code: "MERCHANDISE_NOT_ENOUGH_STOCK",
          target: "gid://shopify/CartLine/b409daedsds?cart=dsdsd",
          message: "Only 3 items were added to your cart due to availability.",
        },
      ],
      setAddItemToCartWarnings: jest.fn(),
    });
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
            images: null,
            layout: "constrained",
            placeholder: {
              fallback: "data:image/png;base64,/9j/4Q",
            },
            width: 500,
            height: 265,
          },
        },
        hasOnlyDefaultVariant: false,
        totalVariants: 1,
        variants: [
          {
            shopifyId: "gid://shopify/ProductVariant/446004dsdsdds",
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
                src: "https://cdn.shopify.com/s/files/dsdsdsdds",
                altText: "image media alternative text goes here",
                height: 1358,
                width: 2560,
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
                  placeholder: {
                    fallback: "data:image/png;base64,/9j/dsdsdZ",
                  },
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
            shopifyId: "gid://shopify/ProductOption/DSDSDDS",
            name: "select a Color",
            values: ["red"],
          },
        ],
        metafields: [],
      },
      collectionHandle: "decor",
    };

    render(
      <ProductCard
        product={mockedShopifyProductData.product}
        collectionHandle={mockedShopifyProductData.collectionHandle}
      />
    );

    screen.getByText(
      "Only 3 items were added to your cart due to availability."
    );
  });

  it("renders a message notifying the user about a warning in the response of updating item to cart", async () => {
    jest.spyOn(StoreContext, "useCartLinesUpdate").mockReturnValue({
      updateItemsToCart: jest.fn(),
      updateItemsToCartLoading: true,
      setUpdateItemsToCartWarnings: jest.fn(),
      updateItemsToCartWarnings: [
        {
          code: "MERCHANDISE_NOT_ENOUGH_STOCK",
          target: "gid://shopify/CartLine/b409daedsds?cart=dsdsdsd",
          message: "Only 5 items were added to your cart due to availability.",
        },
      ],
    });
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
            images: null,
            layout: "constrained",
            placeholder: {
              fallback: "data:image/png;base64,/9j/4Q",
            },
            width: 500,
            height: 265,
          },
        },
        hasOnlyDefaultVariant: false,
        totalVariants: 1,
        variants: [
          {
            shopifyId: "gid://shopify/ProductVariant/446004dsdsdds",
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
                src: mockedImageURL,
                altText: "image media alternative text goes here",
                height: 1358,
                width: 2560,
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
                  placeholder: {
                    fallback: "data:image/png;base64,/9j/dsdsdZ",
                  },
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
            shopifyId: "gid://shopify/ProductOption/10521378914512",
            name: "select a Color",
            values: ["red"],
          },
        ],
        metafields: [],
      },
      collectionHandle: "decor",
    };

    render(
      <ProductCard
        product={mockedShopifyProductData.product}
        collectionHandle={mockedShopifyProductData.collectionHandle}
      />
    );

    screen.getByText(
      "Only 5 items were added to your cart due to availability."
    );
  });

  it("clears warning message when a variant is selected", async () => {
    const mockFn = jest.fn();
    jest.spyOn(StoreContext, "useAddItemToCart").mockReturnValue({
      addItemToCart: jest.fn(),
      addItemToCartLoading: false,
      addItemToCartWarnings: [
        {
          code: "MERCHANDISE_NOT_ENOUGH_STOCK",
          target: "gid://shopify/CartLine/b409daedsds?cart=dsdsd",
          message: "low stock",
        },
      ],
      setAddItemToCartWarnings: mockFn,
    });

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
            images: null,
            layout: "constrained",
            placeholder: {
              fallback: "data:image/png;base64,/9j/4Q",
            },
            width: 500,
            height: 265,
          },
        },
        hasOnlyDefaultVariant: false,
        totalVariants: 1,
        variants: [
          {
            shopifyId: "gid://shopify/ProductVariant/446004dsdsdds",
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
            image: null,
          },
        ],
        mediaCount: 1,
        media: [],
        options: [
          {
            shopifyId: "gid://shopify/ProductOption/323223",
            name: "select a Color",
            values: ["red"],
          },
          {
            shopifyId: "gid://shopify/ProductOption/3ewewe23223",
            name: "select a Color",
            values: ["green"],
          },
        ],
        metafields: [],
      },
      collectionHandle: "decor",
    };
    render(
      <ProductCard
        product={mockedShopifyProductData.product}
        collectionHandle={mockedShopifyProductData.collectionHandle}
      />
    );
    expect(screen.getByText("low stock")).toBeInTheDocument();

    const select = screen.getByLabelText(/select a Color/i);

    await fireEvent.selectOptions(select, "red");

    expect(mockFn).toHaveBeenCalledWith([]);
  });

  it("renders a response message error if network response has error ", async () => {
    jest.spyOn(StoreContext, "useHasResponseError").mockReturnValue(true);

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
            images: null,
            layout: "constrained",
            placeholder: {
              fallback: "data:image/png;base64,/9j/4Q",
            },
            width: 500,
            height: 265,
          },
        },
        hasOnlyDefaultVariant: false,
        totalVariants: 1,
        variants: [
          {
            shopifyId: "gid://shopify/ProductVariant/446004dsdsdds",
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
            image: null,
          },
        ],
        mediaCount: 1,
        media: [],
        options: [
          {
            shopifyId: "gid://shopify/ProductOption/323223",
            name: "select a Color",
            values: ["red"],
          },
          {
            shopifyId: "gid://shopify/ProductOption/3ewewe23223",
            name: "select a Color",
            values: ["green"],
          },
        ],
        metafields: [],
      },
      collectionHandle: "decor",
    };

    render(
      <ProductCard
        product={mockedShopifyProductData.product}
        collectionHandle={mockedShopifyProductData.collectionHandle}
      />
    );
    screen.getByText("A request error occurred, please try again later.");
  });
});
