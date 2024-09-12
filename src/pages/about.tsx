import * as React from "react";
import { Link, graphql, PageProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { Heading, SimpleGrid, Stack, Tag, Text } from "@chakra-ui/react";
import SEO from "../components/SEO";

const AboutPage: React.FunctionComponent<PageProps<Queries.AboutPageQuery>> = ({
  data: { storefrontshopify, adminshopify },
}): React.ReactElement => {
  return (
    <>
      <Stack maxW="xxl" mt="8" mb="8" ml="auto" mr="auto" alignItems="center">
        <Heading textTransform="capitalize" as="h1" size="2xl" color="#4b828f">
          Meet the Artist
        </Heading>
      </Stack>

      <SimpleGrid columns={[1, 1, 1, 2]} justifyItems="center">
        <StaticImage
          style={{
            filter: "grayscale(1)",
            transform: "scaleX(-1)",
            borderRadius: "6px",
            margin: "1rem",
          }}
          alt="Painter Gabriela painting on a canvas"
          src="../images/author.jpg"
          width={500}
        />
        <Text fontSize="md" as={"div"} margin="1rem">
          <div
            dangerouslySetInnerHTML={{
              __html: storefrontshopify.page?.body,
            }}
          />
        </Text>
      </SimpleGrid>

      <Stack maxW="xxl" mt="8" mb="8" ml="auto" mr="auto" alignItems="center">
        <Heading textTransform="capitalize" as="h2" size="2xl" color="#4b828f">
          About my products
        </Heading>
      </Stack>
      <SimpleGrid
        columns={[1, 1, 2, 3]}
        justifyItems="center"
        gap={4}
        pl="5"
        pr="5"
      >
        {adminshopify?.metaobjects.nodes[0].fields.map((item, i) => (
          <Tag
            size="lg"
            key={i}
            borderRadius="full"
            variant="solid"
            backgroundColor="pink.800"
            color="white"
            textTransform="capitalize"
          >
            <Link key={item.key} to={`/product-categories/${item.key}`}>
              {item.definition.name}
            </Link>
          </Tag>
        ))}
      </SimpleGrid>
    </>
  );
};
export default AboutPage;

export const Head = (): React.ReactElement => (
  <SEO>
    <html lang="en" />
    <title id="about-page">{`About Brushella - brushella.art - all things art`}</title>
    <meta id="about-page" name="about" content="About me page" />
  </SEO>
);

export const query = graphql`
  query AboutPage {
    adminshopify {
      metaobjects(first: 10, type: "product_categories") {
        nodes {
          fields {
            definition {
              name
            }
            key
          }
        }
      }
    }
    storefrontshopify {
      page(handle: "meet-the-artist") {
        title
        body
      }
    }
  }
`;
