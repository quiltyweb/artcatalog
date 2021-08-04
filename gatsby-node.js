const path = require(`path`);

async function turnProductsIntoPages({ graphql, actions }) {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allShopifyProduct(sort: { fields: [title] }) {
        edges {
          node {
            id
            title
            images {
              originalSrc
            }
            shopifyId
            handle
            description
            priceRangeV2 {
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            featuredImage {
              id
              altText
              gatsbyImageData(height: 460, width: 564, placeholder: "BLURRED", layout: CONSTRAINED)
            }
          }
        }
      }
    }
  `);

  result.data.allShopifyProduct.edges.forEach(({ node }) => {
    createPage({
      path: `/products/${node.handle}`,
      component: path.resolve(`./src/templates/Product.tsx`),
      context: {
        product: node,
      },
    });
  });
}

async function turnCollectionsIntoPages({ graphql, actions }) {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allShopifyCollection {
        edges {
          node {
            id
            title
            handle
            description
            products {
              id
              title
              handle
              description
              priceRangeV2 {
                maxVariantPrice {
                  amount
                  currencyCode
                }
              }
              featuredImage {
                id
                altText
                gatsbyImageData(height: 460, width: 564)
              }
            }
          }
        }
      }
    }
  `);

  result.data.allShopifyCollection.edges.forEach(({ node }) => {
    createPage({
      path: `/collections/${node.handle}`,
      component: path.resolve(`./src/templates/Collection.tsx`),
      context: {
        collection: node,
      },
    });
  });
}

exports.createPages = async (params) => {
  await Promise.all([turnProductsIntoPages(params), turnCollectionsIntoPages(params)]);
};
