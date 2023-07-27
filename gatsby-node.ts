import path from "path";
import type { GatsbyNode } from "gatsby";

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}): Promise<void> => {
  const { createPage } = actions;

  const productsResult = await graphql<Queries.ProductsIntoPagesQuery>(`
    query ProductsIntoPages {
      allShopifyProduct(sort: { title: ASC }) {
        edges {
          node {
            id
            handle
            title
            shopifyId
            description
            priceRangeV2 {
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            featuredImage {
              altText
              gatsbyImageData(
                height: 460
                width: 564
                placeholder: BLURRED
                layout: CONSTRAINED
              )
            }
          }
        }
      }
    }
  `);

  if (productsResult.errors || !productsResult.data) {
    reporter.panicOnBuild(
      `There was an error loading the createPages query results ProductsIntoPages`,
      productsResult.errors
    );
    return;
  }

  productsResult.data?.allShopifyProduct.edges.forEach(({ node }) => {
    createPage({
      path: `/products/${node.handle}`,
      component: path.resolve(`./src/templates/Product.tsx`),
      context: {
        product: node,
      },
    });
  });

  const collectionsResult = await graphql<Queries.CollectionsIntoPagesQuery>(`
    query CollectionsIntoPages {
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
                altText
                gatsbyImageData(height: 460, width: 564)
              }
            }
          }
        }
      }
    }
  `);

  if (collectionsResult.errors || !collectionsResult.data) {
    reporter.panicOnBuild(
      `There was an error loading the createPages query results for CollectionsIntoPages`,
      collectionsResult.errors
    );
    return;
  }
  collectionsResult.data?.allShopifyCollection.edges.forEach(({ node }) => {
    createPage({
      path: `/collections/${node.handle}`,
      component: path.resolve(`./src/templates/Collection.tsx`),
      context: {
        collection: node,
      },
    });
  });
};
