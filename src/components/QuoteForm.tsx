import * as React from "react";
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { Cart } from "@shopify/hydrogen-react/storefront-api-types";
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

type QuoteFormProps = {
  checkoutLineItems: Cart["lines"]["nodes"];
};
const QuoteForm: React.FunctionComponent<QuoteFormProps> = ({
  checkoutLineItems,
}): React.ReactElement => {
  const getItemsFromBasket = (): string => {
    const cartForMessage = checkoutLineItems.map((item) => {
      return `${item.quantity} ${item.merchandise.title}`;
    });
    return cartForMessage.join(", ");
  };

  return (
    <>
      <Heading as="h3" size="sm" color="teal.500">
        Quotation form
      </Heading>
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
                message: `Your quote was sent succesfully with the following items: ${message}`,
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
                    {/* TODO: assign type to field, form */}
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
                    {/* TODO: assign type to field, form */}
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
                    Get a Quote
                  </Button>
                </Form>
              )}
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default QuoteForm;
