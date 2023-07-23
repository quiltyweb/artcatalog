import * as React from "react";
import { Link, graphql, PageProps } from "gatsby";
import { Heading, Text } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import SEO from "../components/SEO";

const ProductsPage: React.FunctionComponent<
  PageProps<Queries.ProductsPageQuery>
> = ({
  data: { allShopifyCollection, allShopifyProduct },
}): React.ReactElement => (
  <>
    {allShopifyCollection.edges.length !== 0 ? (
      <>
        <Heading as="h2">Brushella Collections</Heading>
        <ul id="brushella-all-collections-list">
          {allShopifyCollection.edges.map(({ node }) => (
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
    {allShopifyProduct.edges.length !== 0 ? (
      <>
        <Heading as="h2">All Products</Heading>
        <ul id="brushella-all-products-list">
          {allShopifyProduct.edges.map(({ node }) => (
            <li key={node.id}>
              <ProductCard product={node} isFullWidth={false} />
            </li>
          ))}
        </ul>
      </>
    ) : (
      <Text>There are no products available</Text>
    )}
  </>
);

export default ProductsPage;

export const Head = ({ location }: PageProps): React.ReactElement => (
  <SEO>
    <title id="title">Gallery - Brushella</title>
    <meta id="description" name="description" content="Gallery of Art" />
    <meta
      id="twitter-og"
      name="twitter:url"
      content={`https://www.www.brushella.art/${location.pathname}`}
    />
  </SEO>
);

export const query = graphql`
  query ProductsPage {
    allShopifyProduct(sort: { publishedAt: ASC }) {
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
