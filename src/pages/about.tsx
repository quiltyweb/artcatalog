import * as React from "react";
import DOMPurify from "dompurify";
import { Link, graphql, PageProps, HeadProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import {
  Box,
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
          <BreadcrumbLink href="#">About Me</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Heading as="h2" color="teal.500" mb="2.4rem">
        About Me
      </Heading>
      <SimpleGrid columns={[1, 1, 1, 2]} justifyItems="center" mb="2.4rem">
        <Box
          className="prose prose-lg max-w-none mb-6"
          dangerouslySetInnerHTML={{
            __html: typeof window !== "undefined" ? DOMPurify.sanitize(storefrontshopify.page?.body || "") : storefrontshopify.page?.body || "",
          }}
        />
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
  const canonical = `https://www.brushella.art${props.location.pathname}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.brushella.art/" },
      { "@type": "ListItem", position: 2, name: "About Me", item: canonical },
    ],
  };

  return (
    <SEO
      pageTitle="Meet the Artist — Gabriela, Chilean Painter"
      siteTitle={props.data.site.siteMetadata.title}
      description="Meet Gabriela, the Chilean artist, Australia-based painter behind Brushella. Discover her story, inspiration and the passion that drives her original art collections."
      image={props.data.site.siteMetadata.image}
      canonical={canonical}
    >
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
    </SEO>
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
