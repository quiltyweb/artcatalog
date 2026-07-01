import path from "path";
import type { GatsbyNode } from "gatsby";
import { camelCase, kebabCase, upperFirst } from "lodash";
import { gql } from "graphql-tag";
import { print } from "graphql";
import { createStorefrontApiClient } from "@shopify/storefront-api-client";

type MarketPrice = {
  amount: number;
  maxAmount: number;
  currencyCode: string;
  variants: Record<string, number>;
};

type ProductPricesResponse = {
  nodes: Array<{
    id: string;
    priceRange: {
      minVariantPrice: { amount: string; currencyCode: string };
      maxVariantPrice: { amount: string; currencyCode: string };
    };
    variants: {
      nodes: Array<{ id: string; price: { amount: string; currencyCode: string } }>;
    };
  } | null>;
};

const MARKET_PRICES_QUERY = `
  query MarketProductPrices($ids: [ID!]!, $country: CountryCode!) @inContext(country: $country, language: EN) {
    nodes(ids: $ids) {
      ... on Product {
        id
        priceRange {
          minVariantPrice { amount currencyCode }
          maxVariantPrice { amount currencyCode }
        }
        variants(first: 100) {
          nodes {
            id
            price { amount currencyCode }
          }
        }
      }
    }
  }
`;

async function fetchMarketPrices(
  shopifyIds: string[],
  countryCode: string,
  reporter: { warn: (msg: string) => void },
): Promise<Record<string, MarketPrice>> {
  if (shopifyIds.length === 0) return {};

  const client = createStorefrontApiClient({
    storeDomain: process.env.GATSBY_SHOPIFY_STORE_DOMAIN!,
    publicAccessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_PASSWORD,
    apiVersion: "2026-01",
  });

  try {
    const { data, errors } = await client.request<ProductPricesResponse>(
      MARKET_PRICES_QUERY,
      { variables: { ids: shopifyIds, country: countryCode } },
    );

    if (errors || !data?.nodes) {
      reporter.warn(`Could not fetch market prices for ${countryCode}: ${JSON.stringify(errors)}`);
      return {};
    }

    const result: Record<string, MarketPrice> = {};
    for (const node of data.nodes) {
      if (node?.id && node.priceRange?.minVariantPrice) {
        const variantPrices: Record<string, number> = {};
        for (const v of node.variants?.nodes ?? []) {
          if (v?.id && v.price?.amount) {
            variantPrices[v.id] = parseFloat(v.price.amount);
          }
        }
        result[node.id] = {
          amount: parseFloat(node.priceRange.minVariantPrice.amount),
          maxAmount: parseFloat(node.priceRange.maxVariantPrice.amount),
          currencyCode: node.priceRange.minVariantPrice.currencyCode,
          variants: variantPrices,
        };
      }
    }
    return result;
  } catch (error) {
    reporter.warn(`Market price fetch failed for ${countryCode}: ${error}`);
    return {};
  }
}

type MarketRegion = { code: string; currency: { currencyCode: string } };
type MarketNode = {
  status: string;
  type: string;
  conditions: { regionsCondition: { regions: { nodes: Array<MarketRegion | Record<string, never>> } } } | null;
};

async function fetchAllMarketPrices(
  shopifyIds: string[],
  markets: MarketNode[],
  reporter: { warn: (msg: string) => void },
): Promise<Record<string, Record<string, MarketPrice>>> {
  const nonPrimaryMarkets = markets
    .filter((m) => m.status === "ACTIVE" && m.type === "REGION")
    .map((m) => m.conditions?.regionsCondition?.regions?.nodes?.find((r): r is MarketRegion => "code" in r))
    .filter((r): r is MarketRegion => !!r);

  const result: Record<string, Record<string, MarketPrice>> = {};
  await Promise.all(
    nonPrimaryMarkets.map(async (region) => {
      result[region.code] = await fetchMarketPrices(shopifyIds, region.code, reporter);
    }),
  );
  return result;
}

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}): Promise<void> => {
  const { createPage } = actions;

  const COLLECTIONS_AND_PRODUCTS_DATA = gql`
    query CollectionsAndProductsIntoPages {
      allShopifyProduct(
        filter: {
          status: { eq: ACTIVE }
          collections: { elemMatch: { handle: { eq: "prints" } } }
        }
      ) {
        nodes {
          shopifyId
          title
          handle
        }
      }

      allShopifyCollection(
        filter: {
          handle: {
            in: ["prints", "original-paintings", "human-nature", "bloom", "digital"]
          }
          products: { elemMatch: { status: { eq: ACTIVE } } }
        }
      ) {
        nodes {
          id
          title
          handle
          description
          descriptionHtml
          image {
            altText
            originalSrc
            gatsbyImageData(
              layout: CONSTRAINED
              width: 1000
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
          products {
            id
            shopifyId
            title
            handle
            description
            descriptionHtml
            status
            hasOutOfStockVariants
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
              originalSrc
              # thumbnails for product cards
              grid: gatsbyImageData(
                layout: CONSTRAINED
                width: 400
                placeholder: BLURRED
                formats: [AUTO, WEBP]
              )

              # Product detail page image
              detail: gatsbyImageData(
                layout: CONSTRAINED
                width: 800
                placeholder: BLURRED
                formats: [AUTO, WEBP]
              )

              # Zoom base image (optimized, before swap to originalSrc)
              zoom: gatsbyImageData(
                layout: CONSTRAINED
                width: 1200
                placeholder: BLURRED
                formats: [AUTO, WEBP]
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
              availableForSale
              selectedOptions {
                name
                value
              }
              image {
                src
                altText
                height
                width
                gatsbyImageData(placeholder: BLURRED)
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
                  gatsbyImageData(placeholder: BLURRED)
                  originalSrc
                  transformedSrc
                }
              }
              ... on ShopifyModel3d {
                sources {
                  url
                  format
                  mimeType
                }
              }
              ... on ShopifyVideo {
                sources {
                  url
                  format
                  mimeType
                  height
                  width
                }
              }
            }
            options {
              shopifyId
              name
              values
            }
            publishedAt
            metafields {
              id
              key
              value
            }
            productType
            isGiftCard
            printVersion: metafield(namespace: "custom", key: "print_version") {
              key
              value
            }
          }
        }
      }
    }
  `;

  const collectionsAndProductsResult =
    await graphql<Queries.CollectionsAndProductsIntoPagesQuery>(
      print(COLLECTIONS_AND_PRODUCTS_DATA),
    );

  if (
    collectionsAndProductsResult.errors ||
    !collectionsAndProductsResult.data
  ) {
    reporter.panicOnBuild(
      `There was an error loading the createPages query results for CollectionsAndProductsIntoPages`,
      collectionsAndProductsResult.errors,
    );
    return;
  }
  const SPECIAL_COLLECTION_HANDLES = ["human-nature", "bloom"];

  const allShopifyIds = collectionsAndProductsResult.data.allShopifyCollection.nodes
    .flatMap((node) => node.products.map((p) => p.shopifyId))
    .filter((id): id is string => !!id);
  const uniqueShopifyIds = [...new Set(allShopifyIds)];

  const marketsResult = await graphql<{
    adminshopify: { markets: { nodes: MarketNode[] } };
  }>(`
    query MarketsForPricing {
      adminshopify {
        markets(first: 10) {
          nodes {
            status
            type
            conditions {
              regionsCondition {
                regions(first: 1) {
                  nodes {
                    ... on AdminShopify_MarketRegionCountry {
                      code
                      currency { currencyCode }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  if (marketsResult.errors) {
    reporter.warn(
      `Could not load markets for pricing — pages will use default AUD prices. Errors: ${JSON.stringify(marketsResult.errors)}`,
    );
  }

  const markets = marketsResult.data?.adminshopify?.markets?.nodes ?? [];
  const marketPricesByCountry = await fetchAllMarketPrices(uniqueShopifyIds, markets, reporter);

  collectionsAndProductsResult.data?.allShopifyCollection.nodes.map((node) => {
    const isSpecial = SPECIAL_COLLECTION_HANDLES.includes(node.handle);

    const printVersionHandles: Record<string, string> = {};
    node.products.forEach((product) => {
      const printVersionGID = product.printVersion?.value;
      const printVersionItem =
        collectionsAndProductsResult.data?.allShopifyProduct.nodes.find(
          (printNode) => printNode.shopifyId === printVersionGID,
        );
      if (printVersionItem?.handle) {
        printVersionHandles[product.shopifyId] = printVersionItem.handle;
      }
    });

    createPage({
      path: `/collections/${node.handle}`,
      component: path.resolve(
        isSpecial
          ? `./src/templates/SpecialCollection.tsx`
          : `./src/templates/Collection.tsx`,
      ),
      context: {
        title: node.title,
        products: node.products,
        description: node.description,
        collectionHandle: node.handle,
        image: node.image,
        printVersionHandles,
        marketPricesByCountry: Object.fromEntries(
          Object.entries(marketPricesByCountry).map(([countryCode, priceMap]) => [
            countryCode,
            Object.fromEntries(
              node.products
                .filter((p) => p.shopifyId && p.shopifyId in priceMap)
                .map((p) => [p.shopifyId, priceMap[p.shopifyId!]]),
            ),
          ]),
        ),
      },
    });

    node.products.map((product) => {
      const printVersionGID = product.printVersion?.value;
      const printVersionItem =
        collectionsAndProductsResult.data?.allShopifyProduct.nodes.find(
          (printNode) => printNode.shopifyId === printVersionGID,
        );
      createPage({
        path: `/collections/${node.handle}/${product.handle}`,
        component: path.resolve(`./src/templates/SingleProduct.tsx`),
        context: {
          product: product,
          collectionHandle: node.handle,
          printVersion: printVersionItem,
          marketPricesByCountry: product.shopifyId
            ? Object.fromEntries(
                Object.entries(marketPricesByCountry)
                  .filter(([, priceMap]) => product.shopifyId! in priceMap)
                  .map(([countryCode, priceMap]) => [countryCode, priceMap[product.shopifyId!]]),
              )
            : {},
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
      adminContentResult.errors,
    );
    return;
  }

  const PAGE_METAOBJECT_DEFINITION_TYPES = [
    "legal_content",
    "product_categories",
  ];
  const createPageFromField = (
    type: string,
    field: Queries.AdminContentIntoPagesQuery["adminshopify"]["metaobjectDefinitions"]["nodes"][0]["metaobjects"]["nodes"][0]["fields"][0],
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
