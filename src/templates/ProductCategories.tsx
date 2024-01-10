import React from "react";
import type { RichTextNode } from "@novatize-mattheri/shopify-richtext-renderer";
import { RichTextRenderer } from "@novatize-mattheri/shopify-richtext-renderer";
import { Box, Heading } from "@chakra-ui/react";
import styled from "styled-components";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

const Title = styled(Heading)`
  font-style: normal;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 29px;
  color: #4b828f;
  margin: 1rem 0;
  text-transform: capitalize;
`;
const Content = styled(Box)`
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 20px;
  color: #000000;
`;
type ProductCategoriesProps = {
  pageContext: {
    title: string;
    content: string | RichTextNode;
  };
};

const ProductCategories: React.FunctionComponent<ProductCategoriesProps> = ({
  pageContext: { title, content },
}): React.ReactElement => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="/about">About</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">{title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Title as="h2">{title}</Title>
      <Content>
        <RichTextRenderer data={content} />
      </Content>
    </>
  );
};
export default ProductCategories;
