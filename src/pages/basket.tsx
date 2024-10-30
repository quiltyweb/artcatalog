import * as React from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Heading,
  SimpleGrid,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  useLineItemsCount,
  useCheckoutLineItems,
  useRemoveItemFromCart,
  useCartTotals,
  useCheckout,
} from "../context/StoreContext";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import SEO from "../components/SEO";
import { getShopifyImage } from "gatsby-source-shopify";
import { formatPrice } from "../utils/formatPrice";
import { Link } from "gatsby";
import { DeleteIcon } from "@chakra-ui/icons";
import QuoteForm from "../components/QuoteForm";

type CartSummaryProps = {
  cartSubtotalPriceWithFormat: string;
  handleCheckout: () => void;
};

const CartSummary: React.FunctionComponent<CartSummaryProps> = ({
  cartSubtotalPriceWithFormat,
  handleCheckout,
}) => {
  return (
    <Box py={6} display="grid" justifyContent="end">
      <Heading as="h3" size="sm">
        summary
      </Heading>

      <SimpleGrid columns={2} spacing={2}>
        <Box>cart total:</Box>
        <Box>{cartSubtotalPriceWithFormat}</Box>
        <Box>
          taxes and{" "}
          <Link
            to="/legal-content/shipping_policy/"
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
        check out
      </Button>
    </Box>
  );
};

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
const MyBasketPage: React.FunctionComponent = (): React.ReactElement => {
  const cartCount = useLineItemsCount();
  const checkoutLineItems = useCheckoutLineItems();
  const removeItemFromCart = useRemoveItemFromCart();
  const cartSubtotalPrice = useCartTotals();
  const cartSubtotalPriceWithFormat = formatPrice({
    currency: cartSubtotalPrice.currencyCode,
    value: cartSubtotalPrice.amount,
  });
  const handleCheckout = useCheckout();

  if (cartCount === 0) {
    return (
      <Container as="section" maxW={"1200px"} padding={"4rem 0.5rem"}>
        <BreadcrumbMenuCart />
        <Heading as="h2" color="teal.500">
          Shopping Cart
        </Heading>
        <Heading as="h3" size="md" fontWeight="normal">
          Your cart is empty.
        </Heading>
      </Container>
    );
  }

  return (
    <Container as="section" maxW={"1200px"} padding={"4rem 0.5rem"}>
      <BreadcrumbMenuCart />
      <Heading as="h2" color="teal.500" mb="2.4rem">
        Shopping Cart
      </Heading>
      <TableContainer mb="8">
        <Table size="sm">
          {/* TODO: add caption with totals below, when cart is PROD ready */}
          {/* <TableCaption placement="top" textAlign={["left", "center"]}>
            {cartCount === 1 &&
              `1 item in your cart. Total ${cartSubtotalPriceWithFormat}`}
            {cartCount > 1 &&
              `${cartCount} items in your cart. Total ${cartSubtotalPriceWithFormat}`}
          </TableCaption> */}
          {/* TODO: Remove this table caption with no totals. */}
          <TableCaption placement="bottom" textAlign={["left", "center"]}>
            {cartCount === 1 && `1 item in your cart.`}
            {cartCount > 1 && `${cartCount} items in your cart.`}
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
          <Tbody>
            {checkoutLineItems.map((item, index) => {
              const variantPriceWithFormat = formatPrice({
                currency: item.variant?.price?.currencyCode,
                value: Number(item.variant?.price?.amount),
              });

              const lineItemTotalWithFormat = formatPrice({
                currency: item.variant?.price.currencyCode,
                value: Number(item.variant?.price.amount) * item.quantity,
              });

              const variantImage = {
                ...item.variant?.image,
                originalSrc: item.variant?.image?.src,
              };

              const image =
                item.variant?.image &&
                getShopifyImage({
                  image: variantImage,
                  layout: "constrained",
                  crop: "contain",
                  width: 60,
                  height: 60,
                });

              return (
                <Tr
                  key={`${item.id}-item-${index}`}
                  display={["grid", "table-row"]}
                  gridTemplate={[
                    `
                      "image title title unitprice"
                      "image quantity quantity remove"
                      `,
                  ]}
                  gap={["0.1rem"]}
                  marginBottom={["2rem"]}
                >
                  <Td gridArea={"image"}>
                    {image ? (
                      <GatsbyImage
                        key={variantImage.src}
                        image={image}
                        alt={variantImage.altText ?? item.title}
                        style={{
                          borderRadius: "md",
                          boxShadow: "rgba(0, 0, 0, 0.4) 0px 1px 5px",
                          maxWidth: "100%",
                          width: "60px",
                          height: "60px",
                        }}
                      />
                    ) : (
                      <StaticImage
                        style={{
                          filter: "grayscale(1)",
                          borderRadius: "md",
                        }}
                        width={60}
                        height={60}
                        alt={item.title}
                        src="../images/web-asset-noimg.jpg"
                      />
                    )}
                  </Td>

                  <Td gridArea={"title"}>
                    <Text
                      sx={{
                        textWrap: "wrap",
                        wordWrap: "normal",
                        minWidth: "min-content",
                      }}
                    >
                      {`${item.title} - ${item.variant?.title}`}
                    </Text>
                  </Td>

                  <Td gridArea={"unitprice"}>
                    <Text
                      visibility={"hidden"}
                      sx={{
                        textWrap: "wrap",
                        wordWrap: "normal",
                        minWidth: "min-content",
                      }}
                    >
                      unit price: {variantPriceWithFormat}
                    </Text>
                  </Td>

                  <Td gridArea={"quantity"}>
                    <Text
                      sx={{
                        textWrap: "wrap",
                        wordWrap: "normal",
                        minWidth: "min-content",
                      }}
                    >
                      quantity: {item.quantity}
                    </Text>
                  </Td>

                  <Td gridArea={"remove"}>
                    <Button
                      size="sm"
                      onClick={() => removeItemFromCart(item.id)}
                      aria-label={`remove item ${`${item.title} - ${item.variant?.title}`}`}
                    >
                      <DeleteIcon boxSize="1rem" />
                    </Button>
                  </Td>

                  <Td display={["none", "table-cell"]}>
                    <Text
                      visibility={"hidden"}
                      sx={{
                        textWrap: "wrap",
                        wordWrap: "normal",
                        minWidth: "min-content",
                      }}
                    >
                      total: {lineItemTotalWithFormat}
                    </Text>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      {/* TODO: COMMENTED OUT BECAUSE IS WORK IN PROGRESS, CART CHECKOUT NOT PROD READY  */}
      {/* <CartSummary
        cartSubtotalPriceWithFormat={cartSubtotalPriceWithFormat}
        handleCheckout={handleCheckout}
      /> */}

      <QuoteForm checkoutLineItems={checkoutLineItems} cartCount={cartCount} />
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
