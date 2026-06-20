import React from "react";
import { Container } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import SEO from "../components/SEO";
import { PageProps } from "gatsby";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

type SingleProductProps = {
  location: PageProps["location"];
  pageContext: {
    title: string;
    id: string;
    collectionHandle: string;
    product: Queries.CollectionsAndProductsIntoPagesQuery["allShopifyCollection"]["nodes"][0]["products"][0];
    printVersion: Queries.CollectionsAndProductsIntoPagesQuery["allShopifyProduct"]["nodes"][0];
  };
};

const SingleProduct: React.FunctionComponent<SingleProductProps> = ({
  location,
  pageContext: { product, printVersion, collectionHandle },
}): React.ReactElement => {
  const BreadcrumbLinkTitle = collectionHandle.split("-").join(" ");
  return (
    <Container as="section" maxW={"1200px"} padding={"4rem 0.5rem"} paddingTop={["2rem", "4rem"]}>
      <Breadcrumb mb="2.4rem" fontSize={["xs", "md"]}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/collections">Categories</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/collections/${collectionHandle}`}>
            {BreadcrumbLinkTitle}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage overflow="hidden">
          <BreadcrumbLink
            href="#"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            display="block"
            maxW={["120px", "none"]}
          >
            {product.title}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <ProductCard product={product} printVersion={printVersion} />
    </Container>
  );
};
export default SingleProduct;

export const Head = (props: any) => {
  const { product, collectionHandle } = props.pageContext;
  const canonical = `https://www.brushella.art${props.location.pathname}`;
  const isAvailable = product.variants.some((v: any) => v.availableForSale);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.brushella.art/" },
      { "@type": "ListItem", position: 2, name: "Categories", item: "https://www.brushella.art/collections/" },
      { "@type": "ListItem", position: 3, name: `All ${collectionHandle.split("-").join(" ")} products`, item: `https://www.brushella.art/collections/${collectionHandle}/` },
      { "@type": "ListItem", position: 4, name: product.title, item: canonical },
    ],
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.featuredImage?.originalSrc,
    url: `https://www.brushella.art/collections/${collectionHandle}/${product.handle}`,
    brand: {
      "@type": "Brand",
      name: "Brushella",
    },
    copyrightHolder: {
      "@type": "Person",
      name: "Gabriela Ugalde",
    },
    copyrightNotice: "© Brushella (Gabriela Ugalde). All rights reserved.",
    acquireLicensePage: "https://www.brushella.art/contact",
    creditText: "Artwork by Brushella (Gabriela Ugalde)",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: product.priceRangeV2.minVariantPrice.currencyCode,
      lowPrice: product.priceRangeV2.minVariantPrice.amount,
      highPrice: product.priceRangeV2.maxVariantPrice.amount,
      offerCount: product.variants.length,
      availability: isAvailable
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <SEO
      pageTitle={`${product.title} — Original Art for Sale`}
      description={product.description}
      image={product.featuredImage?.originalSrc || undefined}
      canonical={canonical}
    >
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </SEO>
  );
};
