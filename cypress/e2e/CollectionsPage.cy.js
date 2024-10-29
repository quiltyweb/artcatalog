describe("Collections Page desktop", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("macbook-16");
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/collections");
    cy.wait("@checkoutCreate");
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
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/collections");
    cy.wait("@checkoutCreate");
  });

  it("checks for accessibility violations on mobile", () => {
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
  });

  it("loads collections page correctly", () => {
    cy.findByRole("link", { name: "Home" });
    cy.findByRole("link", { name: "Home" });
    cy.findAllByText("All Categories").should("have.length", 2);
    cy.findByRole("heading", { name: "All Categories" });
    cy.findByText("Original Paintings");
  });
});
