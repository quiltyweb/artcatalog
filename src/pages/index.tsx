import React from "react";
import HeroSection from "../components/HeroSection";
import SEO from "../components/SEO";
import { HomePageSlider } from "../components/HomePageSlider";
import { TileGridGallery } from "../components/TileGridGallery";
import { useCollectionToSlider } from "../hooks/useCollectionToSlider";
import { useMetaobjectToHeroSlider } from "../hooks/useMetaobjectToHeroSlider";

const IndexPage: React.FunctionComponent = (): React.ReactElement => {
  const heroSliderImages = useMetaobjectToHeroSlider();
  const collectionsTiles = useCollectionToSlider();

  return (
    <>
      {heroSliderImages && <HomePageSlider images={heroSliderImages} />}
      <HeroSection />
      <TileGridGallery tiles={collectionsTiles} />
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
