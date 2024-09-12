import * as React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
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
  Select,
  FormErrorMessage,
  VStack,
  Flex,
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
import { useAddItemToCart } from "../context/StoreContext";
import * as Yup from "yup";
import { formatPrice } from "../utils/formatPrice";

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
  const addItemToCart = useAddItemToCart();

  const featuredImage = getImage(product.featuredImage);

  const currencyCode = product.priceRangeV2.maxVariantPrice.currencyCode;

  const initialValues: ProductCardFormValues = {
    id: product.id,
    product: product,
    quantity: 1,
    variant: "",
  };
  const SubmitSchema = Yup.object().shape({
    variant: Yup.string().required("Option Required"),
    quantity: Yup.number().required("Quantity Required"),
  });

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
        const selectedVariant = values.product.variants.find((variant) => {
          return variant.title === values.variant;
        });

        if (!selectedVariant) {
          throw Error;
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

        return (
          <Card
            key={`${product.id}-single-view`}
            direction={{ base: "column", sm: "column" }}
            overflow="hidden"
            boxShadow="0"
            mt={7}
          >
            <CardBody
              display="flex"
              justifyContent="center"
              flexDirection={["column", "column", "row"]}
            >
              <VStack>
                <Box>
                  {props.values.variant == "" && featuredImage && (
                    <GatsbyImage
                      image={featuredImage}
                      alt={product.featuredImage?.altText || product.title}
                      loading="eager"
                    />
                  )}
                  {props.values.variant !== "" && variantFoundImage && (
                    <GatsbyImage
                      image={variantFoundImage}
                      alt={
                        variantFound.image.altText ||
                        `${props.values.variant} ${product.title}`
                      }
                      loading="eager"
                    />
                  )}
                </Box>
                <Heading as="h3" size="md" color="pink.800">
                  Variations:
                </Heading>
                <Flex
                  flexDirection="row"
                  flexWrap="wrap"
                  justifyContent="center"
                  maxW={"70%"}
                  mb="4"
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
                <Heading as="h4" size="md" color="pink.800">
                  Details gallery:
                </Heading>
                <Flex
                  flexDirection="row"
                  flexWrap="wrap"
                  justifyContent="center"
                  maxW={"70%"}
                >
                  {product.mediaCount > 0 &&
                    product.media.map((mediaItem, index) => {
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
              </VStack>

              <Stack
                px={5}
                py={["5", "5", "0"]}
                maxWidth={["100%", "100%", "md", "lg", "xl"]}
              >
                <Heading size="lg" lineHeight="normal" minH="80px">
                  {product.title}
                  <br />
                  {props.values.variant !== "" && `${props.values.variant}`}
                </Heading>
                <Text py="1">{product.description}</Text>
                <Text
                  data-testid="item-price"
                  fontSize="2xl"
                  fontWeight="bold"
                  color="pink.800"
                >
                  <Text
                    as="div"
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
                  {props.values.variant === "" && (
                    <>
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
                </Text>
                <Box pt="9">
                  <Form>
                    {product.options.length > 0 &&
                      product.options.map(({ name, values }, index) => {
                        const variantName = `${name.toLowerCase()}`;
                        return (
                          <Field key={index} name="variant" type="select">
                            {({ field, form }: FieldProps) => (
                              <FormControl isInvalid={!!form.errors.variant}>
                                <FormLabel
                                  htmlFor={variantName}
                                  key={variantName + index}
                                >
                                  {variantName}:
                                </FormLabel>
                                <Select
                                  id="variant"
                                  name="variant"
                                  placeholder={`Select a ${variantName}`}
                                  onChange={field.onChange}
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
                      isDisabled={props.isSubmitting}
                      aria-disabled={props.isSubmitting}
                    >
                      Add to shopping bag
                    </Button>
                  </Form>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        );
      }}
    </Formik>
  );
};

export default ProductCard;
