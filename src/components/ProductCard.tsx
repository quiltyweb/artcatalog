import * as React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Box, useColorModeValue, Heading, Text, Stack } from '@chakra-ui/react';

const ProductCard: React.FunctionComponent<any> = ({ product }): React.ReactElement => {
  const IMAGE = product.featuredImage.gatsbyImageData;
  return (
    <Box
      p={6}
      my={12}
      maxW="330px"
      w="full"
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow="2xl"
      rounded="lg"
      pos="relative"
      zIndex={1}
    >
      <Box
        rounded="lg"
        mt={-12}
        pos="relative"
        height="230px"
        _after={{
          transition: 'all .3s ease',
          content: '""',
          w: 'full',
          h: 'full',
          pos: 'absolute',
          top: 5,
          left: 0,
          backgroundImage: `url(${IMAGE})`,
          filter: 'blur(15px)',
          zIndex: -1,
        }}
        _groupHover={{
          _after: {
            filter: 'blur(20px)',
          },
        }}
      >
        <GatsbyImage image={IMAGE} alt={product.featuredImage.altText} />
      </Box>
      <Stack pt={20} align="center">
        <Text color="gray.600" fontSize="sm" textTransform="uppercase">
          Collection Placeholder
        </Text>
        <Heading fontSize="2xl" fontFamily="body" fontWeight={500}>
          <Link to={`/products/${product.handle}`}>{product.title}</Link>
        </Heading>
        <Stack direction="row" align="center">
          <Text fontWeight={800} fontSize="xl">
            {`${product.priceRangeV2.maxVariantPrice.amount} (${product.priceRangeV2.maxVariantPrice.currencyCode})`}
          </Text>
        </Stack>
        <Text color="gray.700">{product.description}</Text>
      </Stack>
    </Box>
  );
};

export default ProductCard;
