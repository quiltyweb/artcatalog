import type { GatsbyConfig } from "gatsby";
import dotenv from "dotenv";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Brushella",
    siteUrl: "https://www.brushella.art",
    description: "Brushella Art and Decor Store",
    image: "/brushella-icon.svg",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-gatsby-cloud",
    {
      resolve: "gatsby-plugin-image",
      options: {
        defaults: {
          placeholder: "blurred",
        },
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "@chakra-ui/gatsby-plugin",
      options: {
        resetCSS: true,
        isBaseProvider: false,
      },
    },
    {
      resolve: "gatsby-source-shopify",
      options: {
        storeUrl: "brushella-dev.myshopify.com",
        password: process.env.GATSBY_SHOPIFY_ADMIN_PASSWORD,
        salesChannel: process.env.GATSBY_SHOPIFY_APP_ID,
        shopifyConnections: ["collections"],
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "AdminShopify",
        fieldName: "adminshopify",
        url: "https://brushella-dev.myshopify.com/admin/api/2024-10/graphql.json",
        headers: {
          "X-Shopify-Access-Token": process.env.GATSBY_SHOPIFY_ADMIN_PASSWORD,
        },
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "StoreFrontShopify",
        fieldName: "storefrontshopify",
        url: "https://brushellashop.myshopify.com/api/2024-10/graphql.json",
        headers: {
          "X-Shopify-Storefront-Access-Token":
            process.env.GATSBY_SHOPIFY_STOREFRONT_PASSWORD,
        },
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /svg/,
        },
      },
    },
  ],
  graphqlTypegen: true,
};

export default config;
