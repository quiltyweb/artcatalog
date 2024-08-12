import * as React from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
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
} from "../context/StoreContext";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import SEO from "../components/SEO";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getShopifyImage } from "gatsby-source-shopify";

const SubmitSchema = Yup.object().shape({
  fullname: Yup.string().max(100, "Too Long!").required("Name is Required"),
  email: Yup.string().email("Invalid email").required("Email is Required"),
  message: Yup.string().required("Message is Required"),
});
interface FormValues {
  fullname: string;
  email: string;
  message: string;
}

const MyBasketPage: React.FunctionComponent = (): React.ReactElement => {
  const cartCount = useLineItemsCount();
  const checkoutLineItems = useCheckoutLineItems();
  const removeItemFromCart = useRemoveItemFromCart();

  const getItemsFromBasket = (): string => {
    const cartForMessage = checkoutLineItems.map((item) => {
      return `${item.quantity} ${item.title}`;
    });
    return cartForMessage.join(" __ ");
  };
  return (
    <Box display="flex" flexDirection="column">
      <Heading as="h2">My Shopping Bag</Heading>
      <TableContainer width={["100%", "md", "xl", "2xl", "3xl"]}>
        <Table size="md">
          <TableCaption>
            {cartCount === 0 && `There are no items in your bag`}
            {cartCount === 1 && `There is 1 item in your bag`}
            {cartCount > 1 && `There are ${cartCount} items in your bag`}
          </TableCaption>
          <Thead>
            <Tr>
              <Th textAlign="center" padding={["0", "xs", "xs", "sm", "sm"]}>
                Image
              </Th>
              <Th>Item</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {checkoutLineItems.map((item, index) => {
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
                  width: 80,
                  height: 80,
                });

              return (
                <Tr key={`${item.id}-item-${index}`}>
                  <Td padding={["0.1rem", "xs", "xs", "sm", "sm"]}>
                    <Box width="80px">
                      {image ? (
                        <GatsbyImage
                          key={variantImage.src}
                          image={image}
                          alt={variantImage.altText ?? item.title}
                          style={{
                            borderRadius: "3px",
                            boxShadow: "rgba(0, 0, 0, 0.4) 0px 1px 5px",
                          }}
                        />
                      ) : (
                        <StaticImage
                          style={{
                            filter: "grayscale(1)",
                            borderRadius: "6px",
                            marginBottom: "2rem",
                          }}
                          width={80}
                          height={80}
                          alt={item.title}
                          src="../images/noimg.jpg"
                        />
                      )}
                    </Box>
                  </Td>
                  <Td>
                    <Text
                      maxW="150px"
                      style={{
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                      }}
                    >
                      {item.quantity} {item.title}
                    </Text>
                  </Td>
                  <Td>
                    <Button onClick={() => removeItemFromCart(item.id)}>
                      Delete item
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>

      {cartCount >= 1 && (
        <Formik
          initialValues={{
            fullname: "",
            email: "",
            message: getItemsFromBasket(),
          }}
          validationSchema={SubmitSchema}
          onSubmit={async (
            { fullname, email, message }: FormValues,
            { setStatus }
          ) => {
            const res = await fetch(
              "https://www.formbackend.com/f/a89f490517ad6461",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify({ fullname, email, message }),
              }
            );

            if (!res.ok) {
              setStatus({
                sent: false,
                message:
                  "There was an error sending your quote. Please try again later.",
              });
            } else {
              if (res.status === 200) {
                setStatus({
                  sent: true,
                  message: "Your quote was sent succesfully!",
                });
              }
            }
          }}
        >
          {(props) => {
            return (
              <>
                {props.status && props.status.sent && (
                  <Alert status="success" id="bag-status-success">
                    <AlertIcon />
                    {props.status.message}
                  </Alert>
                )}
                {props.status && !props.status.sent && (
                  <Alert status="error">
                    <AlertIcon />
                    {props.status.message}
                  </Alert>
                )}

                {!props.status && (
                  <Form data-testid="quote-contact-form">
                    <Field name="fullname" type="text">
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.fullname && form.touched.fullname
                          }
                          mb={8}
                        >
                          <FormLabel>Full Name</FormLabel>
                          <Input {...field} />
                          <FormErrorMessage>
                            <ErrorMessage name="fullname" />
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="email" type="email">
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.email && form.touched.email}
                          mb={8}
                        >
                          <FormLabel>Email address</FormLabel>
                          <Input {...field} />
                          <FormErrorMessage>
                            <ErrorMessage name="email" />
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Button
                      isLoading={props.isSubmitting}
                      mt={4}
                      backgroundColor="#86548A"
                      color="#ffffff"
                      colorScheme="teal"
                      type="submit"
                    >
                      Get a quote
                    </Button>
                  </Form>
                )}
              </>
            );
          }}
        </Formik>
      )}
    </Box>
  );
};
export default MyBasketPage;

export const Head = () => (
  <SEO>
    <title id="contact-title">Basket - www.brushella.art - Basket</title>
    <meta
      id="basket-page"
      name="Basket page"
      content="get a quote of brushella items"
    />
  </SEO>
);
