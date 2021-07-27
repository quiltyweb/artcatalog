import React from 'react';
import { Heading, Text } from '@chakra-ui/react';
import { GatsbyImage } from 'gatsby-plugin-image';
import Layout from '../components/layout';

const ProductTemplate = ({ pageContext }) => {
  const { product } = pageContext;
  return (
    <Layout helmetPageTitle={product.title}>
      <Heading as="h2">{product.title}</Heading>
      <Text>{product.description}</Text>
      <Text>{`${product.priceRangeV2.maxVariantPrice.amount} (${product.priceRangeV2.maxVariantPrice.currencyCode})`}</Text>
      <GatsbyImage image={product.featuredImage.gatsbyImageData} alt={product.featuredImage.altText} />
    </Layout>
  );
};
export default ProductTemplate;
