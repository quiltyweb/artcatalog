import type { GatsbyConfig } from "gatsby";
import dotenv from "dotenv";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: "https://artcatalogmain.gatsbyjs.io/",
    title: "Brushella",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-image",
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
      resolve: `gatsby-source-shopify`,
      options: {
        password: process.env.SHOPIFY_ADMIN_PASSWORD,
        storeUrl: process.env.SHOPIFY_STORE_URL,
        shopifyConnections: ["orders", "collections", "locations"],
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "AdminShopify",
        fieldName: "adminshopify",
        url: `https://${process.env.SHOPIFY_STORE_NAME}.myshopify.com/admin/api/2023-10/graphql.json`,
        headers: {
          "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_PASSWORD,
        },
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "StoreFrontShopify",
        fieldName: "storefrontshopify",
        url: `https://${process.env.SHOPIFY_STORE_NAME}.myshopify.com/api/2023-10/graphql.json`,
        headers: {
          "X-Shopify-Storefront-Access-Token":
            process.env.SHOPIFY_STOREFRONT_PASSWORD,
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
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [
          `https://fonts.googleapis.com`,
          `https://fonts.gstatic.com`,
        ],
        web: [
          {
            name: `Montserrat`,
            file: `https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap`,
          },
        ],
      },
    },
  ],
  graphqlTypegen: true,
};

export default config;
