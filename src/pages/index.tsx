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

  const storeSchema = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Brushella Art Store",
    url: "https://www.brushella.art",
    logo: "https://www.brushella.art/brushella-icon.svg",
    image:
      "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/web-asset-author.jpg?v=1729679585",
    description:
      "Online art store featuring original paintings, fine art prints and home décor by Australian artist Gabriela.",
    priceRange: "$$",
    currenciesAccepted: "AUD",
    paymentAccepted: "Credit Card, Shop Pay",
    founder: {
      "@type": "Person",
      name: "Gabriela Ugalde",
      jobTitle: "Artist",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Art & Home Decor",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Original Paintings",
          itemListElement: {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Original Acrylic Paintings",
            },
          },
        },
        {
          "@type": "OfferCatalog",
          name: "Prints",
          itemListElement: {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Fine Art Prints",
            },
          },
        },
      ],
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.brushella.art",
      },
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
      <script type="application/ld+json">
        {JSON.stringify(storeSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </SEO>
  );
};
