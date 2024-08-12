describe("Collection Template desktop", () => {
  it("checks for accessibility violations desktop view", () => {
    cy.viewport("macbook-16");
    cy.intercept("GET", "/page-data/collections/prints/page-data.json", {
      fixture: "collectionPrints.json",
    });
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/collections/prints/");
    cy.wait("@checkoutCreate");
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
  });
});

describe("Collection Template mobile", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("iphone-4");
    cy.intercept("GET", "/page-data/collections/prints/page-data.json", {
      fixture: "collectionPrints.json",
    });
    cy.intercept(
      "GET",
      "/page-data/collections/prints/test-product-abc/page-data.json",
      {
        fixture: "singleProduct-for-collection-template.json",
      }
    );
    cy.visit("/");
  });

  it("checks for accessibility violations mobile view", () => {
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.clickDrawerMenuOption("prints");
    cy.wait("@checkoutCreate");
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
  });

  it("Navigates from home to Print Collection template", () => {
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.clickDrawerMenuOption("prints");
    cy.wait("@checkoutCreate");
    cy.findByRole("heading", { name: "prints" });
    cy.findByText("Prints description goes here.");
    cy.findByRole("heading", { name: "test product abc" });
    cy.findByAltText(/alt text for test product abc for collection template/);
    cy.findByText("description for test product abc for collection template");
    cy.findByText("$100");
    cy.findAllByText(/AUD/i);
    cy.findAllByText("$0").should("have.length", "0");
    // listing items from this collection
    cy.findAllByText(/view details/i).should("have.length", "12");
  });

  it("Navigates to single product view ", () => {
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.clickDrawerMenuOption("prints");
    cy.wait("@checkoutCreate");
    cy.findByRole("heading", { name: "test product abc" }).click();
    cy.findByAltText(/alt text for test product abc for collection template/);
    cy.findByText("description for test product abc for collection template");
    cy.findByLabelText("Quantity");
    cy.findByRole("button", { name: "Add to shopping bag" });
  });
});
