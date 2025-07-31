const REGEX_INTERCEPT_POST_REQUEST = /api\/2025-01\/graphql/;
const MOCKED_CATEGORIES = ["Original Paintings"];
const MOCKED_LAYOUT_GLOBAL_DATA = {
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
        title: "Original Paintings",
        handle: "original-paintings",
        description:
          "Brushella’s original artworks come in various sizes, styles, and mediums, from canvas paintings to wooden jewellery boxes and everything in between!. Please be aware that when you buy an original painting from Brushella, you automatically agree to the fact that the artwork may also be replicated as a fine art print multiple times and they will be available to purchase for other people (unless you order a commissioned custom painting) but you, and ONLY YOU, have the honor of owning Brushella's original painting!",
        descriptionHtml:
          '<p data-pm-slice="1 1 []">Brushella’s original artworks come in various sizes, styles, and mediums, from canvas paintings to wooden jewellery boxes and everything in between!. </p>\n<p>Please be aware that when you buy an original painting from Brushella, you automatically agree to the fact that the artwork may also be replicated as a fine art print multiple times and they will be available to purchase for other people (unless you order a commissioned custom painting) but you, and ONLY YOU, have the honor of owning Brushella\'s original painting!</p>',
        image: {
          src: "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/collections/original-paintings.png?v=1731380886",
          originalSrc:
            "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/collections/original-paintings.png?v=1731380886",
          transformedSrc:
            "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/collections/original-paintings.png?v=1731380886",
          altText: null,
          width: 800,
          height: 800,
          gatsbyImageData: {
            images: {
              sources: [
                {
                  srcSet:
                    "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/collections/original-paintings_200x200_crop_center.png.webp?v=1731380886 200w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/collections/original-paintings_400x400_crop_center.png.webp?v=1731380886 400w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/collections/original-paintings_800x800_crop_center.png.webp?v=1731380886 800w",
                  sizes: "(min-width: 800px) 800px, 100vw",
                  type: "image/webp",
                },
              ],
              fallback: {
                src: "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/collections/original-paintings_800x800_crop_center.png?v=1731380886",
                srcSet:
                  "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/collections/original-paintings_200x200_crop_center.png?v=1731380886 200w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/collections/original-paintings_400x400_crop_center.png?v=1731380886 400w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/collections/original-paintings_800x800_crop_center.png?v=1731380886 800w",
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
                        "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_125x188_crop_center.jpg.webp?v=1750915766 125w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_250x375_crop_center.jpg.webp?v=1750915766 250w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_500x750_crop_center.jpg.webp?v=1750915766 500w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_1000x1500_crop_center.jpg.webp?v=1750915766 1000w",
                      sizes: "(min-width: 500px) 500px, 100vw",
                      type: "image/webp",
                    },
                  ],
                  fallback: {
                    src: "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_500x750_crop_center.jpg?v=1750915766",
                    srcSet:
                      "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_125x188_crop_center.jpg?v=1750915766 125w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_250x375_crop_center.jpg?v=1750915766 250w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_500x750_crop_center.jpg?v=1750915766 500w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_1000x1500_crop_center.jpg?v=1750915766 1000w",
                    sizes: "(min-width: 500px) 500px, 100vw",
                  },
                },
                layout: "constrained",
                placeholder: {
                  fallback: "data:image/png;base64/wdsdsdds",
                },
                width: 500,
                height: 750,
              },
            },
            hasOnlyDefaultVariant: true,
            totalVariants: 1,
            variants: [
              {
                "fake-e2e-testingId":
                  "gid://fake-e2e-testing/ProductVariant/44362595795152",
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
                    src: "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection.jpg?v=1750915766",
                    altText:
                      'The framed painting titled "Prana" depicts a pair of realistic-looking lungs surrounded by colorful flowers, insects, and snakes. The background features a gradient that transitions from light to dark green. The artist, Brushella, is holding the painting with both hands and wearing a happy expression.',
                    height: 1600,
                    width: 1066,
                    gatsbyImageData: {
                      images: {
                        sources: [
                          {
                            srcSet:
                              "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_21x21_crop_center.jpg.webp?v=1750915766 21w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_41x41_crop_center.jpg.webp?v=1750915766 41w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_82x82_crop_center.jpg.webp?v=1750915766 82w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_164x164_crop_center.jpg.webp?v=1750915766 164w",
                            sizes: "(min-width: 82px) 82px, 100vw",
                            type: "image/webp",
                          },
                        ],
                        fallback: {
                          src: "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_82x82_crop_center.jpg?v=1750915766",
                          srcSet:
                            "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_21x21_crop_center.jpg?v=1750915766 21w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_41x41_crop_center.jpg?v=1750915766 41w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_82x82_crop_center.jpg?v=1750915766 82w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection_164x164_crop_center.jpg?v=1750915766 164w",
                          sizes: "(min-width: 82px) 82px, 100vw",
                        },
                      },
                      layout: "constrained",
                      placeholder: {
                        fallback: "data:image/png;base64/wdsdsdds",
                      },
                      width: 82,
                      height: 82,
                    },
                    originalSrc:
                      "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection.jpg?v=1750915766",
                    transformedSrc:
                      "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection.jpg?v=1750915766",
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
                    src: "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella.jpg?v=1750915766",
                    altText:
                      'The original painting titled "Prana" is displayed on the wall of a living room.',
                    height: 1127,
                    width: 1024,
                    gatsbyImageData: {
                      images: {
                        sources: [
                          {
                            srcSet:
                              "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella_21x21_crop_center.jpg.webp?v=1750915766 21w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella_41x41_crop_center.jpg.webp?v=1750915766 41w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella_82x82_crop_center.jpg.webp?v=1750915766 82w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella_164x164_crop_center.jpg.webp?v=1750915766 164w",
                            sizes: "(min-width: 82px) 82px, 100vw",
                            type: "image/webp",
                          },
                        ],
                        fallback: {
                          src: "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella_82x82_crop_center.jpg?v=1750915766",
                          srcSet:
                            "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella_21x21_crop_center.jpg?v=1750915766 21w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella_41x41_crop_center.jpg?v=1750915766 41w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella_82x82_crop_center.jpg?v=1750915766 82w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella_164x164_crop_center.jpg?v=1750915766 164w",
                          sizes: "(min-width: 82px) 82px, 100vw",
                        },
                      },
                      layout: "constrained",
                      placeholder: {
                        fallback: "data:image/png;base64/wdsdsdds",
                      },
                      width: 82,
                      height: 82,
                    },
                    originalSrc:
                      "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella.jpg?v=1750915766",
                    transformedSrc:
                      "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/prana-by-brushella.jpg?v=1750915766",
                  },
                },
              },
            ],
            options: [
              {
                "fake-e2e-testingId":
                  "gid://fake-e2e-testing/ProductOption/10426976043216",
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
                        "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_125x188_crop_center.jpg.webp?v=1750915407 125w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_250x375_crop_center.jpg.webp?v=1750915407 250w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_500x750_crop_center.jpg.webp?v=1750915407 500w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_1000x1500_crop_center.jpg.webp?v=1750915407 1000w",
                      sizes: "(min-width: 500px) 500px, 100vw",
                      type: "image/webp",
                    },
                  ],
                  fallback: {
                    src: "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_500x750_crop_center.jpg?v=1750915407",
                    srcSet:
                      "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_125x188_crop_center.jpg?v=1750915407 125w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_250x375_crop_center.jpg?v=1750915407 250w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_500x750_crop_center.jpg?v=1750915407 500w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_1000x1500_crop_center.jpg?v=1750915407 1000w",
                    sizes: "(min-width: 500px) 500px, 100vw",
                  },
                },
                layout: "constrained",
                placeholder: {
                  fallback: "data:image/png;base64/wdsdsdds",
                },
                width: 500,
                height: 750,
              },
            },
            hasOnlyDefaultVariant: true,
            totalVariants: 1,
            variants: [
              {
                "fake-e2e-testingId":
                  "gid://fake-e2e-testing/ProductVariant/44362595729616",
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
                    src: "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection.jpg?v=1750915407",
                    altText:
                      'The framed painting titled "A Moment Without Thoughts" features a realistic depiction of a brain surrounded by colourful flowers, insects, and birds. The background showcases a gradient that transitions from light green to dark green. The artist, Brushella, is holding the painting with both hands while wearing a thoughtful expression.',
                    height: 1600,
                    width: 1066,
                    gatsbyImageData: {
                      images: {
                        sources: [
                          {
                            srcSet:
                              "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_21x21_crop_center.jpg.webp?v=1750915407 21w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_41x41_crop_center.jpg.webp?v=1750915407 41w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_82x82_crop_center.jpg.webp?v=1750915407 82w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_164x164_crop_center.jpg.webp?v=1750915407 164w",
                            sizes: "(min-width: 82px) 82px, 100vw",
                            type: "image/webp",
                          },
                        ],
                        fallback: {
                          src: "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_82x82_crop_center.jpg?v=1750915407",
                          srcSet:
                            "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_21x21_crop_center.jpg?v=1750915407 21w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_41x41_crop_center.jpg?v=1750915407 41w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_82x82_crop_center.jpg?v=1750915407 82w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection_164x164_crop_center.jpg?v=1750915407 164w",
                          sizes: "(min-width: 82px) 82px, 100vw",
                        },
                      },
                      layout: "constrained",
                      placeholder: {
                        fallback: "data:image/png;base64/wdsdsdds",
                      },
                      width: 82,
                      height: 82,
                    },
                    originalSrc:
                      "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection.jpg?v=1750915407",
                    transformedSrc:
                      "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection.jpg?v=1750915407",
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
                    src: "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella.jpg?v=1750915407",
                    altText:
                      'The original painting titled  "A Moment Without Thoughts" is displayed on the wall of a living room.',
                    height: 2493,
                    width: 3467,
                    gatsbyImageData: {
                      images: {
                        sources: [
                          {
                            srcSet:
                              "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella_21x21_crop_center.jpg.webp?v=1750915407 21w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella_41x41_crop_center.jpg.webp?v=1750915407 41w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella_82x82_crop_center.jpg.webp?v=1750915407 82w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella_164x164_crop_center.jpg.webp?v=1750915407 164w",
                            sizes: "(min-width: 82px) 82px, 100vw",
                            type: "image/webp",
                          },
                        ],
                        fallback: {
                          src: "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella_82x82_crop_center.jpg?v=1750915407",
                          srcSet:
                            "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella_21x21_crop_center.jpg?v=1750915407 21w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella_41x41_crop_center.jpg?v=1750915407 41w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella_82x82_crop_center.jpg?v=1750915407 82w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella_164x164_crop_center.jpg?v=1750915407 164w",
                          sizes: "(min-width: 82px) 82px, 100vw",
                        },
                      },
                      layout: "constrained",
                      placeholder: {
                        fallback: "data:image/png;base64/wdsdsdds",
                      },
                      width: 82,
                      height: 82,
                    },
                    originalSrc:
                      "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella.jpg?v=1750915407",
                    transformedSrc:
                      "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/a-moment-without-thoughts-by-brushella.jpg?v=1750915407",
                  },
                },
              },
            ],
            options: [
              {
                "fake-e2e-testingId":
                  "gid://fake-e2e-testing/ProductOption/10426976010448",
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
                        "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_125x188_crop_center.jpg.webp?v=1750915560 125w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_250x375_crop_center.jpg.webp?v=1750915560 250w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_500x750_crop_center.jpg.webp?v=1750915560 500w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_1000x1500_crop_center.jpg.webp?v=1750915560 1000w",
                      sizes: "(min-width: 500px) 500px, 100vw",
                      type: "image/webp",
                    },
                  ],
                  fallback: {
                    src: "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_500x750_crop_center.jpg?v=1750915560",
                    srcSet:
                      "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_125x188_crop_center.jpg?v=1750915560 125w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_250x375_crop_center.jpg?v=1750915560 250w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_500x750_crop_center.jpg?v=1750915560 500w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_1000x1500_crop_center.jpg?v=1750915560 1000w",
                    sizes: "(min-width: 500px) 500px, 100vw",
                  },
                },
                layout: "constrained",
                placeholder: {
                  fallback: "data:image/png;base64/wdsdsdds",
                },
                width: 500,
                height: 750,
              },
            },
            hasOnlyDefaultVariant: true,
            totalVariants: 1,
            variants: [
              {
                "fake-e2e-testingId":
                  "gid://fake-e2e-testing/ProductVariant/44362595631312",
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
                    src: "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection.jpg?v=1750915560",
                    altText:
                      'The framed painting titled "After Grief," depicting a realistic-looking human heart surrounded by colourful birds, insects, and flowers, is displayed by the artist Brushella, who holds it with both hands and a happy expression.',
                    height: 1600,
                    width: 1066,
                    gatsbyImageData: {
                      images: {
                        sources: [
                          {
                            srcSet:
                              "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_21x21_crop_center.jpg.webp?v=1750915560 21w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_41x41_crop_center.jpg.webp?v=1750915560 41w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_82x82_crop_center.jpg.webp?v=1750915560 82w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_164x164_crop_center.jpg.webp?v=1750915560 164w",
                            sizes: "(min-width: 82px) 82px, 100vw",
                            type: "image/webp",
                          },
                        ],
                        fallback: {
                          src: "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_82x82_crop_center.jpg?v=1750915560",
                          srcSet:
                            "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_21x21_crop_center.jpg?v=1750915560 21w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_41x41_crop_center.jpg?v=1750915560 41w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_82x82_crop_center.jpg?v=1750915560 82w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection_164x164_crop_center.jpg?v=1750915560 164w",
                          sizes: "(min-width: 82px) 82px, 100vw",
                        },
                      },
                      layout: "constrained",
                      placeholder: {
                        fallback: "data:image/png;base64/wdsdsdds",
                      },
                      width: 82,
                      height: 82,
                    },
                    originalSrc:
                      "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection.jpg?v=1750915560",
                    transformedSrc:
                      "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection.jpg?v=1750915560",
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
                    src: "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella.jpg?v=1750915560",
                    altText:
                      'The original painting titled "After Grief" is displayed on the wall of a living room.',
                    height: 2708,
                    width: 2495,
                    gatsbyImageData: {
                      images: {
                        sources: [
                          {
                            srcSet:
                              "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella_21x21_crop_center.jpg.webp?v=1750915560 21w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella_41x41_crop_center.jpg.webp?v=1750915560 41w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella_82x82_crop_center.jpg.webp?v=1750915560 82w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella_164x164_crop_center.jpg.webp?v=1750915560 164w",
                            sizes: "(min-width: 82px) 82px, 100vw",
                            type: "image/webp",
                          },
                        ],
                        fallback: {
                          src: "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella_82x82_crop_center.jpg?v=1750915560",
                          srcSet:
                            "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella_21x21_crop_center.jpg?v=1750915560 21w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella_41x41_crop_center.jpg?v=1750915560 41w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella_82x82_crop_center.jpg?v=1750915560 82w,\nhttps://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella_164x164_crop_center.jpg?v=1750915560 164w",
                          sizes: "(min-width: 82px) 82px, 100vw",
                        },
                      },
                      layout: "constrained",
                      placeholder: {
                        fallback: "data:image/png;base64/wdsdsdds",
                      },
                      width: 82,
                      height: 82,
                    },
                    originalSrc:
                      "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella.jpg?v=1750915560",
                    transformedSrc:
                      "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/files/after-grief-by-brushella.jpg?v=1750915560",
                  },
                },
              },
            ],
            options: [
              {
                "fake-e2e-testingId":
                  "gid://fake-e2e-testing/ProductOption/10426975944912",
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
};
describe("Home page desktop", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("macbook-16");
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/", {
      onBeforeLoad(win) {
        win.__mockLayoutGlobalData = MOCKED_LAYOUT_GLOBAL_DATA;
      },
    });
    cy.wait("@checkoutCreate");
  });

  it("Has no detectable accessibility violations", () => {
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
    cy.get("body").tab();
    // skip to main content hidden link:
    cy.focused().should("have.attr", "href", "#main");
  });

  it("renders top navigation for desktop", () => {
    cy.get('svg[title="menu"]').should("not.exist");
    cy.findByLabelText("Brushella home");
    cy.findByRole("link", { name: "Contact me" }).should("not.exist");
    cy.findByRole("link", { name: "Shopping cart 0 items" });

    cy.findByRole("navigation").within(() => {
      for (var category_name of MOCKED_CATEGORIES) {
        cy.findByRole("link", { name: category_name });
      }
    });
  });
});

describe("Home page mobile", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("iphone-4");
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/", {
      onBeforeLoad(win) {
        win.__mockLayoutGlobalData = MOCKED_LAYOUT_GLOBAL_DATA;
      },
    });
    cy.wait("@checkoutCreate");
  });

  it("Has no detectable accessibility violations", () => {
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
    cy.get("body").tab();
    // skip to main content hidden link
    cy.focused().should("have.attr", "href", "#main");
  });

  it("Navigates from home page to legal content template", () => {
    cy.findByRole("link", { name: "Return and Refund Policy" });
    cy.intercept(
      "GET",
      /page-data\/legal-content\/return-and-refund-policy\/page-data/,
      {
        fixture: "footer/legalContent.json",
      }
    ).as("legalContentTemplate");
    cy.findByRole("link", { name: "Return and Refund Policy" }).click();
    cy.wait("@legalContentTemplate");
    cy.findByRole("heading", { name: "Return and Refund Policy" });
    cy.findByText("test content");
  });

  it("renders top navigation for mobile", () => {
    cy.viewport("iphone-4");
    cy.findByLabelText("Brushella home");
    cy.findByLabelText(/shopping cart/i).click();
    cy.findByRole("heading", { name: "Shopping Cart" });
    cy.findByRole("button", { name: "menu" }).click();
    cy.findByTestId("mobile-drawer-content").within(() => {
      for (var category_name of MOCKED_CATEGORIES) {
        cy.findByRole("link", { name: category_name });
      }
      cy.findByRole("link", { name: /about me/i });
      cy.findByRole("link", { name: /contact/i });
      cy.findByRole("link", { name: "facebook" });
      cy.findByRole("link", { name: "instagram" });
      cy.findByRole("link", { name: "whatsApp" });
    });
  });

  it("renders content in the main area", () => {
    cy.get("main").within(() => {
      cy.findByTestId("homepage-slider-1").within(() => {
        cy.findAllByRole("img");
        cy.findAllByAltText("testing");

        cy.findByRole("button", { name: "1" });
        cy.findByRole("button", { name: "2" });
        cy.findByRole("button", { name: "3" });
        cy.findByRole("button", { name: "4" });
      });

      cy.findByAltText(
        "Black and white portrait of Gabriela Ugalde, author of Brushella's art store, holding a brush and painting a colorful stroke across her face."
      );
      cy.findByRole("heading", { name: /Welcome to Brushella's Art Store/i });
      cy.findByText(
        "Your one-stop online shop where craftsmanship meets creativity!"
      );
      cy.findByRole("link", { name: "Shop now" });
      cy.findByText(
        /Embrace the beauty of handmade artistry with Brushella, where every piece tells a story!/i
      );
      cy.findByRole("heading", { name: "Browse Brushella’s World" });

      for (var category_name of MOCKED_CATEGORIES) {
        cy.findByText(category_name);
      }
      cy.findByAltText("Products of Prints category.");
    });
  });

  it("renders footer", () => {
    cy.get("footer").within(() => {
      cy.findByText("Quick Links");
      cy.findByRole("link", { name: "Return and Refund Policy" });
      cy.findByRole("link", { name: "Hand Made Policy" });
      cy.findByRole("link", { name: "Shipping Policy" });
      cy.findByRole("link", { name: "Privacy Policy" });
      cy.findByRole("link", { name: "Terms of Service" });
      cy.findByRole("link", { name: "facebook" });
      cy.findByRole("link", { name: "instagram" });
      cy.findByRole("link", { name: "whatsApp" });
      cy.findByRole("link", { name: /contact/i });
      cy.findByRole("link", { name: /about me/i });
      cy.findByText(/© 2024, Brushella Art & Decor/);
      cy.findByRole("link", { name: /go to top/i });
    });
  });

  it("Navigates from mobile menu to static page about me", () => {
    cy.findByRole("button", { name: "menu" }).click();
    cy.intercept("GET", /page-data\/about/, {
      fixture: "about/about.json",
    }).as("aboutPage");
    cy.findByRole("link", { name: /about me/i }).click();
    cy.wait("@aboutPage");
    cy.findByRole("heading", {
      name: "About me",
    });
  });

  it("Navigates from mobile menu to static page contact", () => {
    cy.findByRole("button", { name: "menu" }).click();
    cy.findByRole("link", { name: /contact/i }).click();
    cy.findByRole("heading", { name: /contact me/i });
  });
  // TODO: UPDATE this test to check on all categories.
  it("Navigates from mobile menu to each category page", () => {
    cy.clickDrawerMenuOption("Original Paintings");
    cy.findByRole("heading", { name: /Original Paintings/i });
  });
});
