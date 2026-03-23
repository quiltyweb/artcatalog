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
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "AdminShopify",
        fieldName: "adminshopify",
        url: `https://${process.env.GATSBY_SHOPIFY_STORE_DOMAIN}/admin/api/2025-01/graphql.json`,
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
        url: `https://${process.env.GATSBY_SHOPIFY_STORE_DOMAIN}/api/2025-01/graphql.json`,
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
      resolve: "gatsby-source-shopify",
      options: {
        storeUrl: process.env.GATSBY_SHOPIFY_STORE_DOMAIN,
        password: process.env.GATSBY_SHOPIFY_ADMIN_PASSWORD,
        salesChannel: process.env.GATSBY_SHOPIFY_APP_ID,
        shopifyConnections: ["collections"],
      },
    },
    `gatsby-plugin-postcss`,
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Brushella Art and Decor Store",
        short_name: "Brushella",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#319795",
        display: "standalone",
        icon: "src/images/brushella-icon.png",
        icons: [
          {
            src: "src/images/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "src/images/android-chrome-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "src/images/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
        ],
      },
    },
  ],
  graphqlTypegen: true,
};

export default config;
