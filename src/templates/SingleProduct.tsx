import React from "react";
import { Box } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import SEO from "../components/SEO";
import { PageProps } from "gatsby";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

type SingleProductProps = {
  location: PageProps["location"];
  pageContext: {
    product: Queries.CollectionsAndProductsIntoPagesQuery["allShopifyCollection"]["nodes"][0]["products"][0];
  };
};

const SingleProduct: React.FunctionComponent<SingleProductProps> = ({
  location,
  pageContext: { product },
}): React.ReactElement => {
  const pathnameArray = location.pathname.split("/");
  const categoryName = pathnameArray[2];

  return (
    <Box>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href={`/collections/${categoryName}`}>
            All {categoryName}
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">{product.title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <ProductCard product={product} />
    </Box>
  );
};
export default SingleProduct;

export const Head = ({ location }: PageProps): React.ReactElement => (
  <SEO>
    <title id="single-title">{`Welcome to Brushella - All things ART! ${location.pathname}`}</title>
    <meta
      id="single-product-page"
      name="Brushella Product"
      content="All things ART! Murals, Canvas painting, Crafts, Face and Bodypainting"
    />
  </SEO>
);
