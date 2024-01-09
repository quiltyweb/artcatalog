import * as React from "react";
import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image";
import { Box, useColorModeValue, Heading, Text, Stack } from "@chakra-ui/react";

type ProductCardProps = {
  product: Queries.CollectionsAndProductsIntoPagesQuery["allShopifyCollection"]["nodes"][0]["products"][0];
  collectionHandle: string;
};

const ProductCard: React.FunctionComponent<ProductCardProps> = ({
  product,
  collectionHandle,
}): React.ReactElement => {
  const IMAGE = getImage(product.featuredImage);

  return (
    <Box
      p={6}
      my={12}
      w="full"
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="2xl"
      rounded="lg"
      pos="relative"
      zIndex={1}
      maxW={"100%"}
      display={"flex"}
    >
      <Box
        rounded="lg"
        pos="relative"
        height={"460px"}
        _after={{
          transition: "all .3s ease",
          content: '""',
          w: "full",
          h: "full",
          pos: "absolute",
          top: 5,
          left: 0,
          backgroundImage: `url(${IMAGE})`,
          filter: "blur(15px)",
          zIndex: -1,
        }}
        _groupHover={{
          _after: {
            filter: "blur(20px)",
          },
        }}
      >
        {IMAGE ? (
          <GatsbyImage
            image={IMAGE}
            alt={product.featuredImage?.altText || product.title}
            style={{
              transform: "scaleX(-1)",
            }}
            loading="eager"
          />
        ) : (
          <StaticImage
            style={{
              filter: "grayscale(1)",
              transform: "scaleX(-1)",
              borderRadius: "6px",
              marginBottom: "2rem",
            }}
            alt="no product image available"
            src="../images/noimg.jpg"
          />
        )}
      </Box>
      <Stack padding={4}>
        <Heading fontSize="xl" fontWeight={600}>
          {product.title}
        </Heading>
        <Text color="gray.600" fontSize="sm" textTransform="uppercase">
          collection: {collectionHandle}
        </Text>
        <Text color="gray.700">{product.description}</Text>
      </Stack>
    </Box>
  );
};

export default ProductCard;
