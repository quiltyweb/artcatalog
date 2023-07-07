import React from "react";
import Layout from "./src/components/Layout";
import { CartProvider } from "./src/context/CartContext";

export const wrapPageElement = ({ element, props }) => (
  <CartProvider>
    <Layout {...props}>{element}</Layout>
  </CartProvider>
);
