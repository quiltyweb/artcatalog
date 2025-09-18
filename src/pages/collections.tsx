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
  return (
    <SEO
      pageTitle="Categories Page"
      siteTitle="Brushella"
      description="All categories for Brushella Store"
    />
  );
};
