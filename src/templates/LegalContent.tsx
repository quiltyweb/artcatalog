import React from "react";
import type { RichTextNode } from "@novatize-mattheri/shopify-richtext-renderer";
import { RichTextRenderer } from "@novatize-mattheri/shopify-richtext-renderer";
import { Heading, Text } from "@chakra-ui/react";

type LegalContentTemplateProps = {
  pageContext: {
    title: string;
    content: string | RichTextNode;
  };
};

const LegalContentTemplate: React.FunctionComponent<
  LegalContentTemplateProps
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
export default LegalContentTemplate;
