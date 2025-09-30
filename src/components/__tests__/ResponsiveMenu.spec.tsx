import React from "react";
import { render, screen } from "@testing-library/react";
import ResponsiveMenu from "../ResponsiveMenu";

describe("ResponsiveMenu", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders menu elements correctly ", async () => {
    const allShopifyCollectionNodes = [
      {
        id: "4179b182-b572-5609-a8a2-05083671479a",
        title: "Test Collection Title",
        handle: "test-collection-title",
      },
    ];
    render(
      <ResponsiveMenu
        isOpen={true}
        allShopifyCollectionNodes={allShopifyCollectionNodes}
        handleClickOnOpen={jest.fn()}
        handleClickOnClose={jest.fn()}
      />
    );

    expect(screen.queryAllByRole("link")).toHaveLength(7);
    // from static query:
    screen.getByRole("link", { name: "Test Collection Title" });

    // hardcoded:
    screen.getByRole("link", { name: "About Me" });
    screen.getByRole("link", { name: "contact" });
    screen.getByLabelText("facebook");
    screen.getByLabelText("whatsApp");
    screen.getByLabelText("instagram");
  });
});
