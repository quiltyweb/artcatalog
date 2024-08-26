describe("Basket page desktop", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
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
    cy.findByRole("heading", { name: "Your Cart" });
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
  });

  it("loads empty Shopping bag correctly", () => {
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
    cy.findByRole("heading", { name: "Your Cart" });
    cy.findByRole("heading", { name: "Your cart is empty." });
    cy.findByRole("table").should("not.exist");
    cy.findByRole("button", { name: "check out" }).should("not.exist");
  });

  it("loads shopping cart with 1 item on desktop view", () => {
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
    cy.findByRole("heading", { name: "Your Cart" });
    cy.findByRole("heading", { name: "Your cart is empty." });
    cy.findByRole("link", { name: "prints" }).click();
    cy.findByRole("heading", { name: "test Jungle Tiger 2" }).click();
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutLineItemsAdd.json",
    }).as("checkoutLineItemsAdd");
    cy.findByRole("button", { name: "Add to shopping bag" }).click();
    cy.wait("@checkoutLineItemsAdd");
    cy.findByRole("link", { name: "My shopping bag (1 item)" }).click();
    cy.findByRole("table", { name: "1 item in your cart. Total $10.00" });
    cy.findByRole("columnheader", { name: "thumbnail" });
    cy.findByRole("columnheader", { name: "product" });
    cy.findByRole("columnheader", { name: "unit price" });
    cy.findByRole("columnheader", { name: "quantity" });
    cy.findByRole("columnheader", { name: "actions" });
    cy.findByRole("columnheader", { name: "total" });
  });
});

describe("Basket page mobile", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
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
    cy.findByRole("heading", { name: "Your Cart" });
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
  });

  it("loads empty Shopping bag correctly", () => {
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
    cy.findByRole("heading", { name: "Your Cart" });
    cy.findByRole("heading", { name: "Your cart is empty." });
    cy.findByRole("table").should("not.exist");
    cy.findByRole("button", { name: "check out" }).should("not.exist");
  });

  it("loads Shopping bag page correctly with 3 items and a quote form", () => {
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
    cy.findByRole("heading", { name: "Your Cart" });
    cy.findByRole("heading", { name: "Your cart is empty." });
    cy.clickDrawerMenuOption("prints");
    cy.findByRole("heading", { name: "test Jungle Tiger 2" }).click();
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutLineItemsAdd.json",
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
      fixture: "mocked-checkout-response-checkoutLineItemsAdd-two-items.json",
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

  it("deletes an item from the shopping bag", () => {
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/basket");
    cy.wait("@checkoutCreate");
    cy.findByRole("heading", { name: "Your Cart" });
    cy.findByRole("heading", { name: "Your cart is empty." });
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response.json",
    }).as("checkoutFetch");
    cy.reload();
    cy.wait("@checkoutFetch");
    cy.findByRole("table", { name: "1 item in your cart. Total $23.00" });
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutLineItemsRemove.json",
    }).as("checkoutLineItemsRemove");
    cy.findByRole("button", { name: "remove item" }).click();
    cy.wait("@checkoutLineItemsRemove");
    cy.findByRole("heading", { name: "Your cart is empty." });
  });

  it("sends user to external Shoppify checkout page", () => {
    // TODO:
  });
});
