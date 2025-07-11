import React from "react";
import TileList from "../components/TileList";
import HeroSection from "../components/HeroSection";
import SEO from "../components/SEO";
import { HomePageSlider } from "../components/HomePageSlider";

const IndexPage: React.FunctionComponent = (): React.ReactElement => {
  const images: string[] = [
    "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/asset-homepage-gabby-ugalde-animal-heart-human-nature-collection.jpg?v=1751518520",
    "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/asset-homepage-gabby-ugalde-brain-human-nature-collection.jpg?v=1751518519",
    "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/asset-homepage-gabby-ugalde-lungs-human-nature-collection.jpg?v=1751518520",
    "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/print_1_A3.jpg?v=1751945325",
    "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/Print_3_A3.jpg?v=1751945403",
    "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/Print_2_A3.jpg?v=1751945403",
  ];
  return (
    <>
      <HomePageSlider images={images} />
      <HeroSection />
      <TileList />
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
