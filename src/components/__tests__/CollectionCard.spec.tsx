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
  it("renders correctly when image is null", async () => {
    const mockedShopifyCollectionData = {
      id: "bd4e6e5b-a663-5e00-becb-b4a63d4c7ec6",
      title: "test collection",
      handle: "testing-collection",
      description: "high quality prints from Brushella's original paintings",
      image: null,
    };
    render(<CollectionCard collection={mockedShopifyCollectionData} />);
    screen.getByAltText("test collection");
    screen.getByText("test collection");
  });
});
