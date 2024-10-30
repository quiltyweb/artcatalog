import React from "react";
import { render, screen } from "@testing-library/react";
import * as Gatsby from "gatsby";
import SingleProduct from "../SingleProduct";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Single product Template", () => {
  it("renders correctly", () => {
    const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery");
    useStaticQuery.mockImplementation(() => ({
      site: {
        siteMetadata: {
          title: "Site Title",
        },
      },
    }));

    const mockedImageURL =
      "https://cdn.fake-image-for-brushella.art/fake-image.jpg";

    const mockedPageContext = {
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
                src: mockedImageURL,
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

    const mockedLocation = {
      pathname: "/collections/home-decor/test-product-handle/",
    };

    render(
      <SingleProduct
        location={mockedLocation}
        pageContext={mockedPageContext}
      />
    );
    screen.getByRole("link", { name: "Home" });
    expect(screen.getByRole("link", { name: "Categories" })).toHaveAttribute(
      "href",
      "/collections"
    );
    expect(
      screen.getByRole("link", { name: /all home-decor/i })
    ).toHaveAttribute("href", "/collections/home-decor");
    screen.getByRole("heading", { name: "Test product name" });
    expect(screen.getAllByText("Test product name")).toHaveLength(2);
    screen.getByText("Product description goes here");
    screen.getByText(/from/i);
    screen.getByText(/AUD/i);
    screen.getByText(/\$10.00/i);
    screen.getByLabelText(/color/i);
    screen.getByLabelText(/quantity/i);
    screen.getByRole("heading", { name: "Variations:" });
    screen.getByAltText("this is Alternative text for variant image");
    screen.getByRole("heading", { name: "Details gallery:" });
    screen.getByAltText("image media alternative text goes here");
    screen.getByRole("button", { name: "Add to shopping bag" });
  });
});
