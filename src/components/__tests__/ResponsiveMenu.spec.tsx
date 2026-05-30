import React from "react";
import { render, screen, within } from "@testing-library/react";
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

  it("hamburger button has stable id for CSS targeting during animation", () => {
    render(
      <ResponsiveMenu
        isOpen={false}
        allShopifyCollectionNodes={[]}
        handleClickOnOpen={jest.fn()}
        handleClickOnClose={jest.fn()}
      />
    );
    expect(document.getElementById("mobile-menu-btn")).toBeInTheDocument();
  });

  it("hides special collections (bloom, human-nature) from the desktop menu but keeps them in the mobile drawer", () => {
    const allShopifyCollectionNodes = [
      {
        id: "id-prints",
        title: "Prints",
        handle: "prints",
      },
      {
        id: "id-original-paintings",
        title: "Original Paintings",
        handle: "original-paintings",
      },
      {
        id: "id-bloom",
        title: "Bloom",
        handle: "bloom",
      },
      {
        id: "id-human-nature",
        title: "Human Nature",
        handle: "human-nature",
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

    const desktopList = document.getElementById("desktop-list") as HTMLElement;
    const mobileDrawer = document.getElementById(
      "mobile-drawer-body"
    ) as HTMLElement;

    expect(desktopList).toBeInTheDocument();
    expect(mobileDrawer).toBeInTheDocument();

    const desktopHrefs = Array.from(
      desktopList.querySelectorAll("a")
    ).map((a) => a.getAttribute("href"));
    expect(desktopHrefs).toEqual(
      expect.arrayContaining([
        "/collections/prints",
        "/collections/original-paintings",
      ])
    );
    expect(desktopHrefs).not.toContain("/collections/bloom");
    expect(desktopHrefs).not.toContain("/collections/human-nature");

    within(mobileDrawer).getByRole("link", { name: "Prints" });
    within(mobileDrawer).getByRole("link", { name: "Original Paintings" });
    within(mobileDrawer).getByRole("link", { name: "Bloom" });
    within(mobileDrawer).getByRole("link", { name: "Human Nature" });
  });

  it("drawer body has stable id for CSS targeting during animation", () => {
    render(
      <ResponsiveMenu
        isOpen={true}
        allShopifyCollectionNodes={[]}
        handleClickOnOpen={jest.fn()}
        handleClickOnClose={jest.fn()}
      />
    );
    expect(document.getElementById("mobile-drawer-body")).toBeInTheDocument();
  });
});
