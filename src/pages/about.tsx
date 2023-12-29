import * as React from "react";
import { Link, graphql, PageProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import SEO from "../components/SEO";

const AboutPage: React.FunctionComponent<PageProps<Queries.AboutPageQuery>> = ({
  data,
}): React.ReactElement => (
  <>
    <Stack direction={["column", "column", "row", "row", "row"]} p={4}>
      <Box>
        <Heading as="h2" size="lg" marginBottom={4}>
          {data.storefrontshopify.page?.title}
        </Heading>
        <Text fontSize="md">
          <div
            dangerouslySetInnerHTML={{
              __html: data.storefrontshopify.page?.body,
            }}
          />
        </Text>
      </Box>
      <StaticImage
        style={{
          filter: "grayscale(1)",
          transform: "scaleX(-1)",
          borderRadius: "6px",
        }}
        alt="Painter Gabriela painting on a canvas"
        src="../images/about/author.jpg"
      />
    </Stack>

    <Stack
      spacing={8}
      align="center"
      direction={["column", "column", "column", "column", "row"]}
      pt={[4, 4, 4, 4]}
    >
      {data.adminshopify?.metaobjects.nodes[0].fields.map((item) => (
        <Link
          style={{ textDecoration: "underline" }}
          to={`/product-categories/${item.key}`}
        >
          {item.definition.name}
        </Link>
      ))}
    </Stack>
  </>
);

export default AboutPage;

export const Head = ({ location }: PageProps): React.ReactElement => (
  <SEO>
    <title id="title">About Me: Brushella</title>
    <meta
      id="about-page"
      name="AboutPage"
      content="About me Page, The author of Brushella art"
    />
    <meta
      id="twitter-og"
      name="twitter:url"
      content={`https://www.brushella.art/${location.pathname}`}
    />
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
            value
          }
        }
      }
    }
    storefrontshopify {
      page(handle: "meet-the-artist") {
        title
        handle
        body
      }
    }
  }
`;
