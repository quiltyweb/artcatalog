import * as React from "react";
import { type GatsbyBrowser } from "gatsby";
import Layout from "./src/components/Layout";
import { StoreApp } from "./src/context/StoreContext";
import { SkipToContentLink } from "./src/components/SkipToContentLink";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/source-sans-3";
import "./src/styles/global.css";
import { LayoutDataProvider } from "./src/context/LayoutContext";

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({
  element,
}) => (
  <LayoutDataProvider>
    <StoreApp>{element}</StoreApp>
  </LayoutDataProvider>
);

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
  props,
}) => {
  return (
    <>
      <SkipToContentLink />
      <Layout {...props}>{element}</Layout>
    </>
  );
};
