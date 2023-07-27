import * as React from "react";
import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image";
import { Box } from "@chakra-ui/react";
import { graphql } from "gatsby";

const CollectionCard = ({
  shopifyCollectionNode,
}: {
  shopifyCollectionNode: Queries.ShopifyCollectionNodeFragment["node"];
}) => {
  const image = getImage(shopifyCollectionNode.image);

  if (shopifyCollectionNode.image === null)
    return (
      <Box maxWidth={200}>
        <StaticImage
          src="../images/placeholders/noimg.jpg"
          placeholder="dominantColor"
          alt={shopifyCollectionNode?.title || "collection with no image"}
          loading="lazy"
        />
        {shopifyCollectionNode?.title}
      </Box>
    );

  return (
    <Box maxWidth={200}>
      {image && image !== null && (
        <GatsbyImage
          image={image}
          alt={
            shopifyCollectionNode.image.altText || shopifyCollectionNode?.title
          }
        />
      )}
      {shopifyCollectionNode.title}
    </Box>
  );
};

export default CollectionCard;

export const query = graphql`
  fragment ShopifyCollectionNode on ShopifyCollectionEdge {
    node {
      id
      title
      handle
      description
      image {
        gatsbyImageData(width: 200, placeholder: BLURRED, layout: FULL_WIDTH)
        altText
      }
    }
  }
`;
