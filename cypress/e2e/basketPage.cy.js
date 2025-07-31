const REGEX_INTERCEPT_POST_REQUEST = /api\/2025-01\/graphql/;
const REGEX_INTERCEPT_GET_PAGE_DATA_REQUEST = /page-data\/sq\/d/;
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
        products: [],
      },
      {
        id: "12345-8fc3-5e3c-b0cf-5a16c873d647",
        title: "Prints",
        handle: "prints",
        description: "Brushella’s prints",
        descriptionHtml: '<p data-pm-slice="1 1 []">Brushella’s prints</p>',
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
    ],
  },
};
describe("desktop view basket page", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("macbook-16");
    cy.intercept(
      "GET",
      "/page-data/collections/prints/test-print-not-for-sale/page-data.json",
      {
        fixture: "basket/singleProduct.json",
      }
    );
  });

  it("checks for accessibility violations on desktop view", () => {
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "basket/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
    cy.findByRole("heading", { name: "Shopping Cart" });
    cy.injectAxe();
    cy.checkA11y({
      exclude: [".chakra-portal", "#__chakra_env"],
    });
  });

  it("renders store alert below breadcrumbs", () => {
    cy.findByRole("alert").within(() => {
      cy.findByText(/Brushella.art is under construction./i);
      cy.findByText(/This store can’t accept payments right now./i);
    });
  });

  it("loads empty Shopping bag correctly", () => {
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "basket/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
    cy.findByRole("link", { name: "Home" });
    cy.findByRole("link", { name: "Shopping cart 0 items" });
    cy.findByRole("heading", { name: "Shopping Cart" });
    cy.findByRole("heading", { name: "Your cart is empty." });
    cy.findByRole("table").should("not.exist");
    cy.findByRole("button", { name: "check out" }).should("not.exist");
    cy.findByRole("heading", { name: "Quotation form" }).should("not.exist");
    cy.findByRole("button", { name: /Get a Quote/i }).should("not.exist");
  });

  it("loads shopping cart with 1 item on desktop view", () => {
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "basket/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket", {
      onBeforeLoad(win) {
        win.__mockLayoutGlobalData = MOCKED_LAYOUT_GLOBAL_DATA;
      },
    });
    cy.wait("@checkoutCreate");
    cy.findByRole("heading", { name: "Shopping Cart" });
    cy.findByRole("heading", { name: "Your cart is empty." });
    cy.intercept("GET", "/page-data/collections/prints/page-data.json", {
      fixture: "collection-template/collection-prints.json",
    });
    cy.findByRole("link", { name: "Prints" }).click();
    cy.intercept(
      "GET",
      "/page-data/collections/prints/test-print-not-for-sale/page-data.json",
      {
        fixture: "basket/singleProduct.json",
      }
    ).as("simpleProductPage");
    cy.findByText("testing description for collections prints");
    cy.findByRole("heading", { name: "test print (not for sale)" });
    cy.findByRole("heading", { name: "test print (not for sale)" }).click();
    cy.findByRole("heading", { name: "test print (not for sale)" });
    cy.findByText("description for test print (not for sale)");
    cy.findByRole("button", { name: "Add to shopping bag" }).click();
    cy.findByText("Option Required");
    cy.get("select").select("Wood");
    cy.findByRole("heading", { name: /Wood/i });
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "basket/mocked-checkout-response-checkoutLineItemsAdd.json",
    }).as("checkoutLineItemsAdd");
    cy.findByRole("button", { name: "Add to shopping bag" }).click();
    cy.wait("@checkoutLineItemsAdd");
    cy.findByRole("link", { name: "Shopping cart 1 item" }).click();
    cy.findByRole("table", {
      name: /1 item in your cart. Subtotal is \$0.00 AUD./,
    });
    cy.findByRole("columnheader", { name: "thumbnail" });
    cy.findByRole("columnheader", { name: "product" });
    cy.findByRole("cell", { name: /test print \(not for sale\) \- Wood/i });
    cy.findByRole("columnheader", { name: "quantity" });
    cy.findByRole("cell", { name: "1" });
    cy.findByRole("columnheader", { name: "remove" });
    cy.findByRole("button", {
      name: /remove test print \(not for sale\) \- Wood/i,
    });
    cy.findByRole("columnheader", { name: "price" });
    cy.findByRole("columnheader", { name: "total" });
    cy.findAllByRole("cell", { name: "$0.00" }).should("have.length", 2);
    cy.findByRole("main").within(() => {
      cy.findByRole("heading", { name: /summary/i });
      cy.findByText("Subtotal:");
      cy.findByText("$0.00 AUD");
      cy.findByText(/taxes and/i);
      cy.findByRole("link", { name: /shipping/i });
      cy.findByText(/calculated at check out/i);
      cy.findByRole("button", { name: /check out/i });
    });
  });

  it("loads quote form when cart has products in it", () => {
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "basket/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
    cy.findByRole("heading", { name: "Shopping Cart" });
    cy.findByRole("heading", { name: "Your cart is empty." });
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "basket/mocked-query-cart-with-two-items.json",
    }).as("queryCart");
    cy.reload();
    cy.wait("@queryCart");
    cy.findByRole("table", { name: /2 items in your cart/ });
    cy.findByRole("heading", { name: "Quotation form" });
    cy.findByRole("button", { name: /Get a Quote/i });
  });
});

describe("mobile view basket page", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("iphone-4");
    cy.intercept("GET", "/page-data/collections/prints/page-data.json", {
      fixture: "basket/collectionPrints.json",
    });
    cy.intercept(
      "GET",
      "/page-data/collections/prints/test-print-not-for-sale/page-data.json",
      {
        fixture: "basket/singleProduct.json",
      }
    ).as("simpleProductPage");
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "basket/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
  });

  it("checks cart for accessibility violations on mobile view", () => {
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "basket/mocked-query-cart-with-two-items.json",
    }).as("queryCart");
    cy.reload();
    cy.wait("@queryCart");
    cy.findByRole("heading", { name: "Shopping Cart" });
    cy.findByRole("table", {
      name: /2 items in your cart. Subtotal is \$0.00 AUD./,
    });
    cy.findByRole("heading", { name: "Quotation form" });
    cy.findByRole("button", { name: /Get a Quote/i });
    cy.injectAxe();
    cy.checkA11y({
      exclude: [".chakra-portal", "#__chakra_env"],
    });
  });

  it("loads empty Shopping bag correctly", () => {
    cy.findByRole("heading", { name: "Shopping Cart" });
    cy.findByRole("heading", { name: "Your cart is empty." });
    cy.findByRole("table").should("not.exist");
    cy.findByRole("button", { name: "check out" }).should("not.exist");
  });

  it("deletes an item from the shopping bag", () => {
    cy.findByRole("heading", { name: "Your cart is empty." });
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "basket/mocked-query-cart-with-two-items.json",
    }).as("queryCart");
    cy.reload();
    cy.wait("@queryCart");
    cy.findByRole("table", {
      name: /2 items in your cart. Subtotal is \$0.00 AUD./,
    });
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "basket/mocked-checkout-response-checkoutLineItemsRemove.json",
    }).as("checkoutLineItemsRemove");
    cy.findByRole("button", {
      name: "remove test print (not for sale) - Plastic",
    }).click();
    cy.wait("@checkoutLineItemsRemove");
    cy.findByRole("table", {
      name: /1 item in your cart. Subtotal is \$0.00 AUD./,
    });
  });

  it("opens a new window with shoppify checkout page", () => {
    cy.findByRole("heading", { name: "Your cart is empty." });
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "basket/mocked-query-cart-with-two-items.json",
    }).as("queryCart");
    cy.reload();
    cy.wait("@queryCart");
    cy.findByRole("table", {
      name: /2 items in your cart. Subtotal is \$0.00 AUD./,
    });
    cy.window().then((win) => {
      cy.stub(win, "open").as("windowOpen");
    });
    cy.get('[data-testid="summary-section"]').scrollIntoView();
    cy.findByRole("button", { name: /check out/i }).click();
    cy.get("@windowOpen").should(
      "be.calledWith",
      "https://fake-brushella-dev.myshopify.fake/58698924240/checkouts/123458d38a38eac6e1f1374d648ecd93?key=12345cf8cac27ac85619932812ddddbd"
    );
  });
});

// TODO: remove this describe when checkout feature is PROD ready
describe("mobile view Basket page with Quote form ", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("iphone-4");
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "basket/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
  });

  it("render user errors in quote form correctly when submit with no data", () => {
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "basket/mocked-query-cart-with-two-items.json",
    }).as("queryCart");
    cy.visit("/basket");
    cy.wait("@queryCart");
    cy.findByRole("button", { name: /Get a Quote/i }).click();
    cy.get("main").scrollIntoView();
    cy.findByText("Name is Required");
    cy.findByText("Email is Required");
  });

  it("sends quote correctly with 1 item", () => {
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "basket/mocked-query-cart-with-two-items.json",
    }).as("queryCart");
    cy.reload();
    cy.wait("@queryCart");
    cy.findByLabelText("Full Name").type("name goes here");
    cy.findByLabelText("Email address").type("email@email.com");
    cy.intercept(
      "POST",
      "https://www.formbackend.com/f/a89f490517ad6461",
      "success"
    ).as("formbackendSuccess");
    cy.findByRole("button", { name: /Get a Quote/i }).click();
    cy.wait("@formbackendSuccess");
    cy.get("main").scrollIntoView();
    cy.findByText(
      /Your quote was sent succesfully with the following items: 1 test print \(not for sale\) \- Plastic, 1 test print \(not for sale\) \- Wood/i
    );
  });

  it("renders error message when quote failed to be sent", () => {
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "basket/mocked-query-cart-with-two-items.json",
    }).as("queryCart");
    cy.reload();
    cy.wait("@queryCart");
    cy.findByLabelText("Full Name").type("name goes here");
    cy.findByLabelText("Email address").type("email@email.com");
    cy.intercept("POST", "https://www.formbackend.com/f/a89f490517ad6461", {
      statusCode: 500,
    }).as("formbackendFailure");
    cy.findByRole("button", { name: /Get a Quote/i }).click();
    cy.wait("@formbackendFailure");
    cy.get("main").scrollIntoView();
    cy.findByText(
      "There was an error sending your quote. Please try again later."
    );
  });
});
