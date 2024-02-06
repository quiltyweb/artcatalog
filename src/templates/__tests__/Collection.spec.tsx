import React from "react";
import { render, screen } from "@testing-library/react";
import Collection from "../Collection";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Collection page Template", () => {
  it("renders correctly", () => {
    const mockedPageContext = {
      title: "originals",
      description: "original description goes here",
      products: [
        {
          id: "08ae3833-681a-5d28-a545-145949a9937e",
          title: "frog",
          handle: "frog",
          description: "product description goes here",
          priceRangeV2: {
            maxVariantPrice: {
              amount: 500,
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
                      "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-17at9.34.23PM_141x115_crop_center.jpg.webp?v=1689332385 141w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-17at9.34.23PM_282x230_crop_center.jpg.webp?v=1689332385 282w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-17at9.34.23PM_564x460_crop_center.jpg.webp?v=1689332385 564w",
                    sizes: "(min-width: 564px) 564px, 100vw",
                    type: "image/webp",
                  },
                ],
                fallback: {
                  src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-17at9.34.23PM_564x460_crop_center.jpg?v=1689332385",
                  srcSet:
                    "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-17at9.34.23PM_141x115_crop_center.jpg?v=1689332385 141w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-17at9.34.23PM_282x230_crop_center.jpg?v=1689332385 282w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-17at9.34.23PM_564x460_crop_center.jpg?v=1689332385 564w",
                  sizes: "(min-width: 564px) 564px, 100vw",
                },
              },
              layout: "constrained",
              width: 564,
              height: 460,
            },
          },
        },
      ],
      collectionHandle: "originals",
    };

    render(<Collection pageContext={mockedPageContext} />);
    screen.getByRole("heading", { name: "originals" });
    screen.getByText("original description goes here");
    screen.getByText("$500");
    screen.getByText("AUD");
    screen.getByText(/view details/i);

    screen.getByRole("heading", { name: "frog" });
    screen.getByText("product description goes here");
  });

  it("renders no price when price is 0", () => {
    const mockedPageContext = {
      title: "originals",
      collectionHandle: "originals",
      description: "original description goes here",
      products: [
        {
          id: "08ae3833-681a-5d28-a545-145949a9937e",
          title: "frog",
          handle: "frog",
          description: "product description goes here",
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
                      "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-17at9.34.23PM_141x115_crop_center.jpg.webp?v=1689332385 141w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-17at9.34.23PM_282x230_crop_center.jpg.webp?v=1689332385 282w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-17at9.34.23PM_564x460_crop_center.jpg.webp?v=1689332385 564w",
                    sizes: "(min-width: 564px) 564px, 100vw",
                    type: "image/webp",
                  },
                ],
                fallback: {
                  src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-17at9.34.23PM_564x460_crop_center.jpg?v=1689332385",
                  srcSet:
                    "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-17at9.34.23PM_141x115_crop_center.jpg?v=1689332385 141w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-17at9.34.23PM_282x230_crop_center.jpg?v=1689332385 282w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-17at9.34.23PM_564x460_crop_center.jpg?v=1689332385 564w",
                  sizes: "(min-width: 564px) 564px, 100vw",
                },
              },
              layout: "constrained",
              width: 564,
              height: 460,
            },
          },
        },
      ],
    };

    render(<Collection pageContext={mockedPageContext} />);

    expect(screen.queryByTestId("item-price")).toBeNull();
    screen.getByText(/view details/i);
  });

  it("renders correctly when there are no products", () => {
    const mockedPageContext = {
      title: "originals",
      products: [],
      collectionHandle: "originals",
    };

    render(<Collection pageContext={mockedPageContext} />);
    screen.getByText("There are no products available.");
  });

  it("renders placeholder image", () => {
    const mockedPageContext = {
      title: "originals",
      products: [
        {
          id: "08ae3833-681a-5d28-a545-145949a9937e",
          title: "frog",
          handle: "frog",
          description: "original",
          priceRangeV2: {
            maxVariantPrice: {
              amount: 0,
              currencyCode: "AUD",
            },
          },
          featuredImage: null,
        },
      ],
      collectionHandle: "originals",
    };

    render(<Collection pageContext={mockedPageContext} />);
    screen.getByAltText("no product image available");
  });
});
