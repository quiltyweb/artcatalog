import React from "react";
import TileList from "../components/TileList";
import HeroSection from "../components/HeroSection";
import SEO from "../components/SEO";
import { HomePageSlider } from "../components/HomePageSlider";
import { useLayoutData } from "../context/LayoutContext";
import { TileGridGallery } from "../components/TileGridGallery";

type FlattenedImage = {
  image: string;
  reference: {
    image: {
      url: string;
    };
  };
  alt_text: string;
  link: {
    text: string;
    url: string;
  };
  title: string;
  caption: string;
  category: string;
};

// TODO: get tiles from global layout data (cms dinamic)
const tiles = [
  {
    id: "mini-slider-tile-1",
    title: "Original Paintings",
    handle: "original-paintings",
    images: [
      {
        src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/asset-homepage-gabby-ugalde-a-moment-without-thoughts-human-nature-collection.jpg?v=1755134217",
        alt: "'A moment without thoughts' by Brushella from the Human Nature Collection.",
        href: "/collections/original-paintings/a-moment-without-thoughts-original-acrylic-painting",
      },
      {
        src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/asset-homepage-gabby-ugalde-prana-human-nature-collection.jpg?v=1755134152",
        alt: "'Prana' by Brushella from the Human Nature Collection.",
        href: "/collections/original-paintings/prana-original-acrylic-painting",
      },
      {
        src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/asset-homepage-gabby-ugalde-after-grief-human-nature-collection.jpg?v=1755134182",
        alt: "'After Grief' by Brushella from the Human Nature Collection.",
        href: "/collections/original-paintings/after-grief",
      },
      {
        src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/asset-homepage-gabby-ugalde-nirvana-gardens.jpg?v=1755134089",
        alt: "'Nirvana Gardens' by Brushella.",
        href: "/collections/original-paintings/nirvana-gardens-original-acrylic-painting",
      },
    ],
  },
  {
    id: "mini-slider-tile-2",
    title: "Prints",
    handle: "prints",
    images: [
      {
        src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/asset-homepage-gabby-ugalde-prana-human-nature-collection.jpg?v=1757292553",
        alt: "'Prana' print by Brushella from the Human Nature Collection.",
        href: "/collections/prints/prana-print",
      },
    ],
  },
];

const IndexPage: React.FunctionComponent = (): React.ReactElement => {
  const nodes = useLayoutData()?.storefrontshopify.metaobjects.nodes;
  // TODO: make this helper, and change order of images based on admin setting (add order field in metafield)
  const mainSliderImages = nodes?.map((currentItem, currentIndex, arr) => {
    const flattenedFields = currentItem.fields.reduce(
      (acc, field, index, arr) => {
        if (field.key === "image" && field.reference !== null) {
          acc[field.key] = field.value;
          acc["reference"] = field.reference;
          return acc;
        }
        if (field.key === "link") {
          acc["link"] = JSON.parse(field.value || "#");
          return acc;
        }
        acc[field.key] = field.value;
        return acc;
      },
      {} as Record<string, any>
    );
    return { ...flattenedFields } as FlattenedImage;
  });

  return (
    <>
      {mainSliderImages && <HomePageSlider images={mainSliderImages} />}
      <HeroSection />
      <TileGridGallery tiles={tiles} />
    </>
  );
};

export default IndexPage;

export const Head = (props: any) => {
  return (
    <SEO
      pageTitle="Home Page"
      siteTitle="Brushella"
      description="Home Page for Brushella Store"
    />
  );
};
