import React from "react";
import type { RichTextNode } from "@novatize-mattheri/shopify-richtext-renderer";
import { RichTextRenderer } from "@novatize-mattheri/shopify-richtext-renderer";
import { Box, Container, Heading } from "@chakra-ui/react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import styled from "styled-components";
import SEO from "../components/SEO";

const Content = styled(Box)`
  /* css to fix content overflow from long links in text */
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: normal;
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
  /* end css fix */
`;

type ProductCategoriesProps = {
  pageContext: {
    title: string;
    content: string | RichTextNode;
    handle: string;
  };
};

const ProductCategories: React.FunctionComponent<ProductCategoriesProps> = ({
  pageContext: { title, content, handle },
}): React.ReactElement => {
  return (
    <Container as="section" maxW={"1200px"} padding={"4rem 0.5rem"}>
      <Breadcrumb mb="2.4rem" fontSize={["sm", "md"]}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="/collections">All Categories</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href={`/collections/${handle}`}>
            {title}
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">About the {title} Collection</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Heading as="h2" color="teal.500" mb="2.4rem">
        {title}
      </Heading>
      <Content maxWidth={["100%", "100%", "60%"]}>
        <RichTextRenderer data={content} />
      </Content>
    </Container>
  );
};
export default ProductCategories;

export const Head = (props: any) => {
  const { title, handle } = props.pageContext;
  const canonical = `https://www.brushella.art${props.location.pathname}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.brushella.art/" },
      { "@type": "ListItem", position: 2, name: "All Categories", item: "https://www.brushella.art/collections/" },
      { "@type": "ListItem", position: 3, name: title, item: `https://www.brushella.art/collections/${handle}/` },
      { "@type": "ListItem", position: 4, name: `About the ${title} Collection`, item: canonical },
    ],
  };

  return (
    <SEO
      pageTitle={`${title} — Art Category Guide`}
      description={`Explore Brushella's ${title} — unique handcrafted paintings and fine art prints by Chilean artist Gabriela.`}
      canonical={canonical}
    >
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
    </SEO>
  );
};
