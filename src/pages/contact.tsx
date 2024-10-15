import * as React from "react";
import {
  Heading,
  Text,
  Input,
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
  Textarea,
  Alert,
  AlertIcon,
  Box,
  Container,
} from "@chakra-ui/react";
import SEO from "../components/SEO";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "gatsby";

const SubmitSchema = Yup.object().shape({
  fullname: Yup.string().max(100, "Too Long!").required("Name is Required"),
  email: Yup.string().email("Invalid email").required("Email is Required"),
  message: Yup.string()
    .min(5, "Too Short!")
    .max(251, "Too Long!")
    .required("Message is Required"),
});
interface FormValues {
  fullname: string;
  email: string;
  message: string;
}

const ContactPage: React.FunctionComponent = (): React.ReactElement => (
  <Container as="section" maxW={"1200px"} padding={"4rem 0.5rem"}>
    <Heading as="h2" color="teal.500" mb="2.4rem">
      Contact me
    </Heading>
    <Text
      maxWidth={["100%", "100%", "60%"]}
      mb="2.4rem"
      lineHeight={7}
      fontWeight={"medium"}
      id="contact-form-description"
      data-testid="contact-form-description"
    >
      If you have questions that you cannot find answers in the{" "}
      <Link to="/about" style={{ textDecoration: "underline" }}>
        about me page
      </Link>{" "}
      or{" "}
      <a href="#quicklinks" style={{ textDecoration: "underline" }}>
        quick links section
      </a>
      , do not hesitate to contact me via the contact form below. Please allow 3
      to 5 bussiness days to answer.
    </Text>
    <Box maxW="lg">
      <Formik
        initialValues={{
          fullname: "",
          email: "",
          message: "",
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
                "There was an error sending your message. Please try again later.",
            });
          } else {
            if (res.status === 200) {
              setStatus({
                sent: true,
                message: "You message was sent succesfully!",
              });
            }
          }
        }}
      >
        {(props) => {
          return (
            <>
              {props.status && props.status.sent && (
                <Alert status="success">
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
                <Form data-testid="contact-form">
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
                  <Field name="message" type="text">
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={form.errors.message && form.touched.message}
                        mb={8}
                      >
                        <FormLabel>Message</FormLabel>
                        <Textarea {...field} />
                        <FormErrorMessage>
                          <ErrorMessage name="message" />
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
                    Send Message
                  </Button>
                </Form>
              )}
            </>
          );
        }}
      </Formik>
    </Box>
  </Container>
);

export default ContactPage;

export const Head = (props: any) => {
  return (
    <SEO
      pageTitle="Contact Page"
      siteTitle="Brushella"
      description="Contact page to send enquiries to Brushella Store via the contact form"
    />
  );
};
