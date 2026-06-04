import React from "react";
import DOMPurify from "dompurify";
import { convertSchemaToHtml } from "@thebeyondgroup/shopify-rich-text-renderer";
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

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    margin: 1.6rem 0 0.8rem;
    line-height: 1.3;
  }
  h1 { font-size: 1.75rem; }
  h2 { font-size: 1.5rem; }
  h3 { font-size: 1.25rem; }
  p { margin-bottom: 1rem; line-height: 1.6; }
  ul, ol { margin: 0 0 1rem 1.5rem; }
  li { margin-bottom: 0.4rem; }
  a { color: var(--chakra-colors-teal-600); text-decoration: underline; }
  a:hover { color: var(--chakra-colors-teal-700); }
  strong { font-weight: 600; }
`;

type LegalContentProps = {
  pageContext: {
    title: string;
    content: string;
  };
};

const LegalContent: React.FunctionComponent<LegalContentProps> = ({
  pageContext: { title, content },
}): React.ReactElement => {
  return (
    <Container as="section" maxW={"1200px"} padding={"4rem 0.5rem"}>
      <Breadcrumb mb="2.4rem" fontSize={["sm", "md"]}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">{title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Heading as="h2" color="teal.600" mb="2.4rem">
        {title}
      </Heading>
      <Content
        maxWidth={["100%", "100%", "60%"]}
        dangerouslySetInnerHTML={{
          __html:
            typeof window !== "undefined"
              ? DOMPurify.sanitize(convertSchemaToHtml(content || ""))
              : convertSchemaToHtml(content || ""),
        }}
      />
    </Container>
  );
};
export default LegalContent;

export const Head = (props: any) => {
  const { title } = props.pageContext;
  const canonical = `https://www.brushella.art${props.location.pathname}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.brushella.art/" },
      { "@type": "ListItem", position: 2, name: title, item: canonical },
    ],
  };

  return (
    <SEO
      pageTitle={title}
      siteTitle="Brushella"
      description={`Brushella's ${title} — clear and transparent policies for a confident and safe art purchasing experience.`}
      canonical={canonical}
    >
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
    </SEO>
  );
};
