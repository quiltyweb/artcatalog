import * as React from 'react';
import { Link, graphql } from 'gatsby';
import { Heading, Text } from '@chakra-ui/react';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';

const ProductsPage: React.FunctionComponent<any> = ({ data }): React.ReactElement => (
  <Layout>
    {data.allShopifyCollection.edges.length !== 0 ? (
      <>
        <Heading as="h2">Brushella Collections</Heading>
        <ul id="brushella-all-collections-list">
          {data.allShopifyCollection.edges.map(({ node }) => (
            <li key={`${node.id}-collection-item`}>
              <Link to={`/collections/${node.handle}`}>{node.title}</Link>
            </li>
          ))}
          <li key="brushella-all-products-item">
            <Link to="/products/">All products</Link>
          </li>
        </ul>
      </>
    ) : (
      <Text>There are no collections available</Text>
    )}
    <hr />
    {data.allShopifyProduct.edges.length !== 0 ? (
      <>
        <Heading as="h2">All Products</Heading>
        <ul id="brushella-all-products-list">
          {data.allShopifyProduct.edges.map(({ node }) => (
            <li key={node.id}>
              <ProductCard product={node} isFullWidth={false} />
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

export const Head = ({ location }) => (
  <SEO>
    <title id="title">Gallery - Brushella</title>
    <meta id="description" name="description" content="Gallery of Art" />
    <meta id="twitter-og" name="twitter:url" content={`https://www.brushella.com.au/${location.pathname}`}/>
  </SEO>
);
  

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
