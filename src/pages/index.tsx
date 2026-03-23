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
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Brushella",
    url: "https://www.brushella.art",
    description:
      "Original paintings, art prints and home decor by Gabriela, the artist behind Brushella",
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Brushella",
    url: "https://www.brushella.art",
    logo: "https://www.brushella.art/brushella-icon.svg",
    sameAs: [
      "https://www.facebook.com/Brushella",
      "https://www.instagram.com/brushella_brushmaster/",
    ],
  };

  return (
    <SEO
      pageTitle="Original Paintings & Fine Art Prints"
      siteTitle="Brushella"
      description="Shop original paintings, fine art prints and home décor by Gabriela — the artist behind Brushella. Unique handcrafted artworks for every space."
      canonical={`https://www.brushella.art${props.location.pathname}`}
    >
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
    </SEO>
  );
};
