import * as React from 'react';
import { Link, graphql } from 'gatsby';
import { Heading, Text } from '@chakra-ui/react';
import Layout from '../components/layout';

const ProductsPage: React.FunctionComponent<any> = ({ data }): React.ReactElement => (
  <Layout pageTitle="Products">
    <Heading>Our Art Catalog</Heading>
    <ul>
      {data.allShopifyProduct.nodes.map((node) => (
        <li key={node.id}>
          <Heading as="h3">
            <Link to={`/products/${node.handle}`}>{node.title}</Link>
            {' - '}${node.priceRangeV2.minVariantPrice.amount}
            {' - '}${node.priceRangeV2.maxVariantPrice.amount}
          </Heading>
          <Text>{node.description}</Text>
          <img src={node.featuredImage.transformedSrc} alt={node.featuredImage.altText} />
        </li>
      ))}
    </ul>
  </Layout>
);

export default ProductsPage;

export const query = graphql`
  {
    allShopifyProduct {
      nodes {
        id
        title
        featuredImage {
          transformedSrc
          altText
        }
        description
        priceRangeV2 {
          minVariantPrice {
            amount
          }
          maxVariantPrice {
            amount
          }
        }
      }
    }
  }
`;
