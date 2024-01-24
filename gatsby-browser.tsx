import * as React from "react";
import type { GatsbyBrowser } from "gatsby";
import Layout from "./src/components/Layout";
import { CartProvider } from "./src/context/CartContext";
import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";
import theme from "./src/theme";
import { ChakraProvider } from "@chakra-ui/react";

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
  props,
}) => (
  <ChakraProvider theme={theme}>
    <CartProvider>
      <Layout {...props}>{element}</Layout>
    </CartProvider>
  </ChakraProvider>
);
