import { graphql, useStaticQuery } from "gatsby";
import React, { createContext, useContext } from "react";

const LayoutContext = createContext<Queries.LayoutGlobalDataQuery | null>(null);

type LayoutDataProviderProps = {
  children: React.ReactNode;
};

export const LayoutDataProvider: React.FunctionComponent<
  LayoutDataProviderProps
> = ({ children }) => {
  const layoutGlobalData =
    useStaticQuery<Queries.LayoutGlobalDataQuery>(graphql`
      query LayoutGlobalData {
        site {
          siteMetadata {
            title
            description
            siteUrl
            image
          }
        }
        adminshopify {
          legalContent: metaobjects(first: 10, type: "legal_content") {
            nodes {
              fields {
                key
                definition {
                  name
                }
              }
            }
          }
        }
        allShopifyCollection(
          filter: {
            handle: { in: ["prints", "original-paintings"] }
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
              src
              originalSrc
              transformedSrc
              altText
              width
              height
              gatsbyImageData
            }
            products {
              id
              title
              handle
              description
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
              publishedAt
            }
          }
        }
      }
    `);

  return (
    <LayoutContext.Provider value={layoutGlobalData}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutData = () => useContext(LayoutContext);
