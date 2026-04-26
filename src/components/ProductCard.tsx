import React from "react";
import DOMPurify from "dompurify";
import SafeZoom from "./SafeZoom";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
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
  useToast,
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
import { Link } from "gatsby";

type ProductCardProps = {
  product: Queries.CollectionsAndProductsIntoPagesQuery["allShopifyCollection"]["nodes"][0]["products"][0];
  printVersion: Queries.CollectionsAndProductsIntoPagesQuery["allShopifyProduct"]["nodes"][0];
};

interface ProductCardFormValues {
  id: string;
  product: Queries.CollectionsAndProductsIntoPagesQuery["allShopifyCollection"]["nodes"][0]["products"][0];
  quantity: number;
  variant: string;
}

const ProductCard: React.FunctionComponent<ProductCardProps> = ({
  product,
  printVersion,
}): React.ReactElement => {
  // TODO: refactor title_line_1 and title_line_2 to be constants
  // TODO: If the product has a metafield for title_line_1, use it as the product name
  const productMainTitle =
    product.metafields.find((field) => field.key === "title_line_1")?.value ||
    product.title;
  // If the product has a metafield for title_line_2, append it to the product name
  const productSubTitle = product.metafields.find(
    (field) => field.key === "title_line_2",
  )?.value;

  const checkoutLineItems = useCheckoutLineItems();
  const {
    addItemToCartCallback,
    addItemToCartLoading,
    addItemToCartWarnings,
    setAddItemToCartWarnings,
    addItemUserErrors,
    setAddItemUserErrors,
  } = useAddItemToCart();
  const {
    updateItemsToCart,
    updateItemsToCartLoading,
    updateItemsToCartWarnings,
    setUpdateItemsToCartWarnings,
    updateItemUserErrors,
    setUpdateItemUserErrors,
  } = useCartLinesUpdate();
  const hasResponseError = useHasResponseError();
  const featuredImageDetail = getImage(product.featuredImage?.detail ?? null);

  const currencyCode = product.priceRangeV2.maxVariantPrice.currencyCode;
  const isProductPlublishedToStoreApp = product.status === "ACTIVE";

  const initialValues: ProductCardFormValues = {
    id: product.id,
    product: product,
    quantity: 1,
    variant: product.hasOnlyDefaultVariant
      ? product.variants[0]?.selectedOptions[0]?.value ?? ""
      : "",
  };

  const toast = useToast();

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
        { setSubmitting, setFieldValue }: FormikHelpers<ProductCardFormValues>,
      ) => {
        if (values.quantity === 0) {
          return;
        }
        setSubmitting(true);

        const selectedVariant = product.variants.find((variant) => {
          return variant.title.toLowerCase() === values.variant.toLowerCase();
        });

        if (!selectedVariant) {
          setSubmitting(false);
          return;
        }

        const foundCartLineItem = checkoutLineItems.find(
          (item) => item.merchandise.id === selectedVariant.shopifyId,
        );

        if (foundCartLineItem) {
          const updatedQuantity = foundCartLineItem.quantity + values.quantity;
          updateItemsToCart({
            lines: [{ id: foundCartLineItem.id, quantity: updatedQuantity }],
          })
            .then(() => {
              toast({
                title: "Cart updated.",
                description: `Updated ${productMainTitle} - ${selectedVariant.title}`,
                status: "success",
                duration: 5000,
                isClosable: true,
              });
            })
            .finally(() => {
              setSubmitting(false);
            });
          return;
        }

        addItemToCartCallback({
          variantId: selectedVariant.shopifyId,
          quantity: values.quantity,
        })
          .then((result) => {
            if (result?.userErrors?.length) {
              return;
            }
            toast({
              title: "Item added to cart.",
              description: `Added ${productMainTitle} - ${selectedVariant.title}`,
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            setFieldValue("quantity", 1);
          })
          .catch((err) => {
            toast({
              title: "Unable to add item to cart.",
              description: "Something went wrong. Please try again.",
              status: "error",
              duration: 4000,
              isClosable: true,
            });
          })
          .finally(() => {
            setSubmitting(false);
          });
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
                <Heading as="h2" color="pink.800" lineHeight="normal">
                  {`'${productMainTitle}'`}
                </Heading>
                {productSubTitle && (
                  <Text fontSize="xl" color="pink.800" lineHeight="normal">
                    {productSubTitle}
                  </Text>
                )}
                {!product.hasOnlyDefaultVariant && (
                  <Text>{props.values.variant}</Text>
                )}
                {isSoldOut && (
                  <Badge
                    variant="solid"
                    size="md"
                    color="#ffffff"
                    backgroundColor="black"
                    padding={2}
                    my={4}
                    mr={2}
                  >
                    Sold out
                  </Badge>
                )}
                {product.productType && (
                  <Badge
                    variant="outline"
                    size="md"
                    color="#000000"
                    backgroundColor="white"
                    padding={2}
                    my={4}
                    mr={2}
                  >
                    {product.productType}
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
                <Box
                  className="prose prose-lg max-w-none mb-6"
                  dangerouslySetInnerHTML={{
                    __html:
                      typeof window !== "undefined"
                        ? DOMPurify.sanitize(product.descriptionHtml)
                        : product.descriptionHtml,
                  }}
                />
                {printVersion && (
                  <Link
                    to={`/collections/prints/${printVersion.handle}`}
                    className="mt-4 mb-4 inline-flex items-center gap-3 no-underline buy-print-btn"
                    style={{
                      border: "1.5px solid #8b7340",
                      color: "#8b7340",
                      padding: "0.75rem 1.5rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      fontSize: "0.875rem",
                      fontWeight: 400,
                      transition:
                        "transform 0.5s cubic-bezier(.215,.61,.355,0.5)",
                    }}
                  >
                    Buy This Print <span aria-hidden="true">&rarr;</span>
                  </Link>
                )}

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
                                    e.target.value,
                                  );
                                  setAddItemToCartWarnings([]);
                                  setUpdateItemsToCartWarnings([]);
                                  setAddItemUserErrors([]);
                                  setUpdateItemUserErrors([]);
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
                            isDisabled={
                              isSoldOut || !isProductPlublishedToStoreApp
                            }
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
                      isDisabled={
                        props.isSubmitting ||
                        isSoldOut ||
                        !isProductPlublishedToStoreApp
                      }
                      aria-disabled={props.isSubmitting}
                    >
                      Add to Cart
                    </Button>
                    {addItemToCartLoading && (
                      <VStack role="status">
                        <Spinner color="colorPalette.600" />
                        <Text color="colorPalette.600">Adding item...</Text>
                      </VStack>
                    )}
                    {updateItemsToCartLoading && (
                      <VStack role="status">
                        <Spinner color="colorPalette.600" />
                        <Text color="colorPalette.600">Updating item...</Text>
                      </VStack>
                    )}
                  </VStack>
                  {addItemToCartWarnings.length > 0 && (
                    <Alert status="warning">
                      <AlertIcon />
                      Your item was added, but there may be some limitations.
                      Please review your cart before checkout.
                    </Alert>
                  )}
                  {updateItemsToCartWarnings.length > 0 && (
                    <Alert status="warning">
                      <AlertIcon />
                      Your cart was updated, but there may be some limitations.
                      Please review your cart before checkout.
                    </Alert>
                  )}

                  {hasResponseError && (
                    <Alert status="error">
                      <AlertIcon />
                      <span>
                        We couldn’t add this item to your cart. Please try again
                        or{" "}
                        <Link to="/contact" className="underline">
                          contact support
                        </Link>
                        .
                      </span>
                    </Alert>
                  )}

                  {addItemUserErrors.length > 0 && (
                    <Alert status="error">
                      <AlertIcon />
                      <span>
                        We couldn’t add this item to your cart. Please try again
                        or{" "}
                        <Link to="/contact" className="underline">
                          contact support
                        </Link>
                        .
                      </span>
                    </Alert>
                  )}
                  {updateItemUserErrors.length > 0 && (
                    <Alert status="error">
                      <AlertIcon />
                      <span>
                        We couldn’t update your cart. Please try again or{" "}
                        <Link to="/contact" className="underline">
                          contact support
                        </Link>
                        .
                      </span>
                    </Alert>
                  )}
                </Form>
              </CardBody>
            </Container>
            <Container p="4">
              <Flex
                direction={{ base: "column", md: "row" }}
                gap={4}
              >
                <Box id="main-image" flex="1">
                  {!featuredImageDetail && !variantFoundImage && (
                    <Image
                      data-testid="no-image-found"
                      src={notFoundImage}
                      alt="No image available"
                      loading="eager"
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

                  {featuredImageDetail && !variantFoundImage && (
                    <InnerImageZoom
                      src={featuredImageDetail.images?.fallback?.src || ""}
                      zoomSrc={product.featuredImage?.originalSrc || ""}
                      fullscreenOnMobile={true}
                      sources={featuredImageDetail.images?.sources}
                      imgAttributes={{
                        alt: product.featuredImage?.altText || product.title,
                        loading: "eager",
                      }}
                    />
                  )}

                  {variantFoundImage && props.values.variant !== "" && (
                    <SafeZoom>
                      <GatsbyImage
                        className="shadow-md cursor-zoom-in object-cover max-w-full my-4"
                        image={variantFoundImage}
                        alt={
                          variantFound.image.altText ||
                          `${props.values.variant} ${product.title}`
                        }
                        loading="lazy"
                      />
                    </SafeZoom>
                  )}
                </Box>

                {!product.hasOnlyDefaultVariant && (
                  <Flex
                    direction="column"
                    gap={2}
                    w={{ base: "100%", md: "5rem" }}
                  >
                    {product.variants.map((variant, index) => {
                      if (!variant.image) {
                        return;
                      }
                      const variantImage = getImage(variant.image);
                      return (
                        variantImage && (
                          <Box key={index} className="w-20 relative">
                            <SafeZoom>
                              <GatsbyImage
                                image={variantImage}
                                alt={
                                  variant.image.altText ||
                                  `${variant.title} ${product.title}`
                                }
                                loading="lazy"
                                className="rounded object-cover w-full h-full"
                              />
                            </SafeZoom>
                            <Text
                              fontSize="xs"
                              color="white"
                              bg="blackAlpha.600"
                              position="absolute"
                              bottom={0}
                              left={0}
                              right={0}
                              textAlign="center"
                              py={0.5}
                              className="rounded-b"
                            >
                              {variant.title}
                            </Text>
                          </Box>
                        )
                      );
                    })}
                  </Flex>
                )}
              </Flex>

              {product.mediaCount > 0 && (
                <>
                <Heading
                  as="h3"
                  size="md"
                  fontWeight="bold"
                  color="teal.600"
                  mt={4}
                  mb={2}
                >
                  Details gallery:
                </Heading>
                <Flex flexDirection={["column", "row"]} flexWrap="wrap">
                  {product.media.map((mediaItem, index) => {
                    if (mediaItem.mediaContentType !== "IMAGE") {
                      return;
                    }
                    const mediaImage =
                      mediaItem.preview?.image &&
                      getImage(mediaItem?.preview?.image);

                    return (
                      mediaImage && (
                        <div key={`media-${index}`} className="relative inline-block m-2">
                          <SafeZoom>
                            <Box className="w-20">
                              <GatsbyImage
                                image={mediaImage}
                                alt={
                                  mediaItem.preview?.image.altText ||
                                  product.title
                                }
                                loading="lazy"
                                className="rounded object-cover w-full h-full"
                              />
                            </Box>
                          </SafeZoom>
                        </div>
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
