import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Highlight,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image";
import { Link, PageProps } from "gatsby";
import SEO from "../components/SEO";
import { ArrowForwardIcon } from "@chakra-ui/icons";

type CollectionProps = {
  pageContext: {
    title: string;
    collectionHandle: string;
    description?: string;
    products: Queries.CollectionsAndProductsIntoPagesQuery["allShopifyCollection"]["nodes"][0]["products"];
  };
};

const Collection: React.FunctionComponent<CollectionProps> = ({
  pageContext: { title, description, products, collectionHandle },
}): React.ReactElement => {
  return (
    <>
      <Stack padding="15" maxW="xl" margin="0px auto" alignItems="center">
        <Heading textTransform="capitalize" as="h2" size="2xl" color="pink.800">
          {title}
        </Heading>
        {description && (
          <Text fontSize="md" lineHeight="6" mt="4" textAlign="center">
            {description}
          </Text>
        )}
      </Stack>

      {products && products.length !== 0 ? (
        <SimpleGrid columns={[1, 2, 3]} spacing="40px" padding="10">
          {products.map(
            ({
              id,
              featuredImage,
              title,
              description,
              handle,
              priceRangeV2: {
                maxVariantPrice: { amount, currencyCode },
              },
            }) => {
              const image = getImage(featuredImage);
              return (
                <Link
                  key={handle}
                  to={`/collections/${collectionHandle}/${handle}`}
                >
                  <Card maxW="sm" key={`${id}-product-item`} boxShadow="md">
                    <CardBody>
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
                      <Stack mt="6" spacing="3">
                        <Divider color="gray.300" />
                        <Heading
                          as="h3"
                          size="md"
                          textTransform="capitalize"
                          fontWeight={600}
                          color={"pink.800"}
                          minH="12"
                        >
                          {title}
                        </Heading>
                        {description && <Text minH="20">{description}</Text>}
                      </Stack>
                    </CardBody>

                    <CardFooter
                      alignItems="flex-end"
                      display="flex"
                      justifyContent="space-between"
                      marginTop="1"
                    >
                      {amount !== 0 && (
                        <Text fontSize="xl" fontWeight="bold" color="pink.800">
                          <Highlight
                            query="AUD"
                            styles={{ pr: "1", color: "#7e718a" }}
                          >
                            {currencyCode}
                          </Highlight>
                          {`$${amount}`}
                        </Text>
                      )}
                      <Text
                        fontSize="md"
                        textAlign="right"
                        color={"pink.800"}
                        marginLeft="auto"
                      >
                        view details <br /> & buy <Icon as={ArrowForwardIcon} />
                      </Text>
                    </CardFooter>
                  </Card>
                </Link>
              );
            }
          )}
        </SimpleGrid>
      ) : (
        <Text textAlign="center">There are no products available.</Text>
      )}
    </>
  );
};
export default Collection;

export const Head = ({ location }: PageProps): React.ReactElement => (
  <SEO>
    <html lang="en" />
    <title id="collection-title">{`Welcome to Brushella - All things ART! ${location.pathname}`}</title>
    <meta
      id="collection-page"
      name="collection"
      content="All things ART! Murals, Canvas painting, Crafts, Face and Bodypainting"
    />
  </SEO>
);
