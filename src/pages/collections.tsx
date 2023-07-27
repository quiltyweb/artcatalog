import * as React from "react";
import { Link, graphql, PageProps } from "gatsby";
import { Heading, Text, List, ListItem } from "@chakra-ui/react";
import CollectionCard from "../components/CollectionCard";
import SEO from "../components/SEO";

const CollectionsPage: React.FunctionComponent<
  PageProps<Queries.CollectionsPageQuery>
> = ({ data: { allShopifyCollection } }): React.ReactElement => (
  <>
    {allShopifyCollection.edges.length !== 0 ? (
      <>
        <Heading as="h2">Brushella Collections</Heading>
        <List id="brushella-all-collections-list" listStyleType={"none"}>
          {allShopifyCollection.edges.map(({ node }) => (
            <ListItem key={`${node.id}-collection-item`} padding={2}>
              <Link to={`/collections/${node.handle}`}>
                <CollectionCard shopifyCollectionNode={node} />
              </Link>
            </ListItem>
          ))}
        </List>
      </>
    ) : (
      <Text>There are no collections available</Text>
    )}
  </>
);

export default CollectionsPage;

export const Head = ({ location }: PageProps): React.ReactElement => (
  <SEO>
    <title id="title">Collections - Brushella</title>
    <meta
      id="collections"
      name="collections"
      content="Collections of Brushella"
    />
    <meta
      id="twitter-og"
      name="twitter:url"
      content={`https://www.www.brushella.art/${location.pathname}`}
    />
  </SEO>
);

export const query = graphql`
  query CollectionsPage {
    allShopifyCollection {
      edges {
        ...ShopifyCollectionNode
      }
    }
  }
`;
