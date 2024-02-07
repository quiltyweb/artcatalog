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
  IconButton,
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
import { useCartContext } from "../context/CartContext";
import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image";
import SEO from "../components/SEO";
import { FaRegTimesCircle } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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
  const { cart, deleteItemFromCart } = useCartContext();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const getItemsFromBasket = (): string => {
    const cartForMessage = cart.map((item) => {
      return `${item.quantity} ${item.product.title} / ${item.product.priceRangeV2.maxVariantPrice.amount}`;
    });
    return cartForMessage.join(" __ ");
  };
  return (
    <Box display="flex" flexDirection="column">
      <Heading as="h2">My Basket</Heading>
      <TableContainer width={["100%", "md", "xl", "2xl", "3xl"]}>
        <Table size="md">
          <TableCaption>
            {cartCount === 0 && `There are no items in your basket`}
            {cartCount === 1 && `There is 1 item in your basket`}
            {cartCount > 1 && `There are ${cartCount} items in your basket`}
          </TableCaption>
          <Thead>
            <Tr>
              <Th textAlign="left" padding={["0", "xs", "xs", "sm", "sm"]}>
                Action
              </Th>
              <Th textAlign="center" padding={["0", "xs", "xs", "sm", "sm"]}>
                Image
              </Th>
              <Th>Item</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cart.map((item, index) => {
              const IMAGE = getImage(item.product.featuredImage);
              return (
                <Tr key={`${item.id}-item-${index}`}>
                  <Td padding={["0", "xs", "xs", "sm", "sm"]}>
                    <IconButton
                      onClick={() =>
                        deleteItemFromCart &&
                        deleteItemFromCart({ id: item.id })
                      }
                      key="delete-item-button"
                      data-testid="delete-item-button"
                      aria-label="delete item"
                      title="delete item"
                      icon={<FaRegTimesCircle />}
                      backgroundColor="transparent"
                      color="red"
                      fontSize="16px"
                    />
                  </Td>
                  <Td padding={["0.1rem", "xs", "xs", "sm", "sm"]}>
                    <Box width="80px">
                      {IMAGE ? (
                        <GatsbyImage
                          image={IMAGE}
                          alt={
                            item.product.featuredImage?.altText ||
                            item.product.title
                          }
                          style={{
                            borderRadius: "3px",
                            boxShadow: "rgba(0, 0, 0, 0.4) 0px 1px 5px",
                          }}
                        />
                      ) : (
                        <StaticImage
                          style={{
                            filter: "grayscale(1)",
                            borderRadius: "3px",
                            boxShadow: "rgba(0, 0, 0, 0.4) 0px 1px 5px",
                          }}
                          alt="no product image available"
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
                      {item.quantity} {item.product.title}
                    </Text>
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
          onSubmit={async (values: FormValues, { setStatus }) => {
            const body = new FormData();
            Object.entries(values).forEach(([key, val]) => {
              body.append(key, val);
            });

            const res = await fetch(
              `https://getform.io/f/${process.env.REACT_APP_GETFORM_ENDPOINT}`,
              {
                method: "POST",
                headers: { accept: "application/json" },
                body,
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
                  <Alert status="success" id="basket-status-success">
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
