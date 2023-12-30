import path from "path";
import type { GatsbyNode } from "gatsby";
import { camelCase, kebabCase, upperFirst } from "lodash";

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

  const adminContentResult = await graphql<Queries.AdminContentIntoPagesQuery>(`
    query AdminContentIntoPages {
      adminshopify {
        metaobjectDefinitions(first: 5) {
          nodes {
            type
            metaobjects(first: 10) {
              nodes {
                fields {
                  key
                  type
                  value
                  definition {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  if (adminContentResult.errors || !adminContentResult.data) {
    reporter.panicOnBuild(
      `There was an error loading the createPages query results for AdminContentIntoPages`,
      collectionsResult.errors
    );
    return;
  }

  const PAGE_METAOBJECT_DEFINITION_TYPES = [
    "legal_content",
    "product_categories",
  ];
  const createPageFromField = (
    type: string,
    field: Queries.AdminContentIntoPagesQuery["adminshopify"]["metaobjectDefinitions"]["nodes"][0]["metaobjects"]["nodes"][0]["fields"][0]
  ) => {
    const pathRoot = `/${kebabCase(type)}`;
    const componentName = upperFirst(camelCase(type));
    createPage({
      path: `${pathRoot}/${field.key}`,
      component: path.resolve(`./src/templates/${componentName}.tsx`),
      context: {
        title: field.definition.name,
        content: field.value,
      },
    });
  };

  adminContentResult.data?.adminshopify?.metaobjectDefinitions?.nodes
    ?.filter(({ type }) => PAGE_METAOBJECT_DEFINITION_TYPES.includes(type))
    ?.forEach(({ type, metaobjects }) => {
      metaobjects.nodes.forEach(({ fields }) => {
        fields.forEach((field) => {
          createPageFromField(type, field);
        });
      });
    });
};
