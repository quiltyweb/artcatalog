import React, { useEffect, useState } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import {
  Box,
  Heading,
  Text,
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
  Select,
  FormErrorMessage,
  Flex,
  Image,
  Container,
  Badge,
  Spinner,
  VStack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import {
  Formik,
  Form,
  Field,
  FormikHelpers,
  FieldProps,
  FormikProps,
  ErrorMessage,
} from "formik";
import {
  useAddItemToCart,
  useCartLinesUpdate,
  useCheckoutLineItems,
  useHasResponseError,
} from "../context/StoreContext";
import * as Yup from "yup";
import { formatPrice } from "../utils/formatPrice";
import notFoundImage from "../images/web-asset-noimg.jpg";

type ProductCardProps = {
  product: Queries.CollectionsAndProductsIntoPagesQuery["allShopifyCollection"]["nodes"][0]["products"][0];
};

interface ProductCardFormValues {
  id: string;
  product: Queries.CollectionsAndProductsIntoPagesQuery["allShopifyCollection"]["nodes"][0]["products"][0];
  quantity: number;
  variant: string;
}

const ProductCard: React.FunctionComponent<ProductCardProps> = ({
  product,
}): React.ReactElement => {
  const checkoutLineItems = useCheckoutLineItems();
  const {
    addItemToCart,
    addItemToCartLoading,
    addItemToCartWarnings,
    setAddItemToCartWarnings,
  } = useAddItemToCart();
  const {
    updateItemsToCart,
    updateItemsToCartLoading,
    updateItemsToCartWarnings,
    setUpdateItemsToCartWarnings,
  } = useCartLinesUpdate();
  const responseError = useHasResponseError();
  const featuredImage = getImage(product.featuredImage);
  const currencyCode = product.priceRangeV2.maxVariantPrice.currencyCode;
  const isProductPlublishedToStoreApp = product.publishedAt !== null;
  const [selectedVariant, setSelectedVariant] = useState("");

  const initialValues: ProductCardFormValues = {
    id: product.id,
    product: product,
    quantity: 1,
    variant: product.hasOnlyDefaultVariant
      ? product.variants[0].selectedOptions[0].value
      : "",
  };
  const SubmitSchema = Yup.object().shape({
    variant: Yup.string().required("Option Required"),
    quantity: Yup.number().required("Quantity Required"),
  });

  useEffect(() => {
    setAddItemToCartWarnings([]);
    setUpdateItemsToCartWarnings([]);
    setSelectedVariant("");
  }, [selectedVariant]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SubmitSchema}
      onSubmit={(
        values: ProductCardFormValues,
        { setSubmitting }: FormikHelpers<ProductCardFormValues>
      ) => {
        if (values.quantity === 0) {
          return;
        }
        setSubmitting(true);

        const selectedVariant = product.variants.find((variant) => {
          return variant.title.toLowerCase() === values.variant.toLowerCase();
        });

        if (!selectedVariant) {
          throw Error;
        }

        const foundCartLineItem = checkoutLineItems.find(
          (item) => item.merchandise.id === selectedVariant.shopifyId
        );

        if (foundCartLineItem) {
          const updatedQuantity = foundCartLineItem.quantity + values.quantity;
          updateItemsToCart({
            lines: [{ id: foundCartLineItem.id, quantity: updatedQuantity }],
          });
          setSubmitting(false);
          return;
        }

        addItemToCart({
          variantId: selectedVariant.shopifyId,
          quantity: values.quantity,
        });
        setSubmitting(false);
      }}
    >
      {(props: FormikProps<ProductCardFormValues>) => {
        const minPrice = formatPrice({
          currency: product.priceRangeV2.minVariantPrice.currencyCode,
          value: product.priceRangeV2.minVariantPrice.amount,
        });

        const variantFound = props.values.product.variants.find((variant) => {
          return (
            variant.selectedOptions[0].value.toLowerCase() ==
            props.values.variant.toLowerCase()
          );
        });
        const variantFoundImage =
          variantFound?.image && getImage(variantFound.image);

        const variantPriceWithFormat = formatPrice({
          currency:
            props.values.product.priceRangeV2.maxVariantPrice.currencyCode,
          value: variantFound?.price ?? 0,
        });
        const isSoldOut =
          variantFound &&
          (!variantFound.availableForSale ||
            variantFound.inventoryQuantity === 0);
        return (
          <Card
            key={`${product.id}-single-view`}
            direction={{ base: "column", sm: "column", md: "row" }}
            overflow="hidden"
            variant="outline"
          >
            <Container>
              <CardBody>
                <Heading
                  as="h2"
                  color="pink.800"
                  lineHeight="normal"
                  minH="80px"
                >
                  {product.title} <br />
                  {!product.hasOnlyDefaultVariant && `${props.values.variant} `}
                  {isSoldOut && (
                    <Badge
                      variant="solid"
                      size="md"
                      color="#ffffff"
                      backgroundColor="black"
                      padding={1}
                    >
                      Sold out
                    </Badge>
                  )}
                  {!isProductPlublishedToStoreApp && (
                    <Badge
                      variant="solid"
                      size="md"
                      color="#ffffff"
                      backgroundColor="black"
                      padding={1}
                    >
                      Item unavailable
                    </Badge>
                  )}
                </Heading>
                <Text wordBreak={"normal"} mb="2.4rem">
                  {product.description}
                </Text>
                <Box
                  data-testid="item-price"
                  fontSize="2xl"
                  fontWeight="bold"
                  color="pink.800"
                  mb="2.4rem"
                >
                  {props.values.variant === "" && (
                    <>
                      <Text
                        as="span"
                        display="block"
                        data-testid="item-price"
                        fontSize="sm"
                        fontWeight="bold"
                        color="pink.800"
                        visibility={
                          props.values.variant === "" ? "visible" : "hidden"
                        }
                      >
                        From
                      </Text>
                      <Highlight
                        query="AUD"
                        styles={{ pr: "1", color: "#7e718a" }}
                      >
                        {currencyCode}
                      </Highlight>
                      {minPrice}
                    </>
                  )}
                  {props.values.variant !== "" && (
                    <>
                      <Highlight
                        query="AUD"
                        styles={{ pr: "1", color: "#7e718a" }}
                      >
                        {currencyCode}
                      </Highlight>
                      {variantPriceWithFormat}
                    </>
                  )}
                </Box>

                <Form>
                  {!product.hasOnlyDefaultVariant &&
                    product.options.length > 0 &&
                    product.options.map(({ name, values }, index) => {
                      const variantName = `${name.toLowerCase()}`;
                      return (
                        <Field key={index} name="variant" type="select">
                          {({ field, form }: FieldProps) => (
                            <FormControl isInvalid={!!form.errors.variant}>
                              <FormLabel
                                htmlFor="variant"
                                key={variantName + index}
                              >
                                {variantName}:
                              </FormLabel>
                              <Select
                                id="variant"
                                name="variant"
                                placeholder={`Select a ${variantName}`}
                                onChange={(e) => {
                                  props.setFieldValue(
                                    "variant",
                                    e.target.value
                                  );
                                  setSelectedVariant(e.target.value);
                                }}
                              >
                                {values.map((value, i) => (
                                  <option key={i} value={value}>
                                    {value}
                                  </option>
                                ))}
                              </Select>
                              <FormErrorMessage>
                                <ErrorMessage name="variant" />
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      );
                    })}
                  <Field name="quantity">
                    {({ field, form }: FieldProps) => {
                      return (
                        <FormControl id="quantity">
                          <FormLabel htmlFor="quantity">Quantity</FormLabel>
                          <NumberInput
                            min={1}
                            id="quantity"
                            name="quantity"
                            value={field.value}
                            onChange={(val) => {
                              const quantity = parseInt(val);
                              form.setFieldValue("quantity", quantity);
                            }}
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper id="quantity-increment" />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </FormControl>
                      );
                    }}
                  </Field>
                  <VStack>
                    <Button
                      id="add-to-cart"
                      type="submit"
                      backgroundColor="#86548A"
                      color="#ffffff"
                      colorScheme="teal"
                      fontSize="xl"
                      width="100%"
                      padding="6"
                      my="4"
                      isLoading={props.isSubmitting}
                      isDisabled={
                        props.isSubmitting ||
                        isSoldOut ||
                        !isProductPlublishedToStoreApp
                      }
                      aria-disabled={props.isSubmitting}
                    >
                      Add to shopping bag
                    </Button>
                    {addItemToCartLoading && (
                      <VStack>
                        <Spinner color="colorPalette.600" />
                        <Text color="colorPalette.600">
                          Adding item to cart...
                        </Text>
                      </VStack>
                    )}
                    {updateItemsToCartLoading && (
                      <VStack>
                        <Spinner color="colorPalette.600" />
                        <Text color="colorPalette.600">
                          Updating item to cart...
                        </Text>
                      </VStack>
                    )}
                  </VStack>
                  {addItemToCartWarnings.length > 0 &&
                    addItemToCartWarnings.map((item) => {
                      return (
                        <Alert status="warning">
                          <AlertIcon />
                          {item.message}
                        </Alert>
                      );
                    })}
                  {updateItemsToCartWarnings.length > 0 &&
                    updateItemsToCartWarnings.map((item) => {
                      return (
                        <Alert status="warning">
                          <AlertIcon />
                          {item.message}
                        </Alert>
                      );
                    })}
                  {responseError && (
                    <Alert status="error">
                      <AlertIcon />A request error occurred, please try again
                      later.
                    </Alert>
                  )}
                </Form>
              </CardBody>
            </Container>
            <Container p="4">
              {!featuredImage && !variantFoundImage && (
                <Image
                  data-testid="no-image-found"
                  src={notFoundImage}
                  alt=""
                  style={{
                    filter: "grayscale(1)",
                    width: "500px",
                    height: "300px",
                    marginBottom: "1.4rem",
                  }}
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "500px" }}
                />
              )}

              {featuredImage && !variantFoundImage && (
                <GatsbyImage
                  image={featuredImage}
                  alt={product.featuredImage?.altText || product.title}
                  loading="eager"
                  style={{
                    objectFit: "cover",
                    maxWidth: "600px",
                    marginBottom: "1.4rem",
                  }}
                />
              )}

              {variantFoundImage && props.values.variant !== "" && (
                <GatsbyImage
                  image={variantFoundImage}
                  alt={
                    variantFound.image.altText ||
                    `${props.values.variant} ${product.title}`
                  }
                  loading="eager"
                  style={{
                    objectFit: "cover",
                    maxWidth: "600px",
                    marginBottom: "1.4rem",
                  }}
                />
              )}

              {!product.hasOnlyDefaultVariant && (
                <>
                  <Heading as="h3" size="md" color="teal.500" mb="1.4rem">
                    Variations:
                  </Heading>
                  <Flex
                    flexDirection="row"
                    flexWrap="wrap"
                    justifyContent="left"
                    maxW={"70%"}
                    mb="1.4rem"
                  >
                    {product.variants.map((variant, index) => {
                      if (!variant.image) {
                        return;
                      }
                      const variantImage = getImage(variant.image);
                      return (
                        variantImage && (
                          <GatsbyImage
                            key={index}
                            image={variantImage}
                            alt={
                              variant.image.altText ||
                              `${variant.title} ${product.title}`
                            }
                            loading="lazy"
                            style={{
                              margin: "0.5rem",
                              width: "82px",
                              height: "82px",
                            }}
                          />
                        )
                      );
                    })}
                  </Flex>
                </>
              )}

              {product.mediaCount > 0 && (
                <>
                  <Heading as="h3" size="md" color="teal.500" mb="1.4rem">
                    Details gallery:
                  </Heading>
                  <Flex
                    flexDirection="row"
                    flexWrap="wrap"
                    justifyContent="left"
                    maxW={"70%"}
                    mb="1.4rem"
                  >
                    {product.media.map((mediaItem, index) => {
                      if (mediaItem.mediaContentType !== "IMAGE") {
                        return;
                      }
                      const mediaImage =
                        mediaItem.preview?.image &&
                        getImage(mediaItem?.preview?.image);

                      return (
                        mediaImage && (
                          <GatsbyImage
                            key={index}
                            image={mediaImage}
                            alt={
                              mediaItem.preview?.image.altText || product.title
                            }
                            loading="lazy"
                            style={{ margin: "0.5rem" }}
                          />
                        )
                      );
                    })}
                  </Flex>
                </>
              )}
            </Container>
          </Card>
        );
      }}
    </Formik>
  );
};

export default ProductCard;
