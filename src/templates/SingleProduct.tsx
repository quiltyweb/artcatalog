import React from "react";
import { Box } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";

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
    <Box id="brushella-single-product-container">
      <ProductCard product={product} collectionHandle={collectionHandle} />
    </Box>
  );
};
export default SingleProduct;
