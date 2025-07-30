import React from "react";
import { render, screen } from "@testing-library/react";
import TileList from "../TileList";
import * as LayoutContext from "../../context/LayoutContext";
const useLayoutData = jest.spyOn(LayoutContext, `useLayoutData`);

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("TileList", () => {
  it("renders correctly with fallback title and fallback alt text", async () => {
    useLayoutData.mockImplementation(() => ({
      site: {
        siteMetadata: {
          title: "Brushella",
          description: "Brushella Art and Decor Store",
          siteUrl: "https://www.brushella.art",
          image: "/brushella-icon.svg",
        },
      },
      adminshopify: {
        legalContent: {
          nodes: [
            {
              fields: [
                {
                  key: "return_and_refund_policy",
                  definition: {
                    name: "Return and Refund Policy",
                  },
                },
                {
                  key: "hand_made_policy",
                  definition: {
                    name: "Hand Made Policy",
                  },
                },
                {
                  key: "shipping_policy",
                  definition: {
                    name: "Shipping Policy",
                  },
                },
                {
                  key: "privacy_policy",
                  definition: {
                    name: "Privacy Policy",
                  },
                },
                {
                  key: "terms_of_service",
                  definition: {
                    name: "Terms of Service",
                  },
                },
              ],
            },
          ],
        },
      },
      allShopifyCollection: {
        nodes: [
          {
            id: "ab94a31f-8fc3-5e3c-b0cf-5a16c873d647",
            title: "Original Paintings Testing",
            handle: "original-paintings",
            description:
              "Brushella’s original artworks come in various sizes, styles, and mediums, from canvas paintings to wooden jewellery boxes and everything in between!. Please be aware that when you buy an original painting from Brushella, you automatically agree to the fact that the artwork may also be replicated as a fine art print multiple times and they will be available to purchase for other people (unless you order a commissioned custom painting) but you, and ONLY YOU, have the honor of owning Brushella's original painting!",
            descriptionHtml:
              '<p data-pm-slice="1 1 []">Brushella’s original artworks come in various sizes, styles, and mediums, from canvas paintings to wooden jewellery boxes and everything in between!. </p>\n<p>Please be aware that when you buy an original painting from Brushella, you automatically agree to the fact that the artwork may also be replicated as a fine art print multiple times and they will be available to purchase for other people (unless you order a commissioned custom painting) but you, and ONLY YOU, have the honor of owning Brushella\'s original painting!</p>',
            image: {
              src: "www.fake.fake.com/original-paintings.png?v=1731380886",
              originalSrc:
                "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/collections/original-paintings.png?v=1731380886",
              transformedSrc:
                "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/collections/original-paintings.png?v=1731380886",
              altText: null,
              width: 800,
              height: 800,
              gatsbyImageData: {
                images: {
                  sources: [
                    {
                      srcSet:
                        "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/collections/original-paintings_200x200_crop_center.png.webp?v=1731380886 200w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/collections/original-paintings_400x400_crop_center.png.webp?v=1731380886 400w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/collections/original-paintings_800x800_crop_center.png.webp?v=1731380886 800w",
                      sizes: "(min-width: 800px) 800px, 100vw",
                      type: "image/webp",
                    },
                  ],
                  fallback: {
                    src: "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/collections/original-paintings_800x800_crop_center.png?v=1731380886",
                    srcSet:
                      "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/collections/original-paintings_200x200_crop_center.png?v=1731380886 200w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/collections/original-paintings_400x400_crop_center.png?v=1731380886 400w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/collections/original-paintings_800x800_crop_center.png?v=1731380886 800w",
                    sizes: "(min-width: 800px) 800px, 100vw",
                  },
                },
                layout: "constrained",
                width: 800,
                height: 800,
              },
            },
            products: [
              {
                id: "5ab74d61-7854-5f4e-86fb-ae0e7b282efd",
                title: '"Prana" Original Acrylic Painting (SOLD)',
                handle: "prana-original-acrylic-painting",
                description:
                  'Medium: Acrylic painting on cotton canvas Size: 18" x 24" Framed (Gold and black oak frame) "Once upon a time and in the near future, we won\'t need food for us to be nurtured. Just the sun and the air, that\'s all the soul needs also divine Love and Prana to breathe. When the breath wanders, the mind is unsteady But when the breath is calmed our body gets healthy. Grateful I am for all of the unknown, and for having air in my lungs and a body to call home."',
                status: "ACTIVE",
                hasOutOfStockVariants: true,
                priceRangeV2: {
                  minVariantPrice: {
                    amount: 5950,
                    currencyCode: "AUD",
                  },
                  maxVariantPrice: {
                    amount: 5950,
                    currencyCode: "AUD",
                  },
                },
                featuredImage: {
                  altText:
                    'The framed painting titled "Prana" depicts a pair of realistic-looking lungs surrounded by colorful flowers, insects, and snakes. The background features a gradient that transitions from light to dark green. The artist, Brushella, is holding the painting with both hands and wearing a happy expression.',
                  gatsbyImageData: {
                    images: {
                      sources: [
                        {
                          srcSet:
                            "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_125x188_crop_center.jpg.webp?v=1750915766 125w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_250x375_crop_center.jpg.webp?v=1750915766 250w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_500x750_crop_center.jpg.webp?v=1750915766 500w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_1000x1500_crop_center.jpg.webp?v=1750915766 1000w",
                          sizes: "(min-width: 500px) 500px, 100vw",
                          type: "image/webp",
                        },
                      ],
                      fallback: {
                        src: "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_500x750_crop_center.jpg?v=1750915766",
                        srcSet:
                          "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_125x188_crop_center.jpg?v=1750915766 125w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_250x375_crop_center.jpg?v=1750915766 250w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_500x750_crop_center.jpg?v=1750915766 500w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_1000x1500_crop_center.jpg?v=1750915766 1000w",
                        sizes: "(min-width: 500px) 500px, 100vw",
                      },
                    },
                    layout: "constrained",
                    placeholder: {
                      fallback:
                        "data:image/png;base64,/9j/4QC8RXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAABIAAAAAQAAAEgAAAABAAAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAABQAAAADoAQAAQAAAB4AAAAAAAAA/+IBuElDQ19QUk9GSUxFAAEBAAABqGxjbXMCEAAAbW50clJHQiBYWVogB9wAAQAZAAMAKQA5YWNzcEFQUEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1sY21zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJZGVzYwAAAPAAAABfY3BydAAAAUwAAAAMd3RwdAAAAVgAAAAUclhZWgAAAWwAAAAUZ1hZWgAAAYAAAAAUYlhZWgAAAZQAAAAUclRSQwAAAQwAAABAZ1RSQwAAAQwAAABAYlRSQwAAAQwAAABAZGVzYwAAAAAAAAAFYzJjaQAAAAAAAAAAAAAAAGN1cnYAAAAAAAAAGgAAAMsByQNjBZIIawv2ED8VURs0IfEpkDIYO5JGBVF3Xe1rcHoFibGafKxpv33Tw+kw//90ZXh0AAAAAENDMABYWVogAAAAAAAA9tYAAQAAAADTLVhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z//bAEMABQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/bAEMBBQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/CABEIAB4AFAMBEQACEQEDEQH/xAAYAAADAQEAAAAAAAAAAAAAAAAFBgcECP/EABkBAAIDAQAAAAAAAAAAAAAAAAUGAAMEAv/aAAwDAQACEAMQAAAA5VIiNVeoNI1TBZgZ2GMAo/j1vospImVTMd3nK2JP6U//xAAkEAACAgEEAgMAAwAAAAAAAAABAgMEEQAFEiETcSIxMgZBYf/aAAgBAQABPwDw/EHj1rcNlvbdBQntVXiiuRGas7DAlTOOS/5nXi7PvW31DevR01haV2/CjP6JAA696t3t1obXtixxULKbdV8DNJTV5K6MccA8nLv++Q1esvuFyxbmVRJK3IhRgDrAA9a/jbLV3C9JIxMsHglVORUvGGKsVxjtcg+tbhuVeahbRKlgSzQFmHHiEYE4zn7GO9eNsAluyM6FaC5cr5BXjHNJyA7+CZxqxYaZLB80rSLDG0wY5VxIv5GScDoaclT96//EACIRAAICAQMEAwAAAAAAAAAAAAECAxEAEiExBEFRcRORof/aAAgBAgEBPwCtrwMj6tJ45ys6uUQxkk0BkPUn5gkqlC7laBNg9r94EVRSjYcd86/UDpKg7bXkMEwZZWjFM4p7Ffvf1hB85M6o8D6bp7+sdZYpTC2hkS5Ap4pjp8Xe94ds/8QAJhEAAgEEAQMDBQAAAAAAAAAAAQIDAAQSIREFE0ExMlEUYWJxgf/aAAgBAwEBPwAOS2IOydCpI5oMC49w5FdzQqPvLFJcRR5MuIGudseBV6vV7JLSeRYpoQVV2EekYn9nkeOfmri5luZpJnxDOeTiOB/BXTzA1sJDHK+MqM0UZ9yg715I8Vf9YuL63uLVumyxEkPiqniPEjTg+g43WQ5PA9K6JHJJNJD3iua4Aj5bW/tUVxb/AEEjs9wbiUyLLICBmyKWAP48Lv5pQGFf/9k=",
                    },
                    width: 500,
                    height: 750,
                  },
                },
                hasOnlyDefaultVariant: true,
                totalVariants: 1,
                variants: [
                  {
                    shopifyId: "gid://fake/ProductVariant/44362595795152",
                    displayName:
                      '"Prana" Original Acrylic Painting (SOLD) - Default Title',
                    title: "Default Title",
                    price: 5950,
                    inventoryQuantity: 0,
                    availableForSale: false,
                    selectedOptions: [
                      {
                        name: "Title",
                        value: "Default Title",
                      },
                    ],
                    image: null,
                  },
                ],
                mediaCount: 2,
                media: [
                  {
                    id: "cb11f265-4666-551d-857b-ca84ecc675bf",
                    alt: 'The framed painting titled "Prana" depicts a pair of realistic-looking lungs surrounded by colorful flowers, insects, and snakes. The background features a gradient that transitions from light to dark green. The artist, Brushella, is holding the painting with both hands and wearing a happy expression.',
                    mediaContentType: "IMAGE",
                    preview: {
                      status: "READY",
                      image: {
                        src: "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection.jpg?v=1750915766",
                        altText:
                          'The framed painting titled "Prana" depicts a pair of realistic-looking lungs surrounded by colorful flowers, insects, and snakes. The background features a gradient that transitions from light to dark green. The artist, Brushella, is holding the painting with both hands and wearing a happy expression.',
                        height: 1600,
                        width: 1066,
                        gatsbyImageData: {
                          images: {
                            sources: [
                              {
                                srcSet:
                                  "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_21x21_crop_center.jpg.webp?v=1750915766 21w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_41x41_crop_center.jpg.webp?v=1750915766 41w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_82x82_crop_center.jpg.webp?v=1750915766 82w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_164x164_crop_center.jpg.webp?v=1750915766 164w",
                                sizes: "(min-width: 82px) 82px, 100vw",
                                type: "image/webp",
                              },
                            ],
                            fallback: {
                              src: "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_82x82_crop_center.jpg?v=1750915766",
                              srcSet:
                                "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_21x21_crop_center.jpg?v=1750915766 21w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_41x41_crop_center.jpg?v=1750915766 41w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_82x82_crop_center.jpg?v=1750915766 82w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_164x164_crop_center.jpg?v=1750915766 164w",
                              sizes: "(min-width: 82px) 82px, 100vw",
                            },
                          },
                          layout: "constrained",
                          placeholder: {
                            fallback:
                              "data:image/png;base64,/9j/4QC8RXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAABIAAAAAQAAAEgAAAABAAAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAABQAAAADoAQAAQAAABQAAAAAAAAA/+IBuElDQ19QUk9GSUxFAAEBAAABqGxjbXMCEAAAbW50clJHQiBYWVogB9wAAQAZAAMAKQA5YWNzcEFQUEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1sY21zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJZGVzYwAAAPAAAABfY3BydAAAAUwAAAAMd3RwdAAAAVgAAAAUclhZWgAAAWwAAAAUZ1hZWgAAAYAAAAAUYlhZWgAAAZQAAAAUclRSQwAAAQwAAABAZ1RSQwAAAQwAAABAYlRSQwAAAQwAAABAZGVzYwAAAAAAAAAFYzJjaQAAAAAAAAAAAAAAAGN1cnYAAAAAAAAAGgAAAMsByQNjBZIIawv2ED8VURs0IfEpkDIYO5JGBVF3Xe1rcHoFibGafKxpv33Tw+kw//90ZXh0AAAAAENDMABYWVogAAAAAAAA9tYAAQAAAADTLVhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z//bAEMABQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/bAEMBBQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/CABEIABQAFAMBEQACEQEDEQH/xAAXAAEAAwAAAAAAAAAAAAAAAAAHBAYI/8QAGAEAAwEBAAAAAAAAAAAAAAAABAUGAwL/2gAMAwEAAhADEAAAAMyMUamsakzEaxC9qSSkCqqKn5nIeLk4OkP/xAAnEAACAgEDAgUFAAAAAAAAAAABAgMEEQAFEiFRBhMUMUEiMmFxof/aAAgBAQABPwCKsZiI04hgMksfgH8fvV/YfB9nbPDJsTW6FhKJSyIaZb1MxOQ/mOVGPjONX61RLllaUrvWD4jdxhmHfp/NeF4o5t386aJWjikhRldiFPMk4OM9Dx1u689svs4R1WLnAxb7EVsEJk+2dcc+ytjXrZqF+RIcFLacJlYZB4HmpHYgjodbpUgrxXVVCyw1GaMMzMAfpPye7E6KjoOwxr//xAAkEQABAwMCBwEAAAAAAAAAAAACAQMRAAQSISIQFDFBUWFx0f/aAAgBAgEBPwBwkAJpi7zMxAxNZ0SfFIJRuie8dKvykVHPHTxNMoJPiQliIuSgp76pC9qj0tXDAOvsiU7iQV+L9rlGAtrVxATMncVKEmJL84f/xAAkEQACAgEDAwUBAAAAAAAAAAABAgMRAAQFEhMhQRQiMVFhMv/aAAgBAwEBPwCN1DF5GIjWie15NqNvkbSKxkh5qCCYyOSk1YurAyd4FmcQOzRA+1mFEj9GaPRep04jMaMss0Scy1cbbsK838ZvS7bPt8vReOaaGVGEi9iKIUsPzxWcq8jNnqeCaGVQ0fBjXcfyOQ+P0Ym16BtTu69Cl0qN0Ryb20FP39m8BOf/2Q==",
                          },
                          width: 82,
                          height: 82,
                        },
                        originalSrc:
                          "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection.jpg?v=1750915766",
                        transformedSrc:
                          "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection.jpg?v=1750915766",
                      },
                    },
                  },
                  {
                    id: "ad684d16-58fe-5fda-8a01-1e905a03035d",
                    alt: 'The original painting titled "Prana" is displayed on the wall of a living room.',
                    mediaContentType: "IMAGE",
                    preview: {
                      status: "READY",
                      image: {
                        src: "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella.jpg?v=1750915766",
                        altText:
                          'The original painting titled "Prana" is displayed on the wall of a living room.',
                        height: 1127,
                        width: 1024,
                        gatsbyImageData: {
                          images: {
                            sources: [
                              {
                                srcSet:
                                  "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella_21x21_crop_center.jpg.webp?v=1750915766 21w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella_41x41_crop_center.jpg.webp?v=1750915766 41w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella_82x82_crop_center.jpg.webp?v=1750915766 82w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella_164x164_crop_center.jpg.webp?v=1750915766 164w",
                                sizes: "(min-width: 82px) 82px, 100vw",
                                type: "image/webp",
                              },
                            ],
                            fallback: {
                              src: "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella_82x82_crop_center.jpg?v=1750915766",
                              srcSet:
                                "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella_21x21_crop_center.jpg?v=1750915766 21w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella_41x41_crop_center.jpg?v=1750915766 41w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella_82x82_crop_center.jpg?v=1750915766 82w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella_164x164_crop_center.jpg?v=1750915766 164w",
                              sizes: "(min-width: 82px) 82px, 100vw",
                            },
                          },
                          layout: "constrained",
                          placeholder: {
                            fallback:
                              "data:image/png;base64,/9j/4QC8RXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAACAMgIA6AMAAIAyAgDoAwAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAABQAAAADoAQAAQAAABQAAAAAAAAA/+IBuElDQ19QUk9GSUxFAAEBAAABqGxjbXMCEAAAbW50clJHQiBYWVogB9wAAQAZAAMAKQA5YWNzcEFQUEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1sY21zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJZGVzYwAAAPAAAABfY3BydAAAAUwAAAAMd3RwdAAAAVgAAAAUclhZWgAAAWwAAAAUZ1hZWgAAAYAAAAAUYlhZWgAAAZQAAAAUclRSQwAAAQwAAABAZ1RSQwAAAQwAAABAYlRSQwAAAQwAAABAZGVzYwAAAAAAAAAFYzJjaQAAAAAAAAAAAAAAAGN1cnYAAAAAAAAAGgAAAMsByQNjBZIIawv2ED8VURs0IfEpkDIYO5JGBVF3Xe1rcHoFibGafKxpv33Tw+kw//90ZXh0AAAAAENDMABYWVogAAAAAAAA9tYAAQAAAADTLVhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z//bAEMABQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/bAEMBBQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/CABEIABQAFAMBEQACEQEDEQH/xAAWAAEBAQAAAAAAAAAAAAAAAAAFBwT/xAAaAQACAgMAAAAAAAAAAAAAAAADBAIFAAEG/9oADAMBAAIQAxAAAACKI9iIRa0GoiFL0LKu3tKEQ29AuQof/8QAKBAAAgIBAwIEBwAAAAAAAAAAAQIDBAUAERIGIRMxgaEiIzJBQlFh/9oACAEBAAE/AKvT5ssVDAEKT39hrK4uFI7Aik8R4FDyhfwXcLufU66Op0aXTOHCcxJNAJ5itUzcnlPL6uJ8l2G381Y6UvNha10SPUndpGDuOJjjDcVEqnYxsf131g+kLeTvX8DHk6y2bAUPYbk6vswcAcffWCwlqljocfSSXIpRVKr2YY+CNJEgDgCQg9j23++o8pYz2Jux2o4VWaVYXCIDupBbyfkN+2qVBccr5ITyTWoYo0jklWPdVA8vgVd/XWN6oytCKeKuYVQzFj8sdyQNzr//xAAeEQEAAgICAwEAAAAAAAAAAAABAAIDESExEiNxYf/aAAgBAgEBPwC2TxB0vOuIW5Be3RA2EtvG808j8h7MmK3QLofkLGtRoWEd8yuMsKqv2AHU/8QAJREBAAEEAgAFBQAAAAAAAAAAAQIAAwQREiEFEyIxQTJRYXGB/9oACAEDAQE/AM/nhlvhZ8xlGa7lx1x/j71mTxohCNwbnXp+e6v3Ztx1JAANVlZ+N4iEZ456fpZPZ96yIR3bue4cuQPf4auRZSZbDfwtE2KJrZUpuwAD9VJZPbvXVf/Z",
                          },
                          width: 82,
                          height: 82,
                        },
                        originalSrc:
                          "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella.jpg?v=1750915766",
                        transformedSrc:
                          "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella.jpg?v=1750915766",
                      },
                    },
                  },
                ],
                options: [
                  {
                    shopifyId: "gid://fake/ProductOption/10426976043216",
                    name: "Title",
                    values: ["Default Title"],
                  },
                ],
                publishedAt: "2025-06-17T04:50:28Z",
              },
              {
                id: "2552b8f2-7da0-5106-95f6-8c8bf90be9dc",
                title:
                  '"A moment without thoughts" Original Acrylic Painting (SOLD)',
                handle: "a-moment-without-thoughts-original-acrylic-painting",
                description:
                  'Medium: Acrylic painting on cotton canvas Size: 18" x 24" Framed (Gold and black oak frame) "They come and they go making no sense at all, and sometimes they do, bringing light to the bulb. For a moment of emptiness, I would give anything! There are just too many, the brain is hardly breathing. As I close my eyes and let them be these thoughts never go, cause they are part of me. I imagine my brain taking a break, from all these intruders that come every day. This is what it looks like when thoughts aren\'t around, leaving free space for life to use as a playground."',
                status: "ACTIVE",
                hasOutOfStockVariants: true,
                priceRangeV2: {
                  minVariantPrice: {
                    amount: 5950,
                    currencyCode: "AUD",
                  },
                  maxVariantPrice: {
                    amount: 5950,
                    currencyCode: "AUD",
                  },
                },
                featuredImage: {
                  altText:
                    'The framed painting titled "A Moment Without Thoughts" features a realistic depiction of a brain surrounded by colourful flowers, insects, and birds. The background showcases a gradient that transitions from light green to dark green. The artist, Brushella, is holding the painting with both hands while wearing a thoughtful expression.',
                  gatsbyImageData: {
                    images: {
                      sources: [
                        {
                          srcSet:
                            "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_125x188_crop_center.jpg.webp?v=1750915407 125w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_250x375_crop_center.jpg.webp?v=1750915407 250w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_500x750_crop_center.jpg.webp?v=1750915407 500w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_1000x1500_crop_center.jpg.webp?v=1750915407 1000w",
                          sizes: "(min-width: 500px) 500px, 100vw",
                          type: "image/webp",
                        },
                      ],
                      fallback: {
                        src: "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_500x750_crop_center.jpg?v=1750915407",
                        srcSet:
                          "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_125x188_crop_center.jpg?v=1750915407 125w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_250x375_crop_center.jpg?v=1750915407 250w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_500x750_crop_center.jpg?v=1750915407 500w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_1000x1500_crop_center.jpg?v=1750915407 1000w",
                        sizes: "(min-width: 500px) 500px, 100vw",
                      },
                    },
                    layout: "constrained",
                    placeholder: {
                      fallback:
                        "data:image/png;base64,/9j/4QC8RXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAABIAAAAAQAAAEgAAAABAAAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAABQAAAADoAQAAQAAAB4AAAAAAAAA/+IBuElDQ19QUk9GSUxFAAEBAAABqGxjbXMCEAAAbW50clJHQiBYWVogB9wAAQAZAAMAKQA5YWNzcEFQUEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1sY21zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJZGVzYwAAAPAAAABfY3BydAAAAUwAAAAMd3RwdAAAAVgAAAAUclhZWgAAAWwAAAAUZ1hZWgAAAYAAAAAUYlhZWgAAAZQAAAAUclRSQwAAAQwAAABAZ1RSQwAAAQwAAABAYlRSQwAAAQwAAABAZGVzYwAAAAAAAAAFYzJjaQAAAAAAAAAAAAAAAGN1cnYAAAAAAAAAGgAAAMsByQNjBZIIawv2ED8VURs0IfEpkDIYO5JGBVF3Xe1rcHoFibGafKxpv33Tw+kw//90ZXh0AAAAAENDMABYWVogAAAAAAAA9tYAAQAAAADTLVhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z//bAEMABQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/bAEMBBQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/CABEIAB4AFAMBEQACEQEDEQH/xAAaAAACAgMAAAAAAAAAAAAAAAAEBgAHAgUI/8QAGQEAAwEBAQAAAAAAAAAAAAAAAgQGBQMA/9oADAMBAAIQAxAAAADkV1Nj8Wm6q2uiycn0rain2vMFixN9dt5DFKuLEppw/wD/xAAkEAACAQMDBQADAAAAAAAAAAABAgMEBREAEiEGIjFBURNhcf/aAAgBAQABPwBIOASOD4/er10zcunp4aa4QLHLLBHOoDBh+OQZByPf0etGDnwNdKXe5SUS2iOkt88IBUispknTYvdnvHaRkgkeddcUdxuLw3G4JC8qQrTosG8BFjBKDazNxoU/v7yNWeYW+oZiWyFO3Zx3YBGeDkarKtrrVUsSt3guzOoAVFCFif4BknOorbvhhbxlFPIweR7HrVC8sZ2LIVLK0kzDyyrzgfDxxqoNTKY1kqXKwwo5w2C6TsMq2MZHPg6euw2ApAGv/8QAIREAAgIBBAMBAQAAAAAAAAAAAQIDEQAEEiExIkHRBTL/2gAIAQIBAT8ACjI3SS9vrKzVARutEgsCe+z9zQ6gmVUKMlkcGubzbn6iKTEGBIo9GiD6zRJIuzeCwThQezz7IxV8RfdZqnWMIxjVmXzLEXQ/kgA93eQiNxGzxIXklLEgAVVjj5nAz//EACYRAAIBAwQABgMAAAAAAAAAAAECAwAEEQUSITEGEyJBUaEjYXH/2gAIAQMBAT8AaQk4HdXMUtvsL9GhLx3Q1C9uFsLSGGJ23MoLL7d8n9VqY1JLiO3lCSK6MUZVIJCgn5NGb64q2vJLfZPG7I4LhWHPOPihqTahqemgXDx+ShJlHJGVy2B9VJJ+R9pyu44/ma8LoJRfesqmUj2YBDAgnnPRGOxWpia3t9RSG4YQQjZGNoDEOQx3Y9+e6wx6r//Z",
                    },
                    width: 500,
                    height: 750,
                  },
                },
                hasOnlyDefaultVariant: true,
                totalVariants: 1,
                variants: [
                  {
                    shopifyId: "gid://fake/ProductVariant/44362595729616",
                    displayName:
                      '"A moment without thoughts" Original Acrylic Painting (SOLD) - Default Title',
                    title: "Default Title",
                    price: 5950,
                    inventoryQuantity: 0,
                    availableForSale: false,
                    selectedOptions: [
                      {
                        name: "Title",
                        value: "Default Title",
                      },
                    ],
                    image: null,
                  },
                ],
                mediaCount: 2,
                media: [
                  {
                    id: "e72af80b-0d97-521e-9a37-7a6ce62a461f",
                    alt: 'The framed painting titled "A Moment Without Thoughts" features a realistic depiction of a brain surrounded by colourful flowers, insects, and birds. The background showcases a gradient that transitions from light green to dark green. The artist, Brushella, is holding the painting with both hands while wearing a thoughtful expression.',
                    mediaContentType: "IMAGE",
                    preview: {
                      status: "READY",
                      image: {
                        src: "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection.jpg?v=1750915407",
                        altText:
                          'The framed painting titled "A Moment Without Thoughts" features a realistic depiction of a brain surrounded by colourful flowers, insects, and birds. The background showcases a gradient that transitions from light green to dark green. The artist, Brushella, is holding the painting with both hands while wearing a thoughtful expression.',
                        height: 1600,
                        width: 1066,
                        gatsbyImageData: {
                          images: {
                            sources: [
                              {
                                srcSet:
                                  "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_21x21_crop_center.jpg.webp?v=1750915407 21w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_41x41_crop_center.jpg.webp?v=1750915407 41w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_82x82_crop_center.jpg.webp?v=1750915407 82w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_164x164_crop_center.jpg.webp?v=1750915407 164w",
                                sizes: "(min-width: 82px) 82px, 100vw",
                                type: "image/webp",
                              },
                            ],
                            fallback: {
                              src: "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_82x82_crop_center.jpg?v=1750915407",
                              srcSet:
                                "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_21x21_crop_center.jpg?v=1750915407 21w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_41x41_crop_center.jpg?v=1750915407 41w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_82x82_crop_center.jpg?v=1750915407 82w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_164x164_crop_center.jpg?v=1750915407 164w",
                              sizes: "(min-width: 82px) 82px, 100vw",
                            },
                          },
                          layout: "constrained",
                          placeholder: {
                            fallback:
                              "data:image/png;base64,/9j/4QC8RXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAABIAAAAAQAAAEgAAAABAAAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAABQAAAADoAQAAQAAABQAAAAAAAAA/+IBuElDQ19QUk9GSUxFAAEBAAABqGxjbXMCEAAAbW50clJHQiBYWVogB9wAAQAZAAMAKQA5YWNzcEFQUEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1sY21zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJZGVzYwAAAPAAAABfY3BydAAAAUwAAAAMd3RwdAAAAVgAAAAUclhZWgAAAWwAAAAUZ1hZWgAAAYAAAAAUYlhZWgAAAZQAAAAUclRSQwAAAQwAAABAZ1RSQwAAAQwAAABAYlRSQwAAAQwAAABAZGVzYwAAAAAAAAAFYzJjaQAAAAAAAAAAAAAAAGN1cnYAAAAAAAAAGgAAAMsByQNjBZIIawv2ED8VURs0IfEpkDIYO5JGBVF3Xe1rcHoFibGafKxpv33Tw+kw//90ZXh0AAAAAENDMABYWVogAAAAAAAA9tYAAQAAAADTLVhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z//bAEMABQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/bAEMBBQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/CABEIABQAFAMBEQACEQEDEQH/xAAXAAADAQAAAAAAAAAAAAAAAAAFBgcE/8QAGQEBAQADAQAAAAAAAAAAAAAABQYAAgQD/9oADAMBAAIQAxAAAACFdHOX8cn6g7wdu1Cvz60izZips5XNVxH/xAAnEAACAgEDAwQCAwAAAAAAAAABAgMEEQAFEgYhMSIyQYETcRRhkf/aAAgBAQABPwDZ9g6Tv7Wr295u1LuMHhXFhOeTkMoKkDGCCCc66/j22/uVWfZ4Io6sVCGJysTQ85IgQzBWVe5H2fnX8ckn04766V4VbZdkzxVmJJAx2AyM+Tj411HPDejrQrAHjZ244Xix9J9vz37edLScoh4H2j9/f962yslqa2XZx+LHHiceQPP+6lrpVnNhWZ5I6liVOeCA6KVU4GPGc/vUaJHFEijsqKB9DX//xAAjEQABBAEEAQUAAAAAAAAAAAABAAIDERIEBRNhMSEiQUKR/9oACAECAQE/AJZXwmi1pB9QbWjmt2JdlZryCsFuLXtMeFZUbBNWB5WgcOSNzGiNwFyD6gjtBlgHpbi0PlhafnIfgtMgjin4mj28gHaAoUv/xAAkEQACAQMEAgIDAAAAAAAAAAABAgMABBEFEiExQVETFCJxgf/aAAgBAwEBPwCR9NSC2ka5cSPkOpXIBX1j3WoXdpKRGgdJFGdrIVPWfI9V8wGOasrmGO4t5p4vkjjZm2jGeB3g94rUJbW51LS9lq0hkRw6IQHbevH6PNPKUd1PYYg/zitJsIby0uHkd1MQDLtIGSx2nOQfFWtjHDF99ZZDMsMpGSMfgNo8Z6okk5PZr//Z",
                          },
                          width: 82,
                          height: 82,
                        },
                        originalSrc:
                          "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection.jpg?v=1750915407",
                        transformedSrc:
                          "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection.jpg?v=1750915407",
                      },
                    },
                  },
                  {
                    id: "eb5c7ae3-ff59-58e0-b488-644f3fd41d0a",
                    alt: 'The original painting titled  "A Moment Without Thoughts" is displayed on the wall of a living room.',
                    mediaContentType: "IMAGE",
                    preview: {
                      status: "READY",
                      image: {
                        src: "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella.jpg?v=1750915407",
                        altText:
                          'The original painting titled  "A Moment Without Thoughts" is displayed on the wall of a living room.',
                        height: 2493,
                        width: 3467,
                        gatsbyImageData: {
                          images: {
                            sources: [
                              {
                                srcSet:
                                  "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella_21x21_crop_center.jpg.webp?v=1750915407 21w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella_41x41_crop_center.jpg.webp?v=1750915407 41w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella_82x82_crop_center.jpg.webp?v=1750915407 82w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella_164x164_crop_center.jpg.webp?v=1750915407 164w",
                                sizes: "(min-width: 82px) 82px, 100vw",
                                type: "image/webp",
                              },
                            ],
                            fallback: {
                              src: "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella_82x82_crop_center.jpg?v=1750915407",
                              srcSet:
                                "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella_21x21_crop_center.jpg?v=1750915407 21w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella_41x41_crop_center.jpg?v=1750915407 41w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella_82x82_crop_center.jpg?v=1750915407 82w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella_164x164_crop_center.jpg?v=1750915407 164w",
                              sizes: "(min-width: 82px) 82px, 100vw",
                            },
                          },
                          layout: "constrained",
                          placeholder: {
                            fallback:
                              "data:image/png;base64,/9j/4QC8RXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAABg0gQA6AMAAGDSBADoAwAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAABQAAAADoAQAAQAAABQAAAAAAAAA/+IBuElDQ19QUk9GSUxFAAEBAAABqGxjbXMCEAAAbW50clJHQiBYWVogB9wAAQAZAAMAKQA5YWNzcEFQUEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1sY21zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJZGVzYwAAAPAAAABfY3BydAAAAUwAAAAMd3RwdAAAAVgAAAAUclhZWgAAAWwAAAAUZ1hZWgAAAYAAAAAUYlhZWgAAAZQAAAAUclRSQwAAAQwAAABAZ1RSQwAAAQwAAABAYlRSQwAAAQwAAABAZGVzYwAAAAAAAAAFYzJjaQAAAAAAAAAAAAAAAGN1cnYAAAAAAAAAGgAAAMsByQNjBZIIawv2ED8VURs0IfEpkDIYO5JGBVF3Xe1rcHoFibGafKxpv33Tw+kw//90ZXh0AAAAAENDMABYWVogAAAAAAAA9tYAAQAAAADTLVhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z//bAEMABQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/bAEMBBQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/CABEIABQAFAMBEQACEQEDEQH/xAAYAAADAQEAAAAAAAAAAAAAAAAFBwgDBP/EABcBAQEBAQAAAAAAAAAAAAAAAAQDAQX/2gAMAwEAAhADEAAAAHAKnNtJu5kqgUwZeZIiBKJ55qjF0P/EACgQAAEEAAYABgMBAAAAAAAAAAECAwQFAAYREiExExQVFiJhByNBgf/aAAgBAQABPwChzRFgUldCdr39zVc4/wCPs0Z+G5W0kda6d494uXWX76TGjojrjKZaDhWVpSHgCVngcJxf5Qu3rFa/R3TuQlX6W1pT8xv6HGvPOKG/rPaQhGKmS9HYLT0c9uBzXgAcnUHrDsuvy3Ttv0OSXHI00q81EQChbXhjlx4LJAQE9f0/zFZnODaxvMNeEEbykBa9pA7Hf0cVmW66bRU8hRcbdeG5amyEkqG4A66c/wC4T+PahlEhHqdwtKEn4qnu6K+iAR3jNFTEqLZyFBBZYbbSEpSE8/ZOnJ+8f//EACQRAAIBAwIGAwAAAAAAAAAAAAECAwAREjFBBCEiMkJhE5Hw/9oACAECAQE/AE4lTKYfjbpHdtTzXhkdTaxtc6D3QdvOPFtwBQ41TJPCkJLxkA+77iiWxAWNcT3A8iKecA8x+vTRoHDgWZtfdqbEeC/VY3L5Ox6jrX//xAAiEQEAAQQBAwUAAAAAAAAAAAABAgADESExBBIiUWGBkdH/2gAIAQMBAT8AmJ3PpVmHfdIIS4fFznJmmMhTHFPSLG3cncCFwfzdWrVm2yCTFNiGmizMPI37bqNyTFgujj5qPcp5P3QhCGIRMxOK/9k=",
                          },
                          width: 82,
                          height: 82,
                        },
                        originalSrc:
                          "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella.jpg?v=1750915407",
                        transformedSrc:
                          "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella.jpg?v=1750915407",
                      },
                    },
                  },
                ],
                options: [
                  {
                    shopifyId: "gid://fake/ProductOption/10426976010448",
                    name: "Title",
                    values: ["Default Title"],
                  },
                ],
                publishedAt: "2025-06-17T04:50:28Z",
              },
              {
                id: "cda1f176-4f56-57de-8aad-02bbc36d5776",
                title: '"After Grief" Original Acrylic Painting (SOLD)',
                handle: "after-grief",
                description:
                  'Medium: Acrylic painting on cotton canvas. Size: 18" x 24". Framed (Gold and black oak frame). "Our hearts are home for joy and pain, beating steadily through sunshine and rain. When the storm destroys everything in its path, know that this too shall pass. Lotus flowers only grow in the mud, and seeds can only open up in the dark. Our time in this realm is quite brief, your broken heart will bloom again... after grief."',
                status: "ACTIVE",
                hasOutOfStockVariants: true,
                priceRangeV2: {
                  minVariantPrice: {
                    amount: 5950,
                    currencyCode: "AUD",
                  },
                  maxVariantPrice: {
                    amount: 5950,
                    currencyCode: "AUD",
                  },
                },
                featuredImage: {
                  altText:
                    'The framed painting titled "After Grief," depicting a realistic-looking human heart surrounded by colourful birds, insects, and flowers, is displayed by the artist Brushella, who holds it with both hands and a happy expression.',
                  gatsbyImageData: {
                    images: {
                      sources: [
                        {
                          srcSet:
                            "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_125x188_crop_center.jpg.webp?v=1750915560 125w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_250x375_crop_center.jpg.webp?v=1750915560 250w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_500x750_crop_center.jpg.webp?v=1750915560 500w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_1000x1500_crop_center.jpg.webp?v=1750915560 1000w",
                          sizes: "(min-width: 500px) 500px, 100vw",
                          type: "image/webp",
                        },
                      ],
                      fallback: {
                        src: "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_500x750_crop_center.jpg?v=1750915560",
                        srcSet:
                          "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_125x188_crop_center.jpg?v=1750915560 125w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_250x375_crop_center.jpg?v=1750915560 250w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_500x750_crop_center.jpg?v=1750915560 500w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_1000x1500_crop_center.jpg?v=1750915560 1000w",
                        sizes: "(min-width: 500px) 500px, 100vw",
                      },
                    },
                    layout: "constrained",
                    placeholder: {
                      fallback:
                        "data:image/png;base64,/9j/4QC8RXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAABIAAAAAQAAAEgAAAABAAAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAABQAAAADoAQAAQAAAB4AAAAAAAAA/+IBuElDQ19QUk9GSUxFAAEBAAABqGxjbXMCEAAAbW50clJHQiBYWVogB9wAAQAZAAMAKQA5YWNzcEFQUEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1sY21zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJZGVzYwAAAPAAAABfY3BydAAAAUwAAAAMd3RwdAAAAVgAAAAUclhZWgAAAWwAAAAUZ1hZWgAAAYAAAAAUYlhZWgAAAZQAAAAUclRSQwAAAQwAAABAZ1RSQwAAAQwAAABAYlRSQwAAAQwAAABAZGVzYwAAAAAAAAAFYzJjaQAAAAAAAAAAAAAAAGN1cnYAAAAAAAAAGgAAAMsByQNjBZIIawv2ED8VURs0IfEpkDIYO5JGBVF3Xe1rcHoFibGafKxpv33Tw+kw//90ZXh0AAAAAENDMABYWVogAAAAAAAA9tYAAQAAAADTLVhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z//bAEMABQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/bAEMBBQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/CABEIAB4AFAMBEQACEQEDEQH/xAAZAAACAwEAAAAAAAAAAAAAAAAFBwMEBgj/xAAZAQACAwEAAAAAAAAAAAAAAAAEBQEDBgL/2gAMAwEAAhADEAAAAOQzhDE9Du6N3RGoDJXrpQ1FJxBY8X+tw5ClnOMzvuMR/8QAJBAAAgIBBAEEAwAAAAAAAAAAAQIDEQQABRIhMQYTUWEiQXH/2gAIAQEAAT8AWCiwP61uGw7jtEkEWfhvBJNCk8auKLRyC1YfR02P30B41tPpNs5RJMspSQSNxiZQyolWzWDQN0PnXrvHyd6mws2VJlOLt8GKi81ezEPJ6BBc+fjU23SxSyRyLToaIvxX81sma3sQ4clGdRKIWqm4SMrcSerAN1rfc7B2/b8rKZVlmjqRI6HAOASQwN8u6Oodpy541yMyZ5sice7I7N2S2sLj7RnaFZJCoZeZIChiFFV8edb1jTyrLG0kbBU5MSnfHnw4js9/ejKiUgU/iK8141//xAAhEQACAgIDAAMBAQAAAAAAAAABAgMRADEEEiETQWEFsf/aAAgBAgEBPwAR7yMxvfUg1hT8zkziDuvUg9RRINe/6M43Ih+UoisGs2pNki/o4gDqGU2Do5/WiKur9vCNk+L9e3oZG8kssQ7BjRtwbJGh7kMIjjRbJoZy1i+IySBj4AoGiSdH8yPj8ZGl6w9KnRAAb37s5Wf/xAAkEQABAwMDBAMAAAAAAAAAAAABAgMRAAQhBRIxEyJBURVhof/aAAgBAwEBPwAuyBFPJdZCSsQCKD2OTTQcAsnOj1kuqVtQhYB7ImYmJnE1cXN06ttm5t9hUAkKggDE5BzT5ctHVsOp2rSciQf0Vod+wX7EXIw0pWw4EwAQD74rWnbb5O2WkrBcAX0ie1JjmD5PmMVe3zlzcuOmO48+/s1oFii+dfZW2haWglZCiRiYMFPniK1HSk6e84UlKiLMvpXndChgQSeKKogRX//Z",
                    },
                    width: 500,
                    height: 750,
                  },
                },
                hasOnlyDefaultVariant: true,
                totalVariants: 1,
                variants: [
                  {
                    shopifyId: "gid://fake/ProductVariant/44362595631312",
                    displayName:
                      '"After Grief" Original Acrylic Painting (SOLD) - Default Title',
                    title: "Default Title",
                    price: 5950,
                    inventoryQuantity: 0,
                    availableForSale: false,
                    selectedOptions: [
                      {
                        name: "Title",
                        value: "Default Title",
                      },
                    ],
                    image: null,
                  },
                ],
                mediaCount: 2,
                media: [
                  {
                    id: "ce2befce-410e-59f5-951c-1cfaa069f32d",
                    alt: 'The framed painting titled "After Grief," depicting a realistic-looking human heart surrounded by colourful birds, insects, and flowers, is displayed by the artist Brushella, who holds it with both hands and a happy expression.',
                    mediaContentType: "IMAGE",
                    preview: {
                      status: "READY",
                      image: {
                        src: "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection.jpg?v=1750915560",
                        altText:
                          'The framed painting titled "After Grief," depicting a realistic-looking human heart surrounded by colourful birds, insects, and flowers, is displayed by the artist Brushella, who holds it with both hands and a happy expression.',
                        height: 1600,
                        width: 1066,
                        gatsbyImageData: {
                          images: {
                            sources: [
                              {
                                srcSet:
                                  "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_21x21_crop_center.jpg.webp?v=1750915560 21w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_41x41_crop_center.jpg.webp?v=1750915560 41w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_82x82_crop_center.jpg.webp?v=1750915560 82w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_164x164_crop_center.jpg.webp?v=1750915560 164w",
                                sizes: "(min-width: 82px) 82px, 100vw",
                                type: "image/webp",
                              },
                            ],
                            fallback: {
                              src: "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_82x82_crop_center.jpg?v=1750915560",
                              srcSet:
                                "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_21x21_crop_center.jpg?v=1750915560 21w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_41x41_crop_center.jpg?v=1750915560 41w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_82x82_crop_center.jpg?v=1750915560 82w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_164x164_crop_center.jpg?v=1750915560 164w",
                              sizes: "(min-width: 82px) 82px, 100vw",
                            },
                          },
                          layout: "constrained",
                          placeholder: {
                            fallback:
                              "data:image/png;base64,/9j/4QC8RXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAABIAAAAAQAAAEgAAAABAAAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAABQAAAADoAQAAQAAABQAAAAAAAAA/+IBuElDQ19QUk9GSUxFAAEBAAABqGxjbXMCEAAAbW50clJHQiBYWVogB9wAAQAZAAMAKQA5YWNzcEFQUEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1sY21zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJZGVzYwAAAPAAAABfY3BydAAAAUwAAAAMd3RwdAAAAVgAAAAUclhZWgAAAWwAAAAUZ1hZWgAAAYAAAAAUYlhZWgAAAZQAAAAUclRSQwAAAQwAAABAZ1RSQwAAAQwAAABAYlRSQwAAAQwAAABAZGVzYwAAAAAAAAAFYzJjaQAAAAAAAAAAAAAAAGN1cnYAAAAAAAAAGgAAAMsByQNjBZIIawv2ED8VURs0IfEpkDIYO5JGBVF3Xe1rcHoFibGafKxpv33Tw+kw//90ZXh0AAAAAENDMABYWVogAAAAAAAA9tYAAQAAAADTLVhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z//bAEMABQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/bAEMBBQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/CABEIABQAFAMBEQACEQEDEQH/xAAYAAADAQEAAAAAAAAAAAAAAAAEBgcDCP/EABYBAQEBAAAAAAAAAAAAAAAAAAQFBv/aAAwDAQACEAMQAAAA5dozXw7UB0mzSaRwHzDT5ZiGLeHYL2ec/8QAKBAAAgEDAgQGAwAAAAAAAAAAAQIDBAURABITISIxBkFRYXGRFBVC/9oACAEBAAE/AKS01ta8gpoN5yQMsFGfliNeP7XboK61fprekdOtqpmqOG6uvGK9ZOCeof176aA57ferDBbzb6dxErcJalHjdR0yMy9asO+5T59tXe1001JNLOqR00e3fLtGREQTyBILchj50T+dJLVQUfAglctFG5G4L5ZxgfWqarlpa2n4eNpXmpGQc48teLa2peilgaQmN4zy9B6D21BDEsEChAAsagfWv//EACQRAAIBAgUEAwAAAAAAAAAAAAECEQADBAUhMUESEyJRYXGx/9oACAECAQE/AHZbYYk7AmsOzhiHYGWMQZ/K6azQslw+JClQSQSZjmDt81auIt5Wtkw8zbYyJ96e6w63Ozb6hrGpPNZooYA7FRKkcGawI7lxmcyV0n7NDQRX/8QAJhEAAgEEAgECBwAAAAAAAAAAAQIDAAQFESExEhNhFDJBUnGBkf/aAAgBAwEBPwCNlkaJTIigkDbsFH9NXctnOi/DyDYUcDv8aoSjXdYuKLJHFw6UiN5PMFQNE63yOT7brJ46O0yUKxxBYwwKyht7GutHnY+tZSe2e+naIeKk/KoAAP6q0uJbYRSxtpvUI56IYaNT5Ce7yFsHCqqJpQoP2+5NMSx2ezzX/9k=",
                          },
                          width: 82,
                          height: 82,
                        },
                        originalSrc:
                          "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection.jpg?v=1750915560",
                        transformedSrc:
                          "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection.jpg?v=1750915560",
                      },
                    },
                  },
                  {
                    id: "9a3cb3fb-8ebd-5552-9b23-4aaa1b4e4cc3",
                    alt: 'The original painting titled "After Grief" is displayed on the wall of a living room.',
                    mediaContentType: "IMAGE",
                    preview: {
                      status: "READY",
                      image: {
                        src: "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella.jpg?v=1750915560",
                        altText:
                          'The original painting titled "After Grief" is displayed on the wall of a living room.',
                        height: 2708,
                        width: 2495,
                        gatsbyImageData: {
                          images: {
                            sources: [
                              {
                                srcSet:
                                  "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella_21x21_crop_center.jpg.webp?v=1750915560 21w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella_41x41_crop_center.jpg.webp?v=1750915560 41w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella_82x82_crop_center.jpg.webp?v=1750915560 82w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella_164x164_crop_center.jpg.webp?v=1750915560 164w",
                                sizes: "(min-width: 82px) 82px, 100vw",
                                type: "image/webp",
                              },
                            ],
                            fallback: {
                              src: "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella_82x82_crop_center.jpg?v=1750915560",
                              srcSet:
                                "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella_21x21_crop_center.jpg?v=1750915560 21w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella_41x41_crop_center.jpg?v=1750915560 41w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella_82x82_crop_center.jpg?v=1750915560 82w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella_164x164_crop_center.jpg?v=1750915560 164w",
                              sizes: "(min-width: 82px) 82px, 100vw",
                            },
                          },
                          layout: "constrained",
                          placeholder: {
                            fallback:
                              "data:image/png;base64,/9j/4QC8RXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAABg0gQA6AMAAGDSBADoAwAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAABQAAAADoAQAAQAAABQAAAAAAAAA/+IBuElDQ19QUk9GSUxFAAEBAAABqGxjbXMCEAAAbW50clJHQiBYWVogB9wAAQAZAAMAKQA5YWNzcEFQUEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1sY21zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJZGVzYwAAAPAAAABfY3BydAAAAUwAAAAMd3RwdAAAAVgAAAAUclhZWgAAAWwAAAAUZ1hZWgAAAYAAAAAUYlhZWgAAAZQAAAAUclRSQwAAAQwAAABAZ1RSQwAAAQwAAABAYlRSQwAAAQwAAABAZGVzYwAAAAAAAAAFYzJjaQAAAAAAAAAAAAAAAGN1cnYAAAAAAAAAGgAAAMsByQNjBZIIawv2ED8VURs0IfEpkDIYO5JGBVF3Xe1rcHoFibGafKxpv33Tw+kw//90ZXh0AAAAAENDMABYWVogAAAAAAAA9tYAAQAAAADTLVhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z//bAEMABQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/bAEMBBQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/CABEIABQAFAMBEQACEQEDEQH/xAAXAAADAQAAAAAAAAAAAAAAAAAEBQcG/8QAGgEAAgMBAQAAAAAAAAAAAAAAAwQBAgUGAP/aAAwDAQACEAMQAAAAlFbmIeyOoM1Q9p4t5a1OW6dS4Zpnsi//xAAmEAABBAEEAQMFAAAAAAAAAAABAgMEEQUABhIhEwciMTIzUXGx/9oACAEBAAE/AN87ok7ncxJegtMmOy4R4nVOg+SiQeSU0U1puLFcxaXAEJpgK5E/UoC6H8/Glcb1OwOSi5PFQHZTEtclYbuLbvjSojko1V0LJ/WmvSVLwQhjcT4ilCCAqO0olXYPwpNDrrUz0bnMuhLOQkPJKb5JjIodkV9zSsPEcy2PK+R8jjbRApPtJ7riB2b1itvxUKZaRKmJQAEgB49ADrS8G0CKyE4dfHnOv//EACgRAAIBAgQDCQAAAAAAAAAAAAECAwARBRIhMQQGEBMVFkFUcZHR4f/aAAgBAgEBPwCNgb+9NK4mAOa+a2mxB0tboz9lHM6qWZVLBRubDajzaysS2HRNICRmEhXTy3FR83Flu3BRqb7Gb8p1DId67lwyVzn4UG9ydTXh3B/RL8n7r//EACkRAAIBAwEECwAAAAAAAAAAAAECEQADIQQFEBOhEhUjMlFTVGFxkvD/2gAIAQMBAT8AdCvR96axaGjW+LvacUqRJwJxuIZygJgSFn5o7ItTPEjM92c+NHZqeoP0NW2IcYH4U2t1Kri5yFdYarzOQr//2Q==",
                          },
                          width: 82,
                          height: 82,
                        },
                        originalSrc:
                          "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella.jpg?v=1750915560",
                        transformedSrc:
                          "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella.jpg?v=1750915560",
                      },
                    },
                  },
                ],
                options: [
                  {
                    shopifyId: "gid://fake/ProductOption/10426975944912",
                    name: "Title",
                    values: ["Default Title"],
                  },
                ],
                publishedAt: "2025-06-17T04:50:27Z",
              },
            ],
          },
        ],
      },
    }));
    render(<TileList />);
    screen.getByRole("heading", { name: "Browse Brushella’s World" });
    screen.getAllByAltText(/Products of Original Paintings Testing category./i);
  });

  it("renders correctly with alt text for each image", async () => {
    useLayoutData.mockImplementation(() => ({
      site: {
        siteMetadata: {
          title: "Brushella",
          description: "Brushella Art and Decor Store",
          siteUrl: "https://www.brushella.art",
          image: "/brushella-icon.svg",
        },
      },
      adminshopify: {
        legalContent: {
          nodes: [
            {
              fields: [
                {
                  key: "return_and_refund_policy",
                  definition: {
                    name: "Return and Refund Policy",
                  },
                },
                {
                  key: "hand_made_policy",
                  definition: {
                    name: "Hand Made Policy",
                  },
                },
                {
                  key: "shipping_policy",
                  definition: {
                    name: "Shipping Policy",
                  },
                },
                {
                  key: "privacy_policy",
                  definition: {
                    name: "Privacy Policy",
                  },
                },
                {
                  key: "terms_of_service",
                  definition: {
                    name: "Terms of Service",
                  },
                },
              ],
            },
          ],
        },
      },
      allShopifyCollection: {
        nodes: [
          {
            id: "ab94a31f-8fc3-5e3c-b0cf-5a16c873d647",
            title: "Original Paintings Testing",
            handle: "original-paintings",
            description:
              "Brushella’s original artworks come in various sizes, styles, and mediums, from canvas paintings to wooden jewellery boxes and everything in between!. Please be aware that when you buy an original painting from Brushella, you automatically agree to the fact that the artwork may also be replicated as a fine art print multiple times and they will be available to purchase for other people (unless you order a commissioned custom painting) but you, and ONLY YOU, have the honor of owning Brushella's original painting!",
            descriptionHtml:
              '<p data-pm-slice="1 1 []">Brushella’s original artworks come in various sizes, styles, and mediums, from canvas paintings to wooden jewellery boxes and everything in between!. </p>\n<p>Please be aware that when you buy an original painting from Brushella, you automatically agree to the fact that the artwork may also be replicated as a fine art print multiple times and they will be available to purchase for other people (unless you order a commissioned custom painting) but you, and ONLY YOU, have the honor of owning Brushella\'s original painting!</p>',
            image: {
              src: "www.fake.fake.com/original-paintings.png?v=1731380886",
              originalSrc:
                "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/collections/original-paintings.png?v=1731380886",
              transformedSrc:
                "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/collections/original-paintings.png?v=1731380886",
              altText: "alt text for testing purposes",
              width: 800,
              height: 800,
              gatsbyImageData: {
                images: {
                  sources: [
                    {
                      srcSet:
                        "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/collections/original-paintings_200x200_crop_center.png.webp?v=1731380886 200w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/collections/original-paintings_400x400_crop_center.png.webp?v=1731380886 400w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/collections/original-paintings_800x800_crop_center.png.webp?v=1731380886 800w",
                      sizes: "(min-width: 800px) 800px, 100vw",
                      type: "image/webp",
                    },
                  ],
                  fallback: {
                    src: "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/collections/original-paintings_800x800_crop_center.png?v=1731380886",
                    srcSet:
                      "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/collections/original-paintings_200x200_crop_center.png?v=1731380886 200w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/collections/original-paintings_400x400_crop_center.png?v=1731380886 400w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/collections/original-paintings_800x800_crop_center.png?v=1731380886 800w",
                    sizes: "(min-width: 800px) 800px, 100vw",
                  },
                },
                layout: "constrained",
                width: 800,
                height: 800,
              },
            },
            products: [
              {
                id: "5ab74d61-7854-5f4e-86fb-ae0e7b282efd",
                title: '"Prana" Original Acrylic Painting (SOLD)',
                handle: "prana-original-acrylic-painting",
                description:
                  'Medium: Acrylic painting on cotton canvas Size: 18" x 24" Framed (Gold and black oak frame) "Once upon a time and in the near future, we won\'t need food for us to be nurtured. Just the sun and the air, that\'s all the soul needs also divine Love and Prana to breathe. When the breath wanders, the mind is unsteady But when the breath is calmed our body gets healthy. Grateful I am for all of the unknown, and for having air in my lungs and a body to call home."',
                status: "ACTIVE",
                hasOutOfStockVariants: true,
                priceRangeV2: {
                  minVariantPrice: {
                    amount: 5950,
                    currencyCode: "AUD",
                  },
                  maxVariantPrice: {
                    amount: 5950,
                    currencyCode: "AUD",
                  },
                },
                featuredImage: {
                  altText:
                    'The framed painting titled "Prana" depicts a pair of realistic-looking lungs surrounded by colorful flowers, insects, and snakes. The background features a gradient that transitions from light to dark green. The artist, Brushella, is holding the painting with both hands and wearing a happy expression.',
                  gatsbyImageData: {
                    images: {
                      sources: [
                        {
                          srcSet:
                            "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_125x188_crop_center.jpg.webp?v=1750915766 125w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_250x375_crop_center.jpg.webp?v=1750915766 250w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_500x750_crop_center.jpg.webp?v=1750915766 500w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_1000x1500_crop_center.jpg.webp?v=1750915766 1000w",
                          sizes: "(min-width: 500px) 500px, 100vw",
                          type: "image/webp",
                        },
                      ],
                      fallback: {
                        src: "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_500x750_crop_center.jpg?v=1750915766",
                        srcSet:
                          "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_125x188_crop_center.jpg?v=1750915766 125w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_250x375_crop_center.jpg?v=1750915766 250w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_500x750_crop_center.jpg?v=1750915766 500w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_1000x1500_crop_center.jpg?v=1750915766 1000w",
                        sizes: "(min-width: 500px) 500px, 100vw",
                      },
                    },
                    layout: "constrained",
                    placeholder: {
                      fallback:
                        "data:image/png;base64,/9j/4QC8RXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAABIAAAAAQAAAEgAAAABAAAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAABQAAAADoAQAAQAAAB4AAAAAAAAA/+IBuElDQ19QUk9GSUxFAAEBAAABqGxjbXMCEAAAbW50clJHQiBYWVogB9wAAQAZAAMAKQA5YWNzcEFQUEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1sY21zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJZGVzYwAAAPAAAABfY3BydAAAAUwAAAAMd3RwdAAAAVgAAAAUclhZWgAAAWwAAAAUZ1hZWgAAAYAAAAAUYlhZWgAAAZQAAAAUclRSQwAAAQwAAABAZ1RSQwAAAQwAAABAYlRSQwAAAQwAAABAZGVzYwAAAAAAAAAFYzJjaQAAAAAAAAAAAAAAAGN1cnYAAAAAAAAAGgAAAMsByQNjBZIIawv2ED8VURs0IfEpkDIYO5JGBVF3Xe1rcHoFibGafKxpv33Tw+kw//90ZXh0AAAAAENDMABYWVogAAAAAAAA9tYAAQAAAADTLVhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z//bAEMABQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/bAEMBBQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/CABEIAB4AFAMBEQACEQEDEQH/xAAYAAADAQEAAAAAAAAAAAAAAAAFBgcECP/EABkBAAIDAQAAAAAAAAAAAAAAAAUGAAMEAv/aAAwDAQACEAMQAAAA5VIiNVeoNI1TBZgZ2GMAo/j1vospImVTMd3nK2JP6U//xAAkEAACAgEEAgMAAwAAAAAAAAABAgMEEQAFEiETcSIxMgZBYf/aAAgBAQABPwDw/EHj1rcNlvbdBQntVXiiuRGas7DAlTOOS/5nXi7PvW31DevR01haV2/CjP6JAA696t3t1obXtixxULKbdV8DNJTV5K6MccA8nLv++Q1esvuFyxbmVRJK3IhRgDrAA9a/jbLV3C9JIxMsHglVORUvGGKsVxjtcg+tbhuVeahbRKlgSzQFmHHiEYE4zn7GO9eNsAluyM6FaC5cr5BXjHNJyA7+CZxqxYaZLB80rSLDG0wY5VxIv5GScDoaclT96//EACIRAAICAQMEAwAAAAAAAAAAAAECAxEAEiExBEFRcRORof/aAAgBAgEBPwCtrwMj6tJ45ys6uUQxkk0BkPUn5gkqlC7laBNg9r94EVRSjYcd86/UDpKg7bXkMEwZZWjFM4p7Ffvf1hB85M6o8D6bp7+sdZYpTC2hkS5Ap4pjp8Xe94ds/8QAJhEAAgEEAQMDBQAAAAAAAAAAAQIDAAQSIREFE0ExMlEUYWJxgf/aAAgBAwEBPwAOS2IOydCpI5oMC49w5FdzQqPvLFJcRR5MuIGudseBV6vV7JLSeRYpoQVV2EekYn9nkeOfmri5luZpJnxDOeTiOB/BXTzA1sJDHK+MqM0UZ9yg715I8Vf9YuL63uLVumyxEkPiqniPEjTg+g43WQ5PA9K6JHJJNJD3iua4Aj5bW/tUVxb/AEEjs9wbiUyLLICBmyKWAP48Lv5pQGFf/9k=",
                    },
                    width: 500,
                    height: 750,
                  },
                },
                hasOnlyDefaultVariant: true,
                totalVariants: 1,
                variants: [
                  {
                    shopifyId: "gid://fake/ProductVariant/44362595795152",
                    displayName:
                      '"Prana" Original Acrylic Painting (SOLD) - Default Title',
                    title: "Default Title",
                    price: 5950,
                    inventoryQuantity: 0,
                    availableForSale: false,
                    selectedOptions: [
                      {
                        name: "Title",
                        value: "Default Title",
                      },
                    ],
                    image: null,
                  },
                ],
                mediaCount: 2,
                media: [
                  {
                    id: "cb11f265-4666-551d-857b-ca84ecc675bf",
                    alt: 'The framed painting titled "Prana" depicts a pair of realistic-looking lungs surrounded by colorful flowers, insects, and snakes. The background features a gradient that transitions from light to dark green. The artist, Brushella, is holding the painting with both hands and wearing a happy expression.',
                    mediaContentType: "IMAGE",
                    preview: {
                      status: "READY",
                      image: {
                        src: "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection.jpg?v=1750915766",
                        altText:
                          'The framed painting titled "Prana" depicts a pair of realistic-looking lungs surrounded by colorful flowers, insects, and snakes. The background features a gradient that transitions from light to dark green. The artist, Brushella, is holding the painting with both hands and wearing a happy expression.',
                        height: 1600,
                        width: 1066,
                        gatsbyImageData: {
                          images: {
                            sources: [
                              {
                                srcSet:
                                  "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_21x21_crop_center.jpg.webp?v=1750915766 21w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_41x41_crop_center.jpg.webp?v=1750915766 41w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_82x82_crop_center.jpg.webp?v=1750915766 82w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_164x164_crop_center.jpg.webp?v=1750915766 164w",
                                sizes: "(min-width: 82px) 82px, 100vw",
                                type: "image/webp",
                              },
                            ],
                            fallback: {
                              src: "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_82x82_crop_center.jpg?v=1750915766",
                              srcSet:
                                "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_21x21_crop_center.jpg?v=1750915766 21w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_41x41_crop_center.jpg?v=1750915766 41w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_82x82_crop_center.jpg?v=1750915766 82w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_164x164_crop_center.jpg?v=1750915766 164w",
                              sizes: "(min-width: 82px) 82px, 100vw",
                            },
                          },
                          layout: "constrained",
                          placeholder: {
                            fallback:
                              "data:image/png;base64,/9j/4QC8RXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAABIAAAAAQAAAEgAAAABAAAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAABQAAAADoAQAAQAAABQAAAAAAAAA/+IBuElDQ19QUk9GSUxFAAEBAAABqGxjbXMCEAAAbW50clJHQiBYWVogB9wAAQAZAAMAKQA5YWNzcEFQUEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1sY21zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJZGVzYwAAAPAAAABfY3BydAAAAUwAAAAMd3RwdAAAAVgAAAAUclhZWgAAAWwAAAAUZ1hZWgAAAYAAAAAUYlhZWgAAAZQAAAAUclRSQwAAAQwAAABAZ1RSQwAAAQwAAABAYlRSQwAAAQwAAABAZGVzYwAAAAAAAAAFYzJjaQAAAAAAAAAAAAAAAGN1cnYAAAAAAAAAGgAAAMsByQNjBZIIawv2ED8VURs0IfEpkDIYO5JGBVF3Xe1rcHoFibGafKxpv33Tw+kw//90ZXh0AAAAAENDMABYWVogAAAAAAAA9tYAAQAAAADTLVhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z//bAEMABQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/bAEMBBQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/CABEIABQAFAMBEQACEQEDEQH/xAAXAAEAAwAAAAAAAAAAAAAAAAAHBAYI/8QAGAEAAwEBAAAAAAAAAAAAAAAABAUGAwL/2gAMAwEAAhADEAAAAMyMUamsakzEaxC9qSSkCqqKn5nIeLk4OkP/xAAnEAACAgEDAgUFAAAAAAAAAAABAgMEEQAFEiFRBhMUMUEiMmFxof/aAAgBAQABPwCKsZiI04hgMksfgH8fvV/YfB9nbPDJsTW6FhKJSyIaZb1MxOQ/mOVGPjONX61RLllaUrvWD4jdxhmHfp/NeF4o5t386aJWjikhRldiFPMk4OM9Dx1u689svs4R1WLnAxb7EVsEJk+2dcc+ytjXrZqF+RIcFLacJlYZB4HmpHYgjodbpUgrxXVVCyw1GaMMzMAfpPye7E6KjoOwxr//xAAkEQABAwMCBwEAAAAAAAAAAAACAQMRAAQSISIQFDFBUWFx0f/aAAgBAgEBPwBwkAJpi7zMxAxNZ0SfFIJRuie8dKvykVHPHTxNMoJPiQliIuSgp76pC9qj0tXDAOvsiU7iQV+L9rlGAtrVxATMncVKEmJL84f/xAAkEQACAgEDAwUBAAAAAAAAAAABAgMRAAQFEhMhQRQiMVFhMv/aAAgBAwEBPwCN1DF5GIjWie15NqNvkbSKxkh5qCCYyOSk1YurAyd4FmcQOzRA+1mFEj9GaPRep04jMaMss0Scy1cbbsK838ZvS7bPt8vReOaaGVGEi9iKIUsPzxWcq8jNnqeCaGVQ0fBjXcfyOQ+P0Ym16BtTu69Cl0qN0Ryb20FP39m8BOf/2Q==",
                          },
                          width: 82,
                          height: 82,
                        },
                        originalSrc:
                          "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection.jpg?v=1750915766",
                        transformedSrc:
                          "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection.jpg?v=1750915766",
                      },
                    },
                  },
                  {
                    id: "ad684d16-58fe-5fda-8a01-1e905a03035d",
                    alt: 'The original painting titled "Prana" is displayed on the wall of a living room.',
                    mediaContentType: "IMAGE",
                    preview: {
                      status: "READY",
                      image: {
                        src: "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella.jpg?v=1750915766",
                        altText:
                          'The original painting titled "Prana" is displayed on the wall of a living room.',
                        height: 1127,
                        width: 1024,
                        gatsbyImageData: {
                          images: {
                            sources: [
                              {
                                srcSet:
                                  "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella_21x21_crop_center.jpg.webp?v=1750915766 21w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella_41x41_crop_center.jpg.webp?v=1750915766 41w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella_82x82_crop_center.jpg.webp?v=1750915766 82w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella_164x164_crop_center.jpg.webp?v=1750915766 164w",
                                sizes: "(min-width: 82px) 82px, 100vw",
                                type: "image/webp",
                              },
                            ],
                            fallback: {
                              src: "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella_82x82_crop_center.jpg?v=1750915766",
                              srcSet:
                                "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella_21x21_crop_center.jpg?v=1750915766 21w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella_41x41_crop_center.jpg?v=1750915766 41w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella_82x82_crop_center.jpg?v=1750915766 82w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella_164x164_crop_center.jpg?v=1750915766 164w",
                              sizes: "(min-width: 82px) 82px, 100vw",
                            },
                          },
                          layout: "constrained",
                          placeholder: {
                            fallback:
                              "data:image/png;base64,/9j/4QC8RXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAACAMgIA6AMAAIAyAgDoAwAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAABQAAAADoAQAAQAAABQAAAAAAAAA/+IBuElDQ19QUk9GSUxFAAEBAAABqGxjbXMCEAAAbW50clJHQiBYWVogB9wAAQAZAAMAKQA5YWNzcEFQUEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1sY21zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJZGVzYwAAAPAAAABfY3BydAAAAUwAAAAMd3RwdAAAAVgAAAAUclhZWgAAAWwAAAAUZ1hZWgAAAYAAAAAUYlhZWgAAAZQAAAAUclRSQwAAAQwAAABAZ1RSQwAAAQwAAABAYlRSQwAAAQwAAABAZGVzYwAAAAAAAAAFYzJjaQAAAAAAAAAAAAAAAGN1cnYAAAAAAAAAGgAAAMsByQNjBZIIawv2ED8VURs0IfEpkDIYO5JGBVF3Xe1rcHoFibGafKxpv33Tw+kw//90ZXh0AAAAAENDMABYWVogAAAAAAAA9tYAAQAAAADTLVhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z//bAEMABQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/bAEMBBQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/CABEIABQAFAMBEQACEQEDEQH/xAAWAAEBAQAAAAAAAAAAAAAAAAAFBwT/xAAaAQACAgMAAAAAAAAAAAAAAAADBAIFAAEG/9oADAMBAAIQAxAAAACKI9iIRa0GoiFL0LKu3tKEQ29AuQof/8QAKBAAAgIBAwIEBwAAAAAAAAAAAQIDBAUAERIGIRMxgaEiIzJBQlFh/9oACAEBAAE/AKvT5ssVDAEKT39hrK4uFI7Aik8R4FDyhfwXcLufU66Op0aXTOHCcxJNAJ5itUzcnlPL6uJ8l2G381Y6UvNha10SPUndpGDuOJjjDcVEqnYxsf131g+kLeTvX8DHk6y2bAUPYbk6vswcAcffWCwlqljocfSSXIpRVKr2YY+CNJEgDgCQg9j23++o8pYz2Jux2o4VWaVYXCIDupBbyfkN+2qVBccr5ITyTWoYo0jklWPdVA8vgVd/XWN6oytCKeKuYVQzFj8sdyQNzr//xAAeEQEAAgICAwEAAAAAAAAAAAABAAIDESExEiNxYf/aAAgBAgEBPwC2TxB0vOuIW5Be3RA2EtvG808j8h7MmK3QLofkLGtRoWEd8yuMsKqv2AHU/8QAJREBAAEEAgAFBQAAAAAAAAAAAQIAAwQREiEFEyIxQTJRYXGB/9oACAEDAQE/AM/nhlvhZ8xlGa7lx1x/j71mTxohCNwbnXp+e6v3Ztx1JAANVlZ+N4iEZ456fpZPZ96yIR3bue4cuQPf4auRZSZbDfwtE2KJrZUpuwAD9VJZPbvXVf/Z",
                          },
                          width: 82,
                          height: 82,
                        },
                        originalSrc:
                          "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella.jpg?v=1750915766",
                        transformedSrc:
                          "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella.jpg?v=1750915766",
                      },
                    },
                  },
                ],
                options: [
                  {
                    shopifyId: "gid://fake/ProductOption/10426976043216",
                    name: "Title",
                    values: ["Default Title"],
                  },
                ],
                publishedAt: "2025-06-17T04:50:28Z",
              },
              {
                id: "2552b8f2-7da0-5106-95f6-8c8bf90be9dc",
                title:
                  '"A moment without thoughts" Original Acrylic Painting (SOLD)',
                handle: "a-moment-without-thoughts-original-acrylic-painting",
                description:
                  'Medium: Acrylic painting on cotton canvas Size: 18" x 24" Framed (Gold and black oak frame) "They come and they go making no sense at all, and sometimes they do, bringing light to the bulb. For a moment of emptiness, I would give anything! There are just too many, the brain is hardly breathing. As I close my eyes and let them be these thoughts never go, cause they are part of me. I imagine my brain taking a break, from all these intruders that come every day. This is what it looks like when thoughts aren\'t around, leaving free space for life to use as a playground."',
                status: "ACTIVE",
                hasOutOfStockVariants: true,
                priceRangeV2: {
                  minVariantPrice: {
                    amount: 5950,
                    currencyCode: "AUD",
                  },
                  maxVariantPrice: {
                    amount: 5950,
                    currencyCode: "AUD",
                  },
                },
                featuredImage: {
                  altText:
                    'The framed painting titled "A Moment Without Thoughts" features a realistic depiction of a brain surrounded by colourful flowers, insects, and birds. The background showcases a gradient that transitions from light green to dark green. The artist, Brushella, is holding the painting with both hands while wearing a thoughtful expression.',
                  gatsbyImageData: {
                    images: {
                      sources: [
                        {
                          srcSet:
                            "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_125x188_crop_center.jpg.webp?v=1750915407 125w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_250x375_crop_center.jpg.webp?v=1750915407 250w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_500x750_crop_center.jpg.webp?v=1750915407 500w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_1000x1500_crop_center.jpg.webp?v=1750915407 1000w",
                          sizes: "(min-width: 500px) 500px, 100vw",
                          type: "image/webp",
                        },
                      ],
                      fallback: {
                        src: "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_500x750_crop_center.jpg?v=1750915407",
                        srcSet:
                          "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_125x188_crop_center.jpg?v=1750915407 125w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_250x375_crop_center.jpg?v=1750915407 250w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_500x750_crop_center.jpg?v=1750915407 500w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_1000x1500_crop_center.jpg?v=1750915407 1000w",
                        sizes: "(min-width: 500px) 500px, 100vw",
                      },
                    },
                    layout: "constrained",
                    placeholder: {
                      fallback:
                        "data:image/png;base64,/9j/4QC8RXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAABIAAAAAQAAAEgAAAABAAAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAABQAAAADoAQAAQAAAB4AAAAAAAAA/+IBuElDQ19QUk9GSUxFAAEBAAABqGxjbXMCEAAAbW50clJHQiBYWVogB9wAAQAZAAMAKQA5YWNzcEFQUEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1sY21zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJZGVzYwAAAPAAAABfY3BydAAAAUwAAAAMd3RwdAAAAVgAAAAUclhZWgAAAWwAAAAUZ1hZWgAAAYAAAAAUYlhZWgAAAZQAAAAUclRSQwAAAQwAAABAZ1RSQwAAAQwAAABAYlRSQwAAAQwAAABAZGVzYwAAAAAAAAAFYzJjaQAAAAAAAAAAAAAAAGN1cnYAAAAAAAAAGgAAAMsByQNjBZIIawv2ED8VURs0IfEpkDIYO5JGBVF3Xe1rcHoFibGafKxpv33Tw+kw//90ZXh0AAAAAENDMABYWVogAAAAAAAA9tYAAQAAAADTLVhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z//bAEMABQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/bAEMBBQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/CABEIAB4AFAMBEQACEQEDEQH/xAAaAAACAgMAAAAAAAAAAAAAAAAEBgAHAgUI/8QAGQEAAwEBAQAAAAAAAAAAAAAAAgQGBQMA/9oADAMBAAIQAxAAAADkV1Nj8Wm6q2uiycn0rain2vMFixN9dt5DFKuLEppw/wD/xAAkEAACAQMDBQADAAAAAAAAAAABAgMEBREAEiEGIjFBURNhcf/aAAgBAQABPwBIOASOD4/er10zcunp4aa4QLHLLBHOoDBh+OQZByPf0etGDnwNdKXe5SUS2iOkt88IBUispknTYvdnvHaRkgkeddcUdxuLw3G4JC8qQrTosG8BFjBKDazNxoU/v7yNWeYW+oZiWyFO3Zx3YBGeDkarKtrrVUsSt3guzOoAVFCFif4BknOorbvhhbxlFPIweR7HrVC8sZ2LIVLK0kzDyyrzgfDxxqoNTKY1kqXKwwo5w2C6TsMq2MZHPg6euw2ApAGv/8QAIREAAgIBBAMBAQAAAAAAAAAAAQIDEQAEEiExIkHRBTL/2gAIAQIBAT8ACjI3SS9vrKzVARutEgsCe+z9zQ6gmVUKMlkcGubzbn6iKTEGBIo9GiD6zRJIuzeCwThQezz7IxV8RfdZqnWMIxjVmXzLEXQ/kgA93eQiNxGzxIXklLEgAVVjj5nAz//EACYRAAIBAwQABgMAAAAAAAAAAAECAwAEEQUSITEGEyJBUaEjYXH/2gAIAQMBAT8AaQk4HdXMUtvsL9GhLx3Q1C9uFsLSGGJ23MoLL7d8n9VqY1JLiO3lCSK6MUZVIJCgn5NGb64q2vJLfZPG7I4LhWHPOPihqTahqemgXDx+ShJlHJGVy2B9VJJ+R9pyu44/ma8LoJRfesqmUj2YBDAgnnPRGOxWpia3t9RSG4YQQjZGNoDEOQx3Y9+e6wx6r//Z",
                    },
                    width: 500,
                    height: 750,
                  },
                },
                hasOnlyDefaultVariant: true,
                totalVariants: 1,
                variants: [
                  {
                    shopifyId: "gid://fake/ProductVariant/44362595729616",
                    displayName:
                      '"A moment without thoughts" Original Acrylic Painting (SOLD) - Default Title',
                    title: "Default Title",
                    price: 5950,
                    inventoryQuantity: 0,
                    availableForSale: false,
                    selectedOptions: [
                      {
                        name: "Title",
                        value: "Default Title",
                      },
                    ],
                    image: null,
                  },
                ],
                mediaCount: 2,
                media: [
                  {
                    id: "e72af80b-0d97-521e-9a37-7a6ce62a461f",
                    alt: 'The framed painting titled "A Moment Without Thoughts" features a realistic depiction of a brain surrounded by colourful flowers, insects, and birds. The background showcases a gradient that transitions from light green to dark green. The artist, Brushella, is holding the painting with both hands while wearing a thoughtful expression.',
                    mediaContentType: "IMAGE",
                    preview: {
                      status: "READY",
                      image: {
                        src: "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection.jpg?v=1750915407",
                        altText:
                          'The framed painting titled "A Moment Without Thoughts" features a realistic depiction of a brain surrounded by colourful flowers, insects, and birds. The background showcases a gradient that transitions from light green to dark green. The artist, Brushella, is holding the painting with both hands while wearing a thoughtful expression.',
                        height: 1600,
                        width: 1066,
                        gatsbyImageData: {
                          images: {
                            sources: [
                              {
                                srcSet:
                                  "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_21x21_crop_center.jpg.webp?v=1750915407 21w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_41x41_crop_center.jpg.webp?v=1750915407 41w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_82x82_crop_center.jpg.webp?v=1750915407 82w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_164x164_crop_center.jpg.webp?v=1750915407 164w",
                                sizes: "(min-width: 82px) 82px, 100vw",
                                type: "image/webp",
                              },
                            ],
                            fallback: {
                              src: "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_82x82_crop_center.jpg?v=1750915407",
                              srcSet:
                                "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_21x21_crop_center.jpg?v=1750915407 21w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_41x41_crop_center.jpg?v=1750915407 41w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_82x82_crop_center.jpg?v=1750915407 82w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_164x164_crop_center.jpg?v=1750915407 164w",
                              sizes: "(min-width: 82px) 82px, 100vw",
                            },
                          },
                          layout: "constrained",
                          placeholder: {
                            fallback:
                              "data:image/png;base64,/9j/4QC8RXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAABIAAAAAQAAAEgAAAABAAAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAABQAAAADoAQAAQAAABQAAAAAAAAA/+IBuElDQ19QUk9GSUxFAAEBAAABqGxjbXMCEAAAbW50clJHQiBYWVogB9wAAQAZAAMAKQA5YWNzcEFQUEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1sY21zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJZGVzYwAAAPAAAABfY3BydAAAAUwAAAAMd3RwdAAAAVgAAAAUclhZWgAAAWwAAAAUZ1hZWgAAAYAAAAAUYlhZWgAAAZQAAAAUclRSQwAAAQwAAABAZ1RSQwAAAQwAAABAYlRSQwAAAQwAAABAZGVzYwAAAAAAAAAFYzJjaQAAAAAAAAAAAAAAAGN1cnYAAAAAAAAAGgAAAMsByQNjBZIIawv2ED8VURs0IfEpkDIYO5JGBVF3Xe1rcHoFibGafKxpv33Tw+kw//90ZXh0AAAAAENDMABYWVogAAAAAAAA9tYAAQAAAADTLVhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z//bAEMABQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/bAEMBBQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/CABEIABQAFAMBEQACEQEDEQH/xAAXAAADAQAAAAAAAAAAAAAAAAAFBgcE/8QAGQEBAQADAQAAAAAAAAAAAAAABQYAAgQD/9oADAMBAAIQAxAAAACFdHOX8cn6g7wdu1Cvz60izZips5XNVxH/xAAnEAACAgEDAwQCAwAAAAAAAAABAgMEEQAFEgYhMSIyQYETcRRhkf/aAAgBAQABPwDZ9g6Tv7Wr295u1LuMHhXFhOeTkMoKkDGCCCc66/j22/uVWfZ4Io6sVCGJysTQ85IgQzBWVe5H2fnX8ckn04766V4VbZdkzxVmJJAx2AyM+Tj411HPDejrQrAHjZ244Xix9J9vz37edLScoh4H2j9/f962yslqa2XZx+LHHiceQPP+6lrpVnNhWZ5I6liVOeCA6KVU4GPGc/vUaJHFEijsqKB9DX//xAAjEQABBAEEAQUAAAAAAAAAAAABAAIDERIEBRNhMSEiQUKR/9oACAECAQE/AJZXwmi1pB9QbWjmt2JdlZryCsFuLXtMeFZUbBNWB5WgcOSNzGiNwFyD6gjtBlgHpbi0PlhafnIfgtMgjin4mj28gHaAoUv/xAAkEQACAQMEAgIDAAAAAAAAAAABAgMABBEFEiExQVETFCJxgf/aAAgBAwEBPwCR9NSC2ka5cSPkOpXIBX1j3WoXdpKRGgdJFGdrIVPWfI9V8wGOasrmGO4t5p4vkjjZm2jGeB3g94rUJbW51LS9lq0hkRw6IQHbevH6PNPKUd1PYYg/zitJsIby0uHkd1MQDLtIGSx2nOQfFWtjHDF99ZZDMsMpGSMfgNo8Z6okk5PZr//Z",
                          },
                          width: 82,
                          height: 82,
                        },
                        originalSrc:
                          "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection.jpg?v=1750915407",
                        transformedSrc:
                          "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection.jpg?v=1750915407",
                      },
                    },
                  },
                  {
                    id: "eb5c7ae3-ff59-58e0-b488-644f3fd41d0a",
                    alt: 'The original painting titled  "A Moment Without Thoughts" is displayed on the wall of a living room.',
                    mediaContentType: "IMAGE",
                    preview: {
                      status: "READY",
                      image: {
                        src: "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella.jpg?v=1750915407",
                        altText:
                          'The original painting titled  "A Moment Without Thoughts" is displayed on the wall of a living room.',
                        height: 2493,
                        width: 3467,
                        gatsbyImageData: {
                          images: {
                            sources: [
                              {
                                srcSet:
                                  "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella_21x21_crop_center.jpg.webp?v=1750915407 21w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella_41x41_crop_center.jpg.webp?v=1750915407 41w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella_82x82_crop_center.jpg.webp?v=1750915407 82w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella_164x164_crop_center.jpg.webp?v=1750915407 164w",
                                sizes: "(min-width: 82px) 82px, 100vw",
                                type: "image/webp",
                              },
                            ],
                            fallback: {
                              src: "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella_82x82_crop_center.jpg?v=1750915407",
                              srcSet:
                                "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella_21x21_crop_center.jpg?v=1750915407 21w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella_41x41_crop_center.jpg?v=1750915407 41w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella_82x82_crop_center.jpg?v=1750915407 82w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella_164x164_crop_center.jpg?v=1750915407 164w",
                              sizes: "(min-width: 82px) 82px, 100vw",
                            },
                          },
                          layout: "constrained",
                          placeholder: {
                            fallback:
                              "data:image/png;base64,/9j/4QC8RXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAABg0gQA6AMAAGDSBADoAwAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAABQAAAADoAQAAQAAABQAAAAAAAAA/+IBuElDQ19QUk9GSUxFAAEBAAABqGxjbXMCEAAAbW50clJHQiBYWVogB9wAAQAZAAMAKQA5YWNzcEFQUEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1sY21zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJZGVzYwAAAPAAAABfY3BydAAAAUwAAAAMd3RwdAAAAVgAAAAUclhZWgAAAWwAAAAUZ1hZWgAAAYAAAAAUYlhZWgAAAZQAAAAUclRSQwAAAQwAAABAZ1RSQwAAAQwAAABAYlRSQwAAAQwAAABAZGVzYwAAAAAAAAAFYzJjaQAAAAAAAAAAAAAAAGN1cnYAAAAAAAAAGgAAAMsByQNjBZIIawv2ED8VURs0IfEpkDIYO5JGBVF3Xe1rcHoFibGafKxpv33Tw+kw//90ZXh0AAAAAENDMABYWVogAAAAAAAA9tYAAQAAAADTLVhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z//bAEMABQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/bAEMBBQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/CABEIABQAFAMBEQACEQEDEQH/xAAYAAADAQEAAAAAAAAAAAAAAAAFBwgDBP/EABcBAQEBAQAAAAAAAAAAAAAAAAQDAQX/2gAMAwEAAhADEAAAAHAKnNtJu5kqgUwZeZIiBKJ55qjF0P/EACgQAAEEAAYABgMBAAAAAAAAAAECAwQFAAYREiExExQVFiJhByNBgf/aAAgBAQABPwChzRFgUldCdr39zVc4/wCPs0Z+G5W0kda6d494uXWX76TGjojrjKZaDhWVpSHgCVngcJxf5Qu3rFa/R3TuQlX6W1pT8xv6HGvPOKG/rPaQhGKmS9HYLT0c9uBzXgAcnUHrDsuvy3Ttv0OSXHI00q81EQChbXhjlx4LJAQE9f0/zFZnODaxvMNeEEbykBa9pA7Hf0cVmW66bRU8hRcbdeG5amyEkqG4A66c/wC4T+PahlEhHqdwtKEn4qnu6K+iAR3jNFTEqLZyFBBZYbbSEpSE8/ZOnJ+8f//EACQRAAIBAwIGAwAAAAAAAAAAAAECAwAREjFBBCEiMkJhE5Hw/9oACAECAQE/AE4lTKYfjbpHdtTzXhkdTaxtc6D3QdvOPFtwBQ41TJPCkJLxkA+77iiWxAWNcT3A8iKecA8x+vTRoHDgWZtfdqbEeC/VY3L5Ox6jrX//xAAiEQEAAQQBAwUAAAAAAAAAAAABAgADESExBBIiUWGBkdH/2gAIAQMBAT8AmJ3PpVmHfdIIS4fFznJmmMhTHFPSLG3cncCFwfzdWrVm2yCTFNiGmizMPI37bqNyTFgujj5qPcp5P3QhCGIRMxOK/9k=",
                          },
                          width: 82,
                          height: 82,
                        },
                        originalSrc:
                          "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella.jpg?v=1750915407",
                        transformedSrc:
                          "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella.jpg?v=1750915407",
                      },
                    },
                  },
                ],
                options: [
                  {
                    shopifyId: "gid://fake/ProductOption/10426976010448",
                    name: "Title",
                    values: ["Default Title"],
                  },
                ],
                publishedAt: "2025-06-17T04:50:28Z",
              },
              {
                id: "cda1f176-4f56-57de-8aad-02bbc36d5776",
                title: '"After Grief" Original Acrylic Painting (SOLD)',
                handle: "after-grief",
                description:
                  'Medium: Acrylic painting on cotton canvas. Size: 18" x 24". Framed (Gold and black oak frame). "Our hearts are home for joy and pain, beating steadily through sunshine and rain. When the storm destroys everything in its path, know that this too shall pass. Lotus flowers only grow in the mud, and seeds can only open up in the dark. Our time in this realm is quite brief, your broken heart will bloom again... after grief."',
                status: "ACTIVE",
                hasOutOfStockVariants: true,
                priceRangeV2: {
                  minVariantPrice: {
                    amount: 5950,
                    currencyCode: "AUD",
                  },
                  maxVariantPrice: {
                    amount: 5950,
                    currencyCode: "AUD",
                  },
                },
                featuredImage: {
                  altText:
                    'The framed painting titled "After Grief," depicting a realistic-looking human heart surrounded by colourful birds, insects, and flowers, is displayed by the artist Brushella, who holds it with both hands and a happy expression.',
                  gatsbyImageData: {
                    images: {
                      sources: [
                        {
                          srcSet:
                            "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_125x188_crop_center.jpg.webp?v=1750915560 125w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_250x375_crop_center.jpg.webp?v=1750915560 250w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_500x750_crop_center.jpg.webp?v=1750915560 500w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_1000x1500_crop_center.jpg.webp?v=1750915560 1000w",
                          sizes: "(min-width: 500px) 500px, 100vw",
                          type: "image/webp",
                        },
                      ],
                      fallback: {
                        src: "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_500x750_crop_center.jpg?v=1750915560",
                        srcSet:
                          "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_125x188_crop_center.jpg?v=1750915560 125w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_250x375_crop_center.jpg?v=1750915560 250w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_500x750_crop_center.jpg?v=1750915560 500w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_1000x1500_crop_center.jpg?v=1750915560 1000w",
                        sizes: "(min-width: 500px) 500px, 100vw",
                      },
                    },
                    layout: "constrained",
                    placeholder: {
                      fallback:
                        "data:image/png;base64,/9j/4QC8RXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAABIAAAAAQAAAEgAAAABAAAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAABQAAAADoAQAAQAAAB4AAAAAAAAA/+IBuElDQ19QUk9GSUxFAAEBAAABqGxjbXMCEAAAbW50clJHQiBYWVogB9wAAQAZAAMAKQA5YWNzcEFQUEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1sY21zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJZGVzYwAAAPAAAABfY3BydAAAAUwAAAAMd3RwdAAAAVgAAAAUclhZWgAAAWwAAAAUZ1hZWgAAAYAAAAAUYlhZWgAAAZQAAAAUclRSQwAAAQwAAABAZ1RSQwAAAQwAAABAYlRSQwAAAQwAAABAZGVzYwAAAAAAAAAFYzJjaQAAAAAAAAAAAAAAAGN1cnYAAAAAAAAAGgAAAMsByQNjBZIIawv2ED8VURs0IfEpkDIYO5JGBVF3Xe1rcHoFibGafKxpv33Tw+kw//90ZXh0AAAAAENDMABYWVogAAAAAAAA9tYAAQAAAADTLVhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z//bAEMABQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/bAEMBBQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/CABEIAB4AFAMBEQACEQEDEQH/xAAZAAACAwEAAAAAAAAAAAAAAAAFBwMEBgj/xAAZAQACAwEAAAAAAAAAAAAAAAAEBQEDBgL/2gAMAwEAAhADEAAAAOQzhDE9Du6N3RGoDJXrpQ1FJxBY8X+tw5ClnOMzvuMR/8QAJBAAAgIBBAEEAwAAAAAAAAAAAQIDEQQABRIhMQYTUWEiQXH/2gAIAQEAAT8AWCiwP61uGw7jtEkEWfhvBJNCk8auKLRyC1YfR02P30B41tPpNs5RJMspSQSNxiZQyolWzWDQN0PnXrvHyd6mws2VJlOLt8GKi81ezEPJ6BBc+fjU23SxSyRyLToaIvxX81sma3sQ4clGdRKIWqm4SMrcSerAN1rfc7B2/b8rKZVlmjqRI6HAOASQwN8u6Oodpy541yMyZ5sice7I7N2S2sLj7RnaFZJCoZeZIChiFFV8edb1jTyrLG0kbBU5MSnfHnw4js9/ejKiUgU/iK8141//xAAhEQACAgIDAAMBAQAAAAAAAAABAgMRADEEEiETQWEFsf/aAAgBAgEBPwAR7yMxvfUg1hT8zkziDuvUg9RRINe/6M43Ih+UoisGs2pNki/o4gDqGU2Do5/WiKur9vCNk+L9e3oZG8kssQ7BjRtwbJGh7kMIjjRbJoZy1i+IySBj4AoGiSdH8yPj8ZGl6w9KnRAAb37s5Wf/xAAkEQABAwMDBAMAAAAAAAAAAAABAgMRAAQhBRIxEyJBURVhof/aAAgBAwEBPwAuyBFPJdZCSsQCKD2OTTQcAsnOj1kuqVtQhYB7ImYmJnE1cXN06ttm5t9hUAkKggDE5BzT5ctHVsOp2rSciQf0Vod+wX7EXIw0pWw4EwAQD74rWnbb5O2WkrBcAX0ie1JjmD5PmMVe3zlzcuOmO48+/s1oFii+dfZW2haWglZCiRiYMFPniK1HSk6e84UlKiLMvpXndChgQSeKKogRX//Z",
                    },
                    width: 500,
                    height: 750,
                  },
                },
                hasOnlyDefaultVariant: true,
                totalVariants: 1,
                variants: [
                  {
                    shopifyId: "gid://fake/ProductVariant/44362595631312",
                    displayName:
                      '"After Grief" Original Acrylic Painting (SOLD) - Default Title',
                    title: "Default Title",
                    price: 5950,
                    inventoryQuantity: 0,
                    availableForSale: false,
                    selectedOptions: [
                      {
                        name: "Title",
                        value: "Default Title",
                      },
                    ],
                    image: null,
                  },
                ],
                mediaCount: 2,
                media: [
                  {
                    id: "ce2befce-410e-59f5-951c-1cfaa069f32d",
                    alt: 'The framed painting titled "After Grief," depicting a realistic-looking human heart surrounded by colourful birds, insects, and flowers, is displayed by the artist Brushella, who holds it with both hands and a happy expression.',
                    mediaContentType: "IMAGE",
                    preview: {
                      status: "READY",
                      image: {
                        src: "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection.jpg?v=1750915560",
                        altText:
                          'The framed painting titled "After Grief," depicting a realistic-looking human heart surrounded by colourful birds, insects, and flowers, is displayed by the artist Brushella, who holds it with both hands and a happy expression.',
                        height: 1600,
                        width: 1066,
                        gatsbyImageData: {
                          images: {
                            sources: [
                              {
                                srcSet:
                                  "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_21x21_crop_center.jpg.webp?v=1750915560 21w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_41x41_crop_center.jpg.webp?v=1750915560 41w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_82x82_crop_center.jpg.webp?v=1750915560 82w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_164x164_crop_center.jpg.webp?v=1750915560 164w",
                                sizes: "(min-width: 82px) 82px, 100vw",
                                type: "image/webp",
                              },
                            ],
                            fallback: {
                              src: "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_82x82_crop_center.jpg?v=1750915560",
                              srcSet:
                                "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_21x21_crop_center.jpg?v=1750915560 21w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_41x41_crop_center.jpg?v=1750915560 41w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_82x82_crop_center.jpg?v=1750915560 82w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_164x164_crop_center.jpg?v=1750915560 164w",
                              sizes: "(min-width: 82px) 82px, 100vw",
                            },
                          },
                          layout: "constrained",
                          placeholder: {
                            fallback:
                              "data:image/png;base64,/9j/4QC8RXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAABIAAAAAQAAAEgAAAABAAAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAABQAAAADoAQAAQAAABQAAAAAAAAA/+IBuElDQ19QUk9GSUxFAAEBAAABqGxjbXMCEAAAbW50clJHQiBYWVogB9wAAQAZAAMAKQA5YWNzcEFQUEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1sY21zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJZGVzYwAAAPAAAABfY3BydAAAAUwAAAAMd3RwdAAAAVgAAAAUclhZWgAAAWwAAAAUZ1hZWgAAAYAAAAAUYlhZWgAAAZQAAAAUclRSQwAAAQwAAABAZ1RSQwAAAQwAAABAYlRSQwAAAQwAAABAZGVzYwAAAAAAAAAFYzJjaQAAAAAAAAAAAAAAAGN1cnYAAAAAAAAAGgAAAMsByQNjBZIIawv2ED8VURs0IfEpkDIYO5JGBVF3Xe1rcHoFibGafKxpv33Tw+kw//90ZXh0AAAAAENDMABYWVogAAAAAAAA9tYAAQAAAADTLVhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z//bAEMABQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/bAEMBBQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/CABEIABQAFAMBEQACEQEDEQH/xAAYAAADAQEAAAAAAAAAAAAAAAAEBgcDCP/EABYBAQEBAAAAAAAAAAAAAAAAAAQFBv/aAAwDAQACEAMQAAAA5dozXw7UB0mzSaRwHzDT5ZiGLeHYL2ec/8QAKBAAAgEDAgQGAwAAAAAAAAAAAQIDBAURABITISIxBkFRYXGRFBVC/9oACAEBAAE/AKS01ta8gpoN5yQMsFGfliNeP7XboK61fprekdOtqpmqOG6uvGK9ZOCeof176aA57ferDBbzb6dxErcJalHjdR0yMy9asO+5T59tXe1001JNLOqR00e3fLtGREQTyBILchj50T+dJLVQUfAglctFG5G4L5ZxgfWqarlpa2n4eNpXmpGQc48teLa2peilgaQmN4zy9B6D21BDEsEChAAsagfWv//EACQRAAIBAgUEAwAAAAAAAAAAAAECEQADBAUhMUESEyJRYXGx/9oACAECAQE/AHZbYYk7AmsOzhiHYGWMQZ/K6azQslw+JClQSQSZjmDt81auIt5Wtkw8zbYyJ96e6w63Ozb6hrGpPNZooYA7FRKkcGawI7lxmcyV0n7NDQRX/8QAJhEAAgEEAgECBwAAAAAAAAAAAQIDAAQFESExEhNhFDJBUnGBkf/aAAgBAwEBPwCNlkaJTIigkDbsFH9NXctnOi/DyDYUcDv8aoSjXdYuKLJHFw6UiN5PMFQNE63yOT7brJ46O0yUKxxBYwwKyht7GutHnY+tZSe2e+naIeKk/KoAAP6q0uJbYRSxtpvUI56IYaNT5Ce7yFsHCqqJpQoP2+5NMSx2ezzX/9k=",
                          },
                          width: 82,
                          height: 82,
                        },
                        originalSrc:
                          "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection.jpg?v=1750915560",
                        transformedSrc:
                          "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection.jpg?v=1750915560",
                      },
                    },
                  },
                  {
                    id: "9a3cb3fb-8ebd-5552-9b23-4aaa1b4e4cc3",
                    alt: 'The original painting titled "After Grief" is displayed on the wall of a living room.',
                    mediaContentType: "IMAGE",
                    preview: {
                      status: "READY",
                      image: {
                        src: "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella.jpg?v=1750915560",
                        altText:
                          'The original painting titled "After Grief" is displayed on the wall of a living room.',
                        height: 2708,
                        width: 2495,
                        gatsbyImageData: {
                          images: {
                            sources: [
                              {
                                srcSet:
                                  "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella_21x21_crop_center.jpg.webp?v=1750915560 21w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella_41x41_crop_center.jpg.webp?v=1750915560 41w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella_82x82_crop_center.jpg.webp?v=1750915560 82w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella_164x164_crop_center.jpg.webp?v=1750915560 164w",
                                sizes: "(min-width: 82px) 82px, 100vw",
                                type: "image/webp",
                              },
                            ],
                            fallback: {
                              src: "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella_82x82_crop_center.jpg?v=1750915560",
                              srcSet:
                                "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella_21x21_crop_center.jpg?v=1750915560 21w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella_41x41_crop_center.jpg?v=1750915560 41w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella_82x82_crop_center.jpg?v=1750915560 82w,\nhttps://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella_164x164_crop_center.jpg?v=1750915560 164w",
                              sizes: "(min-width: 82px) 82px, 100vw",
                            },
                          },
                          layout: "constrained",
                          placeholder: {
                            fallback:
                              "data:image/png;base64,/9j/4QC8RXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAABg0gQA6AMAAGDSBADoAwAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAABQAAAADoAQAAQAAABQAAAAAAAAA/+IBuElDQ19QUk9GSUxFAAEBAAABqGxjbXMCEAAAbW50clJHQiBYWVogB9wAAQAZAAMAKQA5YWNzcEFQUEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1sY21zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJZGVzYwAAAPAAAABfY3BydAAAAUwAAAAMd3RwdAAAAVgAAAAUclhZWgAAAWwAAAAUZ1hZWgAAAYAAAAAUYlhZWgAAAZQAAAAUclRSQwAAAQwAAABAZ1RSQwAAAQwAAABAYlRSQwAAAQwAAABAZGVzYwAAAAAAAAAFYzJjaQAAAAAAAAAAAAAAAGN1cnYAAAAAAAAAGgAAAMsByQNjBZIIawv2ED8VURs0IfEpkDIYO5JGBVF3Xe1rcHoFibGafKxpv33Tw+kw//90ZXh0AAAAAENDMABYWVogAAAAAAAA9tYAAQAAAADTLVhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z//bAEMABQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/bAEMBBQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/CABEIABQAFAMBEQACEQEDEQH/xAAXAAADAQAAAAAAAAAAAAAAAAAEBQcG/8QAGgEAAgMBAQAAAAAAAAAAAAAAAwQBAgUGAP/aAAwDAQACEAMQAAAAlFbmIeyOoM1Q9p4t5a1OW6dS4Zpnsi//xAAmEAABBAEEAQMFAAAAAAAAAAABAgMEEQUABhIhEwciMTIzUXGx/9oACAEBAAE/AN87ok7ncxJegtMmOy4R4nVOg+SiQeSU0U1puLFcxaXAEJpgK5E/UoC6H8/Glcb1OwOSi5PFQHZTEtclYbuLbvjSojko1V0LJ/WmvSVLwQhjcT4ilCCAqO0olXYPwpNDrrUz0bnMuhLOQkPJKb5JjIodkV9zSsPEcy2PK+R8jjbRApPtJ7riB2b1itvxUKZaRKmJQAEgB49ADrS8G0CKyE4dfHnOv//EACgRAAIBAgQDCQAAAAAAAAAAAAECAwARBRIhMQQGEBMVFkFUcZHR4f/aAAgBAgEBPwCNgb+9NK4mAOa+a2mxB0tboz9lHM6qWZVLBRubDajzaysS2HRNICRmEhXTy3FR83Flu3BRqb7Gb8p1DId67lwyVzn4UG9ydTXh3B/RL8n7r//EACkRAAIBAwEECwAAAAAAAAAAAAECEQADIQQFEBOhEhUjMlFTVGFxkvD/2gAIAQMBAT8AdCvR96axaGjW+LvacUqRJwJxuIZygJgSFn5o7ItTPEjM92c+NHZqeoP0NW2IcYH4U2t1Kri5yFdYarzOQr//2Q==",
                          },
                          width: 82,
                          height: 82,
                        },
                        originalSrc:
                          "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella.jpg?v=1750915560",
                        transformedSrc:
                          "https://cdn.fake-for-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella.jpg?v=1750915560",
                      },
                    },
                  },
                ],
                options: [
                  {
                    shopifyId: "gid://fake/ProductOption/10426975944912",
                    name: "Title",
                    values: ["Default Title"],
                  },
                ],
                publishedAt: "2025-06-17T04:50:27Z",
              },
            ],
          },
        ],
      },
    }));
    render(<TileList />);
    screen.getByAltText(/alt text for testing purposes/i);
  });

  it("renders correctly with custom title", async () => {
    render(<TileList title="my title prop" />);
    screen.getByRole("heading", { name: "my title prop" });
  });
});
