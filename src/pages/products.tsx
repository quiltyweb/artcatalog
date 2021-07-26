import * as React from 'react';
import { Link, graphql } from 'gatsby';
import { Heading, Text } from '@chakra-ui/react';
import { GatsbyImage } from 'gatsby-plugin-image';
import Layout from '../components/layout';

const ProductsPage: React.FunctionComponent<any> = ({ data }): React.ReactElement => (
  <Layout pageTitle="Products">
    {data.allShopifyCollection.edges.length !== 0 ? (
      <>
        <Heading as="h2">Brushella Collections</Heading>
        <ul>
          <li key="all-products-item">
            <Link to="/products/">All products</Link>
          </li>
          {data.allShopifyCollection.edges.map(({ node }) => (
            <li key={`${node.id}-collection-item`}>
              <Link to={`/collection/${node.handle}`}>{node.title}</Link>
            </li>
          ))}
        </ul>
      </>
    ) : (
      <Text>There are no collections available</Text>
    )}
    <hr />
    {data.allShopifyProduct.edges.length !== 0 ? (
      <>
        <Heading as="h2">All Products</Heading>
        <ul>
          {data.allShopifyProduct.edges.map(({ node }) => (
            <li key={node.id}>
              <Heading as="h3">
                <Link to={`/products/${node.handle}`}>{node.title}</Link>
              </Heading>
              <Text>{node.description}</Text>
              <Text>{`${node.priceRangeV2.maxVariantPrice.amount} (${node.priceRangeV2.maxVariantPrice.currencyCode})`}</Text>
              <GatsbyImage image={node.featuredImage.gatsbyImageData} alt={node.featuredImage.altText} />
            </li>
          ))}
        </ul>
      </>
    ) : (
      <Text>There are no products available</Text>
    )}
  </Layout>
);

export default ProductsPage;

export const query = graphql`
  {
    allShopifyProduct(sort: { fields: [publishedAt], order: ASC }) {
      edges {
        node {
          id
          handle
          title
          storefrontId
          description
          priceRangeV2 {
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            id
            altText
            gatsbyImageData(width: 910, height: 910)
          }
        }
      }
    }
    allShopifyCollection {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }
`;
