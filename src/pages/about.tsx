import * as React from "react";
import { Link, graphql, PageProps, HeadProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import SEO from "../components/SEO";

const AboutPage: React.FunctionComponent<PageProps<Queries.AboutPageQuery>> = ({
  data: { storefrontshopify },
}): React.ReactElement => {
  return (
    <Container as="section" maxW={"1200px"} padding={"4rem 0.5rem"}>
      <Breadcrumb mb="2.4rem" fontSize={["sm", "md"]}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">About me</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
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
          alt="Gabriela painting on a large canvas in her art studio"
          src="https://cdn.shopify.com/s/files/1/0586/9892/4240/files/web-asset-author.jpg?v=1729679585"
          width={500}
        />
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
