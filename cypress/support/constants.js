export const REGEX_INTERCEPT_POST_REQUEST = /api\/2025-01\/graphql/;
export const MOCKED_LAYOUT_GLOBAL_DATA = {
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
        products: [],
      },
      {
        id: "12345-8fc3-5e3c-b0cf-5a16c873d647",
        title: "Prints",
        handle: "prints",
        description: "Brushella’s prints",
        descriptionHtml: '<p data-pm-slice="1 1 []">Brushella’s prints</p>',
        image: {
          src: "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/collections/prints.png?v=1731380886",
          originalSrc:
            "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/collections/prints.png?v=1731380886",
          transformedSrc:
            "https://cdn.fake-e2e-testing.com/s/files/1/0586/9892/4240/collections/prints.png?v=1731380886",
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
        products: [],
      },
    ],
  },
};
