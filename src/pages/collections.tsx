import React from "react";
import SEO from "../components/SEO";
import {
  Container,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { TileGridGallery } from "../components/TileGridGallery";
import { useCollectionToSlider } from "../hooks/useCollectionToSlider";

const collectionsPage: React.FunctionComponent = (): React.ReactElement => {
  const collectionsTiles = useCollectionToSlider();

  return (
    <Container as="section" maxW={"1200px"} padding={"4rem 0.5rem"}>
      <Breadcrumb mb="2.4rem" fontSize={["sm", "md"]}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">All Categories</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <TileGridGallery title="All Categories" tiles={collectionsTiles} />
    </Container>
  );
};

export default collectionsPage;

export const Head = (props: any) => {
  const canonical = `https://www.brushella.art${props.location.pathname}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.brushella.art/" },
      { "@type": "ListItem", position: 2, name: "All Categories", item: canonical },
    ],
  };

  return (
    <SEO
      pageTitle="All Art Collections — Paintings & Prints"
      siteTitle="Brushella"
      description="Explore all Brushella art collections — original paintings, fine art prints and home décor. Find the perfect piece to transform your space."
      canonical={canonical}
    >
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
    </SEO>
  );
};
