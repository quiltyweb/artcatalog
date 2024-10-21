import * as React from "react";
import { Link, graphql, PageProps, HeadProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { Container, Heading, SimpleGrid, Tag, Text } from "@chakra-ui/react";
import SEO from "../components/SEO";

const AboutPage: React.FunctionComponent<PageProps<Queries.AboutPageQuery>> = ({
  data: { storefrontshopify, adminshopify },
}): React.ReactElement => {
  return (
    <Container as="section" maxW={"1200px"} padding={"4rem 0.5rem"}>
      <Heading as="h2" color="teal.500" mb="2.4rem">
        About me
      </Heading>
      <SimpleGrid columns={[1, 1, 1, 2]} justifyItems="center" mb="2.4rem">
        <Text fontSize="md">
          <div
            dangerouslySetInnerHTML={{
              __html: storefrontshopify.page?.body,
            }}
          />
        </Text>
        <StaticImage
          style={{
            borderRadius: "md",
          }}
          alt="Gabriela in her art studio painting on a large canvas"
          src="../images/author/brushella.jpg"
          width={500}
        />
      </SimpleGrid>
      <Heading as="h3" color="teal.500" mb="2.4rem">
        About my products
      </Heading>
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
            borderRadius="md"
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
    </Container>
  );
};
export default AboutPage;

export const Head = (props: HeadProps<any>) => {
  return (
    <SEO
      pageTitle="About Page - Meet the artist"
      siteTitle={props.data.site.siteMetadata.title}
      description="Meet Gabriela, the artist behind Brushella Store"
      image={props.data.site.siteMetadata.image}
    />
  );
};

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
    site {
      siteMetadata {
        title
        description
        image
        siteUrl
      }
    }
  }
`;
