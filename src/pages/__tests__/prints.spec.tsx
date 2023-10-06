import React from "react";
import { render, screen } from "@testing-library/react";
import * as Gatsby from "gatsby";
import PrintsPage from "../prints";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("PrintsPage", () => {
  it("renders product page with a title and products", () => {
    const mockedData = {
      data: {
        shopifyCollection: {
          title: "Prints test",
          products: [
            {
              id: "b84595c2-783d-5d96-a887-485f70cace45",
              handle: "macumba",
              title: "Macumba",
              description: "print",
              featuredImage: {
                altText: null,
                gatsbyImageData: {
                  images: {
                    sources: [
                      {
                        srcSet:
                          "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-15at10.05.54PM_320x427_crop_center.jpg.webp?v=1689332329 320w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-15at10.05.54PM_639x852_crop_center.jpg.webp?v=1689332329 639w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-15at10.05.54PM_1278x1704_crop_center.jpg.webp?v=1689332329 1278w",
                        sizes: "(min-width: 1278px) 1278px, 100vw",
                        type: "image/webp",
                      },
                    ],
                    fallback: {
                      src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-15at10.05.54PM_1278x1704_crop_center.jpg?v=1689332329",
                      srcSet:
                        "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-15at10.05.54PM_320x427_crop_center.jpg?v=1689332329 320w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-15at10.05.54PM_639x852_crop_center.jpg?v=1689332329 639w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-15at10.05.54PM_1278x1704_crop_center.jpg?v=1689332329 1278w",
                      sizes: "(min-width: 1278px) 1278px, 100vw",
                    },
                  },
                  layout: "constrained",
                  width: 1278,
                  height: 1704,
                },
              },
            },
            {
              id: "c4487dd3-7e67-5e08-81e5-55e587087466",
              handle: "tiger",
              title: "Tiger",
              description: "print",
              featuredImage: {
                altText: null,
                gatsbyImageData: {
                  images: {
                    sources: [
                      {
                        srcSet:
                          "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-15at10.05.57PM_2_320x427_crop_center.jpg.webp?v=1689332311 320w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-15at10.05.57PM_2_639x852_crop_center.jpg.webp?v=1689332311 639w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-15at10.05.57PM_2_1278x1704_crop_center.jpg.webp?v=1689332311 1278w",
                        sizes: "(min-width: 1278px) 1278px, 100vw",
                        type: "image/webp",
                      },
                    ],
                    fallback: {
                      src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-15at10.05.57PM_2_1278x1704_crop_center.jpg?v=1689332311",
                      srcSet:
                        "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-15at10.05.57PM_2_320x427_crop_center.jpg?v=1689332311 320w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-15at10.05.57PM_2_639x852_crop_center.jpg?v=1689332311 639w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-15at10.05.57PM_2_1278x1704_crop_center.jpg?v=1689332311 1278w",
                      sizes: "(min-width: 1278px) 1278px, 100vw",
                    },
                  },
                  layout: "constrained",
                  width: 1278,
                  height: 1704,
                },
              },
            },
            {
              id: "a3e66693-ef10-5a49-963b-f0de8a72b5c3",
              handle: "tucan",
              title: "Tucan",
              description: "print",
              featuredImage: {
                altText: null,
                gatsbyImageData: {
                  images: {
                    sources: [
                      {
                        srcSet:
                          "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-15at10.05.56PM_1_320x427_crop_center.jpg.webp?v=1689332279 320w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-15at10.05.56PM_1_639x852_crop_center.jpg.webp?v=1689332279 639w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-15at10.05.56PM_1_1278x1704_crop_center.jpg.webp?v=1689332279 1278w",
                        sizes: "(min-width: 1278px) 1278px, 100vw",
                        type: "image/webp",
                      },
                    ],
                    fallback: {
                      src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-15at10.05.56PM_1_1278x1704_crop_center.jpg?v=1689332279",
                      srcSet:
                        "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-15at10.05.56PM_1_320x427_crop_center.jpg?v=1689332279 320w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-15at10.05.56PM_1_639x852_crop_center.jpg?v=1689332279 639w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/WhatsAppImage2023-05-15at10.05.56PM_1_1278x1704_crop_center.jpg?v=1689332279 1278w",
                      sizes: "(min-width: 1278px) 1278px, 100vw",
                    },
                  },
                  layout: "constrained",
                  width: 1278,
                  height: 1704,
                },
              },
            },
          ],
        },
      },
    };

    render(<PrintsPage {...mockedData} />);
    screen.getByRole("heading", { name: "Prints test" });
    screen.getByText("Macumba");
    screen.getByText("Tiger");
    screen.getByText("Tucan");
  });

  it("renders product page with no products and no title", () => {
    const mockedData = {
      data: {
        shopifyCollection: {
          title: "Prints test",
          products: [],
        },
      },
    };
    render(<PrintsPage {...mockedData} />);
    screen.getByRole("heading", { name: "Prints test" });
    screen.getByText("There are no prints available.");
  });
});
