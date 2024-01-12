import * as React from "react";
import { Heading, Text } from "@chakra-ui/react";
import SEO from "../components/SEO";
import { PageProps } from "gatsby";

const ContactPage: React.FunctionComponent<
  PageProps
> = (): React.ReactElement => (
  <main>
    <Heading>Send Me Your Questions.</Heading>
    <Text>
      If you have questions that you cannot find answers to in the FAQ section,
      do not hesitate to contact me.
    </Text>
    <form method="post" action={process.env.REACT_APP_getform_endpoint}>
      <label>
        Email
        <input type="email" name="email" />
      </label>
      <label>
        Name
        <input type="text" name="name" />
      </label>
      <label>
        Message
        <input type="text" name="message" />
      </label>
      <button type="submit">Send Message</button>
    </form>
  </main>
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
