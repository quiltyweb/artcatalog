const REGEX_INTERCEPT_POST_REQUEST = /api\/2025-01\/graphql/;
const REGEX_INTERCEPT_GET_PAGE_DATA_REQUEST = /page-data\/sq\/d/;

describe("Collections Page desktop", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("macbook-16");
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.intercept("GET", REGEX_INTERCEPT_GET_PAGE_DATA_REQUEST, {
      fixture: "collections-page/page-data.json",
    }).as("pageData");
    cy.visit("/collections");
    cy.wait(["@checkoutCreate", "@pageData"]);
  });

  it("checks for accessibility violations on desktop", () => {
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
  });
});

describe("Collections Page mobile", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("iphone-4");
    cy.intercept("POST", REGEX_INTERCEPT_POST_REQUEST, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.intercept("GET", REGEX_INTERCEPT_GET_PAGE_DATA_REQUEST, {
      fixture: "collections-page/page-data.json",
    }).as("pageData");
    cy.visit("/collections");
    cy.wait(["@checkoutCreate", "@pageData"]);
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
      cy.findByText("Original Paintings");
      cy.findAllByRole("img").should("have.length", 2);
    });
  });

  it("goes from All collections to Print category", () => {
    cy.intercept("GET", "/page-data/collections/prints/page-data.json", {
      fixture: "collections-page/data-collections-print.json",
    }).as("collections/prints/page-data");
    cy.findByRole("main").within(() => {
      cy.findByRole("link", { name: /prints/i }).click();
      cy.findByRole("heading", { name: "Prints" });
      cy.findByText("Mock data for Print Category description.");
      cy.findByText("There are no products available.");
      cy.findByRole("link", { name: "Learn more about Prints" });
    });
    cy.findByLabelText("breadcrumb").within(() => {
      cy.findByText("Home");
      cy.findByText("All Categories");
      cy.findByText(/prints/i);
    });
  });
});
