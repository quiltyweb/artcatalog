const REGEX_INTERCEPT_POST_REQUEST = /api\/2025-01\/graphql/;
describe("Collections Page desktop", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("macbook-16");
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.intercept("GET", "/page-data/collections/page-data.json", {
      fixture: "collections-page/all-collections.json",
    }).as("collections-page-data");
    cy.intercept("GET", "/page-data/sq/d/3071889448.json", {
      fixture: "collections-page/data-allShopifyCollection.json",
    }).as("allShopifyCollection-page-data");
    cy.visit("/collections");
    cy.wait([
      "@checkoutCreate",
      "@collections-page-data",
      "@allShopifyCollection-page-data",
    ]);
  });

  it("checks for accessibility violations on desktop", () => {
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
  });
});

describe.only("Collections Page mobile", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("iphone-4");
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.intercept("GET", "/page-data/collections/page-data.json", {
      fixture: "collections-page/all-collections.json",
    }).as("collections-page-data");
    cy.intercept("GET", "/page-data/sq/d/3071889448.json", {
      fixture: "collections-page/data-allShopifyCollection.json",
    }).as("allShopifyCollection-page-data");
    cy.visit("/collections");
    cy.wait([
      "@checkoutCreate",
      "@collections-page-data",
      "@allShopifyCollection-page-data",
    ]);
  });

  it("checks for accessibility violations on mobile", () => {
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
  });

  it("loads collections page correctly", () => {
    cy.findByRole("main").within(() => {
      cy.findByRole("link", { name: "Home" });
      cy.findByLabelText("breadcrumb").within(() => {
        cy.findByText("Home");
        cy.findByText("All Categories");
      });
      cy.findByRole("heading", { name: "All Categories" });
      cy.findByText("Prints");
      cy.findAllByRole("img").should("have.length", 1);
    });
  });

  // TODO: mock categories and its products
  it("goes from All collections to Print category", () => {
    cy.findByRole("main").within(() => {
      cy.findByRole("link", { name: /prints/i }).click();
      cy.findByLabelText("breadcrumb").within(() => {
        cy.findByText("Home");
        cy.findByText("All Categories");
        cy.findByText(/prints/i);
      });
      cy.findByRole("heading", { name: "Prints" });
      cy.findByRole("link", { name: "Learn more about Prints" });
    });
  });
});
