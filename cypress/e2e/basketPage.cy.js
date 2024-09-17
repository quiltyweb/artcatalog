describe("Basket page desktop", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("macbook-16");
    cy.intercept("GET", "/page-data/collections/decor/page-data.json", {
      fixture: "basket/collectionDecor.json",
    });
    cy.intercept(
      "GET",
      "/page-data/collections/decor/beach-towel/page-data.json",
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
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "basket/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
    cy.findByRole("heading", { name: "Your Cart" });
    cy.injectAxe();
    cy.checkA11y({
      exclude: [".chakra-portal", "#__chakra_env"],
    });
  });

  it("loads empty Shopping bag correctly", () => {
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "basket/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
    cy.findByRole("heading", { name: "Your Cart" });
    cy.findByRole("heading", { name: "Your cart is empty." });
    cy.findByRole("table").should("not.exist");
    cy.findByRole("button", { name: "check out" }).should("not.exist");
    cy.findByRole("heading", { name: "Quotation form" }).should("not.exist");
    cy.findByRole("button", { name: /Get a Quote/i }).should("not.exist");
  });

  it("loads shopping cart with 1 item on desktop view", () => {
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "basket/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
    cy.findByRole("heading", { name: "Your Cart" });
    cy.findByRole("heading", { name: "Your cart is empty." });
    cy.findByRole("link", { name: "decor" }).click();
    cy.findByRole("heading", { name: "Cotton Beach towel" }).click();
    cy.findByRole("heading", { name: "Cotton Beach towel" });
    cy.findByRole("button", { name: "Add to shopping bag" }).click();
    cy.findByText("Option Required");
    cy.get("select").select("Green");
    cy.findByRole("heading", { name: /Green/i });
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "basket/mocked-checkout-response-checkoutLineItemsAdd.json",
    }).as("checkoutLineItemsAdd");
    cy.findByRole("button", { name: "Add to shopping bag" }).click();
    cy.wait("@checkoutLineItemsAdd");
    cy.findByRole("link", { name: "My shopping cart (1 item)" }).click();
    cy.findByRole("table", { name: "1 item in your cart." });
    cy.findByRole("columnheader", { name: "thumbnail" });
    cy.findByRole("columnheader", { name: "product" });
    cy.findByRole("cell", { name: /Cotton Beach towel - Green/i });
    cy.findByRole("columnheader", { name: "unit price" });
    cy.findByRole("columnheader", { name: "quantity" });
    cy.findByRole("cell", { name: /quantity: 1/i });
    cy.findByRole("columnheader", { name: "actions" });
    cy.findByLabelText(/remove item Cotton Beach towel - Green/i);
    cy.findByRole("columnheader", { name: "total" });
    // TODO: add table caption test when checkout is prod ready
    // cy.findByRole("table", { name: "1 item in your cart. Total $10.00" });
    // TODO: text for all the columhead values here
  });

  it("loads quote form when cart has products in it", () => {
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "basket/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
    cy.findByRole("heading", { name: "Your Cart" });
    cy.findByRole("heading", { name: "Your cart is empty." });
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "basket/mocked-checkout-response-node.json",
    }).as("checkoutFetch");
    cy.reload();
    cy.findByRole("heading", { name: "Quotation form" });
    cy.findByRole("button", { name: /Get a Quote/i });
  });
});

describe("Basket page mobile", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("iphone-4");
    cy.intercept("GET", "/page-data/collections/decor/page-data.json", {
      fixture: "basket/collectionDecor.json",
    });
    cy.intercept(
      "GET",
      "/page-data/collections/decor/beach-towel/page-data.json",
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
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "basket/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
  });

  it("checks for accessibility violations on mobile view", () => {
    cy.findByRole("heading", { name: "Your Cart" });
    cy.injectAxe();
    cy.checkA11y({
      exclude: [".chakra-portal", "#__chakra_env"],
    });
  });

  it("loads empty Shopping bag correctly", () => {
    cy.findByRole("heading", { name: "Your Cart" });
    cy.findByRole("heading", { name: "Your cart is empty." });
    cy.findByRole("table").should("not.exist");
    cy.findByRole("button", { name: "check out" }).should("not.exist");
  });

  it("deletes an item from the shopping bag", () => {
    cy.findByRole("heading", { name: "Your cart is empty." });
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "basket/mocked-checkout-response-node.json",
    }).as("checkoutFetch");
    cy.reload();
    cy.wait("@checkoutFetch");
    cy.findByRole("table", { name: "1 item in your cart." });
    // TODO: add this below when checkout cart is prod ready
    // cy.findByRole("table", { name: "1 item in your cart. Total $23.00" });
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "basket/mocked-checkout-response-checkoutLineItemsRemove.json",
    }).as("checkoutLineItemsRemove");
    cy.findByRole("button", {
      name: "remove item Cotton Beach towel - Purple",
    }).click();
    cy.wait("@checkoutLineItemsRemove");
    cy.findByRole("heading", { name: "Your cart is empty." });
  });

  // TODO: skipping this test until checkout feature is prod ready
  it.skip("loads Shopping bag page correctly with 3 items and a checkout button", () => {
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "basket/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
    cy.findByRole("heading", { name: "Your Cart" });
    cy.findByRole("heading", { name: "Your cart is empty." });
    cy.clickDrawerMenuOption("prints");
    cy.findByRole("heading", { name: "test Jungle Tiger 2" }).click();
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "basket/mocked-checkout-response-checkoutLineItemsAdd.json",
    }).as("checkoutLineItemsAdd");
    cy.findByRole("button", { name: "Add to shopping bag" }).click();
    cy.wait("@checkoutLineItemsAdd");
    cy.findByLabelText(/go to shopping bag/).click();
    cy.findByRole("table", { name: "1 item in your cart. Total $10.00" });

    cy.findByRole("columnheader", { name: "product" });
    cy.findByRole("columnheader", { name: "unit price" });

    cy.findByRole("table").within(() => {
      cy.findByAltText(
        /this is an altText for Default Variant Title for test Jungle Tiger 2/i
      );
      cy.findByText(/Variant title test Jungle Tiger 2/i);
      cy.findByText(/quantity: 1/i);
      cy.findAllByText(/10.00/i).should("have.length", 3);
    });
    cy.findAllByRole("button", { name: "remove item" }).should(
      "have.length",
      1
    );
    // add two new items
    cy.clickDrawerMenuOption("prints");
    cy.findByRole("heading", { name: "Test Jungle Panther" }).click();
    cy.get("#quantity-increment").click();
    cy.get("#quantity").should("have.value", "2");
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture:
        "basket/mocked-checkout-response-checkoutLineItemsAdd-two-items.json",
    }).as("checkoutLineItemsAddTwoItems");
    cy.findByRole("button", { name: "Add to shopping bag" }).click();
    cy.wait("@checkoutLineItemsAddTwoItems");
    cy.findByLabelText(/go to shopping bag/).click();
    cy.findByRole("table", { name: /3 items in your cart/ });
    cy.findByText(/Variant title Test Jungle Panther/i);
    cy.findByText(/unit price: \$10.00/i).should("be.visible");
    cy.findByText(/unit price: \$15.00/i).should("be.visible");
    cy.findByRole("main").within(() => {
      cy.get("h3").scrollIntoView();
      cy.findByRole("heading", { name: "summary" });
      cy.findByText(/cart total:/i);
      cy.findAllByText(/\$40.00/).should("have.length", 2);
      cy.findAllByRole("button", { name: "remove item" }).should(
        "have.length",
        2
      );
      cy.findByText(/taxes and/i);
      cy.findByRole("link", { name: /shipping/i });
      cy.findByRole("table", { name: "3 items in your cart. Total $40.00" });
      cy.findByText(/taxes and /i);
      cy.findByRole("link", { name: /shipping/i });
      cy.findByText("calculated at check out");
      cy.findByRole("button", { name: "check out" });
    });
  });

  // TODO: skipping this test until checkout feature is prod ready
  it.skip("opens a new window with shoppify checkout page", () => {
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "basket/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
    cy.findByRole("heading", { name: "Your cart is empty." });
    cy.clickDrawerMenuOption("prints");
    cy.findByRole("heading", { name: "test Jungle Tiger 2" }).click();
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "basket/mocked-checkout-response-checkoutLineItemsAdd.json",
    }).as("checkoutLineItemsAdd");
    cy.findByRole("button", { name: "Add to shopping bag" }).click();
    cy.wait("@checkoutLineItemsAdd");
    cy.findByLabelText(/go to shopping bag/).click();
    cy.findByRole("table", { name: "1 item in your cart. Total $10.00" });

    cy.window().then((win) => {
      cy.stub(win, "open").as("windowOpen");
    });
    cy.findByRole("button", { name: "check out" }).click();

    cy.get("@windowOpen").should(
      "be.calledWith",
      "https://brushella-dev.myshopify.com/58698924240/checkouts/e3e56dff7098bd74dbb88ebdcac92fa4?key=a1f028daadc606b0bddddd5b653b54aa"
    );
  });
});

// TODO: remove this describe when checkout feature is PROD ready
describe("Basket page with Quote form for mobile view", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("iphone-4");
    cy.intercept("GET", "/page-data/collections/decor/page-data.json", {
      fixture: "basket/collectionDecor.json",
    });
    cy.intercept("GET", "/page-data/collections/prints/page-data.json", {
      fixture: "basket/collectionPrints.json",
    });
    cy.intercept(
      "GET",
      "/page-data/collections/decor/beach-towel/page-data.json",
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
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "basket/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
  });

  it("loads Shopping bag page correctly with 3 items and a Quote form", () => {
    cy.findByRole("heading", { name: "Your Cart" });
    cy.findByRole("heading", { name: "Your cart is empty." });
    cy.clickDrawerMenuOption("decor");
    cy.findByRole("heading", { name: "Cotton Beach towel" }).click();
    cy.get("select").select("Green");
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "basket/mocked-checkout-response-checkoutLineItemsAdd.json",
    }).as("checkoutLineItemsAdd");
    cy.findByRole("button", { name: "Add to shopping bag" }).click();
    cy.wait("@checkoutLineItemsAdd");
    cy.findByLabelText(/go to shopping bag/).click();
    cy.findByRole("table", { name: /1 item in your cart./i });
    cy.findByRole("table").within(() => {
      cy.findByAltText(/alt text for variant Green/i);
      cy.findByText(/Cotton Beach towel - Green/i);
      cy.findByText(/quantity: 1/i);
      // cy.findAllByText(/10.00/i).should("have.length", 3);
    });
    cy.findAllByRole("button", {
      name: "remove item Cotton Beach towel - Green",
    }).should("have.length", 1);
    // add two new items
    cy.clickDrawerMenuOption("prints");
    cy.findByRole("heading", { name: "Macumba" }).click();
    cy.get("select").select("large");
    cy.get("#quantity-increment").click();
    cy.get("#quantity").should("have.value", "2");
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture:
        "basket/mocked-checkout-response-checkoutLineItemsAdd-two-items.json",
    }).as("checkoutLineItemsAddTwoItems");
    cy.findByRole("button", { name: "Add to shopping bag" }).click();
    cy.wait("@checkoutLineItemsAddTwoItems");
    cy.findByLabelText(/go to shopping bag/).click();
    cy.findByRole("table", { name: /3 items in your cart/i });
    cy.findByText(/Macumba - large/i);
    cy.findByText(/Cotton Beach towel - Green/i);
    cy.findByLabelText("Full Name");
    cy.findByLabelText("Email address");
    cy.findByRole("button", { name: /Get a Quote/i });
  });

  it("render user errors in quote form correctly when submit with no data", () => {
    cy.intercept("POST", /api\/2023-10\/graphql/, {
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
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "basket/mocked-checkout-response-node.json",
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
    cy.findByText("Your quote was sent succesfully!");
  });

  it("renders error message when quote failed to be sent", () => {
    cy.intercept("POST", /api\/2023-10\/graphql/, {
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
