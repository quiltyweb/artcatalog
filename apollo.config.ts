module.exports = {
  client: {
    service: {
      name: "artcatalog-graphql-app",
      url: `https://${process.env.GATSBY_SHOPIFY_STORE_URL}/api/2023-10/graphql.json`,
      // optional headers
      headers: {
        "X-Shopify-Storefront-Access-Token":
          process.env.GATSBY_SHOPIFY_STOREFRONT_PASSWORD,
      },
      // optionally turn off SSL validation check
      skipSSLValidation: true,
    },
  },
};
