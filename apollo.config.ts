module.exports = {
  client: {
    service: {
      name: "artcatalog-graphql-app",
      url: `https://${process.env.SHOPIFY_STORE_NAME}.myshopify.com/api/2023-10/graphql.json`,
      // optional headers
      headers: {
        "X-Shopify-Storefront-Access-Token":
          process.env.SHOPIFY_STOREFRONT_PASSWORD,
      },
      // optionally turn off SSL validation check
      skipSSLValidation: true,
    },
  },
};
