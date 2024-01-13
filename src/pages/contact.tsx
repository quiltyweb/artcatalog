import * as React from "react";
import {
  Heading,
  Text,
  Input,
  FormControl,
  FormHelperText,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import SEO from "../components/SEO";

const ContactPage: React.FunctionComponent = (): React.ReactElement => (
  <>
    <Heading as="h2" color="#4b828f" mb="1rem">
      Send me your questions
    </Heading>
    <Text mb="1rem">
      If you have questions that you cannot find answers to in the FAQ section,
      do not hesitate to contact me.
    </Text>
    <form method="post" action={process.env.REACT_APP_getform_endpoint}>
      <FormControl mb={8}>
        <FormLabel>Name</FormLabel>
        <Input type="text" name="name" />
      </FormControl>
      <FormControl mb={8}>
        <FormLabel>Email address</FormLabel>
        <Input type="email" name="email" />
        <FormHelperText fontSize={"xs"}>
          We'll never share your email.
        </FormHelperText>
      </FormControl>
      <FormControl mb={8}>
        <FormLabel>Message</FormLabel>
        <Input type="text" name="message" />
      </FormControl>
      <Button mt={4} backgroundColor="#86548A" color="#ffffff" type="submit">
        Send Message
      </Button>
    </form>
  </>
);

export default ContactPage;

export const Head = () => (
  <SEO>
    <title id="title">Contact me - www.brushella.art - 404</title>
    <meta
      id="contact-page"
      name="Contact page"
      content="Send me your enquiries via the contact form"
    />
  </SEO>
);
