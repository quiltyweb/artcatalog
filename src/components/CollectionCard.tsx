import * as React from "react";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import { Box } from "@chakra-ui/react";

type CollectionCardProps = {
  collection: any; // TODO: add proper product type
};

const CollectionCard: React.FunctionComponent<CollectionCardProps> = ({
  collection,
}): React.ReactElement => {
  return (
    <Box maxWidth={200}>
      {collection.image !== null ? (
        <>
          <GatsbyImage
            image={collection.image.gatsbyImageData}
            alt={collection.image.altText}
            loading="eager"
          />
          {collection.title}
        </>
      ) : (
        <>
          <StaticImage
            src="../images/placeholders/noimg.jpg"
            placeholder="blurred"
            formats={["auto", "webp", "avif"]}
            alt={collection.title}
            transformOptions={{ fit: "cover", cropFocus: "attention" }}
          />

          {collection.title}
        </>
      )}
    </Box>
  );
};

export default CollectionCard;
