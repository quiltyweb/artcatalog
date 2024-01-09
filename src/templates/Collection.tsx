import React from "react";
import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import styled from "styled-components";
import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image";
import { Link, PageProps } from "gatsby";
import SEO from "../components/SEO";

const Title = styled(Heading)`
  font-style: normal;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 29px;
  color: #4b828f;
  margin-bottom: 1rem;
  text-transform: capitalize;
`;

type CollectionProps = {
  pageContext: {
    title: string;
    collectionHandle: string;
    products: Queries.CollectionsAndProductsIntoPagesQuery["allShopifyCollection"]["nodes"][0]["products"];
  };
};

const Collection: React.FunctionComponent<CollectionProps> = ({
  pageContext: { title, products, collectionHandle },
}): React.ReactElement => {
  return (
    <>
      <Title as="h2">{title}</Title>

      {products.length !== 0 ? (
        <SimpleGrid columns={[1, 2, 3]} spacing="40px">
          {products.map(({ id, featuredImage, title, description, handle }) => {
            const image = getImage(featuredImage);
            return (
              <Link
                key={handle}
                to={`/collections/${collectionHandle}/${handle}`}
              >
                <Box key={`${id}-product-item`} padding={2} maxWidth={200}>
                  {image ? (
                    <GatsbyImage
                      image={image}
                      alt={featuredImage?.altText || title}
                      style={{
                        transform: "scaleX(-1)",
                      }}
                    />
                  ) : (
                    <StaticImage
                      style={{
                        filter: "grayscale(1)",
                        transform: "scaleX(-1)",
                        borderRadius: "6px",
                        marginBottom: "2rem",
                      }}
                      alt="no product image available"
                      src="../images/noimg.jpg"
                    />
                  )}

                  <Heading fontSize="lg" fontWeight={600} as="h3" mt="2" mb="2">
                    {title}
                  </Heading>
                  <Text>{description}</Text>
                </Box>
              </Link>
            );
          })}
        </SimpleGrid>
      ) : (
        <Text>There are no products available.</Text>
      )}
    </>
  );
};
export default Collection;

export const Head = ({ location }: PageProps): React.ReactElement => (
  <SEO>
    <title id="title">{`Welcome to Brushella - All things ART! ${location.pathname}`}</title>
    <meta
      id="collection-page"
      name="collection"
      content="All things ART! Murals, Canvas painting, Crafts, Face and Bodypainting"
    />
  </SEO>
);
