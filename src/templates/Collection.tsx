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
      <Stack maxW="xxl" mt="8" mb="8" ml="auto" mr="auto" alignItems="center">
        <Heading textTransform="capitalize" as="h2" size="2xl" color="pink.800">
          {title}
        </Heading>
        {description && (
          <Text
            color="#513548"
            fontSize="md"
            lineHeight="normal"
            mt="4"
            mb="4"
            pr="16"
            pl="16"
            textAlign="center"
          >
            {description}
          </Text>
        )}
      </Stack>

      {products && products.length !== 0 ? (
        <SimpleGrid columns={[1, 2, 3, 4]} spacing="6" justifyItems="center">
          {products.map(
            ({
              id,
              featuredImage,
              title,
              handle,
              priceRangeV2: {
                minVariantPrice: { amount, currencyCode },
              },
            }) => {
              const image = getImage(featuredImage);
              return (
                <Link
                  key={handle}
                  to={`/collections/${collectionHandle}/${handle}`}
                >
                  <Card key={`${id}-product-item`} boxShadow="md">
                    <CardBody>
                      {image ? (
                        <GatsbyImage
                          image={image}
                          alt={featuredImage?.altText || title}
                          style={{
                            minHeight: "300px",
                            maxHeight: "300px",
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
                          minH="normal"
                        >
                          {title}
                        </Heading>
                      </Stack>
                    </CardBody>
                    <CardFooter
                      alignItems="flex-end"
                      display="flex"
                      justifyContent="space-between"
                      minH={20}
                    >
                      {amount !== 0 && (
                        <Text
                          data-testid="item-price"
                          fontSize="xl"
                          fontWeight="bold"
                          color="pink.800"
                          lineHeight="normal"
                        >
                          <Text
                            as="span"
                            display="block"
                            data-testid="item-price-from"
                            fontSize="sm"
                            fontWeight="bold"
                            color="pink.800"
                          >
                            From
                          </Text>
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
                        view details <Icon as={ArrowForwardIcon} />
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
