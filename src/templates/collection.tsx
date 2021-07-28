import React from 'react';
import { Link } from 'gatsby';
import { Box, Heading, Text } from '@chakra-ui/react';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';

const CollectionTemplate = ({ pageContext }) => {
  const { collection } = pageContext;
  return (
    <Layout helmetPageTitle={collection.title}>
      <Box id="brushella-single-collection-container">
        <Link to="/products">Back to Product List</Link>
        <Heading as="h2">{collection.title}</Heading>
        <Text>{collection.description}</Text>
        <hr />
        {collection.products.length !== 0 ? (
          <ul id="brushella-all-products-in-collection-list">
            {collection.products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        ) : (
          <Text>There are no products available in this collection</Text>
        )}
      </Box>
    </Layout>
  );
};
export default CollectionTemplate;
