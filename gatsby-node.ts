import path from "path";
import type { GatsbyNode } from "gatsby";
import { camelCase, kebabCase, upperFirst } from "lodash";
import { gql } from "graphql-tag";
import { print } from "graphql";

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}): Promise<void> => {
  const { createPage } = actions;

  const COLLECTIONS_AND_PRODUCTS_DATA = gql`
    query CollectionsAndProductsIntoPages {
      allShopifyCollection(
        filter: { handle: { in: ["prints", "original-paintings"] } }
      ) {
        nodes {
          id
          title
          handle
          description
          descriptionHtml
          products {
            id
            title
            handle
            description
            priceRangeV2 {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            featuredImage {
              altText
              gatsbyImageData(
                width: 500
                layout: CONSTRAINED
                placeholder: BLURRED
              )
            }
            hasOnlyDefaultVariant
            totalVariants
            variants {
              shopifyId
              displayName
              title
              price
              inventoryQuantity
              selectedOptions {
                name
                value
              }
              image {
                src
                altText
                height
                width
                gatsbyImageData(
                  width: 500
                  layout: CONSTRAINED
                  placeholder: BLURRED
                )
                originalSrc
                transformedSrc
              }
            }
            mediaCount
            media {
              id
              alt
              mediaContentType
              preview {
                status
                image {
                  src
                  altText
                  height
                  width
                  gatsbyImageData(
                    height: 82
                    width: 82
                    aspectRatio: 1
                    placeholder: BLURRED
                  )
                  originalSrc
                  transformedSrc
                }
              }
            }
            options {
              shopifyId
              name
              values
            }
          }
        }
      }
    }
  `;
  const collectionsAndProductsResult =
    await graphql<Queries.CollectionsAndProductsIntoPagesQuery>(
      print(COLLECTIONS_AND_PRODUCTS_DATA)
    );

  if (
    collectionsAndProductsResult.errors ||
    !collectionsAndProductsResult.data
  ) {
    reporter.panicOnBuild(
      `There was an error loading the createPages query results for CollectionsAndProductsIntoPages`,
      collectionsAndProductsResult.errors
    );
    return;
  }
  collectionsAndProductsResult.data?.allShopifyCollection.nodes.map((node) => {
    createPage({
      path: `/collections/${node.handle}`,
      component: path.resolve(`./src/templates/Collection.tsx`),
      context: {
        title: node.title,
        products: node.products,
        description: node.description,
        collectionHandle: node.handle,
      },
    });
    node.products.map((product) => {
      createPage({
        path: `/collections/${node.handle}/${product.handle}`,
        component: path.resolve(`./src/templates/SingleProduct.tsx`),
        context: {
          product: product,
          collectionHandle: node.handle,
        },
      });
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
      adminContentResult.errors
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
    const fieldKey = `${kebabCase(field.key)}`;
    const componentName = upperFirst(camelCase(type));
    createPage({
      path: `${pathRoot}/${fieldKey}`,
      component: path.resolve(`./src/templates/${componentName}.tsx`),
      context: {
        title: field.definition.name,
        content: field.value,
        handle: fieldKey,
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
