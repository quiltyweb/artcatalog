describe("Basket page desktop", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.intercept("GET", "/page-data/collections/prints/page-data.json", {
      fixture: "collectionPrints.json",
    });
    cy.intercept(
      "GET",
      "/page-data/collections/prints/test-jungle-tiger-2/page-data.json",
      {
        fixture: "singleProduct-for-shopping-cart.json",
      }
    );
    cy.intercept(
      "GET",
      "/page-data/collections/prints/test-jungle-panther/page-data.json",
      {
        fixture: "singleProduct-for-shopping-cart-2.json",
      }
    );
  });

  it("checks for accessibility violations on desktop view", () => {
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
    cy.findByRole("table", { name: "There are no items in your bag" });
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
  });
});

describe("Basket page mobile", () => {
  beforeEach(() => {
    cy.viewport("iphone-4");
    cy.intercept("GET", "/page-data/collections/prints/page-data.json", {
      fixture: "collectionPrints.json",
    });
    cy.intercept(
      "GET",
      "/page-data/collections/prints/test-jungle-tiger-2/page-data.json",
      {
        fixture: "singleProduct-for-shopping-cart.json",
      }
    );
    cy.intercept(
      "GET",
      "/page-data/collections/prints/test-jungle-panther/page-data.json",
      {
        fixture: "singleProduct-for-shopping-cart-2.json",
      }
    );
  });

  it("checks for accessibility violations on mobile view", () => {
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
    cy.findByRole("table", { name: "There are no items in your bag" });
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
  });

  it("loads Shopping bag page correctly with no items and no quote form", () => {
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
    cy.findByRole("heading", { name: "My Shopping Bag" });
    cy.findByRole("table", { name: "There are no items in your bag" });
    cy.findByRole("columnheader", { name: "Image" });
    cy.findByRole("columnheader", { name: "Item" });
    cy.findByLabelText("Full Name").should("not.exist");
    cy.findByLabelText("Email address").should("not.exist");
    cy.findByRole("button", { name: "Get a quote" }).should("not.exist");
  });

  it("loads Shopping bag page correctly with 3 items and a quote form", () => {
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
    cy.findByRole("table", { name: "There are no items in your bag" });
    cy.clickDrawerMenuOption("prints");
    cy.findByRole("heading", { name: "test Jungle Tiger 2" }).click();
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutLineItemsAdd.json",
    }).as("checkoutLineItemsAdd");
    cy.findByRole("button", { name: "Add to shopping bag" }).click();
    cy.wait("@checkoutLineItemsAdd");
    cy.findByLabelText(/go to shopping bag/).click();
    cy.findByRole("table", { name: "There is 1 item in your bag" });
    cy.findAllByRole("button", { name: "Delete item" }).should(
      "have.length",
      1
    );
    // quote form
    cy.findByLabelText("Full Name");
    cy.findByLabelText("Email address");
    cy.findByRole("button", { name: "Get a quote" });

    // add two new items
    cy.clickDrawerMenuOption("prints");
    cy.findByRole("heading", { name: "Test Jungle Panther" }).click();
    cy.get("#quantity").should("have.value", "1");
    cy.get("#quantity-increment").click();
    cy.get("#quantity").should("have.value", "2");
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutLineItemsAdd-two-items.json",
    }).as("checkoutLineItemsAddTwoItems");
    cy.findByRole("button", { name: "Add to shopping bag" }).click();
    cy.wait("@checkoutLineItemsAddTwoItems");
    cy.findByLabelText(/go to shopping bag/).click();
    cy.findByRole("table", { name: "There are 3 items in your bag" });
  });

  it("delete an item from the shopping bag", () => {
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
    cy.findByRole("table", { name: "There are no items in your bag" });
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response.json",
    }).as("checkoutFetch");
    cy.reload();
    cy.wait("@checkoutFetch");
    cy.findByRole("table", { name: "There is 1 item in your bag" });
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutLineItemsRemove.json",
    }).as("checkoutLineItemsRemove");
    cy.findByRole("button", { name: "Delete item" }).click();
    cy.wait("@checkoutLineItemsRemove");
    cy.findByRole("table", { name: "There are no items in your bag" });
  });

  it("render user errors in quote form correctly when submit with no data", () => {
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response.json",
    }).as("checkoutFetch");
    cy.reload();
    cy.wait("@checkoutFetch");
    cy.findByRole("button", { name: "Get a quote" });
    cy.findByRole("button", { name: "Get a quote" }).click();
    cy.get("main").scrollIntoView();
    cy.findByText("Name is Required");
    cy.findByText("Email is Required");
  });

  it("sends quote correctly with 1 item", () => {
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response.json",
    }).as("checkoutFetch");
    cy.reload();
    cy.wait("@checkoutFetch");
    cy.findByLabelText("Full Name").type("name goes here");
    cy.findByLabelText("Email address").type("email@email.com");
    cy.intercept(
      "POST",
      "https://getform.io/f/db013ec6-dd9e-4e56-8c90-818b496bfcd5",
      "success"
    ).as("getFormSuccess");
    cy.findByRole("button", { name: "Get a quote" }).click();
    cy.wait("@getFormSuccess");
    cy.get("main").scrollIntoView();
    cy.findByText("Your quote was sent succesfully!");
  });

  it("renders error message when quote failed to be sent", () => {
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response.json",
    }).as("checkoutFetch");
    cy.reload();
    cy.wait("@checkoutFetch");
    cy.findByLabelText("Full Name").type("name goes here");
    cy.findByLabelText("Email address").type("email@email.com");
    cy.intercept(
      "POST",
      "https://getform.io/f/db013ec6-dd9e-4e56-8c90-818b496bfcd5",
      { statusCode: 500 }
    ).as("getFormFailure");
    cy.findByRole("button", { name: "Get a quote" }).click();
    cy.wait("@getFormFailure");
    cy.get("main").scrollIntoView();
    cy.findByText(
      "There was an error sending your quote. Please try again later."
    );
  });
});
