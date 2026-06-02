import * as React from "react";
import { Box, Container, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { TbAugmentedReality } from "react-icons/tb";
import DOMPurify from "dompurify";

type CollectionHeroProps = {
  title: string;
  description?: string;
  image?: {
    altText?: string | null;
    gatsbyImageData?: any;
    originalSrc?: string | null;
  } | null;
};

const CollectionHero: React.FunctionComponent<CollectionHeroProps> = ({
  title,
  description,
  image,
}): React.ReactElement => {
  const gatsbyImage = getImage(image?.gatsbyImageData ?? null);
  const alt = image?.altText ?? `${title} collection`;

  return (
    <Container
      as="section"
      maxW="1200px"
      padding={{ base: "1rem 0", md: "2rem 0" }}
    >
      <Flex
        align="stretch"
        sx={{
          flexDirection: "column",
          gap: "1.5rem",
          "@media (min-width: 426px)": {
            flexDirection: "row",
            gap: 0,
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            aspectRatio: "1 / 1",
            overflow: "hidden",
            "@media (min-width: 426px)": {
              width: "50%",
              aspectRatio: "auto",
              flexShrink: 0,
              maxHeight: "600px",
              overflow: "visible",
            },
          }}
        >
          {gatsbyImage ? (
            <GatsbyImage
              image={gatsbyImage}
              alt={alt}
              objectFit="contain"
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "600px",
              }}
            />
          ) : image?.originalSrc ? (
            <img
              src={image.originalSrc}
              alt={alt}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "600px",
                objectFit: "contain",
              }}
            />
          ) : (
            <Box
              bg="gray.300"
              w="100%"
              minH="320px"
              h="100%"
              maxH="600px"
              role="img"
              aria-label={alt}
            />
          )}
        </Box>

        <Flex
          direction="column"
          justify="center"
          align="center"
          textAlign="center"
          gap="2rem"
          padding={{ base: "1rem", md: "2rem", lg: "3rem", xl: "4rem" }}
          sx={{
            width: "100%",
            "@media (min-width: 426px)": {
              width: "50%",
              flexShrink: 0,
            },
          }}
        >
          <Heading
            as="h1"
            size={{ base: "xl", md: "2xl" }}
            color="gray.900"
            fontWeight="extrabold"
            textTransform="capitalize"
          >
            {title} Collection
          </Heading>
          {description && (
            <Box
              fontSize={{ base: "md", md: "lg" }}
              color="gray.700"
              lineHeight="1.7"
              dangerouslySetInnerHTML={{
                __html:
                  typeof window !== "undefined"
                    ? DOMPurify.sanitize(description)
                    : description,
              }}
            />
          )}
          <Text
            display={{ base: "block", lg: "none" }}
            fontSize={{ base: "sm", md: "md" }}
            color="pink.800"
            fontWeight={600}
          >
            Look for this AR icon{" "}
            <Icon
              as={TbAugmentedReality}
              boxSize="1.25rem"
              verticalAlign="middle"
              aria-hidden="true"
            />{" "}
            on each artwork to view it in augmented reality using your phone.
          </Text>
        </Flex>
      </Flex>
    </Container>
  );
};

export default CollectionHero;
