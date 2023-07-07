import React from "react";
import { Link } from "gatsby";
import { Box } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";

const ProductTemplate = ({ pageContext }) => {
  const { product } = pageContext;
  return (
    <>
      <Box id="brushella-single-product-container">
        <Link to="/products">Back to Product List</Link>
        <ProductCard product={product} isFullWidth />
      </Box>
    </>
  );
};
export default ProductTemplate;
