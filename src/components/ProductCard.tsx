import * as React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import {
  Box,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Button,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useCartContext } from '../context/CartContext';

type ProductCardProps = {
  product: any; // TODO: add proper product type
  isFullWidth?: boolean;
};

const ProductCard: React.FunctionComponent<ProductCardProps> = ({ product, isFullWidth }): React.ReactElement => {
  const { addItemToCart } = useCartContext();
  const formik = useFormik({
    initialValues: {
      productId: product.id,
      productTitle: product.title,
      quantity: 0,
    },
    onSubmit: (values) => {
      if (values.quantity === 0) {
        return;
      }

      addItemToCart({
        id: values.productId,
        title: values.productTitle,
        quantity: values.quantity,
      });
    },
  });
  const IMAGE = product.featuredImage.gatsbyImageData;
  return (
    <Box
      p={6}
      my={12}
      w="full"
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow="2xl"
      rounded="lg"
      pos="relative"
      zIndex={1}
      maxW={isFullWidth ? '100%' : '330px'}
      display={isFullWidth ? 'flex' : 'block'}
    >
      <Box
        rounded="lg"
        pos="relative"
        height={isFullWidth ? '460px' : '230px'}
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
        <GatsbyImage image={IMAGE} alt={product.featuredImage.altText} loading="eager" />
      </Box>
      <Stack pl={isFullWidth ? '10' : '0'} pt={isFullWidth ? '0' : '20'} align={isFullWidth ? 'left' : 'center'}>
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

        {isFullWidth && (
          <form onSubmit={formik.handleSubmit}>
            <Stack direction="row" align="flex-end">
              <FormControl id="quantity">
                <FormLabel htmlFor="quantity">Quantity</FormLabel>
                <NumberInput
                  min={0}
                  id="quantity"
                  name="quantity"
                  value={formik.values.quantity}
                  onChange={(val) => {
                    const quantity = parseInt(val);
                    formik.setFieldValue('quantity', quantity);
                  }}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper id="quantity-increment" />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <Button type="submit" colorScheme="purple">
                Add to cart
              </Button>
            </Stack>
          </form>
        )}
      </Stack>
    </Box>
  );
};

export default ProductCard;
