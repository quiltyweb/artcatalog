import React from 'react';
import { Link } from 'gatsby';
import { Box, Heading, Text } from '@chakra-ui/react';
import { GatsbyImage } from 'gatsby-plugin-image';
import Layout from '../components/layout';

const ProductTemplate = ({ pageContext }) => {
  const { product } = pageContext;
  return (
    <Layout helmetPageTitle={product.title}>
      <Box id="brushella-single-product-container">
        <Link to="/products">Back to Product List</Link>
        <Heading as="h2">{product.title}</Heading>
        <Text>{product.description}</Text>
        <Text>{`$ ${product.priceRangeV2.maxVariantPrice.amount} (${product.priceRangeV2.maxVariantPrice.currencyCode})`}</Text>
        <GatsbyImage image={product.featuredImage.gatsbyImageData} alt={product.featuredImage.altText} />
      </Box>
    </Layout>
  );
};
export default ProductTemplate;
