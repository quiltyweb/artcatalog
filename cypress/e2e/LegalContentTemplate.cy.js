describe("LegalContent Template desktop", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("macbook-16");
    cy.intercept(
      "GET",
      "/page-data/legal-content/return_and_refund_policy/page-data.json",
      {
        fixture: "legalContent.json",
      }
    );
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/");
    cy.wait("@checkoutCreate");
  });

  it("checks for accessibility violations desktop view", () => {
    cy.findByRole("link", { name: "Return and Refund Policy" }).click();
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
  });
});
describe("LegalContent Template mobile", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("iphone-4");
    cy.intercept(
      "GET",
      "/page-data/legal-content/return_and_refund_policy/page-data.json",
      {
        fixture: "legalContent.json",
      }
    );
    cy.intercept("POST", /api\/2023-10\/graphql/, {
      fixture: "mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/");
    cy.wait("@checkoutCreate");
  });

  it("checks for accessibility violations mobile view", () => {
    cy.findByRole("link", { name: "Return and Refund Policy" }).click();
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: ["wcag2a", "wcag2aa"],
      includedImpacts: ["critical", "serious"],
    });
  });

  it("Navigates from home to Legal Content template ", () => {
    cy.findByRole("link", { name: "Return and Refund Policy" }).click();
    cy.findByText(/test content/);
  });
});
