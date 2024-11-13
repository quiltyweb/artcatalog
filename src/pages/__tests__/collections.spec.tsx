import React from "react";
import * as Gatsby from "gatsby";
import { render, screen, within } from "@testing-library/react";
import CollectionsPage from "../collections";
import fetchMock from "jest-fetch-mock";
const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery");

fetchMock.enableMocks();

beforeEach(() => {
  jest.clearAllMocks();
  fetchMock.resetMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("ContactPage", () => {
  it("renders correctly", () => {
    useStaticQuery.mockImplementation(() => ({
      allShopifyCollection: {
        nodes: [
          {
            id: "4179b182-b572-5609-a8a2-05083671479a",
            title: "Murals & Sign Writing",
            handle: "murals-and-sign-writing",
            image: {
              altText: "alt text for testing purposes",
              gatsbyImageData: {
                images: {
                  sources: [
                    {
                      srcSet:
                        "https://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/murals-and-sign-writing_125x125_crop_center.png.webp?v=1731380911 125w,\nhttps://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/murals-and-sign-writing_250x250_crop_center.png.webp?v=1731380911 250w,\nhttps://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/murals-and-sign-writing_500x500_crop_center.png.webp?v=1731380911 500w",
                      sizes: "(min-width: 500px) 500px, 100vw",
                      type: "image/webp",
                    },
                  ],
                  fallback: {
                    src: "https://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/murals-and-sign-writing_500x500_crop_center.png?v=1731380911",
                    srcSet:
                      "https://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/murals-and-sign-writing_125x125_crop_center.png?v=1731380911 125w,\nhttps://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/murals-and-sign-writing_250x250_crop_center.png?v=1731380911 250w,\nhttps://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/murals-and-sign-writing_500x500_crop_center.png?v=1731380911 500w",
                    sizes: "(min-width: 500px) 500px, 100vw",
                  },
                },
                layout: "constrained",
                placeholder: {
                  fallback: "data:image/png;base64",
                },
                width: 500,
                height: 500,
              },
            },
          },
          {
            id: "f824e7dd-2243-5286-a2aa-162cbc0f42cd",
            title: "Stickers",
            handle: "stickers",
            image: {
              altText: "alt text for testing purposes",
              gatsbyImageData: {
                images: {
                  sources: [
                    {
                      srcSet:
                        "https://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/stickers_125x125_crop_center.png.webp?v=1731381111 125w,\nhttps://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/stickers_250x250_crop_center.png.webp?v=1731381111 250w,\nhttps://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/stickers_500x500_crop_center.png.webp?v=1731381111 500w",
                      sizes: "(min-width: 500px) 500px, 100vw",
                      type: "image/webp",
                    },
                  ],
                  fallback: {
                    src: "https://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/stickers_500x500_crop_center.png?v=1731381111",
                    srcSet:
                      "https://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/stickers_125x125_crop_center.png?v=1731381111 125w,\nhttps://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/stickers_250x250_crop_center.png?v=1731381111 250w,\nhttps://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/stickers_500x500_crop_center.png?v=1731381111 500w",
                    sizes: "(min-width: 500px) 500px, 100vw",
                  },
                },
                layout: "constrained",
                placeholder: {
                  fallback: "data:image/png;base64",
                },
                width: 500,
                height: 500,
              },
            },
          },
          {
            id: "a1f141d4-942b-51bc-9ab2-a2f4a48d1755",
            title: "Wearable Art",
            handle: "wearable-art",
            image: {
              altText: "alt text for testing purposes",
              gatsbyImageData: {
                images: {
                  sources: [
                    {
                      srcSet:
                        "https://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/wearable-art_125x125_crop_center.jpg.webp?v=1731381150 125w,\nhttps://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/wearable-art_250x250_crop_center.jpg.webp?v=1731381150 250w,\nhttps://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/wearable-art_500x500_crop_center.jpg.webp?v=1731381150 500w",
                      sizes: "(min-width: 500px) 500px, 100vw",
                      type: "image/webp",
                    },
                  ],
                  fallback: {
                    src: "https://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/wearable-art_500x500_crop_center.jpg?v=1731381150",
                    srcSet:
                      "https://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/wearable-art_125x125_crop_center.jpg?v=1731381150 125w,\nhttps://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/wearable-art_250x250_crop_center.jpg?v=1731381150 250w,\nhttps://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/wearable-art_500x500_crop_center.jpg?v=1731381150 500w",
                    sizes: "(min-width: 500px) 500px, 100vw",
                  },
                },
                layout: "constrained",
                placeholder: {
                  fallback: "data:image/png;base64",
                },
                width: 500,
                height: 500,
              },
            },
          },
          {
            id: "1f50e1f9-d3a0-54cc-b961-652870d93340",
            title: "Resin & Pigment Art",
            handle: "resin-and-pigment-art",
            image: {
              altText: "alt text for testing purposes",
              gatsbyImageData: {
                images: {
                  sources: [
                    {
                      srcSet:
                        "https://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/resin-and-pigments-art_125x125_crop_center.png.webp?v=1731381083 125w,\nhttps://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/resin-and-pigments-art_250x250_crop_center.png.webp?v=1731381083 250w,\nhttps://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/resin-and-pigments-art_500x500_crop_center.png.webp?v=1731381083 500w",
                      sizes: "(min-width: 500px) 500px, 100vw",
                      type: "image/webp",
                    },
                  ],
                  fallback: {
                    src: "https://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/resin-and-pigments-art_500x500_crop_center.png?v=1731381083",
                    srcSet:
                      "https://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/resin-and-pigments-art_125x125_crop_center.png?v=1731381083 125w,\nhttps://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/resin-and-pigments-art_250x250_crop_center.png?v=1731381083 250w,\nhttps://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/resin-and-pigments-art_500x500_crop_center.png?v=1731381083 500w",
                    sizes: "(min-width: 500px) 500px, 100vw",
                  },
                },
                layout: "constrained",
                placeholder: {
                  fallback: "data:image/png;base64",
                },
                width: 500,
                height: 500,
              },
            },
          },
          {
            id: "62470692-0598-57cc-bc0a-1ea60791c995",
            title: "Commissions",
            handle: "commissions",
            image: {
              altText: "alt text for testing purposes",
              gatsbyImageData: {
                images: {
                  sources: [
                    {
                      srcSet:
                        "https://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/commissions_125x125_crop_center.png.webp?v=1731381057 125w,\nhttps://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/commissions_250x250_crop_center.png.webp?v=1731381057 250w,\nhttps://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/commissions_500x500_crop_center.png.webp?v=1731381057 500w",
                      sizes: "(min-width: 500px) 500px, 100vw",
                      type: "image/webp",
                    },
                  ],
                  fallback: {
                    src: "https://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/commissions_500x500_crop_center.png?v=1731381057",
                    srcSet:
                      "https://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/commissions_125x125_crop_center.png?v=1731381057 125w,\nhttps://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/commissions_250x250_crop_center.png?v=1731381057 250w,\nhttps://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/commissions_500x500_crop_center.png?v=1731381057 500w",
                    sizes: "(min-width: 500px) 500px, 100vw",
                  },
                },
                layout: "constrained",
                placeholder: {
                  fallback: "data:image/png;base64",
                },
                width: 500,
                height: 500,
              },
            },
          },
          {
            id: "bd4e6e5b-a663-5e00-becb-b4a63d4c7ec6",
            title: "Prints",
            handle: "prints",
            image: {
              altText: "alt text for testing purposes",
              gatsbyImageData: {
                images: {
                  sources: [
                    {
                      srcSet:
                        "https://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/prints_125x125_crop_center.png.webp?v=1731381207 125w,\nhttps://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/prints_250x250_crop_center.png.webp?v=1731381207 250w,\nhttps://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/prints_500x500_crop_center.png.webp?v=1731381207 500w",
                      sizes: "(min-width: 500px) 500px, 100vw",
                      type: "image/webp",
                    },
                  ],
                  fallback: {
                    src: "https://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/prints_500x500_crop_center.png?v=1731381207",
                    srcSet:
                      "https://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/prints_125x125_crop_center.png?v=1731381207 125w,\nhttps://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/prints_250x250_crop_center.png?v=1731381207 250w,\nhttps://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/prints_500x500_crop_center.png?v=1731381207 500w",
                    sizes: "(min-width: 500px) 500px, 100vw",
                  },
                },
                layout: "constrained",
                placeholder: {
                  fallback: "data:image/png;base64",
                },
                width: 500,
                height: 500,
              },
            },
          },
          {
            id: "ab94a31f-8fc3-5e3c-b0cf-5a16c873d647",
            title: "Original Paintings",
            handle: "original-paintings",
            image: {
              altText: "alt text for testing purposes",
              gatsbyImageData: {
                images: {
                  sources: [
                    {
                      srcSet:
                        "https://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/original-paintings_125x125_crop_center.png.webp?v=1731380886 125w,\nhttps://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/original-paintings_250x250_crop_center.png.webp?v=1731380886 250w,\nhttps://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/original-paintings_500x500_crop_center.png.webp?v=1731380886 500w",
                      sizes: "(min-width: 500px) 500px, 100vw",
                      type: "image/webp",
                    },
                  ],
                  fallback: {
                    src: "https://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/original-paintings_500x500_crop_center.png?v=1731380886",
                    srcSet:
                      "https://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/original-paintings_125x125_crop_center.png?v=1731380886 125w,\nhttps://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/original-paintings_250x250_crop_center.png?v=1731380886 250w,\nhttps://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/original-paintings_500x500_crop_center.png?v=1731380886 500w",
                    sizes: "(min-width: 500px) 500px, 100vw",
                  },
                },
                layout: "constrained",
                placeholder: {
                  fallback: "data:image/png;base64",
                },
                width: 500,
                height: 500,
              },
            },
          },
          {
            id: "384d31c2-36b3-5bc7-a4eb-1dc34dea1ab1",
            title: "Home Decor",
            handle: "home-decor",
            image: {
              altText: "alt text for testing purposes",
              gatsbyImageData: {
                images: {
                  sources: [
                    {
                      srcSet:
                        "https://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/home-decor_125x125_crop_center.jpg.webp?v=1731380861 125w,\nhttps://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/home-decor_250x250_crop_center.jpg.webp?v=1731380861 250w,\nhttps://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/home-decor_500x500_crop_center.jpg.webp?v=1731380861 500w",
                      sizes: "(min-width: 500px) 500px, 100vw",
                      type: "image/webp",
                    },
                  ],
                  fallback: {
                    src: "https://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/home-decor_500x500_crop_center.jpg?v=1731380861",
                    srcSet:
                      "https://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/home-decor_125x125_crop_center.jpg?v=1731380861 125w,\nhttps://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/home-decor_250x250_crop_center.jpg?v=1731380861 250w,\nhttps://fake.fakeshopify.com/fake/files/1/0586/9892/4240/collections/home-decor_500x500_crop_center.jpg?v=1731380861 500w",
                    sizes: "(min-width: 500px) 500px, 100vw",
                  },
                },
                layout: "constrained",
                placeholder: {
                  fallback: "data:image/png;base64",
                },
                width: 500,
                height: 500,
              },
            },
          },
        ],
      },
    }));
    render(<CollectionsPage />);
    screen.getByRole("link", { name: "Home" });
    expect(screen.getAllByText(/All Categories/i)).toHaveLength(2);
    screen.getByRole("heading", { name: "All Categories" });
    screen.getByText("Original Paintings");
    expect(
      within(
        screen.getByRole("list", { name: "browse categories" })
      ).queryAllByRole("link")
    ).toHaveLength(8);
  });
});
