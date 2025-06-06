import * as React from "react";
import {
  Card,
  CardBody,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image";

type TileListProps = {
  title?: string;
};
const TileList: React.FunctionComponent<TileListProps> = ({
  title,
}): React.ReactElement => {
  const { allShopifyCollection } =
    useStaticQuery<Queries.CollectionsTilesQuery>(graphql`
      query CollectionsTiles {
        allShopifyCollection(filter: { handle: { eq: "prints" } }) {
          nodes {
            id
            title
            handle
            image {
              altText
              gatsbyImageData(
                width: 500
                layout: CONSTRAINED
                placeholder: BLURRED
              )
            }
          }
        }
      }
    `);

  return (
    <Container as="section" maxW="1200px" paddingBottom={"4rem"}>
      <Heading
        id="browse-categories"
        as="h2"
        color="pink.800"
        mb="2.4rem"
        textAlign="left"
      >
        {title || "Browse Brushella’s World"}
      </Heading>
      {allShopifyCollection.nodes.length === 0 && (
        <Heading as="h3" size="md" fontWeight="normal">
          There are no categories available.
        </Heading>
      )}

      {allShopifyCollection.nodes.length > 0 && (
        <SimpleGrid
          role="list"
          aria-label="browse categories"
          columns={[1, 2, 3, 4]}
          spacing={[4, 5, 10, 10]}
        >
          {allShopifyCollection.nodes.map((category, index) => {
            const collectionImageFound =
              category.image && getImage(category.image);

            return (
              <Card
                key={category.title + index}
                role="listitem"
                maxW="sm"
                variant="unstyled"
                _hover={{
                  transform: "scale(1.03)",
                  transition: "transform .15s ease-in",
                }}
              >
                <CardBody>
                  <Link to={`/collections/${category.handle}/`}>
                    {collectionImageFound ? (
                      <GatsbyImage
                        image={collectionImageFound}
                        alt={
                          category.image?.altText ||
                          `Products of ${category.title} category.`
                        }
                        style={{
                          filter: "brightness(1.2)",
                        }}
                      />
                    ) : (
                      <StaticImage
                        style={{
                          filter: "grayscale(1)",
                          minHeight: "300px",
                          maxHeight: "300px",
                        }}
                        alt=""
                        src="../images/web-asset-noimg.jpg"
                      />
                    )}
                    <Stack mt="2" spacing="3">
                      <Text
                        size="md"
                        color={"pink.800"}
                        fontWeight="semibold"
                        fontSize="1.13rem"
                      >
                        {category.title}
                      </Text>
                    </Stack>
                  </Link>
                </CardBody>
              </Card>
            );
          })}
        </SimpleGrid>
      )}
    </Container>
  );
};

export default TileList;
