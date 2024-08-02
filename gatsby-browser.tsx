import * as React from "react";
import type { GatsbyBrowser } from "gatsby";
import Layout from "./src/components/Layout";
import { StoreContextProvider } from "./src/context/StoreContext";
import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";
import theme from "./src/theme.ts";
import { ChakraProvider } from "@chakra-ui/react";

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
  props,
}) => (
  <ChakraProvider theme={theme}>
    <StoreContextProvider>
      <Layout {...props}>{element}</Layout>
    </StoreContextProvider>
  </ChakraProvider>
);
