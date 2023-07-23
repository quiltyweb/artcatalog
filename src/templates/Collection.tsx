import React from "react";
import { Link } from "gatsby";
import { Box, Heading, Text } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";

const CollectionTemplate = ({ pageContext }): React.ReactElement => {
  const { collection } = pageContext;
  return (
    <>
      <Box id="brushella-single-collection-container">
        <Link to="/collections">Back to Collections List</Link>
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
    </>
  );
};
export default CollectionTemplate;
