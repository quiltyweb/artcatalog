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

const IndexPage: React.FunctionComponent = (): React.ReactElement => {
  const nodes = useLayoutData()?.storefrontshopify.metaobjects.nodes;
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
      <TileGridGallery />
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
