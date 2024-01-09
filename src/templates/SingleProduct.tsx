import React from "react";
import { Box } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import SEO from "../components/SEO";
import { PageProps } from "gatsby";

type SingleProductProps = {
  pageContext: {
    collectionHandle: string;
    product: Queries.CollectionsAndProductsIntoPagesQuery["allShopifyCollection"]["nodes"][0]["products"][0];
  };
};

const SingleProduct: React.FunctionComponent<SingleProductProps> = ({
  pageContext: { product, collectionHandle },
}): React.ReactElement => {
  return (
    <Box>
      <ProductCard product={product} collectionHandle={collectionHandle} />
    </Box>
  );
};
export default SingleProduct;

export const Head = ({ location }: PageProps): React.ReactElement => (
  <SEO>
    <title id="title">{`Welcome to Brushella - All things ART! ${location.pathname}`}</title>
    <meta
      id="single-product-page"
      name="Brushella Product"
      content="All things ART! Murals, Canvas painting, Crafts, Face and Bodypainting"
    />
  </SEO>
);
