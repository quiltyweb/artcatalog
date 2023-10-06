import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { Heading, Box, Text, SimpleGrid } from "@chakra-ui/react";
import SEO from "../components/SEO";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const PrintsPage: React.FunctionComponent<
  PageProps<Queries.PrintsPageQuery>
> = ({ data: { shopifyCollection } }): React.ReactElement => {
  return (
    <>
      <Heading as="h2">{shopifyCollection?.title || "Prints"}</Heading>
      {shopifyCollection?.products.length !== 0 ? (
        <SimpleGrid
          id="brushella-prints-list"
          columns={[1, 2, 3]}
          spacing="40px"
        >
          {shopifyCollection?.products.map(
            ({ id, featuredImage, title, description }) => {
              const image = getImage(featuredImage);
              return (
                <Box key={`${id}-collection-item`} padding={2} maxWidth={200}>
                  {image && image !== null && (
                    <GatsbyImage
                      image={image}
                      alt={featuredImage?.altText || title}
                    />
                  )}
                  <Text>{title}</Text>
                  <Text>{description}</Text>
                </Box>
              );
            }
          )}
        </SimpleGrid>
      ) : (
        <Text>There are no prints available.</Text>
      )}
    </>
  );
};

export default PrintsPage;

export const Head = ({ location }: PageProps): React.ReactElement => (
  <SEO>
    <title id="title">Prints - Brushella</title>
    <meta id="prints" name="prints" content="Brushella's Print" />
    <meta
      id="twitter-og"
      name="twitter:url"
      content={`https://www.www.brushella.art/${location.pathname}`}
    />
  </SEO>
);

export const query = graphql`
  query PrintsPage {
    shopifyCollection(handle: { eq: "prints" }) {
      title
      products {
        id
        handle
        title
        description
        featuredImage {
          altText
          gatsbyImageData
        }
      }
    }
  }
`;
