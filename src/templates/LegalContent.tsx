import React from "react";
import type { RichTextNode } from "@novatize-mattheri/shopify-richtext-renderer";
import { RichTextRenderer } from "@novatize-mattheri/shopify-richtext-renderer";
import { Box, Heading } from "@chakra-ui/react";
import styled from "styled-components";
import { PageProps } from "gatsby";
import SEO from "../components/SEO";

const Title = styled(Heading)`
  font-style: normal;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 29px;
  color: #4b828f;
  margin-bottom: 1rem;
  text-transform: capitalize;
`;
const Content = styled(Box)`
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 20px;
  color: #000000;

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
      <Title as="h2">{title}</Title>
      <Content>
        <RichTextRenderer data={content} />
      </Content>
    </>
  );
};
export default LegalContent;

export const Head = ({ location }: PageProps): React.ReactElement => (
  <SEO>
    <title id="title">{`Welcome to Brushella - All things ART! ${location.pathname}`}</title>
    <meta
      id="Legal-content-page"
      name="legal content"
      content="All things ART! Murals, Canvas painting, Crafts, Face and Bodypainting"
    />
  </SEO>
);
