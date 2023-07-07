import React from "react";
import { render, screen } from "@testing-library/react";
import * as Gatsby from "gatsby";
import ProductsPage from "../products";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("ProductsPage", () => {
  it("renders product page with empty collections and products ", () => {
    const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery");
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {
          title: "My Title",
        },
      },
    }));

    const mockedData = {
      allShopifyProduct: {
        edges: [],
      },
      allShopifyCollection: {
        edges: [],
      },
    };

    render(<ProductsPage data={mockedData} />);
    screen.getByText("There are no collections available");
    screen.getByText("There are no products available");
  });

  it("renders collections menu", () => {
    const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery");
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {
          title: "My Title",
        },
      },
    }));
    const mockedallShopifyCollectionData = {
      allShopifyProduct: {
        edges: [],
      },
      allShopifyCollection: {
        edges: [
          {
            node: {
              id: "bd4e6e5b-a663-5e00-becb-b4a63d4c7ec6",
              title: "Kids Collection",
              handle: "kids-collection",
            },
          },
          {
            node: {
              id: "ab94a31f-8fc3-5e3c-b0cf-5a16c873d647",
              title: "Kitchen Collection",
              handle: "kitchen-collection",
            },
          },
          {
            node: {
              id: "384d31c2-36b3-5bc7-a4eb-1dc34dea1ab1",
              title: "Home Decor",
              handle: "frontpage",
            },
          },
        ],
      },
    };

    render(<ProductsPage data={mockedallShopifyCollectionData} />);
    screen.getByRole("heading", { name: "Brushella Collections" });
    screen.getByRole("link", { name: "All products" });
    screen.getByRole("link", { name: "Kids Collection" });
    screen.getByRole("link", { name: "Kitchen Collection" });
    screen.getByRole("link", { name: "Home Decor" });
  });

  it("renders all products grid", () => {
    const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery");
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {
          title: "My Title",
        },
      },
    }));
    const mockedAllShopifyProductData = {
      allShopifyProduct: {
        edges: [
          {
            node: {
              id: "345e1ae7-3662-5fbd-a6d2-a3931a5fb862",
              handle: "bamboo-coaster",
              title: "Bamboo coaster",
              storefrontId: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY2OTk4NzE3OTc0NTY=",
              description:
                "Nice bamboo coaster with sequin applications with a varnishing finish for home decor.",
              priceRangeV2: {
                maxVariantPrice: { amount: "30.0", currencyCode: "AUD" },
              },
              featuredImage: {
                id: "gid://shopify/ProductImage/28691898466512",
                altText:
                  "Bamboo coaster with sequin center and resine and square rounded borders",
                gatsbyImageData: {
                  images: {
                    sources: [],
                    fallback: {
                      src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.07.21pm_582x582_crop_center.png?v=1627042696",
                      srcSet:
                        "https://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.07.21pm_146x146_crop_center.png?v=1627042696 146w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.07.21pm_291x291_crop_center.png?v=1627042696 291w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.07.21pm_582x582_crop_center.png?v=1627042696 582w",
                      sizes: "(min-width: 582px) 582px, 100vw",
                    },
                  },
                  layout: "constrained",
                  width: 910,
                  height: 910,
                },
              },
            },
          },
          {
            node: {
              id: "793025dc-ae76-5230-b72d-9e8a6776cb7b",
              handle: "galactic-kitten",
              title: "Galactic kitten",
              storefrontId: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY2OTk4NjU5MzE5ODQ=",
              description:
                "Super cute decorative Galactic kittens with magnet. Colors can be customizable!",
              priceRangeV2: {
                maxVariantPrice: { amount: "10.0", currencyCode: "AUD" },
              },
              featuredImage: {
                id: "gid://shopify/ProductImage/28691870023888",
                altText:
                  "blue resine head of cat shape, with shiny finish and texture",
                gatsbyImageData: {
                  images: {
                    sources: [],
                    fallback: {
                      src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.03.14pm_910x910_crop_center.png?v=1627042746",
                      srcSet:
                        "https://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.03.14pm_228x228_crop_center.png?v=1627042746 228w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.03.14pm_455x455_crop_center.png?v=1627042746 455w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.03.14pm_910x910_crop_center.png?v=1627042746 910w",
                      sizes: "(min-width: 910px) 910px, 100vw",
                    },
                  },
                  layout: "constrained",
                  width: 910,
                  height: 910,
                },
              },
            },
          },
        ],
      },
      allShopifyCollection: {
        edges: [],
      },
    };

    render(<ProductsPage data={mockedAllShopifyProductData} />);
    screen.getByRole("heading", { name: "All Products" });

    screen.getByRole("link", { name: "Bamboo coaster" });
    screen.getByText(
      "Nice bamboo coaster with sequin applications with a varnishing finish for home decor."
    );
    screen.getByText("30.0 (AUD)");
    screen.getByAltText(
      "Bamboo coaster with sequin center and resine and square rounded borders"
    );

    screen.getByRole("link", { name: "Galactic kitten" });
    screen.getByText(
      "Super cute decorative Galactic kittens with magnet. Colors can be customizable!"
    );
    screen.getByText("10.0 (AUD)");
    screen.getByAltText(
      "blue resine head of cat shape, with shiny finish and texture"
    );
  });
});
