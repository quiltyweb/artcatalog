import * as React from "react";
import type { GatsbyBrowser } from "gatsby";
import Layout from "./src/components/Layout";
import { StoreContextProvider } from "./src/context/StoreContext";
import theme from "./src/theme.ts";
import { ChakraProvider } from "@chakra-ui/react";
import styled from "styled-components";
import "@fontsource/raleway";
import "@fontsource/open-sans";
import "./src/styles/global.css";

const SkipToContentLink = styled.a`
  padding: 4px;
  font-weight: bold;
  position: absolute;
  background: white;
  color: black;
  left: 0%;
  height: 30px;
  transform: translateY(-100%);
  transition: transform 0.3s;
  z-index: 9999;

  &:focus {
    transform: translateY(0%);
  }
`;

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
  props,
}) => (
  <ChakraProvider theme={theme}>
    <div>
      <SkipToContentLink href="#main">Skip to content</SkipToContentLink>
    </div>
    <StoreContextProvider>
      <Layout {...props}>{element}</Layout>
    </StoreContextProvider>
  </ChakraProvider>
);
