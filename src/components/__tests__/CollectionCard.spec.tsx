import React from "react";
import { render, screen } from "@testing-library/react";
import CollectionCard from "../CollectionCard";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("CollectionCard", () => {
  it("renders correctly when image", async () => {
    const mockedShopifyCollectionData = {
      id: "bd4e6e5b-a663-5e00-becb-b4a63d4c7ec6",
      title: "collection title abc123",
      handle: "testing-collection",
      description: "high quality prints from Brushella's original paintings",
      image: {
        gatsbyImageData: {
          images: {
            sources: [
              {
                srcSet:
                  "https://cdn.shopify.com/s/files/1/0586/9892/4240/collections/brushella-homedecor-collection-thumbnail_364x373_crop_center.jpg.webp?v=1627017586 364w",
                sizes: "100vw",
                type: "image/webp",
              },
            ],
            fallback: {
              src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/collections/brushella-homedecor-collection-thumbnail_364x373_crop_center.jpg?v=1627017586",
              srcSet:
                "https://cdn.shopify.com/s/files/1/0586/9892/4240/collections/brushella-homedecor-collection-thumbnail_364x373_crop_center.jpg?v=1627017586 364w",
              sizes: "100vw",
            },
          },
          layout: "fullWidth",
          placeholder: {
            fallback: "data:image/png;base64,/2gAIAQMBAT8AH//Z",
          },
          width: 1,
          height: 1.0250000000000001,
        },
        altText: "testing the alt text from image",
      },
    };
    render(
      <CollectionCard shopifyCollectionNode={mockedShopifyCollectionData} />
    );
    screen.getByAltText("testing the alt text from image");
    screen.getByText("collection title abc123");
  });

  it("renders correctly when image is null", async () => {
    const mockedShopifyCollectionData = {
      id: "bd4e6e5b-a663-5e00-becb-b4a63d4c7ec6",
      title: "test collection title as alt text",
      handle: "testing-collection",
      description: "high quality prints from Brushella's original paintings",
      image: null,
    };
    render(
      <CollectionCard shopifyCollectionNode={mockedShopifyCollectionData} />
    );
    screen.getByAltText("test collection title as alt text");
    screen.getByText("test collection title as alt text");
  });
});
