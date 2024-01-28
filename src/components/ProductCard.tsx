import * as React from "react";
import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image";
import {
  Box,
  Heading,
  Text,
  Stack,
  Highlight,
  Card,
  CardBody,
  Button,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useCartContext } from "../context/CartContext";

type ProductCardProps = {
  product: Queries.CollectionsAndProductsIntoPagesQuery["allShopifyCollection"]["nodes"][0]["products"][0];
};

const ProductCard: React.FunctionComponent<ProductCardProps> = ({
  product,
}): React.ReactElement => {
  const { addItemToCart } = useCartContext();
  const formik = useFormik({
    initialValues: {
      productId: product.id,
      productTitle: product.title,
      quantity: 1,
    },
    onSubmit: (values) => {
      if (values.quantity === 0) {
        return;
      }

      addItemToCart &&
        addItemToCart({
          id: values.productId,
          title: values.productTitle,
          quantity: values.quantity,
        });
    },
  });

  const IMAGE = getImage(product.featuredImage);
  const amount = product.priceRangeV2.maxVariantPrice.amount;
  const currencyCode = product.priceRangeV2.maxVariantPrice.currencyCode;
  return (
    <Card
      key={`${product.id}-single-view`}
      direction={{ base: "column", sm: "column" }}
      overflow="hidden"
      boxShadow="0"
      mt={7}
    >
      <CardBody display="flex" flexDirection={["column", "column", "row"]}>
        <Box maxW="lg">
          {IMAGE ? (
            <GatsbyImage
              image={IMAGE}
              alt={product.featuredImage?.altText || product.title}
              loading="eager"
              style={{ boxShadow: "rgba(0, 0, 0, 0.4) 0px 1px 10px" }}
            />
          ) : (
            <StaticImage
              style={{
                filter: "grayscale(1)",
                borderRadius: "6px",
                marginBottom: "2rem",
              }}
              alt="no product image available"
              src="../images/noimg.jpg"
            />
          )}
        </Box>
        <Stack
          spacing="3"
          px={10}
          py={4}
          minHeight="sm"
          maxWidth={["100%", "100%", "md"]}
        >
          <Heading size="lg">{product.title}</Heading>
          <Text py="1">{product.description}</Text>
          {amount !== 0 && (
            <Text
              data-testid="item-price"
              fontSize="2xl"
              fontWeight="bold"
              color="pink.800"
            >
              <Highlight query="AUD" styles={{ pr: "1", color: "#7e718a" }}>
                {currencyCode}
              </Highlight>
              {`$${amount}`}
            </Text>
          )}
          <Box pt="9">
            <form onSubmit={formik.handleSubmit}>
              <FormControl id="quantity">
                <FormLabel htmlFor="quantity">Quantity</FormLabel>
                <NumberInput
                  min={0}
                  id="quantity"
                  name="quantity"
                  value={formik.values.quantity}
                  onChange={(val) => {
                    const quantity = parseInt(val);
                    formik.setFieldValue("quantity", quantity);
                  }}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper id="quantity-increment" />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <Button
                id="add-to-cart"
                type="submit"
                fontSize="xl"
                backgroundColor="pink.800"
                color="white"
                width="100%"
                padding="6"
                my="4"
              >
                Add to cart
              </Button>
            </form>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
