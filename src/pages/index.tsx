import React from "react";
import TileList from "../components/TileList";
import HeroSection from "../components/HeroSection";
import SEO from "../components/SEO";
import HomePageSlider from "../components/HomePageSlider";

const IndexPage: React.FunctionComponent = (): React.ReactElement => {
  return (
    <>
      <HomePageSlider />
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
