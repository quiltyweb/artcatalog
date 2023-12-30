import React from "react";
import type { RichTextNode } from "@novatize-mattheri/shopify-richtext-renderer";
import { RichTextRenderer } from "@novatize-mattheri/shopify-richtext-renderer";
import { Heading, Text } from "@chakra-ui/react";

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
      <Heading as="h2">{title}</Heading>
      <Text>
        <RichTextRenderer data={content} />
      </Text>
    </>
  );
};
export default ProductCategoriesTemplate;
