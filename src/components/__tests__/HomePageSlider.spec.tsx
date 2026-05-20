import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { HomePageSlider } from "../HomePageSlider";

jest.mock("swiper/react", () => ({
  Swiper: ({ children }: any) => <div data-testid="swiper">{children}</div>,
  SwiperSlide: ({ children }: any) => (
    <div data-testid="swiper-slide-testing">{children}</div>
  ),
}));
jest.mock("swiper/modules", () => ({
  Pagination: () => null,
  Navigation: () => null,
}));

const MOCKED_IMAGES_PROPS = [
  {
    alt_text: "testing 1",
    caption: '"After Grief" from the Human Nature collection.',
    category: "original-paintings",
    image: "gid://fake/MediaImage/34402911879376",
    reference: {
      image: {
        url: "https://fake.images.fake/s/files/1/0586/9892/4240/files/asset-homepage-gabby-ugalde-animal-heart-human-nature-collection.jpg?v=1751518520",
      },
    },
    link: {
      text: " Human Nature collection.",
      url: "https://www.brushella.art/",
    },
    collection: {
      handle: "human-nature",
      title: "Human Nature",
    },
    title: "After Grief human nature collection",
  },
  {
    alt_text: "testing 2",
    caption: '"A moment without thoughts" from the Human Nature collection.',
    category: "original-paintings",
    image: "gid://fake/MediaImage/34402911813840",
    reference: {
      image: {
        url: "https://fake.images.fake/s/files/1/0586/9892/4240/files/asset-homepage-gabby-ugalde-brain-human-nature-collection.jpg?v=1751518519",
      },
    },
    link: {
      text: " Human Nature collection",
      url: "https://www.brushella.art/",
    },
    collection: {
      handle: "human-nature",
      title: "Human Nature",
    },
    title: "A moment without thoughts human nature collection",
  },
  {
    alt_text: "testing 3",
    caption: '"Prana" from the Human Nature collection.',
    category: "original-paintings",
    image: "gid://fake/MediaImage/34402911846608",
    reference: {
      image: {
        url: "https://fake.images.fake/s/files/1/0586/9892/4240/files/asset-homepage-gabby-ugalde-lungs-human-nature-collection.jpg?v=1751518520",
      },
    },
    link: {
      text: " Human Nature collection.",
      url: "https://www.brushella.art/",
    },
    collection: {
      handle: "human-nature",
      title: "Human Nature",
    },
    title: "Prana human nature collection",
  },
  {
    alt_text: "testing 4",
    caption: "Leopard, Brushella.",
    category: "prints",
    image: "gid://fake/MediaImage/34432899055824",
    reference: {
      image: {
        url: "https://fake.images.fake/s/files/1/0586/9892/4240/files/Print_2_A3.jpg?v=1751945403",
      },
    },
    link: {
      text: "Jungle collection.",
      url: "https://www.brushella.art/",
    },
    collection: {
      handle: "bloom",
      title: "Bloom",
    },
    title: "Leopard",
  },
  {
    alt_text: "testing 5",
    caption: "Tucan, Brushella.",
    category: "prints",
    image: "gid://fake/MediaImage/34432899023056",
    reference: {
      image: {
        url: "https://fake.images.fake/s/files/1/0586/9892/4240/files/Print_3_A3.jpg?v=1751945403",
      },
    },
    link: {
      text: "Jungle collection",
      url: "https://www.brushella.art/",
    },
    collection: {
      handle: "bloom",
      title: "Bloom",
    },
    title: "Tucan",
  },
  {
    alt_text: "testing 6",
    caption: "Parrot, Brushella.",
    category: "prints",
    image: "gid://fake/MediaImage/34432890437840",
    reference: {
      image: {
        url: "https://fake.images.fake/s/files/1/0586/9892/4240/files/print_1_A3.jpg?v=1751945325",
      },
    },
    link: {
      text: "Jungle collection",
      url: "https://www.brushella.art/",
    },
    collection: {
      handle: "bloom",
      title: "Bloom",
    },
    title: "Parrot",
  },
  {
    alt_text: "testing 7",
    caption: "No link caption.",
    category: "prints",
    image: "gid://fake/MediaImage/34432890437841",
    reference: {
      image: {
        url: "https://fake.images.fake/s/files/1/0586/9892/4240/files/no_link.jpg?v=1751945326",
      },
    },
    title: "No link",
  },
];

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("HomePageSlider", () => {
  it("renders Swiper with correct number of slides", () => {
    jest.useFakeTimers();
    render(
      <HomePageSlider images={MOCKED_IMAGES_PROPS} initialLoading={false} />
    );

    const imgs = screen.getAllByRole("img");
    imgs.forEach((img) => fireEvent.load(img));

    // Pass the loader's minimum-display window AND the logo-intro timer (2500ms)
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(imgs).toHaveLength(MOCKED_IMAGES_PROPS.length);
    expect(
      screen.queryByText("Featured work slider is loading")
    ).not.toBeInTheDocument();
    jest.useRealTimers();
  });

  it("renders Swiper loading state", async () => {
    render(
      <HomePageSlider images={MOCKED_IMAGES_PROPS} initialLoading={true} />
    );
    // Loader is visible initially
    expect(
      screen.getByText("Featured work slider is loading")
    ).toBeInTheDocument();
  });

  it("renders all images with alt text", () => {
    render(
      <HomePageSlider images={MOCKED_IMAGES_PROPS} initialLoading={false} />
    );

    MOCKED_IMAGES_PROPS.forEach((_, index) => {
      expect(screen.queryByAltText(`testing ${index + 1}`)).toBeInTheDocument();
    });
  });

  it("renders each caption as a link to its referenced collection page", () => {
    render(
      <HomePageSlider images={MOCKED_IMAGES_PROPS} initialLoading={false} />
    );

    MOCKED_IMAGES_PROPS.filter((item) => item.collection).forEach((item) => {
      expect(
        screen.getByRole("link", { name: item.caption })
      ).toBeInTheDocument();
      expect(screen.getByRole("link", { name: item.caption })).toHaveAttribute(
        "href",
        `/collections/${item.collection!.handle}`
      );
    });
  });

  it("falls back to link.url when no collection reference is set", () => {
    const imagesWithoutCollection = MOCKED_IMAGES_PROPS.map((item) => {
      const next = { ...item };
      delete (next as { collection?: unknown }).collection;
      return next;
    });
    render(
      <HomePageSlider
        images={imagesWithoutCollection}
        initialLoading={false}
      />
    );

    imagesWithoutCollection
      .filter((item) => item.link)
      .forEach((item) => {
        expect(
          screen.getByRole("link", { name: item.caption })
        ).toHaveAttribute("href", item.link!.url);
      });
  });

  it("renders caption as plain text when an image has no link", () => {
    render(
      <HomePageSlider images={MOCKED_IMAGES_PROPS} initialLoading={false} />
    );

    const noLinkItem = MOCKED_IMAGES_PROPS.find((item) => !item.link);
    expect(noLinkItem).toBeDefined();
    expect(screen.getByText(noLinkItem!.caption)).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: noLinkItem!.caption })
    ).not.toBeInTheDocument();
  });

  it("renders an aria-hidden image overlay link for each slide that has a collection or link", () => {
    const { container } = render(
      <HomePageSlider images={MOCKED_IMAGES_PROPS} initialLoading={false} />
    );
    const overlays = container.querySelectorAll('a[aria-hidden="true"]');
    const linkedItems = MOCKED_IMAGES_PROPS.filter(
      (item) => item.collection?.handle || item.link?.url
    );
    expect(overlays).toHaveLength(linkedItems.length);
  });

  it("image overlay links point to the correct href and are not keyboard-focusable", () => {
    const { container } = render(
      <HomePageSlider images={MOCKED_IMAGES_PROPS} initialLoading={false} />
    );
    const overlays = container.querySelectorAll('a[aria-hidden="true"]');
    const linkedItems = MOCKED_IMAGES_PROPS.filter(
      (item) => item.collection?.handle || item.link?.url
    );
    overlays.forEach((overlay, idx) => {
      const item = linkedItems[idx];
      const expectedHref = item.collection?.handle
        ? `/collections/${item.collection.handle}`
        : item.link!.url;
      expect(overlay).toHaveAttribute("href", expectedHref);
      expect(overlay).toHaveAttribute("tabindex", "-1");
    });
  });

  it("does not render an image overlay link for slides without a link or collection", () => {
    const noLinkImages = MOCKED_IMAGES_PROPS.filter(
      (item) => !item.collection?.handle && !item.link?.url
    );
    expect(noLinkImages.length).toBeGreaterThan(0);
    const { container } = render(
      <HomePageSlider images={noLinkImages} initialLoading={false} />
    );
    expect(container.querySelectorAll('a[aria-hidden="true"]')).toHaveLength(0);
  });
});
