import { graphql, useStaticQuery } from "gatsby";

export function useStaticQueryLayoutData() {
  const data = useStaticQuery<Queries.LayoutGlobalDataQuery>(graphql`
    query LayoutGlobalData {
      storefrontshopify {
        metaobjects(first: 9, type: "homepage_slider_content") {
          nodes {
            fields {
              key
              value
              reference {
                ... on StoreFrontShopify_MediaImage {
                  image {
                    url
                  }
                }
              }
            }
          }
        }
      }
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
              originalSrc
              gridCategorySlider: gatsbyImageData(
                width: 500
                height: 500
                layout: CONSTRAINED
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
                originalSrc
                transformedSrc
                gatsbyImageData(
                  width: 500
                  layout: CONSTRAINED
                  placeholder: BLURRED
                )
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
                  originalSrc
                  transformedSrc
                  gatsbyImageData(
                    height: 82
                    width: 82
                    aspectRatio: 1
                    placeholder: BLURRED
                  )
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

  return data;
}
