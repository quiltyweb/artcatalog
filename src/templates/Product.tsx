import React from "react";
import { Link } from "gatsby";
import { Box } from "@chakra-ui/react";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";

const ProductTemplate = ({ pageContext }) => {
  const { product } = pageContext;
  return (
    <Layout helmetPageTitle={product.title}>
      <Box id="brushella-single-product-container">
        <Link to="/products">Back to Product List</Link>
        <ProductCard product={product} isFullWidth />
      </Box>
    </Layout>
  );
};
export default ProductTemplate;
