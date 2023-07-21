import React from "react";
import { render, screen } from "@testing-library/react";
import * as Gatsby from "gatsby";
import CollectionsPage from "../collections";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("CollectionsPage", () => {
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

    render(<CollectionsPage data={mockedData} />);
    screen.getByText("There are no collections available");
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
              description:
                "high quality prints from Brushella's original paintings",
              image: null,
            },
          },
          {
            node: {
              id: "ab94a31f-8fc3-5e3c-b0cf-5a16c873d647",
              title: "Kitchen Collection",
              handle: "kitchen-collection",
              description:
                "high quality prints from Brushella's original paintings",
              image: null,
            },
          },
          {
            node: {
              id: "384d31c2-36b3-5bc7-a4eb-1dc34dea1ab1",
              title: "Home Decor",
              handle: "frontpage",
              description:
                "high quality prints from Brushella's original paintings",
              image: null,
            },
          },
        ],
      },
    };

    render(<CollectionsPage data={mockedallShopifyCollectionData} />);
    screen.getByRole("heading", { name: "Brushella Collections" });
    screen.getByText("Kids Collection");
    screen.getByText("Kitchen Collection");
    screen.getByText("Home Decor");
  });
});
