import React from "react";
import type { RichTextNode } from "@novatize-mattheri/shopify-richtext-renderer";
import { RichTextRenderer } from "@novatize-mattheri/shopify-richtext-renderer";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Heading,
} from "@chakra-ui/react";
import styled from "styled-components";
import SEO from "../components/SEO";

const Content = styled(Box)`
  /* css to fix content overflow from long links in text */
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: normal
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
  /* end css fix */
`;

type LegalContentProps = {
  pageContext: {
    title: string;
    content: string | RichTextNode;
  };
};

const LegalContent: React.FunctionComponent<LegalContentProps> = ({
  pageContext: { title, content },
}): React.ReactElement => {
  return (
    <Container as="section" maxW={"1200px"} padding={"4rem 0.5rem"}>
      <Breadcrumb mb="2.4rem">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">{title}</BreadcrumbLink>
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
export default LegalContent;

export const Head = (props: any) => {
  return (
    <SEO
      pageTitle={`${props.pageContext.title} - Legal Information Page`}
      description="Legal and shipping Information about our products"
    />
  );
};
