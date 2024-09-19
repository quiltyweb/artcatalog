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
          placeholder: "dominantColor",
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
      resolve: `gatsby-source-shopify`,
      options: {
        password: process.env.GATSBY_SHOPIFY_ADMIN_PASSWORD,
        storeUrl: process.env.GATSBY_SHOPIFY_STORE_URL,
        shopifyConnections: ["orders", "collections", "locations"],
        apiVersion: "2023-10",
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "AdminShopify",
        fieldName: "adminshopify",
        url: `https://${process.env.GATSBY_SHOPIFY_STORE_URL}/admin/api/2023-10/graphql.json`,
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
        url: `https://${process.env.GATSBY_SHOPIFY_STORE_URL}/api/2023-10/graphql.json`,
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
            name: `OpenSans`,
            file: `https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=swap`,
          },
          {
            name: `Raleway`,
            file: `https://fonts.googleapis.com/css2?family=Raleway:wght@700&display=swap`,
          },
        ],
      },
    },
  ],
  graphqlTypegen: true,
};

export default config;
