import React from "react";
import type { RichTextNode } from "@novatize-mattheri/shopify-richtext-renderer";
import { RichTextRenderer } from "@novatize-mattheri/shopify-richtext-renderer";
import { Box, Heading } from "@chakra-ui/react";
import styled from "styled-components";
import SEO from "../components/SEO";

const Content = styled(Box)`
  /* css to fix content overflow from long links in text */
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
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
    <>
      <Heading as="h2">{title}</Heading>
      <Content>
        <RichTextRenderer data={content} />
      </Content>
    </>
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
