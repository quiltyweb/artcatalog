import * as React from "react";
import { Link, graphql, PageProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { Heading, Stack, Text } from "@chakra-ui/react";
import SEO from "../components/SEO";

const AboutPage: React.FunctionComponent<PageProps<Queries.AboutPageQuery>> = ({
  data: { storefrontshopify, adminshopify },
}): React.ReactElement => {
  return (
    <>
      <Stack direction={"column"} alignItems="flex-start" p={4}>
        <Heading as="h2">
          {storefrontshopify.page?.title || "Meet the Artist"}
        </Heading>
        <StaticImage
          style={{
            filter: "grayscale(1)",
            transform: "scaleX(-1)",
            borderRadius: "6px",
            marginBottom: "2rem",
          }}
          alt="Painter Gabriela painting on a canvas"
          src="../images/author.jpg"
        />
        <Text fontSize="md" as={"div"}>
          <div
            dangerouslySetInnerHTML={{
              __html: storefrontshopify.page?.body,
            }}
          />
        </Text>
      </Stack>

      <Heading as="h3">About my products</Heading>
      <Stack
        spacing={4}
        align="center"
        fontSize={["xl", "xl", "xl", "xl", "xl"]}
        direction={["column", "column", "column", "column", "column"]}
        pt={[4, 4, 4, 4, 4]}
        mt={[4, 4, 4, 4, 4]}
        textTransform="capitalize"
      >
        {adminshopify?.metaobjects.nodes[0].fields.map((item) => (
          <Link key={item.key} to={`/product-categories/${item.key}`}>
            {item.definition.name}
          </Link>
        ))}
      </Stack>
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
