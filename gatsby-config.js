require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    siteUrl: 'https://artcatalogmain.gatsbyjs.io/',
    title: 'Art Catalog 1.0',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-gatsby-cloud',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    {
      resolve: '@chakra-ui/gatsby-plugin',
      options: {
        resetCSS: true,
      },
    },
    {
      resolve: `gatsby-source-shopify`,
      options: {
        password: process.env.SHOPIFY_ADMIN_PASSWORD,
        storeUrl: process.env.SHOPIFY_STORE_URL,
        shopifyConnections: ['collections'],
      },
    },
  ],
};
