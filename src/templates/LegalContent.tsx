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

/* Skip the Line. Purchase Tickets. */

// font-family: 'Montserrat';
// font-style: normal;
// font-weight: 600;
// font-size: 24px;
// line-height: 29px;
// display: flex;
// align-items: center;

// color: #4B828F;

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
