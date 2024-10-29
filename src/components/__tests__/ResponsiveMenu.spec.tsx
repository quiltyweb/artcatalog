import React from "react";
import { render, screen } from "@testing-library/react";
import ResponsiveMenu from "../ResponsiveMenu";

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("ResponsiveMenu", () => {
  it("renders mobile version correctly ", async () => {
    const allShopifyCollectionNodes = [
      {
        id: "4179b182-b572-5609-a8a2-05083671479a",
        title: "Test Collection Title",
        handle: "test-collection-title",
      },
    ];
    render(
      <ResponsiveMenu
        isDektop={false}
        isOpen={true}
        allShopifyCollectionNodes={allShopifyCollectionNodes}
        handleClickOnOpen={jest.fn()}
        handleClickOnClose={jest.fn()}
      />
    );
    expect(screen.queryAllByRole("link")).toHaveLength(6);
    screen.getByRole("link", { name: "Test Collection Title" });
    screen.getByRole("link", { name: "about me" });
    screen.getByRole("link", { name: "contact" });
    screen.getByLabelText("facebook");
    screen.getByLabelText("whatsApp");
    screen.getByLabelText("instagram");
  });

  it("renders empty mobile version correctly ", async () => {
    render(
      <ResponsiveMenu
        isDektop={false}
        isOpen={true}
        allShopifyCollectionNodes={[]}
        handleClickOnOpen={jest.fn()}
        handleClickOnClose={jest.fn()}
      />
    );
    expect(screen.queryAllByRole("link")).toHaveLength(5);
    screen.getByRole("link", { name: "about me" });
    screen.getByRole("link", { name: "contact" });
    screen.getByLabelText("facebook");
    screen.getByLabelText("whatsApp");
    screen.getByLabelText("instagram");
  });
});

describe("ResponsiveMenu", () => {
  it("renders desktop version correctly ", async () => {
    const allShopifyCollectionNodes = [
      {
        id: "4179b182-b572-5609-a8a2-05083671479a",
        title: "Test Collection Title",
        handle: "test-collection-title",
      },
    ];
    render(
      <ResponsiveMenu
        isDektop={true}
        isOpen={false}
        allShopifyCollectionNodes={allShopifyCollectionNodes}
        handleClickOnOpen={jest.fn()}
        handleClickOnClose={jest.fn()}
      />
    );
    expect(screen.queryAllByRole("link")).toHaveLength(1);
    screen.getByRole("link", { name: "Test Collection Title" });
  });

  it("renders no menu for no categories in desktop view", async () => {
    render(
      <ResponsiveMenu
        isDektop={true}
        isOpen={false}
        allShopifyCollectionNodes={[]}
        handleClickOnOpen={jest.fn()}
        handleClickOnClose={jest.fn()}
      />
    );
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });
});
