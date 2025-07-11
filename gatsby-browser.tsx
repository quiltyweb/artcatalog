import * as React from "react";
import type { GatsbyBrowser } from "gatsby";
import Layout from "./src/components/Layout";
import { StoreApp } from "./src/context/StoreContext";
import { ChakraProvider } from "@chakra-ui/react";
import { SkipToContentLink } from "./src/components/SkipToContentLink";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/source-sans-3";
import "./src/styles/global.css";

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({
  element,
}) => (
  <ChakraProvider>
    <SkipToContentLink />
    <StoreApp>
      <Layout>{element}</Layout>
    </StoreApp>
  </ChakraProvider>
);
