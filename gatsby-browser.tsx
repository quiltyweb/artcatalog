import * as React from "react";
import type { GatsbyBrowser } from "gatsby";
import Layout from "./src/components/Layout";
import { CartProvider } from "./src/context/CartContext";

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
  props,
}) => (
  <CartProvider>
    <Layout {...props}>{element}</Layout>
  </CartProvider>
);
