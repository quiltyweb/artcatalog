import React from "react";
import type { RichTextNode } from "@novatize-mattheri/shopify-richtext-renderer";
import { RichTextRenderer } from "@novatize-mattheri/shopify-richtext-renderer";
import { Heading, Text } from "@chakra-ui/react";
import styled from "styled-components";

const Title = styled(Heading)`
  font-style: normal;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 29px;
  color: #4b828f;
  margin-bottom: 1rem;
  text-transform: capitalize;
`;
const Content = styled(Text)`
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 20px;
  color: #000000;
`;
type ProductCategoriesTemplateProps = {
  pageContext: {
    title: string;
    content: string | RichTextNode;
  };
};

const ProductCategoriesTemplate: React.FunctionComponent<
  ProductCategoriesTemplateProps
> = ({ pageContext: { title, content } }): React.ReactElement => {
  return (
    <>
      <Title as="h2">{title}</Title>
      <Content>
        <RichTextRenderer data={content} />
      </Content>
    </>
  );
};
export default ProductCategoriesTemplate;
