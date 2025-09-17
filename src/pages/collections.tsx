import React from "react";
import SEO from "../components/SEO";
import {
  Container,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { TileGridGallery } from "../components/TileGridGallery";

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
const collectionsPage: React.FunctionComponent = (): React.ReactElement => {
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
      <TileGridGallery title="All Categories" tiles={tiles} />
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
