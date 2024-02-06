import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import BasketPage from "../basket";
import CartContext from "../../context/CartContext";
import userEvent from "@testing-library/user-event";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeEach(() => {
  jest.clearAllMocks();
  fetchMock.resetMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("BasketPage", () => {
  it("renders empty BasketPage correctly", () => {
    render(<BasketPage />);
    screen.getByRole("heading", { name: "My Basket" });
    screen.getByRole("table", { name: "There are no items in your basket" });
    screen.getByRole("columnheader", { name: "Action" });
    screen.getByRole("columnheader", { name: "Image" });
    screen.getByRole("columnheader", { name: "Item" });
  });

  it("renders default image if not provided ", () => {
    render(
      <CartContext.Provider
        value={{
          cart: [
            {
              id: "84ffc6ea-5fa7-5a0a-bc33-5062ea5ec4f8",
              product: {
                id: "84ffc6ea-5fa7-5a0a-bc33-5062ea5ec4f8",
                title: "Tiger sticker",
                handle: "tiger-sticker",
                description: 'Sticker from "Jungle" print',
                priceRangeV2: {
                  maxVariantPrice: {
                    amount: 0,
                    currencyCode: "AUD",
                  },
                },
                featuredImage: null,
              },
              quantity: 1,
            },
          ],
          addItemToCart: () => null,
          deleteItemFromCart: () => null,
          deleteAllItemsFromCart: () => null,
        }}
      >
        <BasketPage />
      </CartContext.Provider>
    );
    screen.getByRole("heading", { name: "My Basket" });
    screen.getByAltText("no product image available");
  });

  it("renders BasketPage with 1 item in it and a form", () => {
    render(
      <CartContext.Provider
        value={{
          cart: [
            {
              id: "84ffc6ea-5fa7-5a0a-bc33-5062ea5ec4f8",
              product: {
                id: "84ffc6ea-5fa7-5a0a-bc33-5062ea5ec4f8",
                title: "Tiger sticker",
                handle: "tiger-sticker",
                description: 'Sticker from "Jungle" print',
                priceRangeV2: {
                  maxVariantPrice: {
                    amount: 0,
                    currencyCode: "AUD",
                  },
                },
                featuredImage: {
                  altText: "altText goes here...",
                  gatsbyImageData: {
                    images: {
                      sources: [
                        {
                          srcSet:
                            "https://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.03.14pm_141x115_crop_center.png.webp?v=1627042746 141w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.03.14pm_282x230_crop_center.png.webp?v=1627042746 282w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.03.14pm_564x460_crop_center.png.webp?v=1627042746 564w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.03.14pm_1128x920_crop_center.png.webp?v=1627042746 1128w",
                          sizes: "(min-width: 564px) 564px, 100vw",
                          type: "image/webp",
                        },
                      ],
                      fallback: {
                        src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.03.14pm_564x460_crop_center.png?v=1627042746",
                        srcSet:
                          "https://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.03.14pm_141x115_crop_center.png?v=1627042746 141w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.03.14pm_282x230_crop_center.png?v=1627042746 282w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.03.14pm_564x460_crop_center.png?v=1627042746 564w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.03.14pm_1128x920_crop_center.png?v=1627042746 1128w",
                        sizes: "(min-width: 564px) 564px, 100vw",
                      },
                    },
                    layout: "constrained",
                    width: 564,
                    height: 460,
                  },
                },
              },
              quantity: 1,
            },
          ],
          addItemToCart: () => null,
          deleteItemFromCart: () => null,
          deleteAllItemsFromCart: () => null,
        }}
      >
        <BasketPage />
      </CartContext.Provider>
    );
    screen.getByRole("heading", { name: "My Basket" });
    screen.getByRole("table", { name: "There is 1 item in your basket" });
    screen.getByAltText("altText goes here...");
    screen.getByRole("button", { name: "delete item" });
    screen.getByText(/1 Tiger sticker/i);
    screen.getByLabelText("Full Name");
    screen.getByLabelText("Email address");
    screen.getByRole("button", { name: "Get a quote" });
  });

  it("renders BasketPage with many items in it and a form", () => {
    render(
      <CartContext.Provider
        value={{
          cart: [
            {
              id: "84ffc6ea-5fa7-5a0a-bc33-5062ea5ec4f8",
              product: {
                id: "84ffc6ea-5fa7-5a0a-bc33-5062ea5ec4f8",
                title: "Tiger sticker",
                handle: "tiger-sticker",
                description: 'Sticker from "Jungle" print',
                priceRangeV2: {
                  maxVariantPrice: {
                    amount: 0,
                    currencyCode: "AUD",
                  },
                },
                featuredImage: null,
              },
              quantity: 1,
            },
            {
              id: "793025dc-ae76-5230-b72d-9e8a6776cb7b",
              product: {
                id: "793025dc-ae76-5230-b72d-9e8a6776cb7b",
                title: "Galactic kitten",
                handle: "galactic-kitten",
                description:
                  "cute decorative kittens with magnet, colours can be customisable.",
                priceRangeV2: {
                  maxVariantPrice: {
                    amount: 10,
                    currencyCode: "AUD",
                  },
                },
                featuredImage: {
                  altText: "alt text item 2",
                  gatsbyImageData: {
                    images: {
                      sources: [
                        {
                          srcSet:
                            "https://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.03.14pm_141x115_crop_center.png.webp?v=1627042746 141w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.03.14pm_282x230_crop_center.png.webp?v=1627042746 282w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.03.14pm_564x460_crop_center.png.webp?v=1627042746 564w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.03.14pm_1128x920_crop_center.png.webp?v=1627042746 1128w",
                          sizes: "(min-width: 564px) 564px, 100vw",
                          type: "image/webp",
                        },
                      ],
                      fallback: {
                        src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.03.14pm_564x460_crop_center.png?v=1627042746",
                        srcSet:
                          "https://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.03.14pm_141x115_crop_center.png?v=1627042746 141w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.03.14pm_282x230_crop_center.png?v=1627042746 282w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.03.14pm_564x460_crop_center.png?v=1627042746 564w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/products/ScreenShot2021-07-23at3.03.14pm_1128x920_crop_center.png?v=1627042746 1128w",
                        sizes: "(min-width: 564px) 564px, 100vw",
                      },
                    },
                    layout: "constrained",
                    width: 564,
                    height: 460,
                  },
                },
              },
              quantity: 1,
            },
            {
              id: "73a9bb0b-e1c5-5260-bc78-9320184b56ab",
              product: {
                id: "73a9bb0b-e1c5-5260-bc78-9320184b56ab",
                title: "Another title as alt text",
                handle: "jungle-tiger-2",
                description: "Print from original painting.",
                priceRangeV2: {
                  maxVariantPrice: {
                    amount: 0,
                    currencyCode: "AUD",
                  },
                },
                featuredImage: {
                  altText: null,
                  gatsbyImageData: {
                    images: {
                      sources: [
                        {
                          srcSet:
                            "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/print8_141x115_crop_center.jpg.webp?v=1696585251 141w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/print8_282x230_crop_center.jpg.webp?v=1696585251 282w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/print8_564x460_crop_center.jpg.webp?v=1696585251 564w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/print8_1128x920_crop_center.jpg.webp?v=1696585251 1128w",
                          sizes: "(min-width: 564px) 564px, 100vw",
                          type: "image/webp",
                        },
                      ],
                      fallback: {
                        src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/print8_564x460_crop_center.jpg?v=1696585251",
                        srcSet:
                          "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/print8_141x115_crop_center.jpg?v=1696585251 141w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/print8_282x230_crop_center.jpg?v=1696585251 282w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/print8_564x460_crop_center.jpg?v=1696585251 564w,\nhttps://cdn.shopify.com/s/files/1/0586/9892/4240/files/print8_1128x920_crop_center.jpg?v=1696585251 1128w",
                        sizes: "(min-width: 564px) 564px, 100vw",
                      },
                    },
                    layout: "constrained",
                    width: 564,
                    height: 460,
                  },
                },
              },
              quantity: 1,
            },
          ],
          addItemToCart: () => null,
          deleteItemFromCart: () => null,
          deleteAllItemsFromCart: () => null,
        }}
      >
        <BasketPage />
      </CartContext.Provider>
    );
    screen.getByRole("heading", { name: "My Basket" });
    screen.getByRole("table", { name: "There are 3 items in your basket" });
    // item in table
    expect(screen.getAllByRole("button", { name: "delete item" }).length).toBe(
      3
    );
    screen.getByAltText("no product image available");
    screen.getByAltText("alt text item 2");
    screen.getByAltText("Another title as alt text");
    screen.getByText("1 Tiger sticker");
    screen.getByText("1 Galactic kitten");
    screen.getByText("1 Another title as alt text");

    screen.getByLabelText("Full Name");
    screen.getByLabelText("Email address");
    screen.getByRole("button", { name: "Get a quote" });
  });

  it("renders delete item button", async () => {
    render(
      <CartContext.Provider
        value={{
          cart: [
            {
              id: "84ffc6ea-5fa7-5a0a-bc33-5062ea5ec4f8",
              product: {
                id: "84ffc6ea-5fa7-5a0a-bc33-5062ea5ec4f8",
                title: "Tiger Sticker",
                handle: "tiger-sticker",
                description: 'Sticker from "Jungle" print',
                priceRangeV2: {
                  maxVariantPrice: {
                    amount: 0,
                    currencyCode: "AUD",
                  },
                },
                featuredImage: null,
              },
              quantity: 1,
            },
          ],
        }}
      >
        <BasketPage />
      </CartContext.Provider>
    );

    screen.getByText("1 Tiger Sticker");
    screen.getByRole("table", { name: "There is 1 item in your basket" });
    screen.getByTestId("delete-item-button");
  });

  it("validates form correctly", async () => {
    const user = userEvent.setup();
    render(
      <CartContext.Provider
        value={{
          cart: [
            {
              id: "84ffc6ea-5fa7-5a0a-bc33-5062ea5ec4f8",
              product: {
                id: "84ffc6ea-5fa7-5a0a-bc33-5062ea5ec4f8",
                title: "Tiger Sticker",
                handle: "tiger-sticker",
                description: 'Sticker from "Jungle" print',
                priceRangeV2: {
                  maxVariantPrice: {
                    amount: 0,
                    currencyCode: "AUD",
                  },
                },
                featuredImage: null,
              },
              quantity: 1,
            },
          ],
        }}
      >
        <BasketPage />
      </CartContext.Provider>
    );
    await act(async () => {
      await user.click(screen.getByRole("button", { name: "Get a quote" }));
    });

    screen.findByText("Name is Required");
    screen.findByText("Email is Required");
  });

  it("renders success message when click Get a quote ", async () => {
    const user = userEvent.setup();
    fetchMock.mockResponseOnce(
      JSON.stringify({
        success: true,
        formValues: {
          fullname: "abc",
          email: "def@gmail.com",
          message: "ghijk",
        },
      })
    );
    render(
      <CartContext.Provider
        value={{
          cart: [
            {
              id: "84ffc6ea-5fa7-5a0a-bc33-5062ea5ec4f8",
              product: {
                id: "84ffc6ea-5fa7-5a0a-bc33-5062ea5ec4f8",
                title: "Tiger Sticker",
                handle: "tiger-sticker",
                description: 'Sticker from "Jungle" print',
                priceRangeV2: {
                  maxVariantPrice: {
                    amount: 0,
                    currencyCode: "AUD",
                  },
                },
                featuredImage: null,
              },
              quantity: 1,
            },
          ],
        }}
      >
        <BasketPage />
      </CartContext.Provider>
    );
    expect(screen.queryByTestId("quote-contact-form")).toBeInTheDocument();
    await act(async () => {
      await user.type(screen.getByLabelText("Full Name"), "name testing");
      await user.type(
        screen.getByLabelText("Email address"),
        "email@email.com"
      );
    });
    await act(async () => {
      await user.click(screen.getByRole("button", { name: "Get a quote" }));
    });

    await screen.findByText(/Your quote was sent succesfully!/i);
    await waitFor(() => {
      expect(screen.queryByTestId("quote-contact-form")).toBeNull();
    });
  });

  // TODO:
  // it("deletes an item from the table when click on delete ", async () => {
  // TODO: add click event and check for empty state
  // })
});
