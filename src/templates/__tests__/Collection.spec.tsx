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
        {
          id: "d4d2ee09-22c5-5216-a502-9439385f91f2",
          title: "jungle",
          handle: "jungle",
          description: "original painting",
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
                      "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-06-28at9.24.31PM_141x115_crop_center.jpg.webp?v=1689332177 141w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-06-28at9.24.31PM_282x230_crop_center.jpg.webp?v=1689332177 282w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-06-28at9.24.31PM_564x460_crop_center.jpg.webp?v=1689332177 564w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-06-28at9.24.31PM_1128x920_crop_center.jpg.webp?v=1689332177 1128w",
                    sizes: "(min-width: 564px) 564px, 100vw",
                    type: "image/webp",
                  },
                ],
                fallback: {
                  src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-06-28at9.24.31PM_564x460_crop_center.jpg?v=1689332177",
                  srcSet:
                    "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-06-28at9.24.31PM_141x115_crop_center.jpg?v=1689332177 141w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-06-28at9.24.31PM_282x230_crop_center.jpg?v=1689332177 282w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-06-28at9.24.31PM_564x460_crop_center.jpg?v=1689332177 564w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-06-28at9.24.31PM_1128x920_crop_center.jpg?v=1689332177 1128w",
                  sizes: "(min-width: 564px) 564px, 100vw",
                },
              },
              layout: "constrained",
              width: 564,
              height: 460,
            },
          },
        },
        {
          id: "c278ee6f-e8c0-5ed7-bbb3-e1c856b161a9",
          title: "heart",
          handle: "heart",
          description: "original acrylic painting",
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
                      "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/heart-WhatsAppImage2023-06-07at9.08.42PMcopy_141x115_crop_center.jpg.webp?v=1689331849 141w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/heart-WhatsAppImage2023-06-07at9.08.42PMcopy_282x230_crop_center.jpg.webp?v=1689331849 282w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/heart-WhatsAppImage2023-06-07at9.08.42PMcopy_564x460_crop_center.jpg.webp?v=1689331849 564w",
                    sizes: "(min-width: 564px) 564px, 100vw",
                    type: "image/webp",
                  },
                ],
                fallback: {
                  src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/heart-WhatsAppImage2023-06-07at9.08.42PMcopy_564x460_crop_center.jpg?v=1689331849",
                  srcSet:
                    "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/heart-WhatsAppImage2023-06-07at9.08.42PMcopy_141x115_crop_center.jpg?v=1689331849 141w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/heart-WhatsAppImage2023-06-07at9.08.42PMcopy_282x230_crop_center.jpg?v=1689331849 282w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/heart-WhatsAppImage2023-06-07at9.08.42PMcopy_564x460_crop_center.jpg?v=1689331849 564w",
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

    screen.getByRole("heading", { name: "frog" });
    screen.getByText("original");

    screen.getByRole("heading", { name: "jungle" });
    screen.getByText("original painting");

    screen.getByRole("heading", { name: "heart" });
    screen.getByText("original acrylic painting");
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
