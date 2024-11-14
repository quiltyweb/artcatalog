describe("desktop view basket page", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("macbook-16");
    cy.intercept("GET", "/page-data/collections/home-decor/page-data.json", {
      fixture: "basket/collectionDecor.json",
    });
    cy.intercept(
      "GET",
      "/page-data/collections/home-decor/beach-towel/page-data.json",
      {
        fixture: "basket/singleProduct.json",
      }
    );
    cy.intercept(
      "GET",
      "/page-data/collections/prints/macumba/page-data.json",
      {
        fixture: "basket/singleProduct2.json",
      }
    );
  });

  it("checks for accessibility violations on desktop view", () => {
    cy.intercept("POST", /api\/2024-04\/graphql/, {
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

  it("loads empty Shopping bag correctly", () => {
    cy.intercept("POST", /api\/2024-04\/graphql/, {
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
    cy.intercept("POST", /api\/2024-04\/graphql/, {
      fixture: "basket/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
    cy.findByRole("heading", { name: "Shopping Cart" });
    cy.findByRole("heading", { name: "Your cart is empty." });
    cy.findByRole("link", { name: "Home Decor" }).click();
    cy.findByRole("heading", { name: "Cotton Beach towel" }).click();
    cy.findByRole("heading", { name: "Cotton Beach towel" });
    cy.findByRole("button", { name: "Add to shopping bag" }).click();
    cy.findByText("Option Required");
    cy.get("select").select("Green");
    cy.findByRole("heading", { name: /Green/i });
    cy.intercept("POST", /api\/2024-04\/graphql/, {
      fixture: "basket/mocked-checkout-response-checkoutLineItemsAdd.json",
    }).as("checkoutLineItemsAdd");
    cy.findByRole("button", { name: "Add to shopping bag" }).click();
    cy.wait("@checkoutLineItemsAdd");
    cy.findByRole("link", { name: "Shopping cart 1 item" }).click();
    cy.findByRole("table", {
      name: "1 item in your cart. Subtotal is $11.00 AUD.",
    });
    cy.findByRole("columnheader", { name: "thumbnail" });
    cy.findByRole("columnheader", { name: "product" });
    cy.findByRole("cell", { name: /Cotton Beach towel - Green/i });

    cy.findByRole("columnheader", { name: "quantity" });
    cy.findByRole("cell", { name: "1" });
    cy.findByRole("columnheader", { name: "remove" });
    cy.findByLabelText(/remove Cotton Beach towel - Green/i);

    cy.findByRole("columnheader", { name: "price" });
    cy.findByRole("columnheader", { name: "total" });
    cy.findAllByRole("cell", { name: "$11.00" }).should("have.length", 2);
  });

  it("loads quote form when cart has products in it", () => {
    cy.intercept("POST", /api\/2024-04\/graphql/, {
      fixture: "basket/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
    cy.findByRole("heading", { name: "Shopping Cart" });
    cy.findByRole("heading", { name: "Your cart is empty." });
    cy.intercept("POST", /api\/2024-04\/graphql/, {
      fixture: "basket/mocked-checkout-response-node.json",
    }).as("checkoutFetch");
    cy.reload();
    cy.findByRole("heading", { name: "Quotation form" });
    cy.findByRole("button", { name: /Get a Quote/i });
  });
});

describe("mobile view basket page", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("iphone-4");
    cy.intercept("GET", "/page-data/collections/home-decor/page-data.json", {
      fixture: "basket/collectionDecor.json",
    });
    cy.intercept(
      "GET",
      "/page-data/collections/home-decor/beach-towel/page-data.json",
      {
        fixture: "basket/singleProduct.json",
      }
    );
    cy.intercept(
      "GET",
      "/page-data/collections/prints/macumba/page-data.json",
      {
        fixture: "basket/singleProduct2.json",
      }
    );
    cy.intercept("POST", /api\/2024-04\/graphql/, {
      fixture: "basket/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
  });

  it("checks for accessibility violations on mobile view", () => {
    cy.findByRole("heading", { name: "Shopping Cart" });
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
    cy.intercept("POST", /api\/2024-04\/graphql/, {
      fixture: "basket/mocked-checkout-response-node.json",
    }).as("checkoutFetch");
    cy.reload();
    cy.wait("@checkoutFetch");

    cy.findByRole("table", {
      name: "1 item in your cart. Subtotal is $11.00 AUD.",
    });
    cy.intercept("POST", /api\/2024-04\/graphql/, {
      fixture: "basket/mocked-checkout-response-checkoutLineItemsRemove.json",
    }).as("checkoutLineItemsRemove");
    cy.findByRole("button", {
      name: "remove Cotton Beach towel - Purple",
    }).click();
    cy.wait("@checkoutLineItemsRemove");

    cy.findByRole("heading", { name: "Your cart is empty." });
  });

  it("loads Shopping bag page correctly with 3 items", () => {
    cy.findByRole("heading", { name: "Shopping Cart" });
    cy.findByRole("heading", { name: "Your cart is empty." });
    cy.clickDrawerMenuOption("Home Decor");
    cy.findByRole("heading", { name: "Cotton Beach towel" }).click();
    cy.findByRole("heading", { name: "Cotton Beach towel" });
    cy.findByRole("button", { name: "Add to shopping bag" }).click();
    cy.findByText("Option Required");
    cy.get("select").select("Green");
    cy.findByRole("heading", { name: /Green/i });
    cy.intercept("POST", /api\/2024-04\/graphql/, {
      fixture: "basket/mocked-checkout-response-checkoutLineItemsAdd.json",
    }).as("checkoutLineItemsAdd");
    cy.findByRole("button", { name: "Add to shopping bag" }).click();
    cy.wait("@checkoutLineItemsAdd");
    cy.findByRole("link", { name: "Shopping cart 1 item" }).click();
    cy.findByRole("table", {
      name: "1 item in your cart. Subtotal is $11.00 AUD.",
    });
    cy.findByRole("table").within(() => {
      cy.findByRole("rowheader", { name: /thumbnail/i });
      cy.findByAltText(/alt text for variant Green/i);
      cy.findByRole("rowheader", { name: /product/i });
      cy.findByText(/Cotton Beach towel - Green/i);
      cy.findByRole("rowheader", { name: /quantity/i });
      cy.findByRole("cell", { name: "1" });
      cy.findByRole("rowheader", { name: /remove/i });
      cy.findByRole("button", { name: /remove Cotton Beach towel - Green/i });
      cy.findByRole("rowheader", { name: /price/i });
      cy.findByRole("rowheader", { name: /total/i });
      cy.findAllByRole("cell", { name: /\$11.00/i }).should("have.length", 2);
    });
    // add two new items
    cy.clickDrawerMenuOption("Prints");
    cy.findByRole("heading", { name: "Macumba" }).click();
    cy.get("select").select("large");
    cy.findByRole("heading", { name: /large/i });
    cy.get("#quantity-increment").click();
    cy.get("#quantity").should("have.value", "2");
    cy.intercept("POST", /api\/2024-04\/graphql/, {
      fixture:
        "basket/mocked-checkout-response-checkoutLineItemsAdd-two-items.json",
    }).as("checkoutLineItemsAddTwoItems");
    cy.findByRole("button", { name: "Add to shopping bag" }).click();
    cy.wait("@checkoutLineItemsAddTwoItems");
    cy.findByRole("link", { name: "Shopping cart 3 items" }).click();
    cy.findByText(/macumba - large/i);
    cy.findByRole("button", { name: /remove Macumba - large/i });
    cy.findByRole("cell", { name: /\$50.00/i });
    cy.findByRole("cell", { name: /\$100.00/i });
    cy.findByRole("table", {
      name: "3 items in your cart. Subtotal is $111.00 AUD.",
    });

    // cy.findByRole("main").within(() => {
    //   cy.get("h3").scrollIntoView();
    //   cy.findByRole("heading", { name: "summary" });
    //   cy.findByText(/cart total:/i);
    //   cy.findAllByText(/\$40.00/).should("have.length", 2);
    //   cy.findAllByRole("button", { name: /remove/i }).should("have.length", 2);
    //   cy.findByText(/taxes and/i);
    //   cy.findByRole("link", { name: /shipping/i });
    //   cy.findByText(/taxes and /i);
    //   cy.findByRole("link", { name: /shipping/i });
    //   cy.findByText("calculated at check out");
    //   cy.findByRole("button", { name: "check out" });
    // });
  });

  // TODO: skipping this test until checkout feature is prod ready
  it.skip("opens a new window with shoppify checkout page", () => {
    cy.intercept("POST", /api\/2024-04\/graphql/, {
      fixture: "basket/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
    cy.findByRole("heading", { name: "Your cart is empty." });
    cy.clickDrawerMenuOption("Prints");
    cy.findByRole("heading", { name: "test Jungle Tiger 2" }).click();
    cy.intercept("POST", /api\/2024-04\/graphql/, {
      fixture: "basket/mocked-checkout-response-checkoutLineItemsAdd.json",
    }).as("checkoutLineItemsAdd");
    cy.findByRole("button", { name: "Add to shopping bag" }).click();
    cy.wait("@checkoutLineItemsAdd");
    cy.findByRole("link", { name: "Shopping cart 1 item" }).click();
    cy.findByRole("table", {
      name: "1 item in your cart. Subtotal is $10.00 AUD.",
    });

    cy.window().then((win) => {
      cy.stub(win, "open").as("windowOpen");
    });
    cy.findByRole("button", { name: "check out" }).click();

    cy.get("@windowOpen").should(
      "be.calledWith",
      "https://brushella-fake-url.myshopify.com/58698924240/checkouts/e3e56dff7098bd74dbb88ebdcac92fa4?key=a1f028daadc606b0bddddd5b653b54aa"
    );
  });

  // TODO: skipping this test until checkout feature is prod ready
  // it.skip("loads Shopping bag page with checkout button", () => {});
});

// TODO: remove this describe when checkout feature is PROD ready
describe("mobile view Basket page with Quote form ", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("iphone-4");
    cy.intercept("GET", "/page-data/collections/home-decor/page-data.json", {
      fixture: "basket/collectionDecor.json",
    });
    cy.intercept("GET", "/page-data/collections/prints/page-data.json", {
      fixture: "basket/collectionPrints.json",
    });
    cy.intercept(
      "GET",
      "/page-data/collections/home-decor/beach-towel/page-data.json",
      {
        fixture: "basket/singleProduct.json",
      }
    );
    cy.intercept(
      "GET",
      "/page-data/collections/prints/macumba/page-data.json",
      {
        fixture: "basket/singleProduct2.json",
      }
    );
    cy.intercept("POST", /api\/2024-04\/graphql/, {
      fixture: "basket/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
  });

  it("loads Shopping bag page correctly with 3 items and a Quote form", () => {
    cy.findByRole("heading", { name: "Shopping Cart" });
    cy.findByRole("heading", { name: "Your cart is empty." });
    cy.clickDrawerMenuOption("Home Decor");
    cy.findByRole("heading", { name: "Cotton Beach towel" }).click();
    cy.get("select").select("Green");
    cy.intercept("POST", /api\/2024-04\/graphql/, {
      fixture: "basket/mocked-checkout-response-checkoutLineItemsAdd.json",
    }).as("checkoutLineItemsAdd");
    cy.findByRole("button", { name: "Add to shopping bag" }).click();
    cy.wait("@checkoutLineItemsAdd");
    cy.findByRole("link", { name: "Shopping cart 1 item" }).click();
    cy.findByRole("table", {
      name: "1 item in your cart. Subtotal is $11.00 AUD.",
    });
    cy.findByRole("table").within(() => {
      cy.findByAltText(/alt text for variant Green/i);
      cy.findByRole("cell", { name: /Cotton Beach towel - Green/i });
      cy.findByRole("cell", { name: "1" });
    });
    cy.findAllByRole("button", {
      name: "remove Cotton Beach towel - Green",
    }).should("have.length", 1);
    // add two new items
    cy.clickDrawerMenuOption("Prints");
    cy.findByRole("heading", { name: "Macumba" }).click();
    cy.get("select").select("large");
    cy.get("#quantity-increment").click();
    cy.get("#quantity").should("have.value", "2");
    cy.intercept("POST", /api\/2024-04\/graphql/, {
      fixture:
        "basket/mocked-checkout-response-checkoutLineItemsAdd-two-items.json",
    }).as("checkoutLineItemsAddTwoItems");
    cy.findByRole("button", { name: "Add to shopping bag" }).click();
    cy.wait("@checkoutLineItemsAddTwoItems");
    cy.findByRole("link", { name: "Shopping cart 3 items" }).click();
    cy.findByRole("table", {
      name: "3 items in your cart. Subtotal is $111.00 AUD.",
    });
    cy.findByRole("cell", { name: /Macumba - large/i });
    cy.findByRole("cell", { name: /Cotton Beach towel - Green/i });
    cy.findByLabelText("Full Name");
    cy.findByLabelText("Email address");
    cy.findByRole("button", { name: /Get a Quote/i });
  });

  it("render user errors in quote form correctly when submit with no data", () => {
    cy.intercept("POST", /api\/2024-04\/graphql/, {
      fixture: "basket/mocked-checkout-response-node.json",
    }).as("checkoutFetch");
    cy.reload();
    cy.wait("@checkoutFetch");
    cy.findByRole("button", { name: /Get a Quote/i }).click();
    cy.get("main").scrollIntoView();
    cy.findByText("Name is Required");
    cy.findByText("Email is Required");
  });

  it("sends quote correctly with 1 item", () => {
    cy.intercept("POST", /api\/2024-04\/graphql/, {
      fixture: "basket/mocked-checkout-response-node-2items",
    }).as("checkoutFetch");
    cy.reload();
    cy.wait("@checkoutFetch");
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
      /Your quote was sent succesfully with the following items: 1 Cotton Beach towel Purple, 2 Bamboo Beach towel Green/i
    );
  });

  it("renders error message when quote failed to be sent", () => {
    cy.intercept("POST", /api\/2024-04\/graphql/, {
      fixture: "basket/mocked-checkout-response-node.json",
    }).as("checkoutFetch");
    cy.reload();
    cy.wait("@checkoutFetch");
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
