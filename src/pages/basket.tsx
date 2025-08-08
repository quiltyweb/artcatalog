import React from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Heading,
  Img,
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
} from "../context/StoreContext";
import { StaticImage } from "gatsby-plugin-image";
import SEO from "../components/SEO";
import { DeleteIcon } from "@chakra-ui/icons";
import QuoteForm from "../components/QuoteForm";
import CallToActionButton from "../components/CallToActionButton";
import { Link } from "gatsby";
import { formatPrice } from "../utils/formatPrice";

const BreadcrumbMenuCart = () => {
  return (
    <>
      <Breadcrumb mb="2.4rem" fontSize={["sm", "md"]}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">Cart</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Alert
        status="info"
        flexDir={["column", "row"]}
        aria-labelledby="message"
      >
        <AlertIcon />
        <AlertTitle id="message">
          Brushella.art is under construction.
        </AlertTitle>
        <AlertDescription>
          This store can’t accept payments right now.
        </AlertDescription>
      </Alert>
    </>
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
            <Th display={["none", "table-cell"]}>thumbnail</Th>
            <Th>product</Th>
            <Th>unit price</Th>
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
        Check out
      </Button>
    </Box>
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
      <Container as="section" maxW={"1200px"} padding={"4rem 0.5rem"}>
        <BreadcrumbMenuCart />
        <Heading as="h2" color="teal.500" mb="2.4rem">
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
        <Heading as="h2" color="teal.500" mb="2.4rem" mt="2.4rem">
          Shopping Cart
        </Heading>
        <Heading as="h3" size="md" fontWeight="normal">
          Your cart is empty.
        </Heading>
        <CallToActionButton title="Shop now" link="/collections" />
      </Container>
    );
  }

  return (
    <Container as="section" maxW={"1200px"} padding={"4rem 0.5rem"}>
      <BreadcrumbMenuCart />
      <Heading as="h2" color="teal.500" mb="2.4rem" mt="2.4rem">
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
                <Th>thumbnail</Th>
                <Th>product</Th>
                <Th>price</Th>
                <Th>quantity</Th>
                <Th>remove</Th>
                <Th>total</Th>
              </Tr>
            </Thead>
          )}

          <Tbody key="table-body-shopping-cart">
            {checkoutLineItems.map((item, index) => {
              const variantPriceWithFormat = formatPrice({
                currency: item.merchandise.price.currencyCode,
                value: Number(item.merchandise.price.amount),
              });

              const lineItemTotalWithFormat = formatPrice({
                currency: item.merchandise.price.currencyCode,
                value: Number(item.merchandise.price.amount) * item.quantity,
              });

              const productTitle = `${item.merchandise.product.title} - ${item.merchandise.title}`;

              if (isDektop) {
                return (
                  <Tr key={`${item.id}-item-${index}`} marginBottom={["2rem"]}>
                    <Td gridArea={"image"}>
                      {item.merchandise.image?.altText ? (
                        <Img
                          src={item.merchandise.image.url}
                          alt={item.merchandise.image.altText}
                          key={`${item.id}-${item.merchandise.title}`}
                          style={{
                            borderRadius: "md",
                            boxShadow: "rgba(0, 0, 0, 0.4) 0px 1px 5px",
                            minWidth: "20px",
                            width: "60px",
                            height: "60px",
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
                          width={60}
                          height={60}
                          alt=""
                          src="../images/web-asset-noimg.jpg"
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
                        {productTitle}
                      </Text>
                    </Td>
                    <Td>
                      <Text
                        sx={{
                          textWrap: "wrap",
                          wordWrap: "normal",
                          minWidth: "min-content",
                        }}
                      >
                        {variantPriceWithFormat}
                      </Text>
                    </Td>
                    <Td>
                      <Text
                        sx={{
                          textWrap: "wrap",
                          wordWrap: "normal",
                          minWidth: "min-content",
                        }}
                      >
                        {item.quantity}
                      </Text>
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
                <>
                  <Tr backgroundColor="gray.200">
                    <Th scope="row">thumbnail</Th>
                    <Td gridArea={"image"}>
                      {item.merchandise.image?.altText ? (
                        <Img
                          key={`${item.id}-${item.merchandise.title}`}
                          src={item.merchandise.image.url}
                          alt={item.merchandise.image.altText}
                          style={{
                            borderRadius: "md",
                            boxShadow: "rgba(0, 0, 0, 0.4) 0px 1px 5px",
                            minWidth: "20px",
                            width: "60px",
                            height: "60px",
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
                          width={60}
                          height={60}
                          alt=""
                          src="../images/web-asset-noimg.jpg"
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
                        {productTitle}
                      </Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Th scope="row">unit price</Th>
                    <Td>
                      <Text
                        sx={{
                          textWrap: "wrap",
                          wordWrap: "normal",
                          minWidth: "min-content",
                        }}
                      >
                        {variantPriceWithFormat}
                      </Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Th scope="row">quantity</Th>
                    <Td>
                      <Text
                        sx={{
                          textWrap: "wrap",
                          wordWrap: "normal",
                          minWidth: "min-content",
                        }}
                      >
                        {item.quantity}
                      </Text>
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
                </>
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

      {cartTotals && cartCount > 0 && (
        <QuoteForm checkoutLineItems={checkoutLineItems} />
      )}
    </Container>
  );
};
export default MyBasketPage;

export const Head = (props: any) => {
  return (
    <SEO
      pageTitle="Shopping Cart"
      siteTitle="Brushella"
      description="Shopping Cart with your selected items from the Brushella Store"
    />
  );
};
