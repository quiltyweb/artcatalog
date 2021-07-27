import React from 'react';
import { Link } from 'gatsby';
import { Box, Heading, Text } from '@chakra-ui/react';
import Layout from '../components/layout';

const CollectionTemplate = ({ pageContext }) => {
  const { collection } = pageContext;
  return (
    <Layout helmetPageTitle={collection.title}>
      <Box id="brushella-single-collection-container">
        <Link to="/products">Back to Product List</Link>
        <Heading as="h2">{collection.title}</Heading>
        <Text>{collection.description}</Text>
        <ul>
          <li>collection page is work in progress</li>
        </ul>
      </Box>
    </Layout>
  );
};
export default CollectionTemplate;
