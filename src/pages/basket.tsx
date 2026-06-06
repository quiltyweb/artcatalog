import React, { useEffect, useState } from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Heading,
  Img,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Skeleton,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  useLineItemsCount,
  useCheckoutLineItems,
  useRemoveItemFromCart,
  useCartTotals,
  useCheckoutUrl,
  useIsCartLoading,
  useCartLinesUpdate,
} from "../context/StoreContext";
import { StaticImage } from "gatsby-plugin-image";
import SEO from "../components/SEO";
import { DeleteIcon } from "@chakra-ui/icons";
import CallToActionButton from "../components/CallToActionButton";
import { Link } from "gatsby";
import { formatPrice } from "../utils/formatPrice";

const BreadcrumbMenuCart = () => {
  return (
    <Breadcrumb mb="2.4rem" fontSize={["sm", "md"]}>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href="#">Cart</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

const TableLoadingSkeleton = () => {
  return (
    <TableContainer mb="8">
      <Table size="sm">
        <TableCaption placement="bottom" textAlign={["left", "center"]}>
          Shoping cart is loading...
        </TableCaption>
        <Thead>
          <Tr
            display={["flex", "table-row"]}
            justifyContent={["space-between"]}
          >
            <Th display={["none", "table-cell"]}>product image</Th>
            <Th>product</Th>
            <Th display={["none", "table-cell"]}>quantity</Th>
            <Th display={["none", "table-cell"]}>actions</Th>
            <Th display={["none", "table-cell"]}>total</Th>
          </Tr>
        </Thead>
        <Tbody key="table-body-shopping-cart-loading">
          <Tr>
            <Td>
              <Skeleton flex="1" height="10" variant="pulse" />
            </Td>
            <Td>
              <Skeleton flex="1" height="10" variant="pulse" />
            </Td>
            <Td>
              <Skeleton flex="1" height="10" variant="pulse" />
            </Td>
            <Td>
              <Skeleton flex="1" height="10" variant="pulse" />
            </Td>
            <Td>
              <Skeleton flex="1" height="10" variant="pulse" />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

type CartSummaryProps = {
  cartSubtotalPriceWithFormat: string;
  currency: string;
  handleCheckout?: () => void;
};

const CartSummary: React.FunctionComponent<CartSummaryProps> = ({
  cartSubtotalPriceWithFormat,
  currency,
  handleCheckout,
}) => {
  return (
    <Box
      data-testid="summary-section"
      py={6}
      display="grid"
      justifyContent="end"
    >
      <Heading as="h3" size="sm">
        summary
      </Heading>

      <SimpleGrid columns={2} spacing={2}>
        <Box>Subtotal:</Box>
        <Box>
          {cartSubtotalPriceWithFormat} {currency}
        </Box>
        <Box>
          Taxes and{" "}
          <Link
            to="/legal-content/shipping-policy/"
            style={{ textDecoration: "underline" }}
          >
            shipping
          </Link>
          :
        </Box>
        <Box>calculated at check out</Box>
      </SimpleGrid>

      <Button
        mt={4}
        backgroundColor="#86548A"
        color="#ffffff"
        colorScheme="teal"
        type="button"
        onClick={handleCheckout}
      >
        Proceed to Checkout
      </Button>
    </Box>
  );
};

type QuantityInputProps = {
  lineId: string;
  quantity: number;
  productTitle: string;
};

const QuantityInput: React.FunctionComponent<QuantityInputProps> = ({
  lineId,
  quantity,
  productTitle,
}) => {
  const { updateItemsToCart, updateItemsToCartLoading } = useCartLinesUpdate();
  const [value, setValue] = useState<string>(String(quantity));

  useEffect(() => {
    setValue(String(quantity));
  }, [quantity]);

  const commit = (next: number) => {
    if (!Number.isFinite(next) || next < 1 || next === quantity) {
      setValue(String(quantity));
      return;
    }
    updateItemsToCart({ lines: [{ id: lineId, quantity: next }] });
  };

  return (
    <NumberInput
      size="sm"
      min={1}
      value={value}
      isDisabled={updateItemsToCartLoading}
      onChange={(valueAsString) => setValue(valueAsString)}
      onBlur={() => commit(parseInt(value, 10))}
      maxW="6rem"
    >
      <NumberInputField aria-label={`quantity for ${productTitle}`} />
      <NumberInputStepper>
        <NumberIncrementStepper
          aria-label={`increase quantity for ${productTitle}`}
          onClick={() => commit(quantity + 1)}
        />
        <NumberDecrementStepper
          aria-label={`decrease quantity for ${productTitle}`}
          onClick={() => commit(quantity - 1)}
        />
      </NumberInputStepper>
    </NumberInput>
  );
};

const MyBasketPage: React.FunctionComponent = (): React.ReactElement => {
  const cartCount = useLineItemsCount();
  const checkoutLineItems = useCheckoutLineItems();
  const removeItemFromCart = useRemoveItemFromCart();
  const cartTotals = useCartTotals();
  const openCheckoutUrl = useCheckoutUrl();
  const isCartLoading = useIsCartLoading();
  const [isDektop] = useMediaQuery("(min-width: 597px)");

  if (isCartLoading) {
    return (
      <Container
        as="section"
        maxW={"1200px"}
        padding={"4rem 0.5rem"}
        aria-live="polite"
        aria-busy="true"
      >
        <BreadcrumbMenuCart />
        <Heading as="h2" color="teal.600" mb="2.4rem">
          Shopping Cart
        </Heading>
        <TableLoadingSkeleton />
      </Container>
    );
  }

  if (cartCount === 0) {
    return (
      <Container as="section" maxW={"1200px"} padding={"4rem 0.5rem"}>
        <BreadcrumbMenuCart />
        <Heading as="h2" color="teal.600" mb="2.4rem" mt="2.4rem">
          Shopping Cart
        </Heading>
        <Heading as="h3" size="md" fontWeight="normal">
          Your cart is empty.
        </Heading>
        <CallToActionButton title="Browse All Collections" link="/collections" />
      </Container>
    );
  }

  return (
    <Container as="section" maxW={"1200px"} padding={"4rem 0.5rem"}>
      <BreadcrumbMenuCart />
      <Heading as="h2" color="teal.600" mb="2.4rem" mt="2.4rem">
        Shopping Cart
      </Heading>
      <TableContainer mb="8">
        <Table size="sm" variant="simple">
          <TableCaption placement="bottom" textAlign={["left", "center"]}>
            {!cartTotals && "There are no items in your cart"}
            {cartTotals &&
              cartCount === 1 &&
              `1 item in your cart. Subtotal is ${cartTotals.cartSubtotalPriceWithFormat} ${cartTotals.currencyCode}.`}
            {cartTotals &&
              cartCount > 1 &&
              `${cartCount} items in your cart. Subtotal is ${cartTotals.cartSubtotalPriceWithFormat} ${cartTotals.currencyCode}.`}
          </TableCaption>

          {isDektop && (
            <Thead>
              <Tr>
                <Th scope="col">product image</Th>
                <Th scope="col">product</Th>
                <Th scope="col">quantity</Th>
                <Th scope="col">remove</Th>
                <Th scope="col">total</Th>
              </Tr>
            </Thead>
          )}

          <Tbody key="table-body-shopping-cart">
            {checkoutLineItems.map((item, index) => {
              const lineItemTotalWithFormat = formatPrice({
                currency: item.merchandise.price.currencyCode,
                value: Number(item.merchandise.price.amount) * item.quantity,
              });

              const productTitle = `${item.merchandise.product.title} - ${item.merchandise.title}`;

              const productCollectionHandle =
                item.merchandise.product.collections?.nodes?.[0]?.handle;
              const productHandle = item.merchandise.product.handle;
              const productPath =
                productCollectionHandle && productHandle
                  ? `/collections/${productCollectionHandle}/${productHandle}/`
                  : undefined;

              if (isDektop) {
                return (
                  <Tr key={`${item.id}-item-${index}`} marginBottom={["2rem"]}>
                    <Td gridArea={"image"}>
                      {item.merchandise.image?.url ? (
                        <Img
                          src={item.merchandise.image.url}
                          alt={item.merchandise.image.altText ?? ""}
                          key={`${item.id}-${item.merchandise.title}`}
                          loading="lazy"
                          style={{
                            borderRadius: "md",
                            boxShadow: "rgba(0, 0, 0, 0.4) 0px 1px 5px",
                            minWidth: "20px",
                            width: "80px",
                          }}
                        />
                      ) : (
                        <StaticImage
                          data-testid="no-image"
                          key={`no-image-${item.id}-${item.merchandise.title}`}
                          style={{
                            filter: "grayscale(1)",
                            borderRadius: "md",
                            minWidth: "40px",
                          }}
                          width={80}
                          alt="No image available"
                          src="../images/web-asset-noimg.jpg"
                          loading="lazy"
                        />
                      )}
                    </Td>
                    <Td>
                      <Text
                        sx={{
                          textWrap: "wrap",
                          wordWrap: "normal",
                          minWidth: "min-content",
                        }}
                      >
                        {productPath ? (
                          <Link
                            to={productPath}
                            style={{ textDecoration: "underline" }}
                          >
                            {productTitle}
                          </Link>
                        ) : (
                          productTitle
                        )}
                      </Text>
                    </Td>
                    <Td>
                      <QuantityInput
                        lineId={item.id}
                        quantity={item.quantity}
                        productTitle={productTitle}
                      />
                    </Td>
                    <Td>
                      <Button
                        size="sm"
                        onClick={() => removeItemFromCart(item.id)}
                        aria-label={`remove ${productTitle}`}
                      >
                        <DeleteIcon boxSize="1rem" />
                      </Button>
                    </Td>
                    <Td>
                      <Text
                        sx={{
                          textWrap: "wrap",
                          wordWrap: "normal",
                          minWidth: "min-content",
                        }}
                      >
                        {lineItemTotalWithFormat}
                      </Text>
                    </Td>
                  </Tr>
                );
              }

              // mobile first render
              return (
                <React.Fragment key={`${item.id}-mobile-${index}`}>
                  <Tr backgroundColor="gray.200">
                    <Th scope="row">product image</Th>
                    <Td gridArea={"image"}>
                      {item.merchandise.image?.url ? (
                        <Img
                          key={`${item.id}-${item.merchandise.title}`}
                          src={item.merchandise.image.url}
                          alt={item.merchandise.image.altText ?? ""}
                          loading="lazy"
                          style={{
                            borderRadius: "md",
                            boxShadow: "rgba(0, 0, 0, 0.4) 0px 1px 5px",
                            minWidth: "20px",
                            width: "80px",
                          }}
                        />
                      ) : (
                        <StaticImage
                          data-testid="no-image"
                          key={`no-image-${item.id}-${item.merchandise.title}`}
                          style={{
                            filter: "grayscale(1)",
                            borderRadius: "md",
                            minWidth: "40px",
                          }}
                          width={80}
                          alt="No image available"
                          src="../images/web-asset-noimg.jpg"
                          loading="lazy"
                        />
                      )}
                    </Td>
                  </Tr>
                  <Tr>
                    <Th scope="row">product</Th>
                    <Td>
                      <Text
                        sx={{
                          textWrap: "wrap",
                          wordWrap: "normal",
                          minWidth: "min-content",
                        }}
                      >
                        {productPath ? (
                          <Link
                            to={productPath}
                            style={{ textDecoration: "underline" }}
                          >
                            {productTitle}
                          </Link>
                        ) : (
                          productTitle
                        )}
                      </Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Th scope="row">quantity</Th>
                    <Td>
                      <QuantityInput
                        lineId={item.id}
                        quantity={item.quantity}
                        productTitle={productTitle}
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Th scope="row">Remove</Th>
                    <Td>
                      <Button
                        size="sm"
                        onClick={() => removeItemFromCart(item.id)}
                        aria-label={`remove ${productTitle}`}
                      >
                        <DeleteIcon boxSize="1rem" />
                      </Button>
                    </Td>
                  </Tr>
                  <Tr>
                    <Th scope="row">total</Th>
                    <Td>
                      <Text
                        sx={{
                          textWrap: "wrap",
                          wordWrap: "normal",
                          minWidth: "min-content",
                        }}
                      >
                        {lineItemTotalWithFormat}
                      </Text>
                    </Td>
                  </Tr>
                </React.Fragment>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>

      {cartTotals && (
        <CartSummary
          cartSubtotalPriceWithFormat={cartTotals.cartSubtotalPriceWithFormat}
          handleCheckout={openCheckoutUrl}
          currency={cartTotals.currencyCode}
        />
      )}

    </Container>
  );
};
export default MyBasketPage;

export const Head = (props: any) => {
  return (
    <SEO
      pageTitle="Your Shopping Cart"
      siteTitle="Brushella"
      description="Review your selected Brushella artworks and prints. Proceed to checkout to bring original paintings and fine art into your home."
      canonical={`https://www.brushella.art${props.location.pathname}`}
    />
  );
};
