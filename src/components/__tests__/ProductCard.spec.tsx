import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import ProductCard from "../ProductCard";

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
        id: "4af45bf5-a1ca-5b57-9318-c7ce027947f0",
        title: "posavasos title",
        handle: "posavasos",
        description: "decor description",
        priceRangeV2: {
          maxVariantPrice: {
            amount: 0,
            currencyCode: "AUD",
          },
        },
        featuredImage: {
          altText: "This is alt text for testing",
          gatsbyImageData: {
            images: {
              sources: [
                {
                  srcSet:
                    "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-04-28at9.19.54PM_1_141x115_crop_center.jpg.webp?v=1689332359 141w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-04-28at9.19.54PM_1_282x230_crop_center.jpg.webp?v=1689332359 282w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-04-28at9.19.54PM_1_564x460_crop_center.jpg.webp?v=1689332359 564w",
                  sizes: "(min-width: 564px) 564px, 100vw",
                  type: "image/webp",
                },
              ],
              fallback: {
                src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-04-28at9.19.54PM_1_564x460_crop_center.jpg?v=1689332359",
                srcSet:
                  "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-04-28at9.19.54PM_1_141x115_crop_center.jpg?v=1689332359 141w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-04-28at9.19.54PM_1_282x230_crop_center.jpg?v=1689332359 282w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-04-28at9.19.54PM_1_564x460_crop_center.jpg?v=1689332359 564w",
                sizes: "(min-width: 564px) 564px, 100vw",
              },
            },
            layout: "constrained",
            width: 564,
            height: 460,
          },
        },
      },
      collectionHandle: "this is the collectionHandle",
    };
    render(
      <ProductCard
        product={mockedShopifyProductData.product}
        collectionHandle={mockedShopifyProductData.collectionHandle}
      />
    );

    screen.getByText("posavasos title");
    screen.getByText("decor description");
    screen.getByText(/this is the collectionHandle/);
    screen.getByAltText("This is alt text for testing");
  });

  it("renders product title as alt text when it was not provided", async () => {
    const mockedShopifyProductData = {
      product: {
        id: "4af45bf5-a1ca-5b57-9318-c7ce027947f0",
        title: "posavasos title",
        handle: "posavasos",
        description: "decor description",
        priceRangeV2: {
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
                  srcSet:
                    "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-04-28at9.19.54PM_1_141x115_crop_center.jpg.webp?v=1689332359 141w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-04-28at9.19.54PM_1_282x230_crop_center.jpg.webp?v=1689332359 282w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-04-28at9.19.54PM_1_564x460_crop_center.jpg.webp?v=1689332359 564w",
                  sizes: "(min-width: 564px) 564px, 100vw",
                  type: "image/webp",
                },
              ],
              fallback: {
                src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-04-28at9.19.54PM_1_564x460_crop_center.jpg?v=1689332359",
                srcSet:
                  "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-04-28at9.19.54PM_1_141x115_crop_center.jpg?v=1689332359 141w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-04-28at9.19.54PM_1_282x230_crop_center.jpg?v=1689332359 282w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-04-28at9.19.54PM_1_564x460_crop_center.jpg?v=1689332359 564w",
                sizes: "(min-width: 564px) 564px, 100vw",
              },
            },
            layout: "constrained",
            width: 564,
            height: 460,
          },
        },
      },
      collectionHandle: "decor",
    };
    render(
      <ProductCard
        product={mockedShopifyProductData.product}
        collectionHandle={mockedShopifyProductData.collectionHandle}
      />
    );

    screen.getByText("posavasos title");
  });

  it("renders fallback image", async () => {
    const mockedShopifyProductData = {
      product: {
        id: "4af45bf5-a1ca-5b57-9318-c7ce027947f0",
        title: "posavasos title",
        handle: "posavasos",
        description: "decor description",
        priceRangeV2: {
          maxVariantPrice: {
            amount: 0,
            currencyCode: "AUD",
          },
        },
        featuredImage: null,
      },
      collectionHandle: "decor",
    };
    render(
      <ProductCard
        product={mockedShopifyProductData.product}
        collectionHandle={mockedShopifyProductData.collectionHandle}
      />
    );

    screen.getByAltText("no product image available");
  });
});
