import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CollectionHero from "../CollectionHero";

const mockedImageURL =
  "https://cdn.fake-image-for-brushella.art/fake-collection-image.jpg";

const mockedGatsbyImageData = {
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
  height: 500,
};

describe("CollectionHero", () => {
  it("renders title with 'Collection' suffix, description, image, and AR note with inline icon", () => {
    const { container } = render(
      <CollectionHero
        title="Human Nature"
        description="A collection inspired by the human condition."
        image={{
          altText: "Hero image alt",
          gatsbyImageData: mockedGatsbyImageData,
          originalSrc: mockedImageURL,
        }}
      />
    );

    expect(
      screen.getByRole("heading", { name: "Human Nature Collection" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("A collection inspired by the human condition.")
    ).toBeInTheDocument();
    expect(screen.getByAltText("Hero image alt")).toBeInTheDocument();
    expect(
      screen.getByText(/look for this AR icon/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/using your phone/i)
    ).toBeInTheDocument();

    // Inline AR icon is rendered as an svg within the note paragraph
    const note = screen.getByText(/look for this AR icon/i).closest("p");
    expect(note?.querySelector("svg")).toBeInTheDocument();

    // No stray duplicate <svg> outside the note (icon is decorative, aria-hidden)
    const allSvgs = container.querySelectorAll("svg");
    expect(allSvgs.length).toBeGreaterThan(0);
  });

  it("falls back to title-based alt when image altText is missing", () => {
    render(
      <CollectionHero
        title="Bloom"
        image={{
          altText: null,
          gatsbyImageData: mockedGatsbyImageData,
          originalSrc: mockedImageURL,
        }}
      />
    );

    expect(screen.getByAltText("Bloom collection")).toBeInTheDocument();
  });

  it("renders a placeholder when no image is provided", () => {
    render(<CollectionHero title="Bloom" />);

    expect(
      screen.getByRole("img", { name: "Bloom collection" })
    ).toBeInTheDocument();
  });

  it("does not render description when none is provided", () => {
    render(
      <CollectionHero
        title="Bloom"
        image={{
          altText: "alt",
          gatsbyImageData: mockedGatsbyImageData,
          originalSrc: mockedImageURL,
        }}
      />
    );

    expect(screen.queryByText(/inspired by/i)).not.toBeInTheDocument();
  });
});
