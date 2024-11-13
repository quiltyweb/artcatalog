describe("LegalContent Template desktop", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport("macbook-16");
    cy.intercept(
      "GET",
      "/page-data/legal-content/return_and_refund_policy/page-data.json",
      {
        fixture: "footer/legalContent.json",
      }
    ).as("legalContent");
    cy.intercept("POST", /api\/2024-04\/graphql/, {
      fixture: "footer/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/");
    cy.wait("@checkoutCreate");
  });

  it("checks for accessibility violations desktop view", () => {
    cy.findByRole("link", { name: "Return and Refund Policy" }).click();
    cy.wait("@legalContent");
    cy.injectAxe();
    cy.checkA11y({
      exclude: [".chakra-portal", "#__chakra_env"],
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
        fixture: "footer/legalContent.json",
      }
    ).as("legalContent");
    cy.intercept("POST", /api\/2024-04\/graphql/, {
      fixture: "footer/mocked-checkout-response-checkoutCreate.json",
    }).as("checkoutCreate");
    cy.visit("/");
    cy.wait("@checkoutCreate");
  });

  it("checks for accessibility violations mobile view", () => {
    cy.findByRole("link", { name: "Return and Refund Policy" }).click();
    cy.wait("@legalContent");
    cy.injectAxe();
    cy.checkA11y({
      exclude: [".chakra-portal", "#__chakra_env"],
    });
  });

  it("Navigates from home to Legal Content template", () => {
    cy.findByRole("link", { name: "Return and Refund Policy" }).click();
    cy.wait("@legalContent");
    cy.findByRole("link", { name: "Home" });
    cy.findByText(/test content/);
  });
});
