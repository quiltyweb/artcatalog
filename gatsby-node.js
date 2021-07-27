const path = require(`path`);

async function turnProductsIntoPages({ graphql, actions }) {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allShopifyProduct(sort: { fields: [title] }) {
        edges {
          node {
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
              gatsbyImageData(width: 910, height: 910)
            }
          }
        }
      }
    }
  `);

  result.data.allShopifyProduct.edges.forEach(({ node }) => {
    createPage({
      path: `/products/${node.handle}`,
      component: path.resolve(`./src/templates/product.tsx`),
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
            }
          }
        }
      }
    }
  `);

  result.data.allShopifyCollection.edges.forEach(({ node }) => {
    createPage({
      path: `/collections/${node.handle}`,
      component: path.resolve(`./src/templates/collection.tsx`),
      context: {
        collection: node,
      },
    });
  });
}

exports.createPages = async (params) => {
  await Promise.all([turnProductsIntoPages(params), turnCollectionsIntoPages(params)]);
};
