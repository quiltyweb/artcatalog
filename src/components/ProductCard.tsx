import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import DOMPurify from "dompurify";
import SafeZoom from "./SafeZoom";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import {
  Box,
  Heading,
  Text,
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
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
import confetti from "canvas-confetti";
import { useMarket } from "../context/MarketContext";

export type MarketPrice = {
  amount: number;
  maxAmount: number;
  currencyCode: string;
  variants: Record<string, number>;
};

type ProductCardProps = {
  product: Queries.CollectionsAndProductsIntoPagesQuery["allShopifyCollection"]["nodes"][0]["products"][0];
  printVersion: Queries.CollectionsAndProductsIntoPagesQuery["allShopifyProduct"]["nodes"][0];
  marketPrice?: MarketPrice | null;
};

type ProductMediaItem = NonNullable<
  ProductCardProps["product"]["media"]
>[number];

const VideoMediaThumbnail: React.FunctionComponent<{
  mediaItem: ProductMediaItem;
  productTitle: string;
}> = ({ mediaItem, productTitle }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const sources = ("sources" in mediaItem && mediaItem.sources) || [];
  const previewImage = mediaItem.preview?.image;
  const thumbnail = previewImage && getImage(previewImage);
  const label =
    mediaItem.alt || previewImage?.altText || `Video for ${productTitle}`;

  if (sources.length === 0 || !thumbnail) {
    return null;
  }

  return (
    <>
      <Box
        as="button"
        type="button"
        onClick={onOpen}
        aria-label={`Play video: ${label}`}
        display="inline-flex"
        flexDirection="column"
        alignItems="center"
        m={2}
        w="8rem"
        cursor="pointer"
        bg="transparent"
        border="none"
        p={0}
        _focusVisible={{
          outline: "3px solid",
          outlineColor: "teal.500",
          outlineOffset: "2px",
          borderRadius: "md",
        }}
      >
        <Box
          position="relative"
          w="5rem"
          h="5rem"
          borderRadius="md"
          overflow="hidden"
        >
          <GatsbyImage
            image={thumbnail}
            alt={label}
            loading="lazy"
            className="rounded object-cover w-full h-full"
            style={{ width: "100%", height: "100%" }}
          />
          <Box
            position="absolute"
            inset={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="blackAlpha.400"
            aria-hidden="true"
          >
            <Box
              as="span"
              fontSize="3xl"
              lineHeight="1"
              color="white"
              textShadow="0 1px 4px rgba(0,0,0,0.6)"
            >
              ▶
            </Box>
          </Box>
        </Box>
        <Text
          mt={1}
          fontSize="xs"
          fontWeight="medium"
          color="teal.700"
          textAlign="center"
          lineHeight="short"
        >
          Watch the hand embellishment process here
        </Text>
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "full", md: "xl" }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody
            p={4}
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={3}
          >
            {isOpen && (
              <>
                <video
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  aria-label={label}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "80vh",
                    height: "auto",
                    borderRadius: "6px",
                  }}
                >
                  {sources.map((source) => (
                    <source
                      key={source.url}
                      src={source.url}
                      type={source.mimeType}
                    />
                  ))}
                </video>
                <Text
                  aria-hidden="true"
                  fontSize="sm"
                  color="gray.700"
                  textAlign="center"
                  maxW="60ch"
                >
                  {label}
                </Text>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
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
  marketPrice,
}): React.ReactElement => {
  const { countryCode } = useMarket();
  const hasMarketPrice = countryCode !== "AU" && !!marketPrice;
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

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [hasDescriptionOverflow, setHasDescriptionOverflow] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      setHasDescriptionOverflow(descriptionRef.current.scrollHeight > 100);
    }
  }, [product.descriptionHtml]);

  const currencyCode = hasMarketPrice
    ? marketPrice!.currencyCode
    : product.priceRangeV2.maxVariantPrice.currencyCode;
  const isProductPlublishedToStoreApp = product.status === "ACTIVE";

  const initialValues: ProductCardFormValues = {
    id: product.id,
    product: product,
    quantity: 1,
    variant: product.hasOnlyDefaultVariant
      ? product.variants[0]?.selectedOptions[0]?.value ?? ""
      : "",
  };

  const addToCartButtonRef = useRef<HTMLButtonElement>(null);

  const firePartyPopper = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const button = addToCartButtonRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText =
      "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;";
    document.body.appendChild(canvas);
    const shoot = confetti.create(canvas, { resize: true });
    shoot({
      particleCount: 80,
      spread: 70,
      origin: { x, y },
      colors: ["#86548A", "#f9c6ff", "#ffffff", "#ffd700", "#ff69b4"],
      startVelocity: 35,
      scalar: 0.9,
      ticks: 60,
      gravity: 2,
    })?.then(() => canvas.remove());
  };

  const toast = useToast();
  const getToastPosition = () =>
    window.innerWidth >= 768 ? "top-right" : "top";

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
              firePartyPopper();
              setTimeout(() => {
                toast({
                  title: "Cart updated.",
                  description: `Updated ${productMainTitle} - ${selectedVariant.title}`,
                  status: "success",
                  duration: 2000,
                  isClosable: true,
                  position: getToastPosition(),
                });
              }, 600);
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
            firePartyPopper();
            setTimeout(() => {
              toast({
                title: "Item added to cart.",
                description: `Added ${productMainTitle} - ${selectedVariant.title}`,
                status: "success",
                duration: 2000,
                isClosable: true,
                position: getToastPosition(),
              });
            }, 600);
            setFieldValue("quantity", 1);
          })
          .catch((err) => {
            toast({
              title: "Unable to add item to cart.",
              description: "Something went wrong. Please try again.",
              status: "error",
              duration: 2000,
              isClosable: true,
              position: getToastPosition(),
            });
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      {(props: FormikProps<ProductCardFormValues>) => {
        const minPrice = formatPrice({
          currency: hasMarketPrice
            ? marketPrice!.currencyCode
            : product.priceRangeV2.minVariantPrice.currencyCode,
          value: hasMarketPrice
            ? marketPrice!.amount
            : product.priceRangeV2.minVariantPrice.amount,
        });

        const variantFound = props.values.product.variants.find((variant) => {
          return (
            variant.selectedOptions[0].value.toLowerCase() ==
            props.values.variant.toLowerCase()
          );
        });
        const variantFoundImage =
          variantFound?.image && getImage(variantFound.image);

        const variantAmount = hasMarketPrice && variantFound?.shopifyId
          ? (marketPrice!.variants[variantFound.shopifyId] ?? marketPrice!.amount)
          : (variantFound?.price ?? 0);

        const variantPriceWithFormat = formatPrice({
          currency: currencyCode,
          value: variantAmount,
        });

        const isGiftCard = product.isGiftCard;
        const isSoldOut =
          !isGiftCard &&
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
            <Box
              display={["block", "block", "none"]}
              order={[0, 0, 99]}
              width="100%"
              px={4}
              pt={4}
            >
              <Heading as="h2" size="md" color="pink.800" lineHeight="normal">
                {`'${productMainTitle}'`}
              </Heading>
              {productSubTitle && (
                <Text fontSize="xl" color="pink.800" lineHeight="normal">
                  {productSubTitle}
                </Text>
              )}
              {isSoldOut && (
                <Badge variant="solid" size="md" color="#ffffff" backgroundColor="black" padding={2} my={4} mr={2}>
                  Sold out
                </Badge>
              )}
              {product.productType && (
                <Badge variant="outline" size="md" color="#000000" backgroundColor="white" padding={2} my={4} mr={2}>
                  {product.productType}
                </Badge>
              )}
              {!isProductPlublishedToStoreApp && (
                <Badge variant="solid" size="md" color="#ffffff" backgroundColor="black" padding={1}>
                  Item unavailable
                </Badge>
              )}
            </Box>
            <Container order={[2, 2, 0]}>
              <CardBody>
                <Heading as="h2" color="pink.800" lineHeight="normal" display={["none", "none", "block"]}>
                  {`'${productMainTitle}'`}
                </Heading>
                {productSubTitle && (
                  <Text fontSize="xl" color="pink.800" lineHeight="normal" display={["none", "none", "block"]}>
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
                    display={["none", "none", "inline-flex"]}
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
                    display={["none", "none", "inline-flex"]}
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
                    display={["none", "none", "inline-flex"]}
                  >
                    Item unavailable
                  </Badge>
                )}
                <Box position="relative" mb={6}>
                  <Box
                    ref={descriptionRef}
                    id={`product-description-${product.id}`}
                    className="prose prose-lg max-w-none"
                    maxHeight={isDescriptionExpanded ? "none" : "100px"}
                    overflow="hidden"
                    dangerouslySetInnerHTML={{
                      __html:
                        typeof window !== "undefined"
                          ? DOMPurify.sanitize(product.descriptionHtml)
                          : product.descriptionHtml,
                    }}
                  />
                  {!isDescriptionExpanded && hasDescriptionOverflow && (
                    <Box
                      position="absolute"
                      bottom={0}
                      left={0}
                      right={0}
                      height="80px"
                      background="linear-gradient(to bottom, transparent, white)"
                      pointerEvents="none"
                      aria-hidden={true}
                    />
                  )}
                  {hasDescriptionOverflow && (
                    <Button
                      variant="link"
                      size="sm"
                      mt={2}
                      color="teal.600"
                      fontWeight="medium"
                      onClick={() => setIsDescriptionExpanded((prev) => !prev)}
                      aria-expanded={isDescriptionExpanded}
                      aria-controls={`product-description-${product.id}`}
                      rightIcon={isDescriptionExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    >
                      {isDescriptionExpanded ? "Read less" : "Read more"}
                    </Button>
                  )}
                </Box>
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
                      {minPrice}{" "}
                      <Text as="span" fontSize="sm" color="gray.600">{currencyCode}</Text>
                    </>
                  )}
                  {props.values.variant !== "" && (
                    <>
                      {variantPriceWithFormat}{" "}
                      <Text as="span" fontSize="sm" color="gray.600">{currencyCode}</Text>
                    </>
                  )}
                </Box>
                <Form>
                  <Box
                    data-testid="sticky-form-controls"
                    position={["fixed", "fixed", "static"]}
                    bottom={["0", "0", "auto"]}
                    left={["0", "0", "auto"]}
                    right={["0", "0", "auto"]}
                    zIndex={[10, 10, "auto"]}
                    bg={["white", "white", "transparent"]}
                    p={[3, 3, 0]}
                    boxShadow={["0 -2px 10px rgba(0,0,0,0.15)", "0 -2px 10px rgba(0,0,0,0.15)", "none"]}
                    w="100%"
                  >
                    <Flex direction={["row", "row", "column"]} gap={2} mb={[2, 2, 0]}>
                      {!product.hasOnlyDefaultVariant &&
                        product.options.length > 0 &&
                        product.options.map(({ name, values }, index) => {
                          const variantName = `${name.toLowerCase()}`;
                          return (
                            <Field key={index} name="variant" type="select">
                              {({ field, form }: FieldProps) => (
                                <FormControl isInvalid={!!form.errors.variant} flex={["1", "1", "unset"]}>
                                  <FormLabel
                                    htmlFor="variant"
                                    key={variantName + index}
                                    textTransform="capitalize"
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
                            <FormControl id="quantity" flex={["1", "1", "unset"]}>
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
                    </Flex>
                    <Button
                      ref={addToCartButtonRef}
                      id="add-to-cart"
                      type="submit"
                      backgroundColor="#86548A"
                      color="#ffffff"
                      colorScheme="teal"
                      fontSize="xl"
                      width="100%"
                      padding="6"
                      my={[0, 0, "4"]}
                      isDisabled={
                        props.isSubmitting ||
                        isSoldOut ||
                        !isProductPlublishedToStoreApp
                      }
                      aria-disabled={props.isSubmitting}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                  <Box display={["block", "block", "none"]} h="160px" aria-hidden="true" />
                  <VStack>
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
            <Container p="4" order={[1, 1, 0]}>
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
                    direction={["row", "row", "column"]}
                    flexWrap="wrap"
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
                <Flex flexDirection="row" flexWrap="wrap">
                  {[...product.media].sort((a, b) => {
                    const isLandscape = (item: typeof product.media[0]) => {
                      const h = item.preview?.image?.height ?? 0;
                      const w = item.preview?.image?.width ?? 0;
                      return w >= h ? 1 : 0;
                    };
                    return isLandscape(a) - isLandscape(b);
                  }).map((mediaItem, index) => {
                    if (mediaItem.mediaContentType === "VIDEO") {
                      return (
                        <VideoMediaThumbnail
                          key={`media-${index}`}
                          mediaItem={mediaItem}
                          productTitle={product.title}
                        />
                      );
                    }

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
